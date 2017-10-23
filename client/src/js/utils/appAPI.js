import axios from 'axios';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';

module.exports = {
  saveContact(contact) {
    return axios.post('/user/signup', {
      userName: contact.username,
      email: contact.email,
      password: contact.password,
      number: contact.number
    }).then((response) => {
      const user = response.data.userData;
      if (response.data.message ===
         'The email address is already in use by another account.') {
        toastr.error(response.data.message);
      } else if (response.data.message ===
         'The email address is badly formatted.') {
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        toastr.success('Welcome,  An email will be sent to you.');
      }
    }).catch((error) => {
      toastr.error(error);
    });
  },

  getContacts() {
    return axios.get('/users/allusers')
      .then((contacts) => {
        AppActions.receiveContact(contacts.data);
      })
      .catch((error) => {
        toastr.error(error);
      });
  },

  getNumbers() {
    return axios.get('/users/allnumbers')
        .then((response) => {
          AppActions.receiveNumber(response.data);
        })
        .catch((error) => {
          toastr.error(error);
        });
  },

  getEmails() {
    return axios.get('/users/allemails')
        .then((response) => {
          AppActions.receiveEmails(response.data);
        })
        .catch((error) => {
          toastr.error(error);
        });
  },

  saveGroup(group) {
    return axios.post('/group', {
      groupName: group.groupName,
      userName: group.userName
    }).then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      toastr.error(error);
    });
  },

  getGroups(userName) {
    return axios.get(`/group/${userName}`)
    .then((response) => {
      const groups = response.data;
      AppActions.receiveGroups(groups);
    }).catch((error) => {
      toastr.error(error);
    });
  },

  getNotifications(userName) {
    return axios.get(`/user/notification/${userName}`)
    .then((response) => {
      const notification = response.data;
      AppActions.receiveNotification(notification);
    })
    .catch((error) => {
      toastr.error(error);
    });
  },

  addUserToGroup(addUser) {
    return axios.post('/group/groupName/user', {
      groupName: addUser.groupname,
      user: addUser.userName
    })
    .then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      toastr.error(error);
    });
  },

  saveMessages(message) {
    return axios.post('/group/user/message', {
      group: message.group,
      user: message.user,
      message: message.text,
      notification: message.notification,
      priority: message.priority
    })
    .then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      toastr.error(error);
    });
  },

  seenMessage(user) {
    const groupName = user.groupName;
    const messageID = user.messageID;
    return axios.get(`/seen/${groupName}/${messageID}`)
    .then((response) => {
      AppActions.receiveSeenUsers(response.data);
    })
    .catch((error) => {
      toastr.error(error);
    });
  },

  login(contact) {
    return axios.post('/user/signin', {
      email: contact.email,
      password: contact.password
    }).then((response) => {
      const user = response.data.userData;
      if (response.data === 'There is no user record corresponding to this ') {
        toastr.error(response.data);
      } else if (response.data.message ===
         'The password is invalid or the user does not have a password.') {
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        toastr.success('Welcome To PostIt');
      }
    }).catch(() => {
      toastr.error('Your email or password is invalid');
    });
  },

  setLogout() {
    return axios.post('/user/signout').then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      toastr.error(error);
    });
  },

  searchUserMessageInGroup(group) {
    const groupName = group.groupName;
    const user = group.userName;
    return axios.get(`/groups/${groupName}/${user}`)
      .then((response) => {
        const messages = response.data.messages;
        const users = response.data.users;
        AppActions.receiveMessages(messages);
        AppActions.receiveUser(users);
      })
      .catch((error) => {
        toastr.error(error);
      });
  },

  googleSignUp(googleUser) {
    const userName = googleUser.username.replace(' ', '');
    const email = googleUser.email;
    const number = googleUser.number;
    const uid = googleUser.uid;

    return axios.post('/google/signup', {
      userName,
      email,
      number,
      uid
    }).then((response) => {
      const user = response.data;
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    }).catch((error) => {
      toastr.error(error);
    });
  },

  resetPassword(email) {
    return axios.post('/user/reset', { email
    }).then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      toastr.error(error);
    });
  },

};

