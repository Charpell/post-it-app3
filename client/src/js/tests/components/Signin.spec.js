import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Signin from '../../components/Signin'
import GoogleWelcome from '../../components/GoogleWelcome'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
    provider: {
        addScope: jest.fn()
    },
    firebase: {
        auth: () => {
            return {
                signInWithPopup: () => (
                    Promise.resolve()
                )
            }
        }
    }
  }));
jest.mock('../../actions/AppActions');


let spyOnDispatcher;
beforeEach(() => {

});

afterEach(() => {
spyOnDispatcher.mockReset();
});

describe('Signin Component', () => {
  it('It should expect Signin Component to render ', () => {
    const tree = renderer.create(<Signin />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    const wrapper = mount(<Signin />);
    wrapper.instance().componentWillUnmount();
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
    expect(wrapper.find(GoogleWelcome)).to.have.length(1);
});

it('It should expect login Action to be called', () => {
    const spyOnDispatcher = spyOn(AppActions, 'login');
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<Signin />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().handleSubmit(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

it('It should expect receivelogin Action to be called', () => {
    const spyOnDispatcher = spyOn(AppActions, 'google');
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<Signin />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().handleGoogleSignin(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

});
