import * as AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

const test = {
  userName: 'Gideon',
  email: 'gideon@gmail.com',
  password: '123456',
  number: '1234567',
  groupName: 'Andela',
  message: 'This is a test message'
};

describe('AppActions', () => {
  let spyOnDispatcher;
  beforeEach(() => {
    jest.mock('axios');
    spyOnDispatcher = jest.spyOn(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    spyOnDispatcher.mockReset();
  });

  describe('#saveContact', () => {
    it('should dispatch #saveContact when called', () =>
    AppActions.saveContact(test)
    );
  });


  describe('#receiveContact', () => {
    it('should dispatch #receiveContact when called', () =>
    AppActions.receiveContact(test)
    );
  });

  describe('#receiveNumber', () => {
    it('should dispatch #receiveNumber when called', () =>
    AppActions.receiveNumber(test.number)
    );
  });

  describe('#seenMessage', () => {
    it('should dispatch #seenMessage when called', () =>
    AppActions.seenMessage(test.message)
    );
  });

  describe('#receiveSeenUsers', () => {
    it('should dispatch #receiveSeenUsers when called', () =>
    AppActions.receiveSeenUsers(test.userName)
    );
  });

  describe('#saveGroup', () => {
    it('should dispatch #saveGroup when called', () =>
    AppActions.saveGroup(test.groupName)
    );
  });

  describe('#getGroups', () => {
    it('should dispatch #getGroups when called', () =>
    AppActions.getGroups(test.groupName)
    );
  });

  describe('#receiveGroup', () => {
    it('should dispatch #receiveGroup when called', () =>
    AppActions.receiveGroup(test.groupName)
    );
  });

  describe('#receiveNotification', () => {
    it('should dispatch #receiveNotification when called', () =>
    AppActions.receiveNotification(test.message)
    );
  });

  describe('#receiveGroups', () => {
    it('should dispatch #receiveGroups when called', () =>
    AppActions.receiveGroups(test.groupName)
    );
  });

  describe('#saveGroupUser', () => {
    it('should dispatch #saveGroupUser when called', () =>
    AppActions.saveGroupUser(test.userName)
    );
  });

  describe('#saveMessage', () => {
    it('should dispatch #saveMessage when called', () =>
    AppActions.saveMessage(test.message)
    );
  });

  describe('#receiveMessages', () => {
    it('should dispatch #receiveMessages when called', () =>
    AppActions.receiveMessages(test.message)
    );
  });

  describe('#login', () => {
    it('should dispatch #login when called', () =>
    AppActions.login(test.contact)
    );
  });

  describe('#receiveLogin', () => {
    it('should dispatch #receiveLogin when called', () =>
    AppActions.receiveLogin(test.userName)
    );
  });

  describe('#receiveLogin', () => {
    it('should dispatch #receiveLogin when called', () =>
    AppActions.receiveLogin(test.userName)
    );
  });

  describe('#searchUserMessage', () => {
    it('should dispatch #searchUserMessage when called', () =>
    AppActions.searchUserMessage(test.userName)
    );
  });

  describe('#google', () => {
    it('should dispatch #google when called', () =>
    AppActions.google(test)
    );
  });

  describe('#googleSignup', () => {
    it('should dispatch #googleSignup when called', () =>
    AppActions.googleSignup(test)
    );
  });

  describe('#logout', () => {
    it('should dispatch #logout when called', () =>
    AppActions.logout()
    );
  });

  describe('#receiveUser', () => {
    it('should dispatch #receiveUser when called', () =>
    AppActions.receiveUser(test.userName)
    );
  });

  describe('#receiveEmails', () => {
    it('should dispatch #receiveEmails when called', () =>
    AppActions.receiveEmails(test.email)
    );
  });

  describe('#receiveNumbers', () => {
    it('should dispatch #receiveNumbers when called', () =>
    AppActions.receiveNumbers(test.number)
    );
  });

  describe('#displayName', () => {
    it('should dispatch #displayName when called', () =>
    AppActions.displayName(test.userName)
    );
  });

  describe('#getNotification', () => {
    it('should dispatch #getNotification when called', () =>
    AppActions.getNotification(test.message)
    );
  });

  describe('#resetPassword', () => {
    it('should dispatch #resetPassword when called', () =>
    AppActions.resetPassword(test.email)
    );
  });  
});
