import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Board from '../../components/Dashboard/Board';
import LocalStorageMock from '../../../../../mock/LocalStorageMock'


describe('Board component', () => {
  it('About component should render as expected', () => {
    const tree = renderer.create(<Board />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the necessary elements', () => {
    const wrapper = shallow(<Board />);
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('br').length).toBe(3);
});

  it('It should expect AppAction to be called', () => {
    const spyOnDispatcher = spyOn(AppActions, 'saveMessage');
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
        preventDefault: () => jest.fn()
      };
    const wrapper = mount(<Board />);
    wrapper.instance().sendMessage(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
});

it('It should call onChange method', () => {
    const event = {
        target: {
          name: 'name',
          value: 'value',
        },
      };
    const wrapper = mount(<Board />);
    wrapper.instance().onChange(event);
});

});