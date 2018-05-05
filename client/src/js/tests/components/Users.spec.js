import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Users from '../../components/presentation/Users';

const allUsers = [{ userName: 'George' }];
const wrapper = mount(<Users keyName={allUsers} />);

describe('Users component', () => {
  it('should render as expected', () => {
    const tree = renderer.create(<Users keyName={allUsers} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should have initial props in the component', () => {
    expect(wrapper.props().keyName).toEqual([{ userName: 'George' }]);
  });

  it('should find all component rendered element', () => {
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
  });
});
