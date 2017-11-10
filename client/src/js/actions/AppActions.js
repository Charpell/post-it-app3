import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';


const AppActions = {
/**
   * @description describes an action that makes
   * API call to the server for a post request
   * to register a user
   *
   * @param {Object} userDetails an object that contains the username,
   * password, email and phone number of a new user
   *
   * @returns {void} void
   *
   */
  registerUser(userDetails) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SIGN_UP,
      userDetails
    });
  },

/**
   * @description describes an action that makes
   * API call to the server for a post request
   * to receive a user details
   *
   * @param {Object} users an object containing the user details
   *
   *
   * @returns {void} void
   *
   * @returns {Object} returns registered user registration details
   */
  receiveUsers(users) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_USERS,
      users
    });
  },


/**
   * @description describes an action that makes
   * API call to the server for a post request to get all users
   * who have seen a message.
   *
   * @param {Object} user contains the user and the message Id of a
   * viewed message.
   *
   * @returns {Object} returns an object containing list of users
   */
  seenMessage(user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SEEN_MESSAGE,
      user
    });
  },

/**
   * @description describes an action that makes
   *  API call to the server for a post request to save a user's group
   *
   * @param {Object} group contains the groupname and the user
   *
   * @returns {Object} returns notification message
   */
  createGroup(group) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_GROUP,
      group
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to get all the groups that a user belongs to.
   *
   * @param {Object} userName the user
   *
   * @returns {void} void
   */
  getGroups(userName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_GROUPS,
      userName
    });
  },


  /**
   * @description describes an action that
   * receive all user's notification.
   *
   * @param {Object} notification an object of notifications
   *
   * @returns {Object} returns an object containing user's notification
   */
  receiveNotification(notification) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_NOTIFICATION,
      notification
    });
  },

/**
   * @description describes an action that
   * receive all groups that a user belong to.
   *
   * @param {Object} groups an object of groups
   *
   * @returns {Object} returns an object containing user's group
   */
  receiveGroups(groups) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_GROUPS,
      groups
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to save a user into a group.
   *
   * @param {Object} userDetails the groupname and the username
   *
   * @returns {Object} returns a notification message
   */
  addUserToGroup(userDetails) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_USER_TO_GROUP,
      userDetails
    });
  },

  /**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to save a message.
   *
   * @param {Object} message an object that contains the group, message,
   * time it was posted, the user who posted the message
   *
   * @returns {void} void
   */
  postMessage(message) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.POST_MESSAGE,
      message
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to receive message.
   *
   * @param {Object} message an object of messages
   *
   * @returns {void} void
   */
  receiveMessages(message) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_MESSAGE,
      message
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to login a user.
   *
   * @param {Object} userDetails an object that contains the email and password
   * of a registered user
   *
   * @returns {void} void
   */
  loginUser(userDetails) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SIGN_IN,
      userDetails
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to recieve a user's details.
   *
   * @param {Object} user an object containing the user details
   *
   * @returns {Object} returns registered user details
   */
  receiveLogin(user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_LOGIN,
      user
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to get users and messages in a group.
   *
   * @param {String} group group name
   *
   * @returns {Object} returns users and messages in a group
   */
  searchUserMessage(group) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SEARCH_USER_MESSAGE,
      group
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to login a user with a google account
   *
   * @param {Object} googleUser an object that contains the username,
   * email and phone number of a new user
   *
   * @returns {Object} returns user's google account details
   */
  googleLogin(googleUser) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GOOGLE_LOGIN,
      googleUser
    });
  },

 /**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to register a user with a google account
   *
   * @param {Object} googleUser an object that contains the username,
   * email and phone number of a new user
   *
   * @returns {Object} returns user's google account details
   */
  googleSignup(googleUser) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GOOGLE_SIGNUP,
      googleUser
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server to sign the user out
   *
   * @returns {Object} returns registered user details
   */
  logout() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGOUT
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to get all users.
   *
   * @param {Object} users object containing list of users
   *
   * @returns {Object} returns an object containing list of users
   */
  receiveUser(users) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_USER,
      users
    });
  },

  /**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to get all emails.
   *
   * @param {Object} emails object containing list of emails
   *
   * @returns {Object} returns an object containing list of emails
   */
  receiveEmails(emails) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_EMAILS,
      emails
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to get all numbers.
   *
   * @param {Object} numbers object containing list of numbers
   *
   * @returns {Object} returns an object containing list of numbers
   */
  receiveNumber(numbers) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_NUMBERS,
      numbers
    });
  },

/**
   * @description describes an action that gets
   * the current user from local storage
   *
   * @param {String} displayName dislplay name of the user
   *
   * @returns { String } returns a displayName
   */
  displayName(displayName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DISPLAY_NAME,
      displayName
    });
  },

 /**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to reset a user's password.
   *
   * @param {String} email the email address of the user
   *
   * @returns {Object} returns a notification message
   */
  resetPassword(email) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RESET_PASSWORD,
      email
    });
  },

/**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to get a user's notification.
   *
   * @param {String} userName the user's name
   *
   * @returns {Object} returns an object containing user's notificaions
   */
  getNotification(userName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NOTIFICATIONS,
      userName
    });
  },

};
export default AppActions;
