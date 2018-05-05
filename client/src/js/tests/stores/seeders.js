import AppConstants from '../../constants/AppConstants';

export const postMessage = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.POST_MESSAGE,
    message: {
      user: 'Ebuka',
      group: 'Andela',
      message: 'I am a message',
      time: '12.59pm',
      notification: 'Ebuka posted in Andela Group',
      priority: 'Normal'
    },
  },
};

export const registerUser = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.SIGN_UP,
    payload: {
      userName: 'New User',
      email: 'dannytebj@gmail.com',
      password: 'asd123',
      phoneNumber: '09876543212',
    },
  },
};

export const loginUser = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_LOGIN,
    payload: {
      displayName: 'Lax',
      token: '1234567'
    },
  },
};

export const receiveUsers = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_USERS,
    users: ['David', 'Tom', 'John']
  },
};

export const receiveEmails = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_EMAILS,
    emails: ['some@gmail.com', 'tom@gmail.com', 'john@gmail.com']
  },
};

export const receiveNumbers = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_NUMBERS,
    numbers: [2348900839454, 2348900679454, 2348945839454]
  },
};

export const createGroup = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.CREATE_GROUP,
    group: {
      groupName: 'Twitter',
      userName: 'Frank'
    },
  },
};

export const getGroups = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_GROUPS,
    groups: ['Andela', 'BookStore']
  },
};


export const getNotifications = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_NOTIFICATION,
    notification: ['Frank has posted in Green group']
  },
};

export const addUserToGroup = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.ADD_USER_TO_GROUP,
    group: {
      groupName: 'Twitter',
      userName: 'George'
    },
  },
};

export const seenUser = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.SEEN_MESSAGE,
    users: ['Dan']
  },
};

export const receiveSeenUsers = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_SEEN_USERS,
    users: ['Dan', 'Joe']
  },
};

export const googleLogin = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GOOGLE_LOGIN,
    googleUser: {
      displayName: 'Bestman',
      email: 'dannytebj@gmail.com',
      password: 'asd123'
    },
  },
};

export const googleRegister = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GOOGLE_SIGNUP,
    googleUser: {
      displayName: 'Bestman',
      email: 'dannytebj@gmail.com',
      password: 'asd123',
      phoneNumber: '09876543212',
    },
  },
};

export const setCurrentGroup = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.SEARCH_USER_MESSAGE,
    group: {
      groupName: 'Soccer'
    },
  },
};

export const usersInGroup = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RECEIVE_USER,
    users: ['David', 'Tom', 'John']
  },
};

export const resetPassword = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.RESET_PASSWORD,
    email: 'tam@gmail.com'
  },
};

export const notifications = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.NOTIFICATIONS,
    userName: 'George'
  },
};
