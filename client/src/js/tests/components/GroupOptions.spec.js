import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import GroupOptions from '../../components/presentation/GroupOptions';
import groups from './../_mocks_/groups';

const allGroups = [{ groupName: 'Andela' }];
const wrapper = mount(<GroupOptions keyName={allGroups} />)


describe('GroupOptions component', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<GroupOptions keyName={allGroups} />).toJSON();
    expect(tree).toMatchSnapshot();
  });   

  it('should have an initial props in the component', () => {
    expect(wrapper.props().keyName).toEqual([{ groupName: 'Andela' }])
  });   
});

