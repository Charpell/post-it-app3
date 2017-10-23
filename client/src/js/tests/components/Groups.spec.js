import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Groups from '../../components/Dashboard/Groups'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
  }));
jest.mock('../../actions/AppActions');

let spyOnDispatcher;
beforeEach(() => {
spyOnDispatcher = jest.spyOn(AppActions, 'searchUserMessage');
});

afterEach(() => {
spyOnDispatcher.mockReset();
});

describe('Groups component', () => {
  it('It should render Groups component', () => {
    const tree = renderer.create(<Groups />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('It should display the necessary elements', () => {
    const wrapper = shallow(<Groups />);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

  it('It should expect searchUserMessage Action to be called', () => {
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<Groups />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().onClick(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

});

