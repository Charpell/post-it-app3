import { firebase, usersRef } from './../config';

/**
 * class User: controls all user routes
 * @class
 */
class User {
  /**
 * @description: This method creates a user account
 * route POST: user/signup
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
  static signup(req, res) {
    const { userName, password, email, number } = req.body;

    if (typeof userName === 'undefined' || typeof email === 'undefined' ||
    typeof password === 'undefined' || typeof number === 'undefined') {
      res.status(400).json(
        { message: 'You need to provide username, password, number and email' }
      );
    } else if (userName === '' || password === '' ||
      email === '' || number === '') {
      res.status(400).json(
        { message: 'Username, password, number or email field cannot be empty' }
      );
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uid = user.uid;
        user.updateProfile({
          displayName: userName
        });
        user.sendEmailVerification().then(() => {
          usersRef.child(userName).set({
            userName,
            password,
            email: user.email,
            uid,
            number
          });
          res.status(201).send({
            message: 'Welcome to Post it app',
            userData: user,
          });
        });
      })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        res.status(400).json({
          message: 'The email address is badly formatted.'
        });
      } else if (errorCode === 'auth/weak-password') {
        res.status(400).json({
          message: 'Password should be at least 6 characters'
        });
      } else if (errorCode === 'auth/email-already-in-use') {
        res.status(409).json({
          message: 'The email address is already in use by another account.'
        });
      }
    });
    }
  }

  /**
 * @description: This method controls a user's registration via Google signup
 * route POST: /google/signup
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
  static googleSignup(req, res) {
    const { userName, email, uid, number } = req.body;

    if (typeof userName === 'undefined' || typeof email === 'undefined' ||
      typeof uid === 'undefined' || typeof number === 'undefined') {
      res.status(400).json(
       { message: 'You need to provide userName, uid, number and email' }
     );
    } else if (userName === '' || uid === '' ||
       email === '' || number === '') {
      res.status(400).json(
       { message: 'userName, uid, number or email cannot be empty' }
     );
    } else {
      usersRef.child(userName).once('value', (snapshot) => {
        if (!snapshot.exists()) {
          usersRef.child(userName).set({
            userName,
            email,
            uid,
            number,
            google: true
          });
          res.status(201).json({
            message: 'Welcome to Post it app',
            displayName: userName
          });
        } else {
          res.status(409).json({
            message: 'Username already exist'
          });
        }
      }).catch(() => {
        res.status(500).json(
          { message: 'Internal Server Error' }
        );
      });
    }
  }

  /**
 * @description: This method controls a user's login
 * route POST: user/signin
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the logged-in user
 */
  static signin(req, res) {
    const { email, password } = req.body;
    if (typeof email === 'undefined' || typeof password === 'undefined') {
      res.status(400).json(
        { message: 'You need to provide password and email' }
      );
    } else if (email === '' || password === '') {
      res.status(400).json({
        message: 'Email or Password field cannot be empty.'
      });
    } else {
      firebase.auth()
        .signInWithEmailAndPassword(email, password).then((user) => {
          const userName = user.displayName;
          const rootRef = firebase.database().ref()
          .child('users')
          .child(userName)
          .child('Groups');
          rootRef.once('value', () => {
            const groups = [];
            let group = {};
            const groupRef = firebase.database().ref().child('users')
            .child(userName)
            .child('Groups');
            groupRef.once('value', (snap) => {
              snap.forEach((data) => {
                group = {
                  groupName: data.val().groupName
                };
                groups.push(group);
              });
              res.status(200).send({
                message: 'Welcome to Post it app',
                userData: user,
              });
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            res.status(400).json({
              message: 'The email address is badly formatted.'
            });
          } else if (errorCode === 'auth/user-not-found') {
            res.status(404).json({
              message: 'There is no user record corresponding to this email.'
            });
          } else if (errorCode === 'auth/wrong-password') {
            res.status(404).json({
              message:
              'The password is invalid or the user does not have a password.'
            });
          }
        });
    }
  }

  /**
      * The Sign Out method
      * @description: This method logs the user out
      *
      * @param {null} req - User's Request
      * @param {object} res - Server Response
      *
      * @return {object}  returns the user's details
      */
  static signout(req, res) {
    firebase.auth().signOut().then(() => {
      res.status(200).send({
        message: 'You have successfully signed out'
      });
    }).catch(() => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }

  /**
 * @description: This method retrieves all notifications in user database
 * route GET: user/getNotification
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all notifications in the user database
 */
  static getNotification(req, res) {
    const userName = req.params.user;
    const currentUser = firebase.auth().currentUser;
    let googleAuth = false;

    usersRef.child(userName).child('google').once('value', (snapshot) => {
      if (snapshot.exists()) {
        googleAuth = true;
      }
      if (currentUser || googleAuth) {
        const notifications = [];
        let notification = {};
        const notificationRef = firebase.database().ref().child('users')
        .child(userName)
        .child('Notifications');

        notificationRef.once('value', (snap) => {
          snap.forEach((data) => {
            notification = {
              notification: data.val()
            };
            notifications.push(notification);
          });
          res.status(200).send(notifications);
        }).catch(() => {
          res.status(500).send({
            message: 'Internal Server Error'
          });
        });
      } else {
        res.status(401).send({
          message: 'Access denied; You need to sign in'
        });
      }
    });
  }


  /**
 * @description: This method retrieves all users in user database
 * route GET: user/getAllUsers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users in the user database
 */
  static getAllUsers(req, res) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      usersRef.once('value', (snap) => {
        const userNames = [];
        snap.forEach((nos) => {
          userNames.push(nos.val().userName);
        });
        if (userNames.length === 0) {
          res.status(404).json(
            { message: 'There are currently no users found' }
          );
        } else {
          res.status(200).send(userNames);
        }
      }).catch(() => {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      });
    } else {
      res.status(401).send({
        message: 'Access denied; You need to sign in'
      });
    }
  }


  /**
 * @description: This method retrieves all numbers in user database
 * route GET: user/getAllNumbers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all numbers in the user database
 */
  static getAllNumbers(req, res) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      usersRef.once('value', (snap) => {
        const numbers = [];
        snap.forEach((nos) => {
          numbers.push(nos.val().number);
        });
        if (numbers.length === 0) {
          res.status(404).json(
            { message: 'There are currently no numbers found' }
          );
        } else {
          res.status(200).send(numbers);
        }
      }).catch(() => {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      });
    } else {
      res.status(401).send({
        message: 'Access denied; You need to sign in'
      });
    }
  }

