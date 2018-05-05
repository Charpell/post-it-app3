import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Signin from '../container/Signin';
import Signup from '../container/Signup';
import Home from '../container/Home';
import ResetPassword from '../container/ResetPassword';
import GoogleWelcome from '../container/GoogleWelcome';
import DashBoard from '../container/Dashboard';
import SideBar from './SideBar';


/**
 * @description Create a Route for users who have been
 * isAuthenticatedenticated by firebase
 *
 * @param {any} {component: Component, isAuthenticated, ...rest}
 *
 * @returns {void} void
 */
const PrivateRoute = ({ component: Component, isAuthenticated }) =>
  (<Route
      render={props => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />);


/**
 * @description Route for users who aren't Authenticated
 *
 * @param {any} {component: Component, isAuthenticated, ...rest}
 *
 * @returns {void} void
 */
const PublicRoute = ({ component: Component, isAuthenticated }) =>
  (<Route
      render={props => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />);


/**
 * @description Route for rendering componets in the main App
 *
 * @class Routes
 *
 * @extends {Component}
 */
export default class Routes extends Component {
/**
	 * @description Render react component
	 *
	 * @memberof Signup
	 *
	 */
  render() {
    return (
      <div>
        <div className="row">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route isAuthenticated={this.props.isAuthenticated}
              path='/login' component={Signin} />
            <PublicRoute isAuthenticated={this.props.isAuthenticated}
              path='/register' component={Signup} />
            <PrivateRoute isAuthenticated={this.props.isAuthenticated}
              path='/dashboard' component={DashBoard} />
            <Route isAuthenticated={this.props.isAuthenticated}
              path='/reset' component={ResetPassword} />
            <Route isAuthenticated={this.props.isAuthenticated}
              path='/google' component={GoogleWelcome} />
            <PrivateRoute isAuthenticated={this.props.isAuthenticated}
              path='/sidebar' component={SideBar} />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </div>

    );
  }
}
