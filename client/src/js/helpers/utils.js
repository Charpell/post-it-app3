import toastr from 'toastr';

/**
 * @function ToastrError
 *
 * @param { error } error
 *
 * @return { object } returns the error message
 *
 */
export const getToastError = (error) => {
  const message = error.response.data.message;
  toastr.error(message);
};


/**
 * @function validateEmail
 *
 * @param { email } email to verify
 *
 * @return { boolean } returns the email if it is valid
 *
 */
export const validateEmail = (email) => {
  const emailExpression = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/;
  return emailExpression.test(email);
};
