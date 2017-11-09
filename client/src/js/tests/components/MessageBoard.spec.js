import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import MessageBoard from '../../components/container/MessageBoard';
import AppStore from '../../stores/AppStore';
import localStorageMock from '../../../../../mock/LocalStorageMock';

window.localStorage = localStorageMock;

const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');


describe('MessageBoard component', () => {
  it('should render MessageBoard component', () => {
    const tree = renderer.create(<MessageBoard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const wrapper = mount(<MessageBoard />);

  it('should find all component rendered element', () => {
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('input').length).toBe(1)
  });

  it('should have an empty initial state as the component ', () => {
    expect(wrapper.state().messages).toHaveLength(0);
    expect(wrapper.state().currentGroup).toEqual('');
  });

  it('should call componentDidMount lifecycle', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });

  it('should have all the method in the component to be defined', () => {
    const event = {
      target: {
        name: 'name',
        value: 'value',
      },
      preventDefault: () => jest.fn()
    };
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().onChange();
    // wrapper.instance().sendMessage(event);
  });

});

