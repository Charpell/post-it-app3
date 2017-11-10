import React, { Component } from 'react';

import Signin from './Signin';
import AppStore from './../../stores/AppStore';

/**
 * @description It renders the Home page Component
 *
 * @class Home
 *
 * @extends {Component}
 */
class Home extends Component {
   /**
   * @description Creates an instance of Home.
   * bind methods and set initial state.
	 *
   * @memberof Home
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: AppStore.getAuthenticatedState()
    };
    this.onChange = this.onChange.bind(this);
  }

/**
  * @method componentDidMount
  *
  * @description Adds an event Listener to the Store and fires when the
  * component is fully mounted.
  *
  * @return {void}
  *
  * @memberof Home
  */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }

/**
  * @method componentUnmount
  *
  * @description Removes event Listener from the Store
  * @return {void} void
  *
  * @memberof Home
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
   * @method setApp
   *
   * @description Monitors changes in the components and change the state
   * @return {void} void
   *
   * @memberof Home
   */
  onChange() {
    this.setState({
      isAuthenticated: AppStore.getAuthenticatedState()
    });
  }

  /**
	 * @description Render react component
	 *
	 * @memberof Home
	 *
	 * @return {jsx} rendered jsx element
	 */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="jumbotron">
              <h1 className="display-3">Welcome to PostIt</h1>
              <p className="lead">PostIt is a simple application that allows
                friends and colleagues create groups for notifications.</p>
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <div className="form-margin2">
              <Signin />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
