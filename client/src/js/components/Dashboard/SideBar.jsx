import React, { Component } from 'react';
import { MenuItem, Clearfix } from 'react-bootstrap';
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import Users from './Users'
import Groups from './Groups'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'


/**
 * @description The Left hand Side of the Dashboard
 * 
 * @class SideBar
 * 
 * @extends {Component}
 */
export default class SideBar extends Component {

  render() { 
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user.replace(" ", "")
 
    return (
      <div className="sideBar message-padding">

        <li data-toggle="collapse" data-target="#new" 
          data-intro='Click here to display all your Groups' 
          className="collapsed" onClick={() => AppActions.getGroups(userName)}>
          <a href="#"><i className="fa fa-car fa-lg"></i>&nbsp; Group 
          <span className="arrow"></span></a>
        </li>

        <ul className="sub-menu collapse" id="new">
          {
            this.props.group.map((KeyName, KeyIndex) => {
              return (
                <Groups KeyName={KeyName} key={KeyIndex} />
              )
            })
          }
        </ul>
        <br /> 

        <li data-toggle="collapse" data-target="#new" 
          data-intro='This displays all the users in a group' 
          className="collapsed">
          <a href="#"><i className="fa fa-globe fa-lg"></i>&nbsp; Users</a>
        </li>

        {this.props.contact.map((KeyName, KeyIndex) => {
          return (
            <Users KeyName={KeyName} key={KeyIndex} />
          )
        })}
        <br />

      </div>

    )
  }

}
