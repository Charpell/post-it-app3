import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Signup from '../../components/Signup'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
  }));
jest.mock('../../actions/AppActions');


let spyOnDispatcher;
beforeEach(() => {
    spyOnDispatcher = spyOn(AppActions, 'saveContact');
});

afterEach(() => {
    spyOnDispatcher.mockReset();
});

describe('Signup Component', () => {
  it('Signup component should render as expected', () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    const wrapper = mount(<Signup />);
    wrapper.instance().componentWillUnmount();
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

it('should expect saveContact Action to be called', () => {
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<Signup />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().handleSubmit(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});


});
