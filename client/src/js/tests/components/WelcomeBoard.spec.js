import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import WelcomeBoard from '../../components/Dashboard/WelcomeBoard'


describe('WelcomeBoard component', () => {
  it('WelcomeBoard component should render as expected', () => {
    const tree = renderer.create(<WelcomeBoard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});