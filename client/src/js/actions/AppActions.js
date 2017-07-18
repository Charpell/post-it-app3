import AppDispatcher from '../dispatcher/appDispatcher';
import AppConstants from '../constants/appConstants';

const AppActions = { 
    saveContact(contact){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_CONTACT,
            contact
        })

    },

   receiveContact(contacts){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_CONTACT,
            contacts
        })

    },

    receiveNumber(number){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_ALLUSERS_NUMBER,
            number
        })

    },

    removeMessage(messageId){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.REMOVE_MESSAGE,
            messageId
        })

    },

    saveGroup(group){
        AppDispatcher.handleViewAction({
        actionType: AppConstants.SAVE_GROUP,
        group
      })
        
    }, 

    receiveGroup(groups){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_GROUP,
            groups
        })

    },
       receiveNotification(notification){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_NOTIFICATION,
            notification
        })

    },

        receivePersonalMessage(message){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_PERSONAL_MESSAGE,
            message
        })

    },

    saveGroupUser(addUser){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_GROUP_USER,
            addUser
        })
        
    },

     saveMessage(message){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SAVE_MESSAGE,
            message
        })
        
    },
    receiveMessages(message){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_MESSAGE,
            message
        })

    },
     login(contact){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SIGN_IN,
            contact
        })
        
    },
      receiveLogin(user){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.RECEIVE_LOGIN,
            user
        })
        
    },
      searchUserMessage(keyName){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SEARCH_USER_MESSAGE,
            keyName
        })
           
    }, 
     google(googleUser){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.GOOGLE,
            googleUser
            
        })
        
    },
      logout(){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.LOGOUT
            
        })
        
    },
       receiveUserMessage(users){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_USER_MESSAGE,
            users
        })

    },
       receiveEmails(emails){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_EMAILS,
            emails
        })

    },
      receiveNumbers(numbers){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_NUMBERS,
            numbers
        })

    },

       displayName(displayName){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.DISPLAY_NAME,
            displayName
        })

    },
       resetPassword(email){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RESET_PASSWORD,
            email
        })

    },

        notification(notify){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.NOTIFICATION,
            notify
        })

    },





}
module.exports = AppActions;