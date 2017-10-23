import React, {Component} from 'react'


/**
 * @description Displays the List of Users in a group
 * 
 * @param props 
 * 
 * @class Users
 * 
 * @extends {Component}
 */
export default class Users extends Component {
  render() {
    return ( 
        <li data-toggle="collapse" className="collapsed">
            <a href="#"><i className="fa fa-globe fa-lg">
              </i>&nbsp; {this.props.KeyName.userName}
            </a>
        </li>     

    )
  }
}