import toastr from 'toastr';
import AppActions from '../actions/AppActions';

/**
 * @description describes a method that returns error message from the client
 *
 * @function getClientErrors
 *
 * @param {error} error
 *
 * @return {object} returns custom error message
 *
 */
export const getClientErrors = (error) => {
  if (error.message === 'Request failed with status code 401') {
    AppActions.logout();
  } else if (error.message === 'Request failed with status code 500') {
    toastr.error('Sorry, an unexpected error occurred.');
  } else if (error.message === 'Network Error') {
    toastr.error('Sorry, there was an error in network connection');
  } else {
    const message = error.response.data.message;
    toastr.error(message);
  }
};


/**
 * @description decribes a method that validates the user's email
 *
 * @function validateEmail
 *
 * @param {email} email to verify
 *
 * @return {boolean} returns the email if it is valid
 *
 */
export const validateEmail = (email) => {
  const emailExpression = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/;
  return emailExpression.test(email);
};

/**
 * @description decribes a method that gets the username from local storage
 *
 * @function getUsername
 *
 * @return {String} returns the username
 *
 */
export const getUsername = () =>
  JSON.parse(localStorage.getItem('user'));

