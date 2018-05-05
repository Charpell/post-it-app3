import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import GoogleButton from 'react-google-button';


import Signin from '../../components/container/Signin';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Input from '../../components/presentation/Input.jsx';
import firebase from '../../../../../server/config';
import { event } from '../mocks/seeder';


jest.mock('../../../../../server/config', () => {
/**
 * @description describes a function that mocks firebase module,
 * fires it action to make an Api call, returns a promise that is mocked
 *
 * @param {void} void takes no parameter
 *
 * @return {Object} mockfirebase object
 *
 * @function Test
 */
  function Test() {

  }
  const mockFirebase = jest.fn().mockReturnValue({
    signInWithPopup: jest.fn().mockReturnValue(Promise.resolve({
      googleUser: 'testUser'
    }))
  });
  Test.prototype.addScope = jest.fn();
  mockFirebase.GoogleAuthProvider = Test;
  return {
    auth: mockFirebase,
  };
});

const googleSpy = jest.spyOn(AppActions, 'googleLogin');
const loginUserSpy = jest.spyOn(AppActions, 'loginUser');
const getGoogleSignupSpy = jest.spyOn(AppStore, 'getGoogleSignup');
const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');


describe('Signin Component', () => {
  const wrapper = mount(<Signin />);
  it('should have an empty initial state as the component ', () => {
    expect(wrapper.state().emails).toHaveLength(0);
    expect(wrapper.state().googleComponent).toEqual(false);
    expect(wrapper.state().googleUser).toEqual(null);
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });

  it('should have all the method in the component to be defined', () => {
    expect(wrapper.node.handleChange).toBeDefined();
    expect(wrapper.node.handleSubmit).toBeDefined();
    expect(wrapper.node.handleGoogleSignin).toBeDefined();
    expect(wrapper.node.onChange).toBeDefined();
  });

  it('should sign in a validated user', () => {
    wrapper.setState({
      email: 'testemail@email.com',
      password: 'test'
    });
    wrapper.find('form').simulate('submit');
    expect(loginUserSpy).toHaveBeenCalledTimes(1);
  });

  it('should call componentDidMount lifecycle', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });

  it('should find all component rendered element', () => {
    expect(wrapper.find(GoogleButton)).toHaveLength(1);
    expect(wrapper.find('Input').length).toEqual(2);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('expects the following functions defined', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().handleSubmit(event);
    wrapper.instance().onChange();
  });
});
