import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import DashboardNavigation from '../../components/Dashboard/DashboardNavigation'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
  }));
jest.mock('../../actions/AppActions');

let spyOnDispatcher;
beforeEach(() => {
  spyOnDispatcher = spyOn(AppActions, 'saveGroup');
});

afterEach(() => {
spyOnDispatcher.mockReset();
});

describe('DashboardNavigation component', () => {
  it('DashboardNavigation component should render as expected', () => {
    const tree = renderer.create(<DashboardNavigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('It should display the necessary elements', () => {
    const wrapper = shallow(<DashboardNavigation />);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

  it('It should expect saveGroup Action to be called', () => {
    const spyOnDispatcher = spyOn(AppActions, 'saveGroup');
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
      };
    const wrapper = mount(<DashboardNavigation />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    wrapper.instance().handleSubmit(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

it('It should expect logout Action to be called', () => {
  const spyOnDispatcher = spyOn(AppActions, 'logout');
  const wrapper = mount(<DashboardNavigation />);
  expect(spyOnDispatcher).toHaveBeenCalled();
});

});

