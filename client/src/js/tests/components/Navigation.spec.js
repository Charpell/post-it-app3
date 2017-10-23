import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Navigation from '../../components/Navigation'


jest.mock('../../../../../server/config', () => ({
  }));


describe('Navigation Component', () => {
  it('It should Navigation Home component', () => {
    const tree = renderer.create(<Navigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    const wrapper = mount(<Navigation />);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

});
