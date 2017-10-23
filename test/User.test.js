const chaiHttp = require('chai-http');
const chai = require('chai');
const request = require('supertest');

const app = require('../server/app');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const password = '123456';

describe('EndPoint: SignUp', () => {
  const userName = 'Kakashi';
  const email = 'kishis@gmail.com';
  const number = '2348066098146';

  it('should return 200 when a user sign up successfully', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Welcome to Post it app');
        res.body.should.have.nested.property('userData.email')
        .eql('kishis@gmail.com');
        res.body.should.have.nested.property('userData.displayName')
        .eql('Kakashi');
        res.body.should.have.nested.property('userData.uid');
        res.body.should.have.nested.property('userData.apiKey');
        res.body.should.have.nested.property('userData.photoURL');
        res.body.should.have.nested.property('userData.emailVerified');
        res.body.should.have.nested.property('userData.phoneNumber');
        res.body.should.have.nested.property('userData.isAnonymous');
        res.body.should.have.nested.property('userData.authDomain');
        if (err) return done(err);
        done();
      });
  });


  it('should return status 400 for missing username', (done) => {
    request(app)
      .post('/user/signup')
      .send({ email, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide username, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing phone number', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide username, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide username, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide username, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for empty username field', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName: '', email, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username, password, number or email field cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for empty phone number field', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, password, number: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username, password, number or email field cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for empty email field', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email: '', password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username, password, number or email field cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number, password: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username, password, number or email field cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for badly formatted email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 409 for existing email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number, email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is already in use by another account.');
        if (err) return done(err);
        done();
      });
  });


  it('should return status 400 for a weak password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number, password: '1234' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Password should be at least 6 characters');
        if (err) return done(err);
        done();
      });
  });
});


describe('SignIn Route', () => {
  const email = 'jat@gmail.com';
  it('should return status 200 for when all parameters are complete',
  (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('Welcome to Post it app');
        res.body.should.have.nested.property('userData.email')
        .eql('jat@gmail.com');
        res.body.should.have.nested.property('userData.displayName')
        .eql('Jat');
        res.body.should.have.nested.property('userData.uid')
        .eql('Sb1mgQOVOoXafC3MMnQXVjKlPdJ2');
        res.body.should.have.nested.property('userData.apiKey')
        .eql('AIzaSyDx5Xi4OxL1F18jqNO1L1JyAhO8CM3J3h0');
        res.body.should.have.nested.property('userData.authDomain')
        .eql('post-it-app-8b2cb.firebaseapp.com');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing email', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You need to provide password and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing password', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You need to provide password and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 when email field is empty', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email: '', password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Email or Password field cannot be empty.');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 when password field is empty', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Email or Password field cannot be empty.');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for badly fomatted email', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 404 if a email/user dose not exist', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password, email: 'hhd@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('There is no user record corresponding to this email.');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 404 for a password that does not exist', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password: '123456ggh' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The password is invalid or the user does not have a password.');
        if (err) return done(err);
        done();
      });
  });
});

describe('Google SignUp Route', () => {
  const userName = 'Gideon';
  const email = 'emekasmithyu@gmal.com';
  const number = '2348066098146';
  const uid = 'rbjxWT5b4AfHirNE4IDlS0ELk882';

  it('should return status 400 for missing username', (done) => {
    request(app)
      .post('/google/signup')
      .send({ email, uid, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing phone number', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing email', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, uid, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for missing uid', (done) => {
    request(app)
    .post('/google/signup')
    .send({ userName, email, number })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be
      .eql('You need to provide userName, uid, number and email');
      if (err) return done(err);
      done();
    });
  });
  it('should return status 400 for empty uid field', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, number, uid: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('userName, uid, number or email cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for empty username field', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName: '', email, number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('userName, uid, number or email cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for empty empty field', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email: '', number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('userName, uid, number or email cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for empty number field', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, number: '', uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('userName, uid, number or email cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 409 for existing Username', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username already exist');
        if (err) return done(err);
        done();
      });
  });
});


describe('Home Page', () => {
  it('should return a status of 200 on the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return a status of 200 when a random route is used ', (done) => {
    request(app)
      .get('/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


describe('SignOut Route', () => {
  it('should return status 200 when the user sign out', (done) => {
    request(app)
      .post('/user/signout')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You have successfully signed out');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Reset Password', () => {
  const invalidEmail = 'gfhr@gmail.com';
  const email = 'wesumeh@gmail.com';

  it('should return 200 when a user logs in successfully', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });


  it('should return status 200 when the email is valid for reset', (done) => {
    request(app)
      .post('/user/reset')
      .send({ email: 'wesumeh@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('An email has been sent for password reset.');
        if (err) return done(err);
        done();
      });
  });


  it('should return status 404 if a email/user dose not exist', (done) => {
    request(app)
      .post('/user/reset')
      .send({ email: invalidEmail })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Email address does not exist');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for badly formatted email', (done) => {
    request(app)
      .post('/user/reset')
      .send({ email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: Get all Phone Numbers from the Database', () => {
  it('should return status 200 when all users are returned', (done) => {
    request(app)
      .get('/users/allnumbers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(23);
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Emails from the Database', () => {
  it('should return status 200 when all emails are returned', (done) => {
    request(app)
      .get('/users/allemails')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(23);
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Users from the Database', () => {
  it('should return status 200 when all users are returned', (done) => {
    request(app)
      .get('/users/allusers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(23);
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: Get all Notification for a User', () => {

  it('should return status 200 when all notifications are received', (done) => {
    request(app)
      .get('/user/notification/Jat')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(1);
        if (err) return done(err);
        done();
      });
  });

  it('should return status 200 when a googleUser logs in', (done) => {
    request(app)
      .get('/user/notification/Ebuka')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(7);
        if (err) return done(err);
        done();
      });
  });
});

