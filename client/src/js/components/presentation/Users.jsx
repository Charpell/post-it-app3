import React from 'react';


/**
 * @description Displays the List of Users in a group
 *
  * @param  {object} props store data passed to the component
 *
 * @class Users
 *
 * @extends {Component}
 */
const Users = () => ({
  render() {
    return (
      <li data-toggle="collapse" className="collapsed">
        <a href="#"><i className="fa fa-globe fa-lg">
        </i>&nbsp; {this.props.keyName.userName}
        </a>
      </li>
    );
  }
});

export default Users;
