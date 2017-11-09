import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import toastr from 'toastr';

import GoogleWelcome from '../../components/container/GoogleWelcome'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore';

jest.mock('../../../../../server/config', () => ({
}));
jest.mock('../../actions/AppActions');

const googleDetail = {
  displayName: 'Kate',
  email: 'kate@gmail.com',
  number: 2348900839454,
  uid: 23489008394542348900839454
}

jest.spyOn(AppStore, 'getGoogleSignup').mockReturnValue(googleDetail)


let spyOnDispatcher;
  beforeEach(() => {
  spyOnDispatcher = spyOn(AppActions, 'googleSignup');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

const wrapper = mount(<GoogleWelcome />);
describe('GoogleWelcome Component', () => {

it('should have initial state inside the component', () => {
  expect(wrapper.state().databaseUsers).toEqual([]);
  expect(wrapper.state().numbers).toEqual([]);
  expect(wrapper.state().number).toEqual('');
  expect(wrapper.state().googleDetail).toEqual(googleDetail);
})


it('should contain defined methods', () => {
  expect(wrapper.node.handleChange).toBeDefined()
  expect(wrapper.node.onChange).toBeDefined()
  expect(wrapper.node.handleSubmit).toBeDefined()
  wrapper.instance().componentDidMount();
  wrapper.instance().componentUnmount();
  wrapper.instance().onChange();  
});

it('It should display the necessary elements', () => {
  expect(wrapper.find('div').length).toBe(3);
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('input').length).toBe(1);
});

it('should not call an action if the number already exist', () => {
  const event = {
    target: {
      name: 'name',
      value: 'value',
    },
    preventDefault: () => jest.fn(),
    toastr: () => jest.fn()
  };
  const wrapper = shallow(<GoogleWelcome />);
  wrapper.instance().handleSubmit(event);
  wrapper.setState({ numbers: [3348900839454, 3248900839454] });
  wrapper.setState({ number: 3348900839454 });
});

it('should expect googleSignin Action to be called', () => {
  const event = {
    target: {
      name: 'name',
      value: 'value',
    },
    preventDefault: () => jest.fn()
  };
  const wrapper = shallow(<GoogleWelcome />);
  wrapper.instance().handleSubmit(event);
  expect(spyOnDispatcher).toHaveBeenCalled();
});
});
