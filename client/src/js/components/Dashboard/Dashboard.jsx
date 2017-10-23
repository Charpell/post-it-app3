import React, { Component } from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions'
import DashboardNavigation from './DashboardNavigation'
import SideBar from './SideBar';
import Board from './Board'
import WelcomeBoard from './WelcomeBoard'


/**
 * @description Creates a react Component
 * 
 * @export
 * 
 * @class DashBoard
 * 
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
   * 
   * Adds an event Listener to the Store and fires when the component is fully mounted.
   *
   * @return {void}
   * 
   * @memberof DashBoard
   */
  componentDidMount() {
    if (!localStorage.takenTour) {
      const timeout = setTimeout(() => {
        introJs().start()
        clearTimeout(timeout);
      }, 3000);
      localStorage.setItem('takenTour', true);
    }

    AppStore.addChangeListener(this.onChange);
  }


  /**
   * @method componentWillUnmount
   * 
   * @description Removes event Listener from the Store
   *
   * @return {void}
   * 
   * @memberof DashBoard
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

    /**
   * @method onChange
   * 
   * @description Monitors changes in the components and change the state
   * 
   * @return {void}
   * 
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



  /**
   * @method render
   * 
   * @description Render the Dashboard component
   * 
   * @returns {void}
   * 
   * @memberof DashBoard
   */
  render() {
    let userName = JSON.parse(localStorage.getItem('user'));
    let photoURL = JSON.parse(localStorage.getItem('photoURL')) || null;
    { photoURL ? photoURL : photoURL = 'https://history.indiana.edu/images/no-photo.jpg' }
    return (
      <div>
        <div className="nav-side-menu" >
          <div
            className="brand"
            data-intro='Welcome to PostIt, your current group will be displayed here'
          >
              {!this.state.currentGroup ? 'PostIt' : this.state.currentGroup}
          </div>
          <i className="fa fa-bars fa-2x toggle-btn"
            data-toggle="collapse" data-target="#menu-content"></i>
          <div className="menu-list">


            <ul id="menu-content" className="menu-content collapse out">

              <li>
                <a href="#">
                  <i className="fa fa-dashboard fa-lg"></i>&nbsp;
                  <img
                    src={photoURL}
                    alt="Smiley face"
                    height="42"
                    width="42"
                  />&nbsp;{userName}
                </a>
              </li>
              <br />

              <DashboardNavigation
                contact={this.state.contacts}
                group={this.state.groups}
                user={this.state.user}
                allUsers={this.state.databaseUsers}
                notification={this.state.notification}
              />
              <br />
              <SideBar contact={this.state.contacts} group={this.state.groups}
                user={this.state.user} currentGroup={this.state.currentGroup} />
            </ul>

          </div>
        </div>
        {!this.state.currentGroup ? <WelcomeBoard
          notification={this.state.notification} /> :
          <Board contact={this.state.contacts}
            emails={this.state.emails} numbers={this.state.numbers} />}
      </div>
    )
  }

}