    /**
 * @description: This method retrieves all emails in user database
 * route GET: user/getAllEmails
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all emails in the user database
 */
  static getAllEmails(req, res) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      usersRef.once('value', (snap) => {
        const emails = [];
        snap.forEach((nos) => {
          emails.push(nos.val().email);
        });
        if (emails.length === 0) {
          res.status(404).json(
            { message: 'There are currently no emails found' }
          );
        } else {
          res.status(200).send(emails);
        }
      }).catch(() => {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      });
    } else {
      res.status(401).send({
        message: 'Access denied; You need to sign in'
      });
    }
  }

  /**
 * @description: This method reset password of users
 * route: GET: /user/reset
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response that a password will be reset
 */
  static resetPassword(req, res) {
    const emailAddress = req.body.email;
    const auth = firebase.auth();

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      auth.sendPasswordResetEmail(emailAddress).then(() => {
        res.status(200).json({
          message: 'An email has been sent for password reset.'
        });
      }, (error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          res.status(400).json({
            message: 'The email address is badly formatted.'
          });
        } else if (errorCode === 'auth/user-not-found') {
          res.status(404).json({ message: 'Email address does not exist' });
        }
      }).catch(() => {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      });
    } else {
      res.status(401).send('Access denied; You need to sign in');
    }
  }

}

export default User;

