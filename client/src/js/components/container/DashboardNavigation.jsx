import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import toastr from 'toastr'

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import GroupOptions from './../presentation/GroupOptions';
import ModalButton from './../presentation/ModalButton';

/**
 * @description Displays the navigation of the dashboard
 * 
 * @class DashboardNavigation
 * 
 * @extends {Component}
 */
export default class DashboardNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createGroupModal: false,
      addUserModal: false,
      notificationModal: false,
      groupName: '',
      userName: '',
      users: []
    };

    this.openModalUsers = this.openModalUsers.bind(this);
    this.closeModalUsers = this.closeModalUsers.bind(this);
    this.openModalGroup = this.openModalGroup.bind(this);
    this.closeModalGroup = this.closeModalGroup.bind(this);
    this.openModalNotification = this.openModalNotification.bind(this);
    this.closeModalNotification = this.closeModalNotification.bind(this);
    this.addUser = this.addUser.bind(this)
    this.createGroup = this.createGroup.bind(this)
    this.logout = this.logout.bind(this)
    this.handleNotificationButton = this.handleNotificationButton.bind(this)
    this.handleAddUserButton = this.handleAddUserButton.bind(this)
  }

  /**
  * @description: Opens and closes a modal when the user clicks to create a Group
  *
  * @return {void} void
  */
  openModalGroup() {
    this.setState({ createGroupModal: true });
  }
  closeModalGroup() {
    this.setState({ createGroupModal: false });
  }

  /**
  * @description: Opens and closes a modal when the user clicks to add a friend to a group
  *
  * @return {void} void
  */
  openModalUsers() {
    this.setState({ addUserModal: true });
  }
  closeModalUsers() {
    this.setState({ addUserModal: false });
  }


  /**
   * @description: Opens and closes a modal when the user want to view friends who have seen a message
   *
   * @return {void} void
   */
  openModalNotification() {
    this.setState({ notificationModal: true });
  }
  closeModalNotification() {
    this.setState({ notificationModal: false });
  }


  /**
  * @description Method for adding user to the group

  * @param {object} event

  * @returns {void}

  * @memberof DashboardNavigation
  */
  createGroup(event) {
    event.preventDefault()
    const group = {
      groupName: this.refs.group.value.trim(),
      userName: this.props.userName
    }
    AppActions.saveGroup(group);
  }


  /**
  * @description Method for adding user to the group

  * @param {object} event

  * @returns {void}

  * @memberof DashboardNavigation
  */
  addUser(event) {
    event.preventDefault();

    const addUser = {
      groupname: this.refs.type.value.trim(),
      userName: this.refs.user.value
    }
    if (this.refs.type.value === 'Groups') {
      toastr.error("Select a Group name")
    } else {
      AppActions.saveGroupUser(addUser)
    }
  }

  /**
    * @description Method for adding user to the group
  
    * @returns {void}
  
    * @memberof DashboardNavigation
    */
  handleAddUserButton() {
    AppActions.getGroups(this.props.userName)
  }

  /**
    * @description Method for getting notifications of a user
    *
    * @returns {void}
    *
    * @memberof DashboardNavigation
    */
  handleNotificationButton() {
    AppActions.getNotification(this.props.userName)
  }


  /**
  * @description Method for logging out Users

  * @param {object} event

  * @returns {void}
  
  * @memberof DashboardNavigation
  */
  logout(event) {
    event.preventDefault();
    AppActions.logout();
  }

  /**
   * @method render
   * 
   * @description Renders the Navigation component
   * 
   * @returns {String} The HTML markup for the Register
   * 
   * @memberof DashboardNavigation
   */
  render() {
    const groupOptions = this.props.group.map((keyName, keyIndex) => <GroupOptions keyName={keyName} key={keyIndex} />)
    const notificationList = this.props.notification.map((keyName, keyIndex) => <li key={keyIndex}>{keyName.notification}</li>)
    const allUsers = this.props.allUsers.map((keyName, keyIndex) => <option key={keyIndex}>{keyName}</option>)
    return (
      <div>
        <ModalButton
          menuName={'Create Group'}
          modalTitle={'Create a group'}
          openModal={this.openModalGroup}
          closeModal={this.closeModalGroup}
          modalState={this.state.createGroupModal}
        >
          <form onSubmit={this.createGroup}>
            <div className='form-group'>
              <input type="text" ref='group'
                className='form-control' placeholder='GroupName'
                required />
            </div>
            <button type='submit'
              className='btn btn-primary'>Submit</button>
          </form>
        </ModalButton>


        <ModalButton
          menuName={'Add a friend'}
          modalTitle={'Add a friend to your group'}
          openModal={this.openModalUsers}
          closeModal={this.closeModalUsers} 
          action={this.handleAddUserButton}
          modalState={this.state.addUserModal}
        >
          <form onSubmit={this.addUser} className="whatever">
            <div className='form-group'>
              <select className="form-control" ref="type">
                <option>Groups</option>
                {groupOptions}
              </select>
            </div>
            <div className='form-group'>
              <input type="text" ref='user'
                className='form-control'
                list="users"
                placeholder='Search for a User' required />
              <datalist id="users">
                {allUsers}
              </datalist>
            </div>

            <button type='submit'
              className='btn btn-primary'>Submit</button>
          </form >
        </ModalButton>

        <ModalButton
          menuName={'Notification'}
          modalTitle={'Notifications'}
          openModal={this.openModalNotification}
          action={this.handleNotificationButton}
          modalState={this.state.notificationModal}
          closeModal={this.closeModalNotification}
        >
          <ul className='mylist'>
            {notificationList}
          </ul>
        </ModalButton>


        <ModalButton menuName={'Logout'} action={this.logout} />

      </div>

    )
  }

}
