const firebase = require('firebase');

const configuration = {
  apiKey: process.env.DB_KEY,
  authDomain: process.env.DB_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.DB_ID,
  storageBucket: process.env.DB_STORAGE,
  messagingSenderId: process.env.DB_SENDER
};

firebase.initializeApp(configuration);

const firebaseAuth = firebase.auth();

const db = firebase.database();
const usersRef = db.ref('users');
const groupRef = db.ref('Groups');

const provider = new firebase.auth.GoogleAuthProvider();

module.exports = {
  firebase,
  db,
  usersRef,
  groupRef,
  firebaseAuth,
  provider,
};

