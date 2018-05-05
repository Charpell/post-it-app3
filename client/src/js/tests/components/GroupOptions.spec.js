import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import GroupOptions from '../../components/presentation/GroupOptions';

const allGroups = [{ groupName: 'Andela' }];
const wrapper = mount(<GroupOptions keyName={allGroups} />);


describe('GroupOptions component', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<GroupOptions keyName={allGroups} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have an initial props in the component', () => {
    expect(wrapper.props().keyName).toEqual([{ groupName: 'Andela' }]);
  });
});

