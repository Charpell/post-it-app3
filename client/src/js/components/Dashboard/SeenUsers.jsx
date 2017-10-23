import React, {Component} from 'react'


/**
 * @description Display List of Users who have seen a message
 * 
 * @class SeenUsers
 * 
 * @extends {Component}
 */
export default class SeenUsers extends Component {
  render() {
    return (
      <option>  
        {this.props.users.Seen}
      </option>  

    )
  }
}