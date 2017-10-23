import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SideBar from '../../components/Dashboard/SideBar'
import AppActions from '../../actions/AppActions'

jest.mock('../../../../../server/config', () => ({
  }));
jest.mock('../../actions/AppActions');


let spyOnDispatcher;
beforeEach(() => {
    spyOnDispatcher = spyOn(AppActions, 'getGroups');
});

afterEach(() => {
    spyOnDispatcher.mockReset();
});

describe('SideBar Component', () => {
  it('It should render SideBar omponent', () => {
    const tree = renderer.create(<SideBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    const wrapper = mount(<SideBar />);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

it('It should expect getGroups Action to be called', () => {
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<SideBar />);
    wrapper.instance().refs.email.value = 'someemail@email.com';
    expect(spyOnDispatcher).toHaveBeenCalled();
});


});
