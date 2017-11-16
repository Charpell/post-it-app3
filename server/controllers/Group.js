import config from './../config';
import {
  capitalizeFirstLetter, saveUserHasSeenMessage, checkIfGroupExist,
  checkIfUserExist, checkGroupNotExist, addGroupData, isUserInGroup,
  getGroupErrors, getUsersInGroup
 } from './../helpers/utils';

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
    checkIfGroupExist(groupName)
    .then(() => {
      groupRef.child(groupName).child('Users').child(userName)
      .set(userName);
      return userDatabase.ref(`/users/${userName}/Groups`).push({
        groupName
      });
    })
    .then(() => {
      res.status(201).json({
        message: `Group ${groupName} created`,
        groupName,
        userName
      });
    })
    .catch((error) => {
      const groupErrors = getGroupErrors(error);
      res.status(groupErrors.code).json({
        message: groupErrors.message
      });
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

    let userData;
    checkIfUserExist(user).then((response) => {
      userData = response;
      return checkGroupNotExist(groupName);
    })
    .then(() => isUserInGroup(groupName, user)).then(() => {
      addGroupData(groupName, userData);
      res.status(201).json({
        message: 'User added successfully',
        user,
        groupName
      });
    })
    .catch((error) => {
      const groupErrors = getGroupErrors(error);
      res.status(groupErrors.code).json({
        message: groupErrors.message
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
    });
    getUsersInGroup(groupName).then((users) => {
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
    })
    .catch(() => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }

}


export default Group;
