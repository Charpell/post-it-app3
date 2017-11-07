import express from 'express';
import User from './controllers/User';
import Group from './controllers/Group';
import Message from './controllers/Message';
import Validate from './helpers/Validate';

const router = express.Router();

router.post('/api/v1/user/signup', Validate.validateSignUp, User.signup);
router.post('/api/v1/user/signin', Validate.validateSignIn, User.signin);
router.post('/api/v1/google/signup', Validate.validateGoogleSignUp,
User.googleSignup);
router.post('/api/v1/user/signout', User.signout);
router.post('/api/v1/user/reset/', User.resetPassword);
router.post('/api/v1/group', Validate.createGroup, Group.createGroup);
router.post('/api/v1/group/groupName/user', Validate.addUserToGroup,
Group.addUserToGroup);
router.post('/api/v1/group/user/message/', Validate.createMessage,
Message.createMessage);
router.get('/api/v1/group/:userName', Group.getGroups);
router.get('/api/v1/user/notification/:user', User.getNotification);
router.get('/api/v1/groups/:groupName/:user', Group.getUsersMessagesInGroups);
router.get('/api/v1/users/allusers/', User.getAllUsers);
router.get('/api/v1/users/allnumbers/', User.getAllNumbers);
router.get('/api/v1/users/allemails/', User.getAllEmails);
router.get('/api/v1/seen/:groupName/:messageID', Message.getReadMessageUsers);

module.exports = router;
