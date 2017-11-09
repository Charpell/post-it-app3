import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Dashboard from '../../components/container/Dashboard';
import DashboardNavigation from
'../../components/container/DashboardNavigation';
import MessageBoard from '../../components/container/MessageBoard';
import SideBar from '../../components/presentation/SideBar';
import WelcomeBoard from '../../components/presentation/WelcomeBoard';
import localStorageMock from '../../../../../mock/LocalStorageMock';

window.localStorage = localStorageMock;

jest.mock('../../../../../server/config', () => ({
}));

jest.mock('../../stores/AppStore');


const mock = jest.fn();


describe('Dashboard Component', () => {
  const newStateProperty = {
    user: 'Ebuka',
    allUsers: ['John', 'August'],
    groups: ['Andela', 'BookStore'],
    currentGroup: 'Andela',
    databaseUsers: ['James', 'August'],
    notification: ['James posted in Andela Group']
  };

  const wrapper = shallow(<Dashboard />);

  it('should contain a <WelcomeBoard /> component', () => {
    expect(wrapper.find(WelcomeBoard)).toHaveLength(1);
  });

  it('should contain a <SideBar /> component', () => {
    expect(wrapper.find(SideBar)).toHaveLength(1);
  });

  it('should contain a <DashboardNavigation /> component', () => {
    expect(wrapper.find(DashboardNavigation)).toHaveLength(1);
  });

  it('should return initial default state inside the component', () => {
    expect(wrapper.state().allUsers.length).toEqual(0);
    expect(wrapper.state().currentGroup).toEqual('');
    expect(wrapper.state().groups.length).toEqual(0);
    expect(wrapper.state().notification.length).toEqual(0);
  });

  it('should contain a new state when the store has updated',
    () => {
      wrapper.setState(newStateProperty);
      expect(wrapper.state('user')).toEqual('Ebuka');
      expect(wrapper.state().currentGroup).toEqual('Andela');
      expect(wrapper.state().groups.length).toEqual(2);
      expect(wrapper.state().notification.length).toEqual(1);
      expect(wrapper.find(MessageBoard)).toHaveLength(1);
    });

  it('expects the following functions to be defined', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().onChange();
  });
});
