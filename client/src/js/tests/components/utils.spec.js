import chai from 'chai';

import { getClientErrors, validateEmail } from '../../helpers/utils';
import { error } from '../mocks/seeder';
const expect = chai.expect;

describe('EndPoint: validateEmail', () => {
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
});

describe('EndPoint: getClientErrors', () => {
  it('should expect getClientErrors to be a function', () => {
    expect(getClientErrors).to.be.a('function');
  });

  it('should expect getClientErrors to return an error message',
  () => {
    expect(getClientErrors(error));
  });
});
