const chai = require('chai');
const app = require('../server/app');
const { validStringContent, validStringLength } = require('../server/helpers/validate.helper');

const expect = chai.expect;

describe('EndPoint: Helper Functions', () => {
    const userName = 'John';
    const groupName = 'Andela'


    describe('EndPoint: ValidStringLength Function', () => {

      it('It returns null when no parameter is given', () => {
        expect(validStringLength('','')).equal(null); 
      });
  
      it('It expects the type to a Function', () => {
        expect(validStringLength).to.be.a('function');
      });
  
      it('It returns true when the two parameter are greater than 1', () => {
        expect(validStringLength(userName, groupName)).equal(true); 
      });
  
      it('It returns null when no group name is missing', () => {
        expect(validStringLength(userName, '')).equal(null); 
      });
  
      it('It returns null when no user name is missing', () => {
        expect(validStringLength('', groupName)).equal(null);   
      }); 
  })

  describe('EndPoint: validStringContent Function', () => {
    
          it('It returns true when no parameter is given', () => {
            expect(validStringContent('','')).equal(true); 
          });
      
          it('It expects the type to a Function', () => {
            expect(validStringContent).to.be.a('function');
          });
      
          it('It returns true when the two parameter are greater than 1', () => {
            expect(validStringContent(userName, groupName)).equal(true); 
          });
      
          it('It returns false', () => {
            expect(validStringContent(userName, '.')).equal(false); 
          });
      
          it('It returns false', () => {
            expect(validStringContent('#', '&')).equal(false);   
          }); 
      })



})
