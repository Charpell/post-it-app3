import React, { Component } from 'react';

import Users from './Users';
import Groups from './Groups';
import AppActions from '../../actions/AppActions';
import ModalButton from './ModalButton';


/**
 * @description The Left hand Side of the Dashboard
 *
 * @class SideBar
 *
 * @extends {Component}
 */
export default class SideBar extends Component {
	/**
	 * @description Render react component
	 *
	 * @memberof SideBar
	 *
	 * @return { jsx } rendered jsx element
	 */
  render() {
    const userName = JSON.parse(localStorage.getItem('user'));

    const groups = this.props.group.map((keyName, keyIndex) =>
    <Groups KeyName={keyName} key={keyIndex} userName={this.props.userName}/>);

    const allUsers = this.props.contact.map((keyName, keyIndex) =>
    <Users KeyName={keyName} key={keyIndex}/>);

    return (
      <div className="sideBar message-padding">
        <li data-toggle="collapse" data-target="#new"
          className="collapsed" onClick={() => AppActions.getGroups(userName)}>
          <a href="#"><i className="fa fa-car fa-lg"></i>&nbsp; Group
          <span className="arrow"></span></a>
        </li>

        <ul className="sub-menu collapse" id="new">
          {groups}
        </ul>
        <br />

        <ModalButton menuName={'Users'}/>
          {allUsers}
        <br />
      </div>
    );
  }
}
