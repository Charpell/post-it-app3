import AppStore from '../../stores/AppStore';
import AppConstants from '../../constants/AppConstants';
import AppDispatcher from '../../dispatcher/AppDispatcher';


let spyOnDispatcher;
beforeEach(() => {
  jest.mock('axios');
  spyOnDispatcher = jest.spyOn(AppDispatcher, 'dispatch');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

jest.mock('../../dispatcher/AppDispatcher');
const mockCall = AppDispatcher.register.mock.calls[0][0];


describe('PostIt Store', () => {
  const message = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.SAVE_MESSAGE,
      actionType: {
        user: 'Ebuka',
        group: 'Andela',
        message: 'I am a message',
        time: '12.59pm',
        notification: 'Ebuka posted in Andela Group',
        priority: 'Normal'
      },
    },
  };
  it('should successfully call post message on SAVE_MESSAGE', () => {
    mockCall(message);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});
