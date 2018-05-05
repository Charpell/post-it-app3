import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Groups from '../../components/presentation/Groups';
import AppActions from '../../actions/AppActions';

jest.mock('../../../../../server/config', () => ({
}));
jest.mock('../../actions/AppActions');


const groups = [{ groupName: 'Andela' }];
const wrapper = mount(<Groups keyName={groups} />);

describe('Groups component', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<Groups keyName={groups} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });

  it('should have initial props in the component', () => {
    expect(wrapper.props().keyName).toEqual([{ groupName: 'Andela' }]);
  });
});

