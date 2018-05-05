import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Home from '../../components/container/Home';
import Signin from '../../components/container/Signin';

jest.mock('../../../../../server/config', () => ({
}));

describe('Home', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const wrapper = mount(<Home />);

  it('should contain a <Signin /> component', () => {
    expect(wrapper.find(Signin)).toHaveLength(1);
  });

  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(15);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('a').length).toBe(2);
  });

  it('expects the following functions defined', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().onChange();
  });
});
