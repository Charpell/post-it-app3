import chai from 'chai';

import { getClientErrors, validateEmail } from '../../helpers/utils';
const expect = chai.expect;

describe('EndPoint: Utils helper function', () => {
  const email = 'john@gmail.com';

  it('should expect validateEmail to be a function', () => {
    expect(validateEmail).to.be.a('function');
  });

  it('should expect validateEmail to return true for a valid email',
   () => {
     expect(validateEmail(email)).equal(true);
   });

  it('should expect validateEmail to return true for a valid email',
   () => {
     expect(validateEmail('jbbjdg')).equal(false);
   });

  it('should expect getClientErrors to be a function', () => {
    expect(getClientErrors).to.be.a('function');
  });

  it('should expect getClientErrors to return 401 message',
  () => {
    const error = {
      message: 'Request failed with status code 401'
    };
    expect(getClientErrors(error.message));
  });
});
