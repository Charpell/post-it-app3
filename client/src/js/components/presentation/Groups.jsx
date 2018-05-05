import React from 'react';

import AppActions from '../../actions/AppActions';


/**
 * @description describes a stateless component
 * that renders all groups of a user
 *
 * @param  {Object} props store data passed to the component
 *
 * @return {jsx} jsx markup
 *
 * @function Groups
 */
const Groups = props => ({
  render() {
    const group = {
      groupName: this.props.keyName.groupName,
      userName: props.userName
    };
    return (
      <li onClick={() => AppActions.searchUserMessage(group)}>
        <a href="#/dashboard" className="text-decoration">
          {this.props.keyName.groupName}</a>
      </li>
    );
  }
});
export default Groups;
