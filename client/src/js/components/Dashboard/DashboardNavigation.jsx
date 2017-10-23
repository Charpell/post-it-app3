import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import toastr from 'toastr'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'
import GroupOptions from './GroupOptions'

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
            addUserModal: false,
            createGroupModal: false,
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
    }

    /**
    * description: Opens and closes a modal when the user clicks to create a Group
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
        const userName = JSON.parse(localStorage.getItem('user'));
        event.preventDefault()
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const groupName = capitalizeFirstLetter(this.refs.group.value.trim())
        const group = {
            groupName,
            userName
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

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const userName = capitalizeFirstLetter(this.refs.user.value)
        const addUser = {
            groupname: this.refs.type.value.trim(),
            userName
        }
        if (this.refs.type.value === '') {
            toastr.error("Select a group name from the drop down list")
        }
        else if (this.props.allUsers.includes(userName)) {
            AppActions.saveGroupUser(addUser);
        } else {
            toastr.error("The User dosen't exist")
        }
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
        const userName = JSON.parse(localStorage.getItem('user'));
        const groupOptions = this.props.group.map((keyName, keyIndex) =>  <GroupOptions keyName={keyName} key={keyIndex} />)
        const notificationList = this.props.notification.map((keyName, keyIndex) => <li key={keyIndex}>{keyName.notification}</li>)

        return (
            <div>
                <li data-toggle="collapse" className="collapsed"
                    data-intro='Click here to create your first Group'>
                    <a href="#" onClick={this.openModalGroup}><i
                        className="fa fa-globe fa-lg"></i>&nbsp; Create Group</a>
                </li>

                <Modal show={this.state.createGroupModal} onHide={this.closeModalGroup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.createGroup.bind(this)}>
                            <div className='form-group'>
                                <input type="text" ref='group'
                                    className='form-control' placeholder='GroupName'
                                    required />
                            </div>
                            <button type='submit'
                                className='btn btn-primary'>Submit</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="#/dashboard" onClick={this.closeModalGroup}> Close</a>
                    </Modal.Footer>
                </Modal>

                <li data-toggle="collapse" className="collapsed"
                    data-intro='Invite your fiends to your Group' 
                    onClick={() => AppActions.getGroups(userName)}>

                    <a href="#" onClick={this.openModalUsers}><i
                        className="fa fa-globe fa-lg"></i>&nbsp; Invite a Friend</a>
                </li>

                <Modal show={this.state.addUserModal} onHide={this.closeModalUsers}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a User to this Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addUser}>
                            <div className='form-group'>
                                <select className="form-control" ref="type">
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModalUsers}>Close</Button>
                    </Modal.Footer>
                </Modal>



                <li data-toggle="collapse" className="collapsed"
                    data-intro='When messages are posted in groups you belong to, you get your notifications here !'
                    onClick={() => AppActions.getNotification(userName)}>
                    <a href="#" onClick={this.openModalNotification}>
                        <i className="fa fa-globe fa-lg"></i>&nbsp; Notification</a>
                </li>
                <Modal show={this.state.notificationModal} onHide={this.closeModalNotification}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className='mylist'>
                            {notificationList}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="#/dashboard" onClick={this.closeModalNotification}> Close</a>
                    </Modal.Footer>
                </Modal>


                <li data-toggle="collapse" className="collapsed">
                    <a href="#" onClick={this.logout.bind(this)}><i
                        className="fa fa-globe fa-lg"></i>&nbsp; Logout</a>
                </li>

            </div>

        )
    }

}
