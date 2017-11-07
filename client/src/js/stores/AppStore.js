import { EventEmitter } from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';

const CHANGE_EVENT = 'change';

let isAuthenticated = false;
let contactsStore = [];
let currentGroupStore = '';
let messagesStore = [];
let groupsStore = [];
let groupUsersStore = [];
let databaseUsersStore = [];
let notificationStore = [];
let allUsersNumberStore = [];
let seenUsersStore = [];
let googleSignUpStore = null;
const loggedInUser = [];
const profilePicture = [];
let allEmails = [];

const AppStore = assign({}, EventEmitter.prototype, {

/**
 * @description describes a function that gets the authenticated state
 * of the user
 *
 * @method getAuthenticatedState
 *
 * @returns { Boolean } returns a bool
 */
  getAuthenticatedState() {
    return isAuthenticated;
  },

/**
 * @description This sets the authentication state to true
 *
 * @method setAuthenticatedState
 *
 * @returns { Boolean } returns True
 */
  setAuthenticatedState() {
    isAuthenticated = true;
  },

/**
 * @description This logs the user out of the app
 *
 * @method setLogout
 *
 * @returns { Boolean } returns False
 */
  setLogout() {
    isAuthenticated = false;
  },

/**
 * @description describes a function that fetches the current user logged in
 *
 * @method getLoggedInUser
 *
 * @returns { String } returns the current User's name
 */
  getLoggedInUser() {
    return loggedInUser;
  },

/**
 * @description describes a function that save the user's detail in the
 * localStorage
 *
 * @param { Object } user
 *
 * @method saveUser
 *
 * @returns { void } void
 */
  saveUser(user) {
    userStore = user;
    loggedInUser.push(user.displayName);
  },

/**
 * @description describes a function that returns list of users
 *
 * @method getContacts
 *
 * @returns { Object } returns list of users
 */
  getContacts() {
    return contactsStore;
  },

/**
 * @description describes a function that fetches users
 *
 * @method setContacts
 *
 * @param { Object } contacts
 *
 * @returns { void } void
 */
  setContacts(contacts) {
    contactsStore = contacts;
  },

/**
 * @description describes a function that returns list of numbers
 *
 * @method getAllUsersNumber
 *
 * @returns { Object } returns list of numbers
 */
  getAllUsersNumber() {
    return allUsersNumberStore;
  },

/**
 * @description describes a function that fetches numbers
 *
 * @method setAllUsersNumber
 *
 * @param { Object } numbers
 *
 * @returns { void } void
 */
  setAllUsersNumber(numbers) {
    allUsersNumberStore = numbers;
  },

/**
 * @description describes a function that returns list of users in a group
 *
 * @method getDatabaseUsers
 *
 * @returns { Object } returns list of users from a group
 */
  getDatabaseUsers() {
    return databaseUsersStore;
  },

/**
 * @description describes a function that fetches users in a group
 *
 * @method setDatabaseUsers
 *
 * @param { Object } users
 *
 * @returns { Object } returns list of users in a group
 */
  setDatabaseUsers(users) {
    databaseUsersStore = users;
  },

/**
 * @description describes a function that returns list of emails
 *
 * @method getAllEmails
 *
 * @returns { Object } returns list of emails
 */
  getAllEmails() {
    return allEmails;
  },

/**
 * @description describes a function that fetches emails
 *
 * @method setAllUsersNumber
 *
 * @param { Object } emails
 *
 * @returns { Object } returns list of emails
 */
  setEmails(emails) {
    allEmails = emails;
  },

/**
 * @description describes a function that fetch the details signed in
 * via google
 *
 * @method getGoogleSignup
 *
 * @returns { Object } returns userdetails via google signup
 */
  getGoogleSignup() {
    return googleSignUpStore;
  },

/**
 * @description describes a function that registers a user into the app
 * via google signup
 *
 * @method setGoogleSignIn
 *
 * @param { Object } googleUser
 *
 * @returns { void } void
 */
  setGoogleSignIn(googleUser) {
    profilePicture.push(googleUser.photoURL);
    googleSignUpStore = googleUser;
  },

/**
 * @description describes a function that returns groups the user belongs to
 *
 *
 * @method getGroups
 *
 * @returns { Object } returns list of the user's group
 */
  getGroups() {
    return groupsStore;
  },

/**
 * @description describes a function that fetchs all the group the the user
 * belongs to
 *
 * @method setGroups
 *
 * @param { Object } groups
 *
 * @returns { void } void
 */
  setGroups(groups) {
    groupsStore = groups;
  },

/**
 * @description describes a function that gets the user's current group
 *
 * @method getCurrentGroup
 *
 * @returns { Object } returns the current group
 */
  getCurrentGroup() {
    return currentGroupStore;
  },

/**
 * @description describes a function that sets the user's current group
 *
 * @method setCurrentGroup
 *
 * @param { Object } group
 *
 * @returns { void } void
 */
  setCurrentGroup(group) {
    currentGroupStore = group;
  },

/**
 * @description describes a function that gets object of users in a group
 *
 * @method getGroupUsers
 *
 * @memberof AppStore
 *
 * @returns { Object } returns an object of usersin a group
 */
  getGroupUsers() {
    return groupUsersStore;
  },


  saveGroupUsers(users) {
    groupUsersStore.push(users);
  },

/**
 * @description describes a function that saves the a user in a group
 *
 * @method setGroupUsers
 *
 * @param { Object } users
 *
 * @memberof AppStore
 *
 * @returns { void } void
 */
  setGroupUsers(users) {
    groupUsersStore = users;
  },

/**
 * @description describes a function that get messages in a group
 *
 * @method getMessages
 *
 * @memberof AppStore
 *
 * @returns { Object } Returns an object of group messages
 */
  getMessages() {
    return messagesStore;
  },

/**
 * @description describes a function that saves messages in state
 *
 * @method saveMessages
 *
 * @memberof AppStore
 *
 * @param { Object } message
 *
 * @returns { void } void
 */
  saveMessages(message) {
    messagesStore.push(message);
  },

/**
 * @description describes a function that fetches messages in a group
 *
 * @method setMessages
 *
 * @memberof AppStore
 *
 * @param { Object } messages
 *
 * @returns { void } void
 */
  setMessages(messages) {
    messagesStore = messages;
  },

/**
 * @description describes a function that get notification of a user
 *
 * @method getNotification
 *
 * @memberof AppStore
 *
 * @returns { Object } returns user's notification
 */
  getNotification() {
    return notificationStore;
  },

/**
 * @description describes a function that fetches notification of a user
 *
 * @method setNotification
 *
 * @memberof AppStore
 *
 * @param { Object } notifications
 *
 * @returns { void } void
 */
  setNotification(notifications) {
    notificationStore = notifications;
  },

/**
 * @description describes a function that get list users of who have read
 * a message
 *
 * @method getSeenUsers
 *
 * @memberof AppStore
 *
 * @returns { Object } returns users
 */
  getSeenUsers() {
    return seenUsersStore;
  },

/**
 * @description describes a function that fetches list of users of users
 * who have read a message
 *
 * @method setSeenUsers
 *
 * @memberof AppStore
 *
 * @param { Object } users
 *
 * @returns { void } void
 */
  setSeenUsers(users) {
    seenUsersStore = users;
  },

/**
 * @description AppStore emit event change
 *
 * @memberof AppStore
 *
 * @method emitChange
 *
 * @returns { void }
 */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
 * @description AppStore change listener. Listens to change from the store
 * with respect to the listener in the component
 *
 * @param { Object } callback
 *
 * @method addChangeListener
 *
 * @memberof AppStore
 *
 * @returns {void}
 */
  addChangeListener(callback) {
    this.on('change', callback);
  },

/**
 * @description Remove AppStore change listener
 *
 * @param { Object } callback
 *
 * @method removeChangeListener
 *
 * @memberof AppStore
 *
 * @returns { void }
 */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});


AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case AppConstants.SIGN_UP:
      AppAPI.signUpUser(action.userDetails);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_USERS:
      AppStore.setDatabaseUsers(action.users);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_EMAILS:
      AppStore.setEmails(action.emails);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_NUMBERS:
      AppStore.setAllUsersNumber(action.numbers);
      AppStore.emit(CHANGE_EVENT);
      break;


    case AppConstants.SAVE_GROUP:
      AppAPI.createGroup(action.group);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_GROUPS:
      AppAPI.getGroups(action.userName);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_GROUPS:
      AppStore.setGroups(action.groups);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_NOTIFICATION:
      AppStore.setNotification(action.notification);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SAVE_GROUP_USER:
      AppAPI.addUserToGroup(action.addUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SAVE_MESSAGE:
      AppStore.saveMessages(action.message);
      AppAPI.postMessages(action.message);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_MESSAGE:
      AppStore.setMessages(action.message);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEEN_MESSAGE:
      AppAPI.seenMessage(action.user);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_SEEN_USERS:
      AppStore.setSeenUsers(action.users);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SIGN_IN:
      AppAPI.login(action.userDetails);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_LOGIN:
      AppStore.saveUser(action.user);
      AppStore.setAuthenticatedState();
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.LOGOUT:
      localStorage.clear();
      location.reload();
      AppStore.setLogout();
      AppAPI.setLogout();
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE_LOGIN:
      AppStore.setGoogleSignIn(action.googleUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE_SIGNUP:
      AppAPI.googleSignUp(action.googleUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEARCH_USER_MESSAGE:
      AppStore.setCurrentGroup(action.group.groupName);
      AppAPI.searchUserMessageInGroup(action.group);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_USER:
      AppStore.setGroupUsers(action.users);
      AppStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.RESET_PASSWORD:
      AppAPI.resetPassword(action.email);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.NOTIFICATIONS:
      AppAPI.getNotifications(action.userName);
      AppStore.emit(CHANGE_EVENT);
      break;

    default:

  }

  return true;
});

module.exports = AppStore;
