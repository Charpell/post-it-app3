import React from 'react';

/**
 * @description This component displays all the message in a group
 *
 * @param  {object} props store data passed to the component
 *
 * @method MessageList
 *
 * @extends {Message}
 *
 * @return {ReactElement} markup
 */
const MessageList = props => ({
  render() {
    return (
      <a href="#" className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1"><strong>{props.user}</strong>&nbsp;&nbsp;
                <small className="text-muted">{props.time}</small>&nbsp;&nbsp;
                <span onClick={props.action} >
              <span className="glyphicon glyphicon-user"></span>
            </span>
          </h5>
        </div>
        <p className="mb-1">{props.message}</p>
      </a>
    );
  }
});

export default MessageList;
