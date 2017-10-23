import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GoogleWelcome from '../../components/GoogleWelcome'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
  }));
jest.mock('../../actions/AppActions');


let spyOnDispatcher;
beforeEach(() => {
    spyOnDispatcher = spyOn(AppActions, 'googleSignup');
});

afterEach(() => {
    spyOnDispatcher.mockReset();
});

describe('GoogleWelcome Component', () => {
  it('About component should render as expected', () => {
    const tree = renderer.create(<GoogleWelcome />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('It should display the necessary elements', () => {
    const wrapper = shallow(<GoogleWelcome />);
    wrapper.instance().componentUnmount();
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

it('It should expect googleSignin Action to be called', () => {
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<GoogleWelcome />);
    wrapper.instance().handleSubmit(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});


});
