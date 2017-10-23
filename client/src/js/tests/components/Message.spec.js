import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Message from '../../components/Dashboard/Message'
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

describe('Message component', () => {
  it('It should render Message component', () => {
    const tree = renderer.create(<Message />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('It should display the necessary elements', () => {
    const wrapper = shallow(<Message />);
    wrapper.instance().componentWillMount();
    wrapper.instance().componentWillUnmount();
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

  it('It should expect handleSeenMessage AppAction to be called', () => {
    const spyOnDispatcher = spyOn(AppActions, 'seenMessage');
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<Message />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().handleSeenMessage(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

});

