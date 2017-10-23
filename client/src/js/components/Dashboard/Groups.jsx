import React, { Component } from 'react'

import AppActions from '../../actions/AppActions'


/**
 * @description Component for displaying list of groups to Users
 * 
 * @class Groups
 * 
 * @extends {Component}
 */
export default class Groups extends Component {
    render() {
        const userName = JSON.parse(localStorage.getItem('user'));
        const group = {
            groupName: this.props.KeyName.groupName,
            userName
        }
        return (
            <li onClick={() => AppActions.searchUserMessage(group)}>
                <a href="#/dashboard" className="text-decoration">
                    {this.props.KeyName.groupName}</a>
            </li>
        )
    }

}