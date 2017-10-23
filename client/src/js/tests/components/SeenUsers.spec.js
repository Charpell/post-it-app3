import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SeenUsers from '../../components/Dashboard/SeenUsers'


describe('SeenUsers component', () => {
  it('SeenUsers component should render as expected', () => {
    const tree = renderer.create(<SeenUsers />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

