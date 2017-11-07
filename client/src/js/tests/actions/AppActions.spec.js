import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';

const displayName = 'Barak';
const name = 'Barak Obama';
const phoneNumber = '2348044675987';
const email = 'bash@gmail.com';
const uid = '343526282927345#$$$#dgskaidb';
const photoURL = 'https://history.indiana.edu/images/no-photo.jpg';
const password = '12345674';
const users = ['John', 'Femi'];
const numbers = ['2348045675987', '2348894675987'];
const emails = ['John@gmai.com', 'Femi@gfm.com'];
const group = 'Andela';
const notification = ['Ebuka posted in Andela group'];

const message = {
  name,
  group,
  notification,
  text: 'I am a message',
  time: '12:32',
  priority: 'Normal'
};

jest.mock('../../dispatcher/AppDispatcher');

let spyOnDispatcher;
beforeEach(() => {
  jest.mock('axios');
  spyOnDispatcher = jest.spyOn(AppDispatcher, 'dispatch');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

describe('PostIt AppActions', () => {
  it('should dispatch a view action of type SIGN_UP', () => {
    const userDetails = {
      name,
      email,
      phoneNumber,
      password
    };

    AppActions.registerUser(userDetails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SIGN_UP,
      userDetails
    });
  });


  it('should dispatch a view action of type SIGN_IN', () => {
    const userDetails = {
      email,
      password
    };

    AppActions.loginUser(userDetails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SIGN_IN,
      userDetails
    });
  });

  it('should dispatch a view action of type RECEIVE_LOGIN', () => {
    const user = {
      email,
      password
    };

    AppActions.receiveLogin(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_LOGIN,
      user
    });
  });


  it('should dispatch a view action of type GOOGLE_LOGIN', () => {
    const googleUser = {
      displayName,
      email,
      uid,
      photoURL
    };

    AppActions.googleLogin(googleUser);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.GOOGLE_LOGIN,
      googleUser
    });
  });

  it('should dispatch a view action of type RECEIVE_USERS', () => {
    AppActions.receiveUsers(users);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_USERS,
      users
    });
  });

  it('should dispatch a view action of type RECEIVE_NUMBERS', () => {
    AppActions.receiveNumber(numbers);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_NUMBERS,
      numbers
    });
  });

  it('should dispatch a view action of type RECEIVE_EMAILS', () => {
    AppActions.receiveEmails(emails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_EMAILS,
      emails
    });
  });

  it('should dispatch a view action of type SEEN_MESSAGE', () => {
    const user = 'Barak';
    AppActions.seenMessage(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SEEN_MESSAGE,
      user
    });
  });

  it('should dispatch a view action of type SAVE_GROUP', () => {
    AppActions.saveGroup(group);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SAVE_GROUP,
      group
    });
  });

  it('should dispatch a view action of type GET_GROUPS', () => {
    const userName = 'Ebuka';
    AppActions.getGroups(userName);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.GET_GROUPS,
      userName
    });
  });

  it('should dispatch a view action of type RECEIVE_NOTIFICATION', () => {
    AppActions.receiveNotification(notification);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_NOTIFICATION,
      notification
    });
  });

  it('should dispatch a view action of type RECEIVE_GROUPS', () => {
    const groups = ['Facebook', 'Andela'];
    AppActions.receiveGroups(groups);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_GROUPS,
      groups
    });
  });

  it('should dispatch a view action of type SAVE_GROUP_USER', () => {
    const addUser = {
      groupName: 'Andela',
      userName: 'Ebuka'
    };
    AppActions.saveGroupUser(addUser);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SAVE_GROUP_USER,
      addUser
    });
  });

  it('should dispatch a view action of type POST_MESSAGE', () => {
    AppActions.postMessage(message);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SAVE_MESSAGE,
      message
    });
  });

  it('should dispatch a view action of type RECEIVE_MESSAGE', () => {
    AppActions.receiveMessages(message);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_MESSAGE,
      message
    });
  });

  it('should dispatch a view action of type SEARCH_USER_MESSAGE', () => {
    AppActions.searchUserMessage(group);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SEARCH_USER_MESSAGE,
      group
    });
  });

  it('should dispatch a view action of type GOOGLE_SIGNUP', () => {
    const googleUser = {
      displayName,
      email,
      uid,
      photoURL
    };

    AppActions.googleSignup(googleUser);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.GOOGLE_SIGNUP,
      googleUser
    });
  });

  it('should dispatch a view action of type LOGOUT', () => {
    AppActions.logout();
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.LOGOUT,
    });
  });

  it('should dispatch a view action of type RECEIVE_USER', () => {
    AppActions.receiveUser(users);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_USER,
      users
    });
  });

  it('should dispatch a view action of type RESET_PASSWORD', () => {
    AppActions.resetPassword(email);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RESET_PASSWORD,
      email
    });
  });

  it('should dispatch a view action of type NOTIFICATIONS', () => {
    const userName = 'Ebuka';
    AppActions.getNotification(userName);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.NOTIFICATIONS,
      userName
    });
  });
});
