export const error = {
  response: {
    data: {
      message: 'Internal Server Error'
    }
  }
};

export const newStateProperty = {
  isAuthenticated: true,
  userName: 'Ebuka'
};

export const newObjectProperty = {
  user: 'Ebuka',
  allUsers: ['John', 'August'],
  groups: ['Andela', 'BookStore'],
  currentGroup: 'Andela',
  databaseUsers: ['James', 'August'],
  notification: ['James posted in Andela Group']
};

export const props = {
  group: [{ groupName: 'Andela' }],
  allUsers: ['George', 'Phil', 'Odim'],
  notification: ['George has posted in Green group'],
  userName: 'George'
};

export const dashboardProps = {
  createGroupModal: true,
  addUserModal: true,
  notificationModal: true,
  groupName: 'Pie',
  userName: 'George',
  users: ['Luke', 'John']
};

export const googleDetail = {
  displayName: 'Kate',
  email: 'kate@gmail.com',
  number: 2348900839454,
  uid: 23489008394542348900839454
};

export const messageProps = {
  message: [{ message: 'I am a message' }],
  group: 'Andela'
};

export const event = {
  target: {
    name: 'name',
    value: 'value',
  },
  preventDefault: () => jest.fn()
};

const displayName = 'Barak';
const name = 'Barak Obama';
const phoneNumber = '2348044675987';
const email = 'bash@gmail.com';
const uid = '343526282927345#$$$#dgskaidb';
const photoURL = 'https://history.indiana.edu/images/no-photo.jpg';
const password = '12345674';
export const users = ['John', 'Femi'];
const group = 'Andela';
const notification = ['Ebuka posted in Andela group'];

export const message = {
  name,
  group,
  notification,
  text: 'I am a message',
  time: '12:32',
  priority: 'Normal'
};

export const userDetails = {
  name,
  email,
  phoneNumber,
  password
};

export const user = {
  email,
  password
};

export const googleUser = {
  displayName,
  email,
  uid,
  photoURL
};
