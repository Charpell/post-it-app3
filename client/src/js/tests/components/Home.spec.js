import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Home from '../../components/Home'
import Signin from '../../components/Signin'

jest.mock('../../../../../server/config', () => ({
  }));

describe('Home', () => {
  it('It should render Home component', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});