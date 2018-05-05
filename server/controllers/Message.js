import moment from 'moment';

import config from './../config';
import {
  sendInAppNotification,
  sendEmailNotification,
  sendSMSNotification,
  getServerResponse,
  getServerErrors
} from '../helpers/utils';

const { groupRef } = config;

/**
  * @description: A class that controls all message routes
  *
  * @class Message
  */
class Message {
  /**
 * @description: describe a function that let users create a message
 *
 * @method createMessage
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the posted message
 */
  static createMessage(req, res) {
    const { group, user, message, notification, priority } = req.body;

    const messageKey = groupRef.child(group).child('Messages').push(
      { user,
        message,
        time: moment().format('h:mm a, MMM Do'),
        priority
      }).key;

    groupRef.child(group).child('Messages').child(messageKey).child('Seen')
      .child(user)
      .set(user)
      .then(() => {
        getServerResponse(res, 201, {
          message: 'Message posted successfully',
          messageData: message,
          group,
          user,
          notification,
          priority
        });
        sendInAppNotification(group, user, notification);
        sendEmailNotification(group, priority);
        sendSMSNotification(group, priority);
      })
      .catch(error => getServerErrors(error.code, res));
  }


/**
 * @description: retrieves all users who have seen a message
 *
 * @method getUsersSeenAMessage
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users who have seen a message
 */
  static getUsersSeenAMessage(req, res) {
    const { groupName, messageID } = req.params;
    const numberOfUsers = [];

    groupRef.child(groupName).child('Messages')
      .child(messageID).child('Seen')
      .once('value', (users) => {
        users.forEach((userSnapShot) => {
          numberOfUsers.push({
            userName: userSnapShot.val().users
          });
        });

        if (!numberOfUsers.length) {
          return getServerResponse(res, 200, {
            message: 'No user has read this message',
            users: []
          });
        }
        return getServerResponse(res, 200, {
          message: 'Users who have read this message',
          users,
          groupName,
          messageID
        });
      })
    .catch(error => getServerErrors(error.code, res));
  }
}


export default Message;

