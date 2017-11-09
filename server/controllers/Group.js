import config from './../config';
import { capitalizeFirstLetter, saveUserHasSeenMessage }
from './../helpers/utils';

const { usersRef, groupRef, firebase } = config;


/**
  * @description: A class that controls all group  routes
  *
  * @class
  */
class Group {
/**
  * @description This method creates a group for a user
  * route POST: /api/v1/group
  *
  * @param {Object} req requset object
  * @param {Object} res response object
  *
  * @return {Object} response containing the created group
*/
  static createGroup(req, res) {
    const { group, userName } = req.body;

    const groupName = capitalizeFirstLetter(group);
    const userDatabase = firebase.database();
    groupRef.child(groupName).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        groupRef.child(groupName).child('Users').child(userName)
          .set(userName);
        groupRef.child(groupName).child('Users').child('Bot').set('Bot');
        groupRef.child(groupName).child('Email').push('bot@postit.com');
        groupRef.child(groupName).child('Number').push('2348066098141');
        groupRef.child(groupName).child('Messages/Seen').push(null);

        userDatabase.ref(`/users/${userName}/Groups`).push({
          groupName,
          userName
        }).then(() => {
          res.status(201).json({
            message: `Group ${groupName} created`,
            groupName,
            userName
          });
        }).catch(() => {
          res.status(500).json({ message: 'Internal server error' });
        });
      } else {
        res.status(409).json({ message: 'Group already exists' });
      }
    })
    .catch(() => {
      res.status(500).json(
        { message: 'Internal server error' }
      );
    });
  }


  /**
 * @description: This method adds the user to a group
 * route: POST: api/v1/group/groupName/user
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the added user
 */
  static addUserToGroup(req, res) {
    const { groupName, newUser } = req.body;

    const user = capitalizeFirstLetter(newUser);
    const userDatabase = firebase.database();
    usersRef.child(user).once('value', (snapshot) => {
      if (snapshot.exists()) {
        const userName = snapshot.val().userName;
        const email = snapshot.val().email;
        const number = snapshot.val().number;
        userDatabase.ref(`/users/${user}/Groups`).push({
          groupName
        });

        groupRef.child(groupName).once('value', (groupSnapshot) => {
          if (groupSnapshot.exists()) {
            groupRef.child(groupName).child('Users').child(userName)
              .set(userName);
            groupRef.child(groupName).child('Email').push(email);
            groupRef.child(groupName).child('Number').push(number);
          } else {
            res.status(404).json({ message: 'Group dose not exists' });
          }
        })
        .then(() => {
          res.status(201).json({
            message: 'User added successfully',
            user,
            groupName
          });
        });
      } else {
        res.status(404).json({
          message: 'The User dose not exist'
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Internal server error'
      });
    });
  }


  /**
* @description: This method retrieves all groups the user belongs to
*
* @param {Object} req request object
* @param {Object} res response object
*
* @return {Object} response containing all users and messages in a group
*/
  static getGroups(req, res) {
    const userName = req.params.userName;
    const groups = [];
    usersRef.child(userName).child('Groups')
    .once('value', (snap) => {
      snap.forEach((data) => {
        groups.push({
          groupName: data.val().groupName
        });
      });
      if (groups.length === 0) {
        res.status(200).json(
          { message: 'You currently do not belong to a group' }
        );
      } else {
        res.status(200).send(groups);
      }
    }).catch(() => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }

  /**
 * @description: This method retrieves all users and messages in a group.
 * It will also save user who have read a message
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users nd messages of a group
 */
  static getUsersMessagesInGroups(req, res) {
    const groupName = req.params.groupName;
    const userName = req.params.user;

    const messages = [];
    const users = [];

    groupRef.child(groupName).child('Messages').limitToLast(14)
    .once('value', (snap) => {
      snap.forEach((data) => {
        messages.push({
          id: data.key,
          user: data.val().user,
          message: data.val().message,
          time: data.val().time,
          priority: data.val().priority
        });
      });

      groupRef.child(groupName).child('Users')
      .once('value', (userSnapshot) => {
        userSnapshot.forEach((data) => {
          users.push({
            userName: data.val()
          });
        });

        saveUserHasSeenMessage(groupName, userName);

        res.status(200).json({
          message: `Getting Messages and Users in ${groupName} database`,
          messages,
          users
        });
      });
    })
    .catch(() => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }

}


export default Group;
