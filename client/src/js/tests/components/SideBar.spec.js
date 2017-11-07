import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SideBar from '../../components/presentation/SideBar';
import localStorageMock from '../../../../../mock/LocalStorageMock';
import AppStore from '../../stores/AppStore';

window.localStorage = localStorageMock;

jest.mock('../../../../../server/config', () => ({
  }));

describe('SideBar Component', () => {
  localStorage.setItem('user', JSON.stringify('Ebuka')); 
  const props = {
    group: [{ groupName: 'Andela' }],
    contact: ['George', 'Phil', 'Odim'],
    currentGroup: 'Andela',
    user: JSON.parse(localStorage.getItem('user'))
  }


  const wrapper = mount( <SideBar {...props} />);

  it('should display the necessary elements', () => {    
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('a').length).toBe(6);
    expect(wrapper.find('br').length).toBe(2);
  });

  it('should have initial props in the component', () => {    
    expect(wrapper.props().group).toEqual([{ groupName: 'Andela' }])
    expect(wrapper.props().contact).toEqual([ 'George', 'Phil', 'Odim' ])
    expect(wrapper.props().currentGroup).toEqual('Andela')
    expect(wrapper.props().user).toEqual('Ebuka')
  });
});
