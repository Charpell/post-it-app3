import chai from 'chai';

import { capitalizeFirstLetter } from './../server/helpers/utils';

const expect = chai.expect;

describe('EndPoint: Utils helper function', () => {
  const userName = 'john';

  it('should expect the type to be a function', () => {
    expect(capitalizeFirstLetter).to.be.a('function');
  });

  it('should return a string with the first word an uppercase character',
   () => {
     expect(capitalizeFirstLetter(userName)).equal('John');
   });
});

  // describe('EndPoint: validStringContent Function', () => {
  //   it('should return true when no parameter is given', () => {
  //     expect(validStringContent('', '')).equal(true);
  //   });

  //   it('It expects the type to a Function', () => {
  //     expect(validStringContent).to.be.a('function');
  //   });

  //   it('should return true when the two parameter are greater than 1', () => {
  //     expect(validStringContent(userName, groupName)).equal(true);
  //   });

  //   it('should return false', () => {
  //     expect(validStringContent(userName, '.')).equal(false);
  //   });

  //   it('should return false', () => {
  //     expect(validStringContent('#', '&')).equal(false);
  //   });
  // });

