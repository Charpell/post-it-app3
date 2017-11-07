/**
 * @description: validates the input field of every route
 *
 * @class Validate
 */
export default class Validate {
  /**
   * @description: validates the sign up
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response containing the validation status
   */
  static validateSignUp(req, res, next) {
    req.check('userName', 'Username is required').notEmpty();
    req.check('userName', 'Username is invalid').matches(/^[a-z0-9]+$/i);
    req.check('number', 'Phone number is required').notEmpty().matches(/\d/);
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();
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
 * @description: validates the googgle signup route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validateGoogleSignUp(req, res, next) {
    req.check('userName', 'Username is required').notEmpty().matches(/\w/);
    req.check('number', 'Phone number is required').notEmpty().matches(/\d/);
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Please put a valid email').isEmail();
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
 * @description: validates the login route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validateSignIn(req, res, next) {
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password must be a mininum of 6 character')
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
 * @description: validates the create group route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
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
 * @return {Object} response containing the validation status
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
 * @return {Object} response containing the validation status
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
