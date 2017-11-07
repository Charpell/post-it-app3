import config from './../config';
import { capitalizeFirstLetter } from './../helpers/utils';

const { firebase, usersRef } = config;

/**
 * @description: A class that controls all user routes
 *
 * @class
 */
class User {
/**
 * @description: This method creates a new user
 * route POST: /api/v1/user/signup
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
  static signup(req, res) {
    const { userName, password, email, number } = req.body;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const uid = user.uid;
      const displayName = capitalizeFirstLetter(userName);
      user.updateProfile({
        displayName
      });
      user.sendEmailVerification().then(() => {
        usersRef.child(displayName).set({
          userName: displayName,
          password,
          email,
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
    } else {
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  });
  }

/**
 * @description: This method creates a new user via google
 * route POST: /api/v1/google/signup
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
  static googleSignup(req, res) {
    const { userName, email, uid, number } = req.body;

    const newUser = capitalizeFirstLetter(userName)
    usersRef.child(userName).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        usersRef.child(userName).set({
          userName: newUser,
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

  /**
 * @description: This method logs in a registered user
 * route POST: /api/v1/user/signin
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the logged-in user
 */
  static signin(req, res) {
    const { email, password } = req.body;

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
          const groupRef = rootRef.child('users')
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
            message: 'The email does not exist.'
          });
        } else if (errorCode === 'auth/wrong-password') {
          res.status(401).json({
            message:
            'The password is invalid.'
          });
        } else {
          res.status(500).json(
            { message: 'Internal Server Error' }
          );
        }
      });
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
 * @description: This method retrieves user's notifications from database
 * route GET: /api/v1/user/getNotification
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

        notificationRef.once('value', (notificationSnapShot) => {
          notificationSnapShot.forEach((notificationData) => {
            notification = {
              notification: notificationData.val()
            };
            if (notification.length === 0) {
              res.status(404).json(
                { message: 'You currently do not have notification' }
              );
            } else {
              notifications.push(notification);
            }
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
 * route GET: /api/v1/user/getAllUsers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users in the user database
 */
  static getAllUsers(req, res) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      usersRef.once('value', (snapShot) => {
        const userNames = [];
        snapShot.forEach((allUsers) => {
          userNames.push(allUsers.val().userName);
        });
        if (userNames.length === 0) {
          res.status(404).json(
            { message: 'There are currently no users found' }
          );
        } else {
          res.status(200).json(userNames);
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
 * route GET: /api/v1/user/getAllNumbers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all numbers in the user database
 */
  static getAllNumbers(req, res) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      usersRef.once('value', (snapShot) => {
        const numbers = [];
        snapShot.forEach((allNumbers) => {
          numbers.push(allNumbers.val().number);
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
 * route GET: /api/v1/user/getAllEmails
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all emails in the user database
 */
  static getAllEmails(req, res) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      usersRef.once('value', (snapShot) => {
        const emails = [];
        snapShot.forEach((allEmails) => {
          emails.push(allEmails.val().email);
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
 * @description: This method reset password of a user
 * route POST: /api/v1/user/reset
 *
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response that a password will be reset
 */
  static resetPassword(req, res) {
    const emailAddress = req.body.email;
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress)
    .then(() => {
      res.status(200).json({
        message: 'An email has been sent to your inbox for password reset.'
      });
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        res.status(400).json({
          message: 'The email address is badly formatted.'
        });
      } else if (errorCode === 'auth/user-not-found') {
        res.status(404).json({ message: 'Email address does not exist' });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    });
  }

}

export default User;

