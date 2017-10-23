import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import AppStore from '../stores/AppStore'
import Navigation from './Navigation'
import Signin from './Signin'
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer'
import ResetPassword from './ResetPassword'
import GoogleWelcome from './GoogleWelcome'
import DashBoard from './Dashboard/Dashboard'
import SideBar from './Dashboard/SideBar'
import { firebase } from '../../../../server/config';


/**
 * @description Create a Route for users who have been isAuthenticatedenticated by firebase
 * 
 * @param {any} {component: Component, isAuthenticated, ...rest} 
 * 
 * @returns {void} void
 */
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}


/**
 * @description Route for users who aren't Authenticated
 * 
 * @param {any} {component: Component, isAuthenticated, ...rest} 
 * 
 * @returns {void} void
 */
function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}


/**
 * @description Route for rendering componets in the main App
 * 
 * @class Routes
 * 
 * @extends {Component}
 */
export default class Routes extends Component {

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

    )
  }
}
