import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Nexmo from 'nexmo';
import moment from 'moment';

import { usersRef, groupRef, firebase } from './../config';
import { validStringLength } from './../helpers/validate.helper';


 /**
 * class Group: This class controls all group routes
 * @class
 */
class Message {
  /**
 * @description: posts a message in a group through
 *  route POST: /groupName/messages/
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the posted message
 */
  static createMessage(req, res) {
    const { group, user, message, notification, priority } = req.body;
    const currentUser = firebase.auth().currentUser;
    let googleAuth = false;

    usersRef.child(user).child('google').once('value', (snapshot) => {
      if (snapshot.exists()) {
        googleAuth = true;
      }
      if (currentUser || googleAuth) {
        if (!(validStringLength(group, message))) {
          res.status(400).json(
            { message: 'The Message or Groupname field is invalid' }
          );
        } else if (!(validStringLength(notification, priority))) {
          res.status(400).json(
            { message: 'The Notification or Priority field is invalid' }
          );
        } else {
          const messageKey = groupRef.child(group).child('Messages').push(
            {
              user,
              Message: message,
              Time: moment().format('h:mm a, MMM Do'),
              Priority: priority,
            }).key;
          groupRef.child(group)
          .child('Messages')
          .child(messageKey)
          .child('Seen')
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

          const users = [];
          const userRef = firebase.database()
            .ref()
            .child('Groups')
            .child(group)
            .child('Users');
          userRef.once('value', (userSnapshot) => {
            userSnapshot.forEach((data) => {
              users.push(data.val());
            });
            users.forEach((entry) => {
              if (entry === user) {
                return;
              }
              const userDatabase = firebase.database();
              userDatabase.ref(`/users/${entry}/Notifications`)
              .child(notification).set(notification);
            });
          });

          const email = [];
          const emailRef = firebase.database()
            .ref()
            .child('Groups')
            .child(group)
            .child('Email');
          emailRef.once('value', (snap) => {
            snap.forEach((data) => {
              email.push(data.val());
            });
            const emails = email.join(',');

            if ((priority === 'Urgent') || (priority === 'Critical')) {
              const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL_USERNAME,
                  pass: process.env.EMAIL_PASSWORD
                }
              }));
              const mailOptions = {
                from: '"PostIt App" <admin@postit.com>',
                to: emails,
                subject: 'New Message Received',
                text: 'PostIt App ?',
                html: `<p>Hello</p><h2>This is to notify you that a vey urgent 
                message which may have a critical priority level has been 
                posted in ${group} group</h2>`
              };
              transporter.sendMail(mailOptions, () => {
              });
            }
          });

          const number = [];
          const numberRef = firebase.database()
            .ref()
            .child('Groups')
            .child(group)
            .child('Number');
          numberRef.once('value', (snap) => {
            snap.forEach((data) => {
              number.push(data.val());
            });
            if (priority === 'Critical') {
              const nexmo = new Nexmo({
                apiKey: process.env.NEXMO_APIKEY,
                apiSecret: process.env.NEXMO_APISECRET
              });
              number.forEach((entry) => {
                nexmo.message.sendSms(
                  'Post-It', entry, `Post-It App. This is to notify you that an
                   urgent message which has a critical priority 
                   level has been posted in ${group} group`
                );
              });
            }
          });
        }
      } else {
        res.status(401).send('Access denied; You need to sign in');
      }
    });
  }

    /**
 * @description: retrieves all users who have seen a message
 * route GET: group/getReadMessageUsers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users who have seen a message
 */
  static getReadMessageUsers(req, res) {
    const { groupName, messageID } = req.params;
    groupRef.child(groupName)
    .child('Messages')
    .child(messageID).child('Seen')
    .once('value', (users) => {
      res.status(200).json({
        message: 'Users in Group Sent',
        users,
        groupName,
        messageID
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Internal server error'
      });
    });
  }

}


module.exports = Message;
