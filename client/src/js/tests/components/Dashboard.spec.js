import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Dashboard from '../../components/Dashboard/Dashboard'


jest.mock('../../../../../server/config', () => ({
  }));


describe('Dashboard Component', () => {
  it('About component should render as expected', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    const wrapper = shallow(<Dashboard />);
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

it('It should call onChange method', () => {
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
      };
    const wrapper = mount(<Dashboard />);
    wrapper.instance().onChange(event);
});

});
