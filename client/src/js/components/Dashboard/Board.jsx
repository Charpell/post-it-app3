import React, { Component } from 'react';

import Message from './Message';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import toastr from 'toastr';
import moment from 'moment';

/**
 * @description The Presentation component that servers all message activities
 * 
 * @class MessageBoard
 * 
 * @extends {Component}
 */
export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: AppStore.getUser(),
            currentGroup: AppStore.getCurrentGroup(),
            messages: AppStore.getMessages()
        };
        this.onChange = this.onChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    /**
    * @method componentDidMount

    * @description Adds an event Listener to the Store and fires when the component is fully mounted.

    * @return {void}

    * @memberof Board
    */
    componentDidMount() {
        AppStore.addChangeListener(this.onChange);
    }

    
    /**
    * @method componentWillUnmount

    * @description Removes event Listener from the Store

    * @memberof Board
    */
    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }


    /**
    * @description Makes an action call to Sign up a user with username, email, phone number  and password

    * @param {object} event

    * @returns {void}
    
    * @memberof Board
    */
    sendMessage(event) {
        event.preventDefault();
        const userName = JSON.parse(localStorage.getItem('user'));
        const message = {
            user: userName.replace(" ", ""),
            group: this.state.currentGroup,
            text: this.refs.message.value.trim(),
            Time: moment().format('h:mm a, MMM Do'),
            notification: userName + ' posted in ' + this.state.currentGroup + 
                        ' group',
            priority: this.refs.type.value
        }

        if (typeof message.text === 'string' && message.text.length > 0) {
            AppActions.saveMessage(message);
            this.refs.message.value = '';            
        }
    }
    
    onChange() {
        this.setState({ 
            currentGroup: AppStore.getCurrentGroup(),
            messages: AppStore.getMessages(),
            user: AppStore.getUser()
        });
    }

/**
   * @method render
   * 
   * @description Render the Board component
   * 
   * @returns {void}
   * 
   * @memberof Board
   */
    render() {
        return (
            <div className="container" id="main">
                <div className="row">
                    <div className="col-md-12">
                        <div className="viewMessageBoard">
                            {
                                this.state.messages.map((message, index) => {
                                    return (
                                        <Message message={message} key={index}
                                            group={this.state.currentGroup} />
                                    )
                                })
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

        )
    }

}
