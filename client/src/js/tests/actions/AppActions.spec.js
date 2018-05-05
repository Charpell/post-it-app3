import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import { message, userDetails, user, googleUser, users } from '../mocks/seeder';


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
    AppActions.registerUser(userDetails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SIGN_UP,
      userDetails
    });
  });


  it('should dispatch a view action of type SIGN_IN', () => {
    AppActions.loginUser(userDetails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SIGN_IN,
      userDetails
    });
  });

  it('should dispatch a view action of type RECEIVE_LOGIN', () => {
    AppActions.receiveLogin(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_LOGIN,
      user
    });
  });


  it('should dispatch a view action of type GOOGLE_LOGIN', () => {
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
    const numbers = ['2348045675987', '2348894675987'];
    AppActions.receiveNumber(numbers);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_NUMBERS,
      numbers
    });
  });

  it('should dispatch a view action of type RECEIVE_EMAILS', () => {
    const emails = ['John@gmai.com', 'Femi@gfm.com'];
    AppActions.receiveEmails(emails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_EMAILS,
      emails
    });
  });

  it('should dispatch a view action of type SEEN_MESSAGE', () => {
    AppActions.seenMessage(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SEEN_MESSAGE,
      user
    });
  });

  it('should dispatch a view action of type CREATE_GROUP', () => {
    const group = 'Andela';
    AppActions.createGroup(group);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.CREATE_GROUP,
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
    const notification = ['Ebuka posted in Andela group'];
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

  it('should dispatch a view action of type ADD_USER_TO_GROUP', () => {
    AppActions.addUserToGroup(userDetails);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.ADD_USER_TO_GROUP,
      userDetails
    });
  });

  it('should dispatch a view action of type POST_MESSAGE', () => {
    AppActions.postMessage(message);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.POST_MESSAGE,
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
    const group = 'Andela';
    AppActions.searchUserMessage(group);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SEARCH_USER_MESSAGE,
      group
    });
  });

  it('should dispatch a view action of type GOOGLE_SIGNUP', () => {
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
    const email = 'wes@jkf.com';
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
