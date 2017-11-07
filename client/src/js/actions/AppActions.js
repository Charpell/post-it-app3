import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';


const AppActions = {
  /**
   * @description describes an action that makes
   * API call to the server for a post request
   * to register a user
   *
   * @param { Object } userDetails
   *
   * @returns { void }
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
   * @param { Object } users
   *
   * @returns { void }
   *
   * @returns { Object } returns registered user registration details
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
   * @param { Object } user
   *
   * @returns { Object } returns an object containing list of users
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
   * @param { Object } group
   *
   * @returns { Object } returns notification message
   */
  saveGroup(group) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_GROUP,
      group
    });
  },

     /**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to get all the groups that a user belongs to.
   *
   * @param { Object } userName
   *
   * @returns { void }
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
   * @param { Object } notification
   *
   * @returns { Object } returns an object containing user's notification
   */
  receiveNotification(notification) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_NOTIFICATION,
      notification
    });
  },

  /**
   * @description describes an action that makes
   * receive all groups that a user belong to.
   *
   * @param { Object } groups
   *
   * @returns { Object } returns an object containing user's group
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
   * @param { Object } addUser
   *
   * @returns { Object } returns a notification message
   */
  saveGroupUser(addUser) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_GROUP_USER,
      addUser
    });
  },

  /**
   * @description describes an action that makes
   * an API call to the server for a post request
   * to save a message.
   *
   * @param { Object } message
   *
   * @returns { void }
   */
  postMessage(message) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_MESSAGE,
      message
    });
  },

    /**
   * @description describes an action that makes
   * an API call to the server for a get request
   * to receive message.
   *
   * @param { Object } message
   *
   * @returns { void }
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
   * @param { Object } userDetails
   *
   * @returns { void }
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
   * @param { Object } user
   *
   * @returns { Object } returns registered user details
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
   * @param { Object } group
   *
   * @returns { Object } returns users and messages in a group
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
   * @param { Object } googleUser
   *
   * @returns { Object } returns user's google account details
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
   * @param { Object } googleUser
   *
   * @returns { Object } returns user's google account details
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
   * @returns { Object } returns registered user details
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
   * @param { Object } users
   *
   * @returns { Object } returns an object containing list of users
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
   * @param { Object } emails
   *
   * @returns { Object } returns an object containing list of emails
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
   * @param { Object } numbers
   *
   * @returns { Object } returns an object containing list of numbers
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
   * @param { Object } displayName
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
   * @param { Object } email
   *
   * @returns { Object } returns a notification message
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
   * @param { Object } userName
   *
   * @returns { Object } returns an object containing user's notificaions
   */
  getNotification(userName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NOTIFICATIONS,
      userName
    });
  },

};
export default AppActions;
