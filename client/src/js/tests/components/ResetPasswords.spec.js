import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ResetPassword from '../../components/container/ResetPassword'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
}));
jest.mock('../../actions/AppActions');

let spyOnDispatcher;
beforeEach(() => {
  spyOnDispatcher = jest.spyOn(AppActions, 'resetPassword');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

describe('ResetPassword component', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have an empty initial state in the component ', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper.state().email).toEqual('');
  });


  it('should display the necessary elements', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
  });

  it('should expect resetPassword Action to be called', () => {
    const spyOnDispatcher = spyOn(AppActions, 'resetPassword');
    const event = {
      target: {
        email: 'name@gmail.com',
      },
      preventDefault: () => jest.fn()
    };
    const wrapper = shallow(<ResetPassword />);
    wrapper.instance().handleSubmit(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
  });
});

