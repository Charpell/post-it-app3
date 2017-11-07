import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from '../../components/container/App';
import Footer from '../../components/presentation/Footer';
import Navigation from '../../components/presentation/Navigation';
import Routes from '../../components/presentation/Routes';
import Dashboard from '../../components/container/Dashboard'
import localStorageMock from '../../../../../mock/LocalStorageMock';
import AppStore from '../../stores/AppStore';

window.localStorage = localStorageMock;

jest.mock('../../../../../server/config', () => ({
}));

describe('App Component', () => {
    const newStateProperty = {
        isAuthenticated: true,
        userName: 'Ebuka'
    };

    const mock = jest.fn();
    const getAuthenticatedStateSpy = jest.spyOn(AppStore, 'getAuthenticatedState');
    const getLoggedInUserSpy = jest.spyOn(AppStore, 'getLoggedInUser');
    const wrapper = shallow(<App />);

    it('should contain a <Navigation /> component', () => {
        expect(wrapper.find(Navigation)).toHaveLength(1);
    });

    it('should contain a <Footer /> component', () => {
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    it('should contain a <Routes /> component', () => {
        expect(wrapper.find(Routes)).toHaveLength(1);
    });

    it('should return initial default state inside the component', () => {
        expect(wrapper.state().isAuthenticated).toEqual(false);
        expect(wrapper.state().userName.length).toEqual(0);
    });

    it('should update the state of the app when the user logs in', function () {
        const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
        wrapper.setState(newStateProperty);
        localStorage.setItem('user', JSON.stringify(newStateProperty.userName));
        expect(wrapper.state('isAuthenticated')).toEqual(true);
        expect(wrapper.state('userName')).toEqual('Ebuka');
        localStorage.setItem('user', JSON.stringify('Ebuka'));
    });

    it('should contain a <Dashboard /> component', () => {
        wrapper.setState(newStateProperty);
        expect(wrapper.find(Dashboard)).toHaveLength(1);
    });

    it('should have all the method in the component to be defined', () => {
        wrapper.instance().componentUnmount();
        wrapper.instance().onChange();
      });
    
    it('calls componentDidMount lifecycle method', () => {
        expect(getAuthenticatedStateSpy).toHaveBeenCalledTimes(2);
    });

});
