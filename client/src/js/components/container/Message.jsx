import React, { Component } from 'react';

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import MessageList from './../presentation/MessageList';
import ModalButton from '../presentation/ModalButton';

/**
 * @description the component displays message on thr dashboard
 *
 * @class Message
 *
 * @extends {Component}
 */
export default class Message extends Component {
   /**
   * @description Creates an instance of Message.
   * bind methods and set initial state.
	 *
   * @memberof Message
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      seenMessage: [],
      showModal: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSeenMessage = this.handleSeenMessage.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  /**
   * @description Makes an action call to mark users who have seen a message
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberof Messsage
  */
  handleSeenMessage(event) {
    event.preventDefault();

    const user = {
      groupName: this.props.group,
      messageID: this.props.message.id
    };
    AppActions.seenMessage(user);
    this.setState({ showModal: true });
  }

  /**
   * @description: Close a modal when the user clicks on the close button
   *
   * @return {void} void
   */
  closeModal() {
    this.setState({ showModal: false });
  }

  /**
   * @method componentWillMount
   *
   * @description Adds an event Listener to the Store and fires when the
   * component is fully mounted.
   *
   * @return {void}
   *
   * @memberof Message
   */
  componentWillMount() {
    AppStore.addChangeListener(this.onChange);
  }

  /**
  * @method componentWillUnmount
  *
  * @description Removes event Listener from the Store
  *
  * @return {void}
  *
  * @memberof Message
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
   * @method onChange
   *
   * @description Monitors changes in the components and change the state
   *
   * @return {void}
   *
   * @memberof Message
   */
  onChange() {
    this.setState({ seenMessage: AppStore.getSeenUsers() });
  }

  /**
   *
   * @description Render react component
   *
   * @return { jsx } rendered jsx element
   *
   * @memberof Message
   */
  render() {
    return (
      <div>
        <MessageList
          {...this.props.message}
          action={this.handleSeenMessage}
        />

        <ModalButton
          modalTitle={'Users who have Read Message'}
          closeModal={this.closeModal}
          modalState={this.state.showModal}
        >
      <ul className='mylist'>
      {this.state.seenMessage ?
        Object.keys(this.state.seenMessage).map((keyName, keyIndex) =>
          <li key={keyIndex}>{keyName}</li>) :
        <li className='mylist'>Empty</li>
      }
    </ul>
      </ModalButton>
      </div>
    );
  }
}
