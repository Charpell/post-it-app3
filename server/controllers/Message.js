import moment from 'moment';
import config from './../config';
import { sendNotification, sendEmailNotification, sendSMSNotification }
from '../helpers/utils';

const { groupRef } = config;

/**
  * @description: A class that controls all message routes
  *
  * @class
  */
class Message {
  /**
 * @description: creates a message and post it through
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
      })
      .key;

    groupRef.child(group).child('Messages').child(messageKey).child('Seen')
      .child('Bot')
      .set('Bot')
      .then(() => {
        res.status(201).json({
          message: 'Message posted successfully',
          messageData: message,
          group,
          user,
          notification,
          priority
        });
      })
      .catch(() => {
        res.status(500).json(
          { message: 'Internal server error' }
        );
      });

    sendNotification(group, user, notification);
    sendEmailNotification(group, priority);
    sendSMSNotification(group, priority);
  }


    /**
 * @description: retrieves all users who have seen a message
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users who have seen a message
 */
  static getReadMessageUsers(req, res) {
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

      if (numberOfUsers.length === 0) {
        res.status(200).json(
          { message: 'No user has read this message' }
        );
      } else {
        res.status(200).json({
          message: 'Users in Group Sent',
          users,
          groupName,
          messageID
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Internal server error'
      });
    });
  }

}


export default Message;

