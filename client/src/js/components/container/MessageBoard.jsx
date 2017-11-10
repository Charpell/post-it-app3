import React, { Component } from 'react';
import moment from 'moment';

import Message from './Message';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';

/**
 * @description The component that renders all message activities
 *
 * @class MessageBoard
 *
 * @extends {Component}
 */
export default class MessageBoard extends Component {
  /**
 * @description Creates an instance of MessageBoard.
 * bind methods and set initial state.
 *
 * @memberof MessageBoard
 *
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: '',
      messages: []
    };
    this.onChange = this.onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  /**
  * @method componentDidMount
  *
  * @description Adds an event Listener to the Store and fires when
  * the component is fully mounted.
  *
  * @return {void}
  *
  * @memberof Board
  */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }


  /**
  * @method componentWillUnmount
  *
  * @description Removes event Listener from the Store
  * @return {void}
  *
  * @memberof MessageBoard
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }


  /**
  * @description Makes an action call to Sign up a user with username,
  * email, phone number  and password
  *
  * @param {object} event the event object
  *
  * @returns {void}
  *
  * @memberof MessageBoard
  */
  sendMessage(event) {
    event.preventDefault();
    const userName = JSON.parse(localStorage.getItem('user'));
    const message = {
      user: userName,
      group: this.state.currentGroup,
      message: this.refs.message.value.trim(),
      time: moment().format('h:mm a, MMM Do'),
      notification: `${userName} posted in ${this.state.currentGroup} group`,
      priority: this.refs.type.value
    };

    if (typeof message.message === 'string' && message.message.length > 0) {
      AppActions.postMessage(message);
      this.refs.message.value = '';
    }
  }

/**
  * @method onChange
  *
  * @description Monitors changes in the components and change the state
  *
  * @return {void}
  *
  * @memberof MessageBoard
  */
  onChange() {
    this.setState({
      currentGroup: AppStore.getCurrentGroup(),
      messages: AppStore.getMessages(),
    });
  }

/**
   * @method render
   *
   * @description Render the MessageBoard component
   *
   * @returns {void}
   *
   * @memberof MessageBoard
   */
  render() {
    return (
      <div className="container" id="main">
        <div className="row">
          <div className="col-md-12">
            <div className="viewMessageMessageBoard">
              {
                this.state.messages.map((message, index) => (
                  <Message message={message} key={index}
                    group={this.state.currentGroup} />
                ))
              }
            </div>

            <div className="sendMessageDiv">
              <form onSubmit={this.sendMessage}>
                <div className="form-group col-sm-2">
                  <select ref="type" className="form-control"
                    id="exampleFormControlSelect1">
                    <option>Normal</option>
                    <option>Urgent</option>
                    <option>Critical</option>
                  </select>
                </div>
                <input ref='message'
                  className="col-sm-10 sendMessageInput"
                  placeholder='Enter a message' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
