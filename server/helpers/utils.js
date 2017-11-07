import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Nexmo from 'nexmo';

import config from './../config';

const { firebase } = config;

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
        html: `<p>Hello</p>This is to notify you that a 
        message has been posted in ${group} group`
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

