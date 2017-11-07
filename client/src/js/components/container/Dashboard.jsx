import React, { Component } from 'react';

import AppStore from '../../stores/AppStore';
import DashboardNavigation from './DashboardNavigation';
import SideBar from './../presentation/SideBar';
import MessageBoard from './MessageBoard';
import WelcomeBoard from './../presentation/WelcomeBoard';


/**
 * @description creates a class Dashboard as a react component
 *
 * @class DashBoard
 *
 * @extends {Component}
 */
export default class DashBoard extends Component {
   /**
   * @description Creates an instance of DashBoard.
   * bind methods and set initial state.
	 *
   * @memberof Signup
   *
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      groups: [],
      contacts: [],
      currentGroup: '',
      databaseUsers: [],
      notification: []
    };
    this.onChange = this.onChange.bind(this);
  }


  /**
   * @method componentWillMount
   *
   * @description Adds an event Listener to the Store and fires when
   *the component is fully mounted.
   *
   * @return {void}
   *
   * @memberof DashBoard
   */
  componentDidMount() {
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
   * @description this method gets data from the store and sets to state
   *
   * @return {void}
   *
   * @memberof DashBoard
   */
  onChange() {
    this.setState({
      contacts: AppStore.getGroupUsers(),
      groups: AppStore.getGroups(),
      currentGroup: AppStore.getCurrentGroup(),
      databaseUsers: AppStore.getDatabaseUsers(),
      notification: AppStore.getNotification(),
      allUsers: AppStore.getContacts(),
    });
  }


  /**
   * @description Render the Dashboard component
   *
   * @returns {void}
   *
   * @memberof DashBoard
   */
  render() {
    const userName = JSON.parse(localStorage.getItem('user'));
    const photoURL = JSON.parse(localStorage.getItem('photoURL')) ||
    'https://history.indiana.edu/images/no-photo.jpg';
    return (
      <div>
        <div className="nav-side-menu" >
          <div
            className="brand">
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
                group={this.state.groups}
                user={this.state.user}
                allUsers={this.state.databaseUsers}
                notification={this.state.notification}
                userName ={userName}
              />
              <br />

              <SideBar
                contact={this.state.contacts}
                group={this.state.groups}
                currentGroup={this.state.currentGroup}
              />
            </ul>
          </div>
        </div>

        {!this.state.currentGroup ?
          <WelcomeBoard
           userName ={userName}
          />
          :
          <MessageBoard
            contact={this.state.contacts}
            emails={this.state.emails}
            numbers={this.state.numbers}
            userName ={userName}
          />
        }
      </div>
    );
  }
}

