import React from 'react';
import { mount, shallow } from 'enzyme';

import DashboardNavigation from
'../../components/container/DashboardNavigation';
import GroupOptions from './../../components/presentation/GroupOptions';
import ModalButton from '../../components/presentation/ModalButton';
import localStorageMock from '../../../../../mock/LocalStorageMock';

window.localStorage = localStorageMock;

describe('DashBoardNavigation.js', () => {
  const props = {
    group: [{ groupName: 'Andela' }],
    allUsers: ['George', 'Phil', 'Odim'],
    notification: ['George has posted in Green group'],
    userName: 'George'
  };

  const wrapper = mount(<DashboardNavigation {...props}/>);

  it('should have initial state inside the component', () => {
    expect(wrapper.state().createGroupModal).toEqual(false);
    expect(wrapper.state().addUserModal).toEqual(false);
    expect(wrapper.state().notificationModal).toEqual(false);
    expect(wrapper.state().groupName).toEqual('');
    expect(wrapper.state().userName).toEqual('');
    expect(wrapper.state().users).toEqual([]);
  });


  it('should have initial props in the component', () => {
    expect(wrapper.props().group).toEqual([{ groupName: 'Andela' }]);
    expect(wrapper.props().allUsers).toEqual(['George', 'Phil', 'Odim']);
    expect(wrapper.props().notification)
    .toEqual(['George has posted in Green group']);
    expect(wrapper.props().userName).toEqual('George');
  });

  it('should expect modals to be in the component', () => {
    expect(wrapper.node.openModalUsers).toBeDefined();
    expect(wrapper.node.closeModalUsers).toBeDefined();
    expect(wrapper.node.openModalGroup).toBeDefined();
    expect(wrapper.node.closeModalGroup).toBeDefined();
    expect(wrapper.node.openModalNotification).toBeDefined();
    expect(wrapper.node.closeModalNotification).toBeDefined();
    expect(wrapper.node.addUser).toBeDefined();
    expect(wrapper.node.createGroup).toBeDefined();
    expect(wrapper.node.logout).toBeDefined();
    expect(wrapper.node.handleNotificationButton).toBeDefined();
    expect(wrapper.node.handleAddUserButton).toBeDefined();
  });

  it('should have all the method in the component defined', () => {
    const event = {
      target: {
        name: 'name',
        value: 'value',
      },
      preventDefault: () => jest.fn()
    };
    wrapper.instance().openModalGroup();
    wrapper.instance().closeModalGroup();
    wrapper.instance().openModalUsers();
    wrapper.instance().closeModalUsers();
    wrapper.instance().openModalNotification();
    wrapper.instance().closeModalNotification();
    wrapper.instance().createGroup(event);
    wrapper.instance().addUser(event);
    wrapper.instance().handleAddUserButton();
    wrapper.instance().handleNotificationButton();
    wrapper.instance().logout(event);
  });


  it('should be able to change state when an action is triggered', () => {
    const newStateProperty = {
      createGroupModal: true,
      addUserModal: true,
      notificationModal: true,
      groupName: 'Pie',
      userName: 'George',
      users: ['Luke', 'John']
    };

    wrapper.setState(newStateProperty);
    expect(wrapper.state().createGroupModal).toEqual(true);
    expect(wrapper.state().addUserModal).toEqual(true);
    expect(wrapper.state().notificationModal).toEqual(true);
    expect(wrapper.state().groupName).toEqual('Pie');
    expect(wrapper.state().userName).toEqual('George');
    expect(wrapper.state().users).toEqual(['Luke', 'John']);
  });


  it('should contain 4 <ModalButton /> component', () => {
    const component = shallow(<DashboardNavigation {...props}/>);
    const modalButtons = component.find('ModalButton');
    expect(modalButtons).toHaveLength(4);
  });
});
