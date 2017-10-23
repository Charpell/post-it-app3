import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ResetPassword from '../../components/ResetPassword'
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
  it('It should ResetPassword Home component', () => {
    const tree = renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
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
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<ResetPassword />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().handleSubmit(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

});

