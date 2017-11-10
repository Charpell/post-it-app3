import React, { Component } from 'react';

import AppStore from '../../stores/AppStore';
import DashboardNavigation from './DashboardNavigation';
import SideBar from './../presentation/SideBar';
import MessageBoard from './MessageBoard';
import WelcomeBoard from './../presentation/WelcomeBoard';
import AppActions from '../../actions/AppActions';


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
      groups: [],
      groupUsers: [],
      currentGroup: '',
      allUsers: [],
      notification: []
    };
    this.onChange = this.onChange.bind(this);
  }


  /**
   * @method componentWillMount
   *
   * @description Adds an event Listener to the Store and fires when
   * the component is fully mounted.
   *
   * @return {void}
   *
   * @memberof DashBoard
   */
  componentDidMount() {
    AppActions.getGroups(JSON.parse(localStorage.getItem('user')));
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
      groupUsers: AppStore.getGroupUsers(),
      groups: AppStore.getGroups(),
      currentGroup: AppStore.getCurrentGroup(),
      allUsers: AppStore.getDatabaseUsers(),
      notification: AppStore.getNotification(),
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
                &nbsp;&nbsp;&nbsp;{userName}
              <DashboardNavigation
                group={this.state.groups}
                user={this.state.user}
                allUsers={this.state.allUsers}
                notification={this.state.notification}
                userName ={userName}
              />
              <br />

              <SideBar
                groupUsers={this.state.groupUsers}
                groups={this.state.groups}
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
            emails={this.state.emails}
            numbers={this.state.numbers}
            userName ={userName}
          />
        }
      </div>
    );
  }
}

