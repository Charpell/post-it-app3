import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GroupOptions from '../../components/Dashboard/GroupOptions'


describe('GroupOptions component', () => {
  it('It should render GroupOptions component', () => {
    const tree = renderer.create(<GroupOptions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

