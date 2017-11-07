import React from 'react';

import AppActions from '../../actions/AppActions';


/**
 * @description describes a stateless component
 * that renders all groups of a user
 *
 * @param { props } props
 *
 * @return { void } void
 *
 * @function Groups
 */
const Groups = props => ({
  render() {
    const group = {
      groupName: this.props.KeyName.groupName,
      userName: props.userName
    };
    return (
      <li onClick={() => AppActions.searchUserMessage(group)}>
      <a href="#/dashboard" className="text-decoration">
          {this.props.KeyName.groupName}</a>
      </li>
    );
  }
});
export default Groups;
