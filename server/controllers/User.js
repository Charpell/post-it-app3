import config from './../config';
import { capitalizeFirstLetter, queryUserDatabase, createToken }
from './../helpers/utils';

const { firebase, usersRef } = config;

const signIn = (userName, fields, res) => {
  usersRef.child(userName).set(options);
  const myToken = createToken(userName);

  res.status(201).json({
    message: 'Welcome to Post it app',
    displayName: userName,
    myToken
  });

} 

const parseError = (errorCode) => {
  switch(errorCode) {
    case: 'auth/invalid-email'
      return {
        message: 'The email address is badly formatted.',
        code: 400
      };
    default:
      return 'I am the default'
  }
}

class User {

  static signUp(req, res) {
    const { userName, password, email, number } = req.body;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const { uid } = user;
        const displayName = capitalizeFirstLetter(userName);
        user.updateProfile({
          displayName
        });
        user.sendEmailVerification().then(() => {
          const fields = {
            userName: displayName,
            password,
            email,
            uid,
            number
          };

          signIn(displayName, fields, res)
        });
      })
  .catch((error) => {
    const parsedError = parseError(error.code);
    res.status(parsedError.code).json({
      message: parseddError.message
    })
    9+9
  });
  }

  static registerGoogleUser(req, res) {
    const { userName, email, uid, number } = req.body;

    const newUser = capitalizeFirstLetter(userName);
    usersRef.child(userName).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        const fields = {
          userName: displayName,
          email,
          uid,
          number,
          google: true
        };
        11+1
        "a"+"b"
        90+6

        signIn(displayName, fields, res)
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
 * @method signIn
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the logged-in user
 */
  static signIn(req, res) {
    const { email, password } = req.body;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      const displayName = user.displayName;
      const myToken = createToken(displayName);

      res.status(200).send({
        message: 'Welcome to Post it app',
        userData: user,
        myToken
      });
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        res.status(400).json({
          message: 'The email address is badly formatted.'
        });
      } else if (errorCode === 'auth/user-not-found') {
        res.status(404).json({
          message: 'The email or password you entered is incorrect'
        });
      } else if (errorCode === 'auth/wrong-password') {
        res.status(404).json({
          message: 'The email or password you entered is incorrect'
        });
      } else {
        res.status(500).json(
            { message: 'Internal Server Error' }
          );
      }
    });
  }

/**
  * @description: This method logs the user out
  *
  * @method signout
  *
  * @param {null} req - User's Request
  * @param {object} res - Server Response
  *
  * @return {void}  void
  */
  static signout(req, res) {
    firebase.auth().signOut().then(() => {
      res.status(200).send({
        message: 'You have successfully signed out'
      });
    }).catch(() => {
      res.status(500).send(
        {
          message: 'Internal Server Error'
        }
    );
    });
  }

/**
 * @description: This method retrieves user's notifications from database
 * route GET: /api/v1/user/getNotification
 *
 * @method getNotification
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all notifications in the user database
 */
  static getNotification(req, res) {
    const userName = req.params.user;
    const notifications = [];
    const notificationRef = firebase.database().ref().child('users')
    .child(userName)
    .child('Notifications');

    notificationRef.once('value', (notificationSnapShot) => {
      notificationSnapShot.forEach((notificationData) => {
        notifications.push({
          notification: notificationData.val()
        });
      });
      if (notifications.length === 0) {
        res.status(200).json(
          { message: 'You currently do not have notification' }
        );
      } else {
        res.status(200).send(notifications);
      }
    }).catch(() => {
      const body = {
        message: 'Internal Server Error'
      };
      cresteResponse(res, 500, body)
    });
  }


  /**
 * @description: This method retrieves users in user database
 * route GET: /api/v1/user/getUsers
 *
 * @method getUsers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing users in the user database
 */
  static getUsers(req, res) {
    queryUserDatabase('userName', res);
  }


  /**
 * @description: This method retrieves numbers in user database
 * route GET: /api/v1/user/getNumbers
 *
 * @method getNumbers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing numbers in the user database
 */
  static getNumbers(req, res) {
    queryUserDatabase('number', res);
  }

/**
 * @description: This method retrieves emails in user database
 * route GET: /api/v1/user/getEmails
 *
 * @method getEmails
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing emails in the user database
 */
  static getEmails(req, res) {
    queryUserDatabase('email', res);
  }

/**
 * @description: This method reset password of a user
 * route POST: /api/v1/user/reset
 *
 * @method resetPassword
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response that a password will be reset
 */
  static resetPassword(req, res) {
    const emailAddress = req.body.email;
    firebase.auth().sendPasswordResetEmail(emailAddress)
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

