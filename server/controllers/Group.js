import config from './../config';
import { capitalizeFirstLetter, saveUserHasSeenMessage }
from './../helpers/utils';

const { usersRef, groupRef, firebase } = config;

const saveNodes = (nodes) => {
  nodes.forEach((node) => {
    if (node.field === 'Users') {
      groupRef
        .child(node.groupName)
        .child('Users')
        .child(node.value)
        .set(node.value);
    } else {
      groupRef
        .child(node.groupName)
        .child(node.field)
        .push(node.value);
      }
  })
}
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
  * @method createGroup
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

      const nodes = [
        { groupName, field: 'Users', value: userName },
        { groupName, field: 'Users', value: 'Bot' },
        { groupName, field: 'Email', value: 'bot@postit.com' },
        { groupName, field: 'Number', value: '2348066098141' },
        { groupName, field: 'Messages/Seen', value: null },
      ];

      if (!snapshot.exists()) {
        saveNodes(nodes);
        // groupRef
        // .child(groupName)
        // .child('Users')
        // .child(userName)
        // .set(userName);
        
        // groupRef.child(groupName)
        // .child('Users')
        // .child('Bot')
        // .set('Bot');
        
        
        // groupRef.child(groupName).child('Email').push('bot@postit.com');
        // groupRef.child(groupName).child('Number').push('2348066098141');
        // groupRef.child(groupName).child('Messages/Seen').push(null);

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
        res.status(409).json({ message: 'Group already exist' });
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
    usersRef.child(user).once('value', (snapShot) => {
      if (snapShot.exists()) {
        const userName = snapShot.val().userName;
        const email = snapShot.val().email;
        const number = snapShot.val().number;
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
            res.status(404).json({ message: 'Group does not exist' });
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
          message: 'The User does not exist'
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
* @method getUserGroups
*
* @param {Object} req request object
* @param {Object} res response object
*
* @return {Object} response containing all users and messages in a group
*/
  static getUserGroups(req, res) {
    const userName = req.params.userName;
    const groups = [];
    usersRef.child(userName).child('Groups')
    .once('value', (snapShot) => {
      snapShot.forEach((groupSnapShot) => {
        groups.push({
          groupName: groupSnapShot.val().groupName
        });
      });
      if (groups.length === 0) {
        res.status(200).json({
          message: 'You currently do not belong to a group',
          groups: []
        });
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
 * @method getGroupMessages
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users nd messages of a group
 */
  static getGroupMessages(req, res) {
    const { groupName, userName } = req.params;

    const messages = [];
    const users = [];
    groupRef.child(groupName).child('Messages').limitToLast(14)
    .once('value', (snapShot) => {
      snapShot.forEach((messageSnapShot) => {
        messages.push({
          id: messageSnapShot.key,
          user: messageSnapShot.val().user,
          message: messageSnapShot.val().message,
          time: messageSnapShot.val().time,
          priority: messageSnapShot.val().priority
        });
      });
      groupRef.child(groupName).child('Users')
      .once('value', (userSnapshot) => {
        userSnapshot.forEach((userValue) => {
          users.push({
            userName: userValue.val()
          });
        });

        saveUserHasSeenMessage(groupName, userName);

        if (messages.length === 0) {
          res.status(200).json({
            message: 'The group currently has no message',
            messages: [],
            users
          });

        } else {
          res.status(200).json({
            message: `Messages and Users in ${groupName} database`,
            messages,
            users
          });
        }
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
