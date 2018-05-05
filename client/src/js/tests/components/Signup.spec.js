import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Signup from '../../components/container/Signup';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import { event } from '../mocks/seeder';

jest.mock('../../../../../server/config', () => ({
}));
jest.mock('../../actions/AppActions');


let spyOnDispatcher;
beforeEach(() => {
  spyOnDispatcher = spyOn(AppActions, 'registerUser');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

const registerUserSpy = jest.spyOn(AppActions, 'registerUser');
const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');


describe('Signup Component', () => {
  const wrapper = mount(<Signup />);
  it('should have an empty initial state in the component ', () => {
    expect(wrapper.state().emails).toHaveLength(0);
    expect(wrapper.state().contacts).toEqual([]);
    expect(wrapper.state().databaseUsers).toEqual([]);
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().numbers).toHaveLength(0);
    expect(wrapper.state().googleUser).toEqual(null);
    expect(wrapper.state().username).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().number).toEqual('');
    expect(wrapper.state().username).toEqual('');
  });

  it('should have all the method in the component to be defined', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().onChange();
    wrapper.instance().handleSubmit(event);
    wrapper.instance().handleChange(event);
  });

  it('should have all the method in the component to be defined', () => {
    expect(wrapper.find('div')).toHaveLength(11);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should sign up a user', () => {
    wrapper.setState({
      username: 'John',
      number: '234806609875564',
      email: 'testemail@email.com',
      password: '123456',
      verifyPassword: '123456'
    });
    wrapper.find('form').simulate('submit');
    expect(spyOnDispatcher).toHaveBeenCalledTimes(1);
  });

  it('should call componentDidMount lifecycle', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });
});
