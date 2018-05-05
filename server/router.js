import express from 'express';

import User from './controllers/User';
import Group from './controllers/Group';
import Message from './controllers/Message';
import Validate from './helpers/Validate';
import jwtTokenValidation from './helpers/jwtTokenValidation';

const router = express.Router();

router.post('/api/v1/user/signup',
  Validate.validatesNewUser,
  Validate.validatesEmail,
  Validate.validatesPassword,
  User.signUp
);

router.post('/api/v1/user/signin',
  Validate.validatesEmail,
  Validate.validatesPassword,
  User.signIn
);

router.post('/api/v1/google/signup',
  Validate.validatesNewUser,
  Validate.validatesEmail,
  Validate.validatesUid,
  User.registerGoogleUser
);

router.post('/api/v1/user/signout',
  Validate.isAuthenticated,
  User.signout
);

router.post('/api/v1/user/reset/',
  Validate.isAuthenticated,
  Validate.validatesEmail,
  User.resetPassword
);

router.post('/api/v1/group',
  Validate.isAuthenticated,
  Validate.createGroup,
  Group.createGroup
);

router.post('/api/v1/group/groupName/user',
  Validate.isAuthenticated,
  Validate.addUserToGroup,
  Group.addUserToGroup
);

router.post('/api/v1/group/user/message/',
  Validate.isAuthenticated,
  Validate.createMessage,
  Message.createMessage
);

router.get('/api/v1/group/:userName',
  jwtTokenValidation,
  Group.getUserGroups
);

router.get('/api/v1/user/notification/:user',
  Validate.isAuthenticated,
  User.getNotification
);

router.get('/api/v1/groups/:groupName/:userName',
  Validate.isAuthenticated,
  Group.getGroupMessages
);

router.get('/api/v1/users/users/',
  Validate.isAuthenticated,
  User.getUsers
);

router.get('/api/v1/users/numbers/',
  Validate.isAuthenticated,
  User.getNumbers
);

router.get('/api/v1/users/emails/',
  Validate.isAuthenticated,
  User.getEmails
);

router.get('/api/v1/seen/:groupName/:messageID',
  Validate.isAuthenticated,
  Message.getUsersSeenAMessage
);

export default router;
