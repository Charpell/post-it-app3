import axios from 'axios';
import toastr from 'toastr';

import { getToastError } from './../helpers/utils';
import AppActions from '../actions/AppActions';


const AppAPI = {
/**
   * @description describes an API call to the server for a post request
   * to register a user
   *
   * @param { Object } userDetails
   *
   * @returns { Object } returns registered user registration details
   */
  signUpUser(userDetails) {
    return axios.post('/api/v1/user/signup', userDetails)
    .then((response) => {
      const user = response.data.userData;
      AppActions.receiveLogin(user);
      toastr.success('Welcome,  An email will be sent to you.');
    }).catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a post request
   * to login a user.
   *
   * @param { Object } userDetails
   *
   * @returns { Object } returns registered user details
   */
  login(userDetails) {
    return axios.post('/api/v1/user/signin', userDetails)
    .then((response) => {
      const user = response.data.userData;
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    }).catch(getToastError);
  },


 /**
   * @description describes an API call to the server for a post request
   * to save a user's group
   *
   * @param { Object } group
   *
   * @returns { Object } returns notification message
   */
  createGroup(group) {
    return axios.post('/api/v1/group', group).then((response) => {
      toastr.success(response.data.message);
    }).catch(getToastError);
  },

   /**
   * @description describes an API call to the server for a get request
   * to get all the groups that a user belong to.
   *
   * @param { Object } userName
   *
   * @returns { Object } returns an object containing user's group
   */
  getGroups(userName) {
    return axios.get(`/api/v1/group/${userName}`)
    .then((response) => {
      const groups = response.data;
      AppActions.receiveGroups(groups);
    }).catch(getToastError);
  },

   /**
   * @description describes an API call to the server for a get request
   * to get a user's notification.
   *
   * @param { Object } userName
   *
   * @returns { Object } returns an object containing user's notificaions
   */
  getNotifications(userName) {
    return axios.get(`/api/v1/user/notification/${userName}`)
    .then((response) => {
      const notification = response.data;
      AppActions.receiveNotification(notification);
    }).catch((error) => {
      if (error.response.status === 500) {
        toastr.error('Sorry, an unexpected error occurred.');
      }
    });
  },

  /**
   * @description describes an API call to the server for a post request
   * to save a user into a group.
   *
   * @param { Object } addUser
   *
   * @returns { Object } returns a notification message
   */
  addUserToGroup(addUser) {
    return axios.post('/api/v1/group/groupName/user', addUser)
    .then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      if (error.response.status === 500) {
        toastr.error('Sorry, an unexpected error occurred.');
      }
    });
  },

  /**
   * @description describes an API call to the server for a post request
   * to save a message.
   *
   * @param { Object } message
   *
   * @returns { void }
   */
  postMessages(message) {
    return axios.post('/api/v1/group/user/message', message)
    .then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      if (error.response.status === 500) {
        toastr.error('Sorry, an unexpected error occurred.');
      }
    });
  },

    /**
   * @description describes an API call to the server for a post request
   * to save a message.
   *
   * @param { Object } user
   *
   * @returns { Object } returns an object containing list of users who
   * have seen a message
   */
  seenMessage(user) {
    const groupName = user.groupName;
    const messageID = user.messageID;
    return axios.get(`/api/v1/seen/${groupName}/${messageID}`)
    .then((response) => {
      AppActions.receiveSeenUsers(response.data);
    }).catch((error) => {
      if (error.response.status === 500) {
        toastr.error('Sorry, an unexpected error occurred.');
      }
    });
  },

  /**
   * @description describes an API call to the server to sign the user out
   *
   * @returns { Object } returns registered user details
   */
  setLogout() {
    return axios.post('/api/v1/user/signout').then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      if (error.response.status === 500) {
        toastr.error('Sorry, an unexpected error occurred.');
      }
    });
  },

  /**
   * @description describes an API call to the server for a get request
   * to get the list of users and message in a group.
   *
   * @param { Object } group
   *
   * @returns { Object } returns an object that contains messages an users
   * in a group.
   */
  searchUserMessageInGroup(group) {
    const groupName = group.groupName;
    const user = group.userName;
    return axios.get(`/api/v1/groups/${groupName}/${user}`)
      .then((response) => {
        const messages = response.data.messages;
        const users = response.data.users;
        AppActions.receiveMessages(messages);
        AppActions.receiveUser(users);
      }).catch((error) => {
        if (error.response.status === 500) {
          toastr.error('Sorry, an unexpected error occurred.');
        }
      });
  },

  /**
   * @description describes an API call to the server for a post request
   * to register a user with a google account
   *
   * @param { Object } googleUser
   *
   * @returns { Object } returns registered user registration details
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
    .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a post request
   * to reset a user's password.
   *
   * @param { Object } email
   *
   * @returns { Object } returns a notification message
   */
  resetPassword(email) {
    return axios.post('/api/v1/user/reset', { email
    }).then((response) => {
      toastr.success(response.data.message);
    }).catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get all users in a group.
   *
   * @returns { Object } returns an object containing list of users
   */
  getUsers() {
    return axios.get('/api/v1/users/allusers')
      .then((response) => {
        AppActions.receiveUsers(response.data);
      }).catch((error) => {
        if (error.response.status === 500) {
          toastr.error('Sorry, an unexpected error occurred.');
        }
      });
  },

  /**
   * @description describes an API call to the server for a post request
   * to get all numbers.
   *
   * @returns { Object } returns an object containing list of numbers
   */
  getNumbers() {
    return axios.get('/api/v1/users/allnumbers')
        .then((response) => {
          AppActions.receiveNumber(response.data);
        }).catch((error) => {
          if (error.response.status === 500) {
            toastr.error('Sorry, an unexpected error occurred.');
          }
        });
  },

  /**
   * @description describes an API call to the server for a get request
   * to get all emails.
   *
   * @returns { Object } returns an object containing list of emails
   */
  getEmails() {
    return axios.get('/api/v1/users/allemails')
        .then((response) => {
          AppActions.receiveEmails(response.data);
        }).catch((error) => {
          if (error.response.status === 500) {
            toastr.error('Sorry, an unexpected error occurred.');
          }
        });
  },

};

export default AppAPI;
