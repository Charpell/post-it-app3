import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Dashboard from '../../components/container/Dashboard';
import DashboardNavigation from '../../components/container/DashboardNavigation';
import MessageBoard from '../../components/container/MessageBoard';
import SideBar from '../../components/presentation/SideBar';
import WelcomeBoard from '../../components/presentation/WelcomeBoard';
import localStorageMock from '../../../../../mock/LocalStorageMock';
import AppStore from '../../stores/AppStore';

window.localStorage = localStorageMock;

jest.mock('../../../../../server/config', () => ({
}));

jest.mock('../../stores/AppStore');


const mock = jest.fn();
const getAuthenticatedStateSpy = jest.spyOn(AppStore, 'getUser');




describe('Dashboard Component', () => {
  const newStateProperty = {
    user: 'Ebuka',
    allUsers: ['John', 'August'],
    groups: ['Andela', 'BookStore'],
    currentGroup: 'Andela',
    databaseUsers: ['James', 'August'],
    notification: ['James posted in Andela Group']
  };

  it('should contain a <WelcomeBoard /> component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(WelcomeBoard)).toHaveLength(1);
  });

  it('should contain a <SideBar /> component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(SideBar)).toHaveLength(1);
  });

  // it('should contain a <MessageBoard /> component', () => {
  //   const wrapper = mount(<MemoryRouter><Dashboard/></MemoryRouter>);
  //   expect(wrapper.find(MessageBoard)).toHaveLength(1);
  // });

  it('should contain a <DashboardNavigation /> component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(DashboardNavigation)).toHaveLength(1);
  });

  it('should return initial default state inside the component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.state().user).toEqual('');
    expect(wrapper.state().allUsers.length).toEqual(0);
    expect(wrapper.state().currentGroup).toEqual('');
    expect(wrapper.state().databaseUsers.length).toEqual(0);
    expect(wrapper.state().groups.length).toEqual(0);
    expect(wrapper.state().notification.length).toEqual(0);
  });

  it('should contain a new state when the store has updated',
    () => {
      const wrapper = shallow(<Dashboard />);
      wrapper.setState(newStateProperty);
      expect(wrapper.state('user')).toEqual('Ebuka');
      expect(wrapper.state().allUsers.length).toEqual(2);
      expect(wrapper.state().currentGroup).toEqual('Andela');
      expect(wrapper.state().databaseUsers.length).toEqual(2);
      expect(wrapper.state().groups.length).toEqual(2);
      expect(wrapper.state().notification.length).toEqual(1);
      expect(wrapper.find(MessageBoard)).toHaveLength(1);
    });
});
