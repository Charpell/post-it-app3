import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Nexmo from 'nexmo';
import config from './../config';

const { firebase, usersRef, groupRef } = config;

/**
 * @description: A function that change all character to lower case and
 * the first word to uppercase
 *
 * @function capitalizeFirstLetter
 *
 * @return {Object} a string in lowercase and the First letter in Capital
 *
 * @param {String} character
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
 * @return {void}
 *
 * @param {String} group
 * @param {String} user
 * @param {String} notification
 */
export const sendInAppNotification = (group, user, notification) => {
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
 * @return {Object} a string in lowercase and the First letter in Capital
 *
 * @param {String} group
 * @param {String} priority
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
 * @return {object} a string in lowercase and the First letter in Capital
 *
 * @param {String} group the group name of the user
 * @param {String} priority the priority of the message
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
 * @param {String} groupName the group name of the user
 * @param {String} userName the username of the user
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
 * @return {Object} retrieves users or numbers or emails from user database
 *
 * @param {String} userData the query parameter to the database
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

/**
 * @description: generate a login token
 *
 * @function createToken
 *
 * @return {String} the generated token
 *
 * @param {String} userName to generate token
 */
export const createToken = (userName) => {
  const myToken = jwt.sign({
    displayName: userName
  },
  process.env.TOKEN_SECRET,
  { expiresIn: '24h' });
  return myToken;
};


/**
 * @description describes a method that returns error message from firebase
 *
 * @function getServerErrors
 *
 * @param {error} errorCode
 *
 * @return {object} returns custom error message
 *
 */
export const getServerErrors = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return {
        message: 'The email address is badly formatted.',
        code: 400
      };
    case 'auth/weak-password':
      return {
        message: 'Password should be at least 6 characters',
        code: 400
      };
    case 'auth/email-already-in-use':
      return {
        message: 'The email address is already in use by another account.',
        code: 409
      };
    case 'auth/user-not-found':
      return {
        message: 'The email or password you entered is incorrect',
        code: 404
      };
    case 'auth/wrong-password':
      return {
        message: 'The email or password you entered is incorrect',
        code: 404
      };
    default:
      return {
        message: 'Internal Server Error',
        code: 500
      };
  }
};


/**
 * @description describes a method that registers a new user
 *
 * @function registerNewUser
 *
 * @param {groupName} userName
 * @param {fields} fields an  object that contains the user details
 * @param {userData} userData an  object that contains the user details
 * @param {Object} res response object
 *
 * @return {void} void
 *
 */
export const registerNewUser = (userName, fields, userData = '', res) => {
  usersRef.child(userName).set(fields);
  const myToken = createToken(userName);

  res.status(201).json({
    message: 'Welcome to Post it app',
    userData,
    displayName: userName,
    myToken
  });
};

/**
 * @description describes a method that adds user details to group database
 *
 * @function addGroupData
 *
 * @param {groupName} groupName
 * @param {data} userData an  object that contains the user details
 *
 * @return {void} void
 *
 */
export const addGroupData = (groupName, userData) => {
  const ref = groupRef.child(groupName);
  const { userName, email, number } = userData;
  const userDatabase = firebase.database();

  userDatabase.ref(`/users/${userName}/Groups`).push({
    groupName
  });
  ref.child('Users').child(userName).set(userName);
  ref.child('Email').push(email);
  return ref.child('Number').push(number);
};

 /**
 * @description describes a method that checks if a group exist
 *
 * @function checkIfGroupExist
 *
 * @param {groupName} groupName the group name
 *
 */
export const checkIfGroupExist = groupName =>
new Promise((resolve, reject) => {
  groupRef.child(groupName).once('value', (snapshot) => {
    if (!snapshot.exists()) {
      return resolve();
    }
    return reject('Group already exist');
  });
});


 /**
 * @description describes a method that checks if a group does not exist
 *
 * @function checkGroupNotExist
 *
 * @param {groupName} groupName the group name
 *
 */
export const checkGroupNotExist = groupName =>
new Promise((resolve, reject) => {
  groupRef.child(groupName).once('value', (snapshot) => {
    if (snapshot.exists()) {
      return resolve();
    }
    return reject('Group does not exist');
  });
});

 /**
 * @description describes a method that checks if a user does not exist
 *
 * @function checkIfUserExist
 *
 * @param {user} user the user's name
 *
 */
export const checkIfUserExist = user => new Promise((resolve, reject) => {
  usersRef.child(user).once('value', (snapShot) => {
    if (snapShot.exists()) {
      return resolve(snapShot.val());
    }
    return reject('The User does not exist');
  });
});


 /**
 * @description describes a method that checks if user exist in a group
 *
 * @function isUserInGroup
 *
 * @param {groupName} groupName the group name
 * @param {user} user the user's name
 *
 */
export const isUserInGroup = (groupName, user) =>
new Promise((resolve, reject) => {
  groupRef.child(groupName).child('Users').child(user).once('value',
  (existSnapShot) => {
    if (!existSnapShot.exists()) {
      return resolve();
    }
    return reject('The user already exist in this group');
  });
});


/**
 * @description describes a method that returns group error messages
 *
 * @function getGroupErrors
 *
 * @param {error} error error status message
 *
 * @return {object} returns custom error message
 *
 */
export const getGroupErrors = (error) => {
  switch (error) {
    case 'Group does not exist':
      return {
        message: 'Group does not exist',
        code: 404
      };
    case 'The User does not exist':
      return {
        message: 'The User does not exist',
        code: 404
      };
    case 'Group already exist':
      return {
        message: 'Group already exist',
        code: 409
      };
    case 'The user already exist in this group':
      return {
        message: 'The user already exist in this group',
        code: 409
      };
    default:
      return {
        message: 'Internal Server Error',
        code: 500
      };
  }
};


 /**
 * @description describes a method that gets users in a group
 *
 * @function getUsersInGroup
 *
 * @param {groupName} groupName the user's name
 *
 */
export const getUsersInGroup = groupName => new Promise((resolve) => {
  const users = [];
  groupRef.child(groupName).child('Users')
  .once('value', (userSnapshot) => {
    userSnapshot.forEach((userValue) => {
      users.push({
        userName: userValue.val()
      });
    });
    return resolve(users);
  });
});
