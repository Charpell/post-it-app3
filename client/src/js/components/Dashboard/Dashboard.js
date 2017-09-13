import React, { Component } from 'react';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions'
import NavDash from './NavDash';
import DashboardNavigation from './DashboardNavigation'
import SideBar from './SideBar';
import MessageBoard from './MessageBoard'
import Welcome from '../Welcome'


import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


/**
 * Creates a react Component
 * 
 * @export
 * @class DashBoard
 * @extends {Component}
 */
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      user: AppStore.getUser(),
      contacts: AppStore.getGroupUsers(),
      groups: AppStore.getGroups(),
      currentGroup: AppStore.getCurrentGroup(),
      databaseUsers: AppStore.getdatabaseUsers(),
      notification: AppStore.getNotification()
    };
    this.onChange = this.onChange.bind(this)
  }


  /**
   * @method componentWillMount
   * Adds an event Listener to the Store and fires when the component is fully mounted.
   *
   * @return {void}
   * @memberof DashBoard
   */
  componentDidMount() {
    let userName = JSON.parse(localStorage.getItem('user'));
    AppActions.getGroups(userName)
    AppStore.addChangeListener(this.onChange);
  }


  /**
   * @method componentWillUnmount
   * Removes event Listener from the Store
   *
   * @return {void}
   * @memberof DashBoard
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }



  /**
   * @method render
   * Render react component
   * 
   * @returns {void}
   * @memberof DashBoard
   */
  render() {
    return (
      <div>
        <div className="nav-side-menu">
          <div className="brand">PostIt</div>
          <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
          <div className="menu-list">

            <ul id="menu-content" className="menu-content collapse out">

              <li className="collapsed active">
                <a href="#">
                  <i className="fa fa-dashboard fa-lg"></i>&nbsp; Ebuka @ Andela group
                     </a>
              </li>
              <br/>

              <DashboardNavigation
                contact={this.state.contacts}
                group={this.state.groups}
                user={this.state.user}
                databaseUsers={this.state.databaseUsers}
                notification={this.state.notification}
              />
              <br/>




              <ul className="sub-menu collapse" id="service">
                <li>New Service 1</li>
                <li>New Service 2</li>
                <li>New Service 3</li>
                <li>New Service 1</li>
                <li>New Service 2</li>
                <li>New Service 3</li>
                <li>New Service 1</li>
                <li>New Service 2</li>
                <li>New Service 3</li>
                <li>New Service 1</li>
                <li>New Service 2</li>
                <li>New Service 3</li>
              </ul>

              <li>
                <a href="#">
                  <i className="fa fa-user fa-lg"></i>&nbsp; Groups
                     </a>
              </li>

              <SideBar />

              <li data-toggle="collapse" data-target="#new" className="collapsed">
                <a href="#"><i className="fa fa-car fa-lg"></i> New <span className="arrow"></span></a>
              </li>
              <ul className="sub-menu collapse" id="new">
                <li>New New 1</li>
                <li>New New 2</li>
                <li>New New 3</li>
              </ul>





              <li>
                <a href="#">
                  <i className="fa fa-users fa-lg"></i> Users
                     </a>
              </li>


            </ul>

          </div>
        </div>


        <div className="container" id="main">
          <div className="row">
            <div className="col-md-12">
              <h4>This is suppose to be in the main content</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }


  /**
   * @method setDashboard
   * Monitors changes in the components and change the state
   * 
   * @return {void}
   * @memberof DashBoard
   */
  onChange() {
    this.setState({
      contacts: AppStore.getGroupUsers(),
      groups: AppStore.getGroups(),
      user: AppStore.getUser(),
      currentGroup: AppStore.getCurrentGroup(),
      databaseUsers: AppStore.getdatabaseUsers(),
      notification: AppStore.getNotification(),
    });

  }
}

