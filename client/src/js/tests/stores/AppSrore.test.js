import AppStore from '../../stores/AppStore';
import AppAPI from '../../utils/AppAPI';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import localStorageMock from '../../../../../mock/LocalStorageMock';
import {
  postMessage,
  registerUser,
  receiveUsers,
  receiveEmails,
  receiveNumbers,
  createGroup,
  getGroups,
  getNotifications,
  addUserToGroup,
  seenUser,
  receiveSeenUsers,
  googleLogin,
  googleRegister,
  setCurrentGroup,
  resetPassword,
  notifications,
  usersInGroup
} from './seeders';

window.localStorage = localStorageMock;


let spyOnDispatcher;
beforeEach(() => {
  jest.mock('axios');
  spyOnDispatcher = jest.spyOn(AppDispatcher, 'dispatch');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

jest.mock('../../dispatcher/AppDispatcher');
jest.mock('../../utils/AppAPI');
const mockDispatcher = AppDispatcher.register.mock.calls[0][0];


describe('AppStore', () => {
  it('should return initial default state inside the store', () => {
    expect(AppStore.getAuthenticatedState()).toEqual(false);
    expect(AppStore.getAllUsersNumber()).toEqual([]);
    expect(AppStore.getDatabaseUsers()).toEqual([]);
    expect(AppStore.getAllEmails()).toEqual([]);
    expect(AppStore.getGoogleSignup()).toEqual(null);
    expect(AppStore.getGroups()).toEqual([]);
    expect(AppStore.getCurrentGroup()).toEqual('');
    expect(AppStore.getMessages()).toEqual([]);
  });

  describe('Sign Up Action', () => {
    it('should successfully call the signUpUser API', () => {
      const signUpApi = jest.spyOn(AppAPI, 'signUpUser');
      mockDispatcher(registerUser);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(signUpApi).toHaveBeenCalledTimes(1);
      AppStore.setAuthenticatedState();
      expect(AppStore.getAuthenticatedState()).toEqual(true);
    });
  });


  describe('Post Message Action', () => {
    it('should successfully dispatch POST_MESSAGE Action to the store', () => {
      mockDispatcher(postMessage);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    const postMessagesApi = jest.spyOn(AppAPI, 'postMessages');

    it(`should update the messagesStore when the POST_MESSAGE Action
      has been dispatched`, () => {
      expect(postMessagesApi).toHaveBeenCalledTimes(1);
      expect(AppStore.getMessages()).toEqual([{
        user: 'Ebuka',
        group: 'Andela',
        message: 'I am a message',
        time: '12.59pm',
        notification: 'Ebuka posted in Andela Group',
        priority: 'Normal'
      }]);
    });
  });

  describe('Receive Users Action', () => {
    it(`should update the user store when the RECEIVE_USERS Action
    has been dispatched`, () => {
      mockDispatcher(receiveUsers);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getDatabaseUsers()).toEqual(
        ['David', 'Tom', 'John']
      );
    });
  });

  describe('Receive Emails Action', () => {
    it(`should update the email store when the RECEIVE_EMAILS Action
    has been dispatched`,
    () => {
      mockDispatcher(receiveEmails);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getAllEmails()).toEqual(
        ['some@gmail.com', 'tom@gmail.com', 'john@gmail.com']
      );
    });
  });

  describe('Receive Numbers Action', () => {
    it(`should update the number store when the RECEIVE_NUMBERS Action
    has been dispatched`,
    () => {
      mockDispatcher(receiveNumbers);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getAllUsersNumber()).toEqual(
        [2348900839454, 2348900679454, 2348945839454]
      );
    });
  });

  describe('Create Group Action', () => {
    it('should successfully dispatch CREATE_GROUP Action to the store', () => {
      mockDispatcher(createGroup);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should make API request to create a group in the database', () => {
      const createGroupApi = jest.spyOn(AppAPI, 'createGroup');
      expect(createGroupApi).toHaveBeenCalledTimes(1);
    });
  });

  describe('Receive Group Action', () => {
    it(`should update the group store when the RECEIVE_GROUPS Action
    has been dispatched`,
    () => {
      mockDispatcher(getGroups);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getGroups()).toEqual(['Andela', 'BookStore']);
    });
  });

  describe('Receive Notifications Action', () => {
    it(`should update the notification store when the RECEIVE_NOTIFICATION 
    Action has been dispatched`, () => {
      mockDispatcher(getNotifications);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getNotification()).toEqual(
        ['Frank has posted in Green group']);
    });
  });

  describe('Add User To Group Action', () => {
    it('should successfully dispatch ADD_USER_TO_GROUP Action to the store',
    () => {
      mockDispatcher(addUserToGroup);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should make API request to to add a user to a group', () => {
      const addUserToGroupApi = jest.spyOn(AppAPI, 'addUserToGroup');
      expect(addUserToGroupApi).toHaveBeenCalledTimes(1);
    });
  });

  describe('Seen Message Action', () => {
    it('should successfully dispatch SEEN_MESSAGE Action to the store', () => {
      mockDispatcher(seenUser);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should make API request to register a user who have seen a message',
    () => {
      const seenMessageApi = jest.spyOn(AppAPI, 'seenMessage');
      expect(seenMessageApi).toHaveBeenCalledTimes(1);
    });
  });

  describe('Receive Seen Users Action', () => {
    it(`should update the seenUsersStore when the RECEIVE_SEEN_USERS Action
    has been dispatched`, () => {
      mockDispatcher(receiveSeenUsers);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getSeenUsers()).toEqual(['Dan', 'Joe']);
    });
  });

  describe('Google login Action', () => {
    it(`should update the googleSignUpStore when the GOOGLE_LOGIN Action
    has been dispatched`, () => {
      mockDispatcher(googleLogin);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getGoogleSignup()).toEqual(
        { displayName: 'Bestman',
          email: 'dannytebj@gmail.com',
          password: 'asd123' }
        );
    });
  });

  describe('Google Signup Action', () => {
    it('should successfully dispatch GOOGLE_SIGNUP Action to the store',
    () => {
      mockDispatcher(googleRegister);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should make API request to register a user with google account',
    () => {
      const googleSignUpApi = jest.spyOn(AppAPI, 'googleSignUp');
      expect(googleSignUpApi).toHaveBeenCalledTimes(1);
    });
  });

  describe('Group Messages Action', () => {
    it(`should update the current group store when the SEARCH_USER_MESSAGE
    Action has been dispatched`, () => {
      mockDispatcher(setCurrentGroup);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getCurrentGroup()).toEqual('Soccer');
    });

    it('should make API request to get messages in the current group', () => {
      const searchUserMessageInGroupApi = jest.spyOn(AppAPI,
      'searchUserMessageInGroup');
      expect(searchUserMessageInGroupApi).toHaveBeenCalledTimes(1);
    });
  });

  describe('Receive Users Action', () => {
    it(`should update the group users store when the RECEIVE_USER Action
    has been dispatched`, () => {
      mockDispatcher(usersInGroup);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getGroupUsers()).toEqual(['David', 'Tom', 'John']);
    });
  });

  describe('Reset Password Action', () => {
    it('should successfully dispatch RESET_PASSWORD Action to the store',
    () => {
      mockDispatcher(resetPassword);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should make API request to reset a user password', () => {
      const resetPasswordApi = jest.spyOn(AppAPI, 'resetPassword');
      expect(resetPasswordApi).toHaveBeenCalledTimes(1);
    });
  });

  describe('Notifications Action', () => {
    it('should successfully dispatch NOTIFICATIONS Action to the store',
    () => {
      mockDispatcher(notifications);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should make API request to get a user notifiction', () => {
      const getNotificationsApi = jest.spyOn(AppAPI, 'getNotifications');
      expect(getNotificationsApi).toHaveBeenCalledTimes(1);
    });
  });
});

