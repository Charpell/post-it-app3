import config from './../config';
import { capitalizeFirstLetter } from './../helpers/utils';

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

    const currentUser = firebase.auth().currentUser;
    let googleAuth = false;

    usersRef.child(userName).child('google')
    .once('value', (googleSnapshot) => {
      if (googleSnapshot.exists()) {
        googleAuth = true;
      }
      if (currentUser || googleAuth) {
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
        });
      } else {
        res.status(401).send('Access denied; You need to sign in');
      }
    }).catch(() => {
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
    }).catch(() => {
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
    const currentUser = firebase.auth().currentUser;
    let googleAuth = false;

    usersRef.child(userName).child('google').once('value', (snapshot) => {
      if (snapshot.exists()) {
        googleAuth = true;
      }
      if (currentUser || googleAuth) {
        const groups = [];
        let group = {};
        usersRef
        .child(userName)
        .child('Groups')
        .once('value', (snap) => {
          snap.forEach((data) => {
            group = {
              groupName: data.val().groupName
            };
            groups.push(group);
          });
          res.status(200).send(groups);
        }).catch(() => {
          res.status(500).send({
            message: 'Internal Server Error'
          });
        });
      } else {
        res.status(401).send('Access denied; You need to sign in');
      }
    });
  }

  /**
 * @description: This method retrieves all users and messages in a group
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users nd messages of a group
 */
  static getUsersMessagesInGroups(req, res) {
    const groupName = req.params.groupName;
    const userName = req.params.user;

    const currentUser = firebase.auth().currentUser;
    let googleAuth = false;

    usersRef.child(userName).child('google').once('value', (snapshot) => {
      if (snapshot.exists()) {
        googleAuth = true;
      }
      if (currentUser || googleAuth) {
        const messages = [];
        const users = [];
        const messageRef = firebase.database()
          .ref()
          .child('Groups')
          .child(groupName)
          .child('Messages')
          .limitToLast(14);
        messageRef.once('value', (snap) => {
          let message = {};
          snap.forEach((data) => {
            message = {
              id: data.key,
              user: data.val().user,
              message: data.val().message,
              time: data.val().time,
              priority: data.val().priority
            };
            messages.push(message);
          });

          const userRef = firebase.database().ref()
          .child('Groups').child(groupName)
          .child('Users');
          
          userRef.once('value', (userSnapshot) => {
            let user = {};
            userSnapshot.forEach((data) => {
              user = {
                userName: data.val()
              };
              users.push(user);
            });

            res.status(200).json({
              message: `Getting Messages and Users in ${groupName} database`,
              messages,
              users
            });
          });
        });
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
      } else {
        res.status(401).send('Access denied; You need to sign in');
      }
    }).catch(() => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }

}


export default Group;
