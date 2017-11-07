import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Navigation from '../../components/presentation/Navigation'

describe('Navigation Component', () => {
  
  const wrapper = mount(<MemoryRouter><Navigation /></MemoryRouter>);
  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('a').length).toBe(2);
  });
});
