import React, { Component } from 'react'

import AppActions from '../../actions/AppActions'

/**
 * @description Component for displaying list of group options to Users
 * 
 * @class GroupOptions
 * 
 * @extends {Component}
 */
export default class GroupOptions extends Component {
    render() {
        return (
            <option>
                {this.props.keyName.groupName}
            </option>
        )
    }

}