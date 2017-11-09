import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Nexmo from 'nexmo';

import config from './../config';

const { firebase, usersRef } = config;

/**
 * @description: A function that change all character to lower case and
 * the first word to uppercase
 *
 * @function capitalizeFirstLetter
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } character
 */
export const capitalizeFirstLetter = (character) => {
  const string = character.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * @description: A function that sends notification message to all users in
 * a group
 *
 * @function sendNotification
 *
 * @return { void }
 *
 * @param { String } group
 * @param { String } user
 * @param { String } notification
 */
export const sendNotification = (group, user, notification) => {
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
};

/**
 * @description: A function that sends email notification message to all users
 * in a group
 *
 * @function sendEmailNotification
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } group
 * @param { String } priority
 */
export const sendEmailNotification = (group, priority) => {
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
        html: `
        <div style="width: 100%; background-color: #f2f2f2; padding: 2%;">
        <div style="width: 60%; background-color: white; margin: auto;">
          <div style="height:40px; background-color: #2e353d ; width:100%">
            <center><h2 style="padding-top: 7px; color: #f2f2f2;">Post-it</h2>
            </center>
          </div>
          <div style="padding: 4%">
            <div class="row">
              <p>This email has been sent to you because you have a message
               from Post-iT</p>
              <p>Please follow this link to log in: <a style="background-color: 
              #2e353d; padding: 5px;cursor: pointer; color: #f2f2f2;
               text-decoration: none;" 
              href="post-it-app35.herokuapp.com">Go to Post-it</a></p>
              <div style="border-top: 3px solid #2e353d ;"></div>
              <p style="font-weight: bold; color: #2e353d ">The PostIt Team</p>
            </div>
          </div>
        </div>
      </div>`
      };
      transporter.sendMail(mailOptions, () => {
      });
    }
  });
};


/**
 * @description: A function that sends SMS notification message to all users
 * in a group
 *
 * @function sendSMSNotification
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } group
 * @param { String } priority
 */
export const sendSMSNotification = (group, priority) => {
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
          'Post-It', entry, `Post-It App. This is to notify you that a
          message has been posted in ${group} group`
        );
      });
    }
  });
};

/**
 * @description: A function that saves users who have read a message
 *
 * @function saveUserHasSeenMessage
 *
 * @return {void}
 *
 * @param {String} groupName
 * @param {String} userName
 */
export const saveUserHasSeenMessage = (groupName, userName) => {
  const messageIDRef = firebase.database()
  .ref()
  .child('Groups')
  .child(groupName)
  .child('Messages');
  messageIDRef.once('value', (snap) => {
    const messageIDs = [];
    snap.forEach((data) => {
      messageIDs.push(data.key);
    });
    messageIDs.forEach((entry) => {
      const userDatabase = firebase.database();
      userDatabase.ref(`/Groups/${groupName}/Messages/${entry}`)
      .child('Seen')
      .child(userName).set(userName);
    });
  });
};

/**
 * @description: A function that retrieves users or numbers or emails
 * from user database
 *
 * @function queryUserDatabase
 *
 * @return { object } retrieves users or numbers or emails from user database
 *
 * @param { String } userData
 * @param {Object} res response object
 */
export const queryUserDatabase = (userData, res) => {
  usersRef.once('value', (snapShot) => {
    const userdetails = [];
    if (userData === 'userName') {
      snapShot.forEach((userInfo) => {
        userdetails.push(userInfo.val().userName);
      });
    } else if (userData === 'number') {
      snapShot.forEach((userInfo) => {
        userdetails.push(userInfo.val().number);
      });
    } else {
      snapShot.forEach((userInfo) => {
        userdetails.push(userInfo.val().email);
      });
    }
    if (userdetails.length === 0) {
      res.status(200).json(
        { message: `There are currently no ${userData} found` }
      );
    } else {
      res.status(200).json(userdetails);
    }
  }).catch(() => {
    res.status(500).send({
      message: 'Internal Server Error'
    });
  });
};
