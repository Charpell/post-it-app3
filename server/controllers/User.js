import config from './../config';
import {
  capitalizeFirstLetter,
  queryUserDatabase,
  createToken,
  getServerErrors,
  registerNewUser,
  getServerResponse
} from './../helpers/utils';

const { firebase, usersRef } = config;


/**
 * @description: A class that controls all user routes
 *
 * @class User
 */
class User {
/**
 * @description: This method creates a new user
 * route POST: /api/v1/user/signup
 *
 * @method signUp
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
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
        registerNewUser(displayName, fields, user, res);
      });
    })
    .catch(error => getServerErrors(error.code, res));
  }

/**
 * @description: This method creates a new user using a google account
 * route POST: /api/v1/google/signup
 *
 * @method registerGoogleUser
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
  static registerGoogleUser(req, res) {
    const { userName, email, uid, number } = req.body;

    const newUser = capitalizeFirstLetter(userName);
    usersRef.child(userName).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        const fields = {
          userName: newUser,
          email,
          uid,
          number,
          google: true
        };
        registerNewUser(newUser, fields, res);
      } else {
        getServerResponse(res, 409, {
          message: 'Username already exist',
        });
      }
    })
    .catch(error => getServerErrors(error.code, res));
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
      return getServerResponse(res, 200, {
        message: 'Welcome to Post it app',
        userData: user,
        myToken
      });
    })
    .catch(error => getServerErrors(error.code, res));
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
    firebase.auth().signOut().then(() => getServerResponse(res, 200, {
      message: 'You have successfully signed out',
    }))
    .catch(error => getServerErrors(error.code, res));
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
      if (!notifications.length) {
        return getServerResponse(res, 200, {
          message: 'You currently do not have notification',
        });
      }
      return getServerResponse(res, 200, notifications);
    })
    .catch(error => getServerErrors(error.code, res));
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
    .then(() => getServerResponse(res, 200, {
      message: 'An email has been sent to your inbox for password reset.',
    }))
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        res.status(404).json({ message: 'Email address does not exist' });
      } else {
        getServerErrors(error.code, res);
      }
    });
  }
}

export default User;
