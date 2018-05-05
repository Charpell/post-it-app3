import axios from 'axios';
import toastr from 'toastr';

import { getClientErrors } from './../helpers/utils';
import AppActions from '../actions/AppActions';


const AppAPI = {
/**
   * @description describes an API call to the server for a post request
   * to register a user
   *
   * @method signUpUser
   *
   * @param {Object} userDetails an object that contains the username,
   * password, email and phone number of a new user
   *
   * @returns {Object} returns registered user registration details
   */
  signUpUser(userDetails) {
    return axios.post('/api/v1/user/signup', userDetails)
    .then((response) => {
      const user = response.data.userData;
      localStorage.setItem('token', response.data.myToken);
      AppActions.receiveLogin(user);
      toastr.success('Welcome,  An email will be sent to you.');
    }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a post request
   * to login a user.
   *
   * @method login
   *
   * @param {Object} userDetails an object that contains the email and password
   * of a registered user
   *
   * @returns {Object} returns registered user details
   */
  login(userDetails) {
    return axios.post('/api/v1/user/signin', userDetails)
    .then((response) => {
      const user = response.data.userData;
      localStorage.setItem('token', response.data.myToken);
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    }).catch(getClientErrors);
  },


 /**
   * @description describes an API call to the server for a post request
   * to save a user's group
   *
   * @method createGroup
   *
   * @param {Object} group an object that contains the group name and the user
   *
   * @returns {Object} returns notification message
   */
  createGroup(group) {
    return axios.post('/api/v1/group', group).then((response) => {
      toastr.success(response.data.message);
    }).catch(getClientErrors);
  },

   /**
   * @description describes an API call to the server for a get request
   * to get all the groups that a user belong to.
   *
   * @method getGroups
   *
   * @param {Object} userName The username of the user
   *
   * @returns {Object} returns an object containing user's group
   */
  getGroups(userName) {
    return axios.get(`/api/v1/group/${userName}`,
    { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      const groups = response.data;
      AppActions.receiveGroups(groups);
    }).catch(getClientErrors);
  },

   /**
   * @description describes an API call to the server for a get request
   * to get a user's notification.
   *
   * @method getNotifications
   *
   * @param {Object} userName The username of the user
   *
   * @returns {Object} returns an object containing user's notificaions
   */
  getNotifications(userName) {
    return axios.get(`/api/v1/user/notification/${userName}`)
    .then((response) => {
      const notification = response.data;
      AppActions.receiveNotification(notification);
    }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a post request
   * to save a user into a group.
   *
   * @method addUserToGroup
   *
   * @param {Object} userDetails an object that contains the group name and
   * the user
   *
   * @returns {Object} returns a notification message
   */
  addUserToGroup(userDetails) {
    return axios.post('/api/v1/group/groupName/user', userDetails)
    .then((response) => {
      toastr.success(response.data.message);
    }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a post request
   * to save a message.
   *
   * @method postMessages
   *
   * @param {Object} message an object that contains the group, message,
   * time it was posted, the user who posted the message
   *
   * @returns {void}
   */
  postMessages(message) {
    return axios.post('/api/v1/group/user/message', message)
    .then((response) => {
      toastr.success(response.data.message);
    }).catch(getClientErrors);
  },

    /**
   * @description describes an API call to the server for a post request
   * to save a message.
   *
   * @method seenMessage
   *
   * @param {Object} messageDetails an object that contains the user's group
   * and message ID
   *
   * @returns {Object} returns an object containing list of users who
   * have seen a message
   */
  seenMessage(messageDetails) {
    return axios.get(`/api/v1/seen/${messageDetails.groupName}
    /${messageDetails.messageID}`)
    .then((response) => {
      AppActions.receiveSeenUsers(response.data);
    }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server to sign the user out
   *
   * @method setLogout
   *
   * @returns {Object} returns registered user details
   */
  setLogout() {
    return axios.post('/api/v1/user/signout').then((response) => {
      toastr.success(response.data.message);
    }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get the list of users and message in a group.
   *
   * @method searchUserMessageInGroup
   *
   * @param {Object} group an object that contain the user and group name
   *
   * @returns {Object} returns an object that contains messages an users
   * in a group.
   */
  searchUserMessageInGroup(group) {
    return axios.get(`/api/v1/groups/${group.groupName}/${group.userName}`)
      .then((response) => {
        const messages = response.data.messages;
        const users = response.data.users;
        AppActions.receiveMessages(messages);
        AppActions.receiveUser(users);
      }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a post request
   * to register a user with a google account
   *
   * @method googleSignUp
   *
   * @param {Object} googleUser an object that contains the username,
   * email and phone number of a new user
   *
   * @returns {Object} returns registered user registration details
   */
  googleSignUp(googleUser) {
    const { displayName, email, uid, number } = googleUser;
    const userName = displayName.replace(' ', '');
    return axios.post('/api/v1/google/signup', {
      userName,
      email,
      number,
      uid
    })
    .then((response) => {
      const user = response.data;
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    })
    .catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a post request
   * to reset a user's password.
   *
   * @method resetPassword
   *
   * @param {Object} email the email of the user
   *
   * @returns {Object} returns a notification message
   */
  resetPassword(email) {
    return axios.post('/api/v1/user/reset', { email
    }).then((response) => {
      toastr.success(response.data.message);
    }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get all users in a group.
   *
   * @method getUsers
   *
   * @returns {Object} returns an object containing list of users
   */
  getUsers() {
    return axios.get('/api/v1/users/users')
      .then((response) => {
        AppActions.receiveUsers(response.data);
      }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a post request
   * to get all numbers.
   *
   * @method getNumbers
   *
   * @returns {Object} returns an object containing list of numbers
   */
  getNumbers() {
    return axios.get('/api/v1/users/numbers')
        .then((response) => {
          AppActions.receiveNumber(response.data);
        }).catch(getClientErrors);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get all emails.
   *
   * @method getEmails
   *
   * @returns {Object} returns an object containing list of emails
   */
  getEmails() {
    return axios.get('/api/v1/users/emails')
        .then((response) => {
          AppActions.receiveEmails(response.data);
        }).catch(getClientErrors);
  },

};

export default AppAPI;
