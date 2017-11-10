import React, { Component } from 'react';
import toastr from 'toastr';


import AppActions from '../../actions/AppActions';
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
   /**
   * @description Creates an instance of DashboardNavigation.
   * bind methods and set initial state.
	 *
   * @memberof DashboardNavigation
   *
   * @param {object} props
   */
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
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.logout = this.logout.bind(this);
    this.handleNotificationButton = this.handleNotificationButton.bind(this);
    this.handleAddUserButton = this.handleAddUserButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
  * @description: Opens a modal when the user clicks to create a Group
  *
  * @return {void} void
  */
  openModalGroup() {
    this.setState({ createGroupModal: true });
  }

  /**
  * @description: Close a modal when the user clicks on the close button
  *
  * @return {void} void
  */
  closeModalGroup() {
    this.setState({ createGroupModal: false });
  }

  /**
  * @description: Opens a modal when the user clicks to add a friend to a group
  *
  * @return {void} void
  */
  openModalUsers() {
    this.setState({ addUserModal: true });
  }

  /**
  * @description: Close a modal when the user clicks on the close button
  *
  * @return {void} void
  */
  closeModalUsers() {
    this.setState({ addUserModal: false });
  }


  /**
   * @description: Opens a modal when the user want to get notifications
   *
   * @return {void} void
   */
  openModalNotification() {
    this.setState({ notificationModal: true });
  }

  /**
   * @description: Close a modal when the user clicks on the close button
   *
   * @return {void} void
   */
  closeModalNotification() {
    this.setState({ notificationModal: false });
  }

  /**
  * @description: controls inputs state
  *
  * @param {object} element the current element
  *
  * @return {void} void
  */
  handleChange(element) {
    this.setState({
      [element.target.name]: element.target.value
    });
  }


  /**
  * @description Method for adding user to the group

  * @param {object} event

  * @returns {void}

  * @memberof DashboardNavigation
  */
  createGroup(event) {
    event.preventDefault();
    const group = {
      group: this.refs.group.value.trim(),
      userName: this.props.userName
    };
    AppActions.createGroup(group);
  }


  /**
  * @description Method for adding user to the group

  * @param {object} event

  * @returns {void}

  * @memberof DashboardNavigation
  */
  addUserToGroup(event) {
    event.preventDefault();

    const userDetails = {
      groupName: this.refs.type.value.trim(),
      newUser: this.refs.user.value
    };
    if (this.refs.type.value === 'Groups') {
      toastr.error('Select a Group name');
    } else {
      AppActions.addUserToGroup(userDetails);
    }
  }

  /**
    * @description Method for adding user to the group

    * @returns {void}

    * @memberof DashboardNavigation
    */
  handleAddUserButton() {
    AppActions.getGroups(this.props.userName);
  }

  /**
    * @description Method for getting notifications of a user
    *
    * @returns {void}
    *
    * @memberof DashboardNavigation
    */
  handleNotificationButton() {
    AppActions.getNotification(this.props.userName);
  }


  /**
  * @description Method for logging out Users

  * @param {object} event the event object

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
   * @memberof DashboardNavigation
   */
  render() {
    const groupOptions = this.props.group.map((keyName, keyIndex) =>
     <GroupOptions keyName={keyName} key={keyIndex} />);

    const notificationList = this.props.notification.map((keyName, keyIndex) =>
     <li key={keyIndex}>{keyName.notification}</li>);

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
              <input
                name="groupName"
                type="text"
                ref='group'
                className='form-control'
                placeholder='Group Name'
                onChange={this.handleChange}
                required />
            </div>
            <button
              type='submit'
              className='btn btn-primary'>
              Submit
            </button>
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
          <form onSubmit={this.addUserToGroup} className="whatever">
            <div className='form-group'>
              <select
                className="form-control"
                ref="type">
                <option>Groups</option>
                {groupOptions}
              </select>
            </div>
            <div className='form-group'>

              <input type="text" ref='user'
                className='form-control'
                placeholder='Search for a User' required />

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

    );
  }

}
