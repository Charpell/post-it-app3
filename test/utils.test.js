import chai from 'chai';

import { capitalizeFirstLetter } from './../server/helpers/utils';

const expect = chai.expect;

describe('CapitalizeFirstLetter function', () => {
  const userName = 'john';

  it('should expect the type to be a function', () => {
    expect(capitalizeFirstLetter).to.be.a('function');
  });

  it('should return a string with the first word an uppercase character',
   () => {
     expect(capitalizeFirstLetter(userName)).equal('John');
   });
});

