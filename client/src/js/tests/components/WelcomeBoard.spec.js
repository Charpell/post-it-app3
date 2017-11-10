import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeBoard from '../../components/presentation/WelcomeBoard';


describe('WelcomeBoard component', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<WelcomeBoard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
