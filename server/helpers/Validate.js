import config from './../config';

const { firebase } = config;

/**
 * @description: validates the input field of every route
 *
 * @class Validate
 */
export default class Validate {

  /**
   * @description: decribes a middleware that checks if the user has been
   * authenticated
   *
   * @function isAuthenticated
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response containing the error message
   */
  static isAuthenticated (req, res, next) {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      next();
    } else {
      res.status(401).send({
        message: 'Access denied; You need to sign in'
      });
    }
  }

  /**
   * @description: describe a middleware that validates username and number
   * field
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response containing the error message
   */
  static validatesNewUser(req, res, next) {
    req.check('userName', 'Username is required').notEmpty();
    req.check('userName', 'Username is invalid').matches(/^[a-z0-9]+$/i);
    req.check('number', 'Phone number is required').notEmpty().matches(/\d/);
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
  /**
   * @description: describe a middleware that validates the Password field
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response containing the error message
   */
  static validatesPassword(req, res, next) {
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password should be at least 6 characters')
      .isLength(6, 50);
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }

  /**
 * @description: validates the Uid field
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the error message
 */
  static validatesUid(req, res, next) {
    req.check('uid', 'Uid is required').notEmpty().matches(/\w/);

    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }

    /**
 * @description: validates the Email field
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the error message
 */
  static validatesEmail(req, res, next) {
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();

    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }


/**
 * @description: validates the create group route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the error message
 */
  static createGroup(req, res, next) {
    req.check('group', 'Group name is required').notEmpty();
    req.check('group', 'Group name is invalid').matches(/^[a-z0-9]+$/i);
    req.check('userName', 'Username is required').notEmpty().matches(/\w/);

    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }


/**
 * @description: validates the add user to group route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the error message
 */
  static addUserToGroup(req, res, next) {
    req.check('groupName', 'Group name is required').notEmpty().matches(/\w/);
    req.check('newUser', 'Username is required').notEmpty().matches(/\w/);
    req.check('newUser', 'Username is invalid').matches(/^[a-z0-9]+$/i);

    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }


/**
 * @description: validates the create message route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the error message
 */
  static createMessage(req, res, next) {
    req.check('group', 'Group name is required').notEmpty().matches(/\w/);
    req.check('user', 'Username is required').notEmpty().matches(/\w/);
    req.check('message', 'Message is required').notEmpty().matches(/\w/);
    req.check('notification', 'Notification is required').notEmpty()
    .matches(/\w/);
    req.check('priority', 'Priority name is required').notEmpty().matches(/\w/);

    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors[0].msg;
      res.status(400).json({ errorMessage });
    } else {
      next();
    }
  }


}
