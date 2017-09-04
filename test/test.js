const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server/app');
const request = require('supertest');


chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;


describe('EndPoint: SignUp', () => {
  const userName = 'kahn';
  const password = 'ebuka12345';
  const email = 'ebuka@gmail.com';
  const number = '2348066098146';

  it('It returns status 201 for when all parameters are complete and a user is created', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201, done);
        if (err) return done(err);
        done();
      });
      
  })

  it('It should return status 400 for missing username', (done) => {
    request(app)
      .post('/user/signup')
      .send({ email, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing phone number', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for badly formatted email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number, email:'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 409 for existing email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number, email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('The email address is already in use by another account.');
        if (err) return done(err);
        done();
      });
  });

  
  it('It should return status 400 for missing password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for a weak password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number, password: '1234' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Password should be at least 6 characters');
        if (err) return done(err);
        done();
      });
  });

 })


 describe('SignIn Route', () => {
  
  const email = 'hh@gmail.com';
  const password = '123456';

  it('It returns status 200 for when all parameters are complete', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        if (err) return done(err);
        done();
      });
  });
  it('It returns status 400 for missing email', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('You need to provide password and email');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 for badly fomatted email', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 401 if a email/user dose not exist', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password, email: 'hhd@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('There is no user record corresponding to this identifier. The user may have been deleted.');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 for missing password', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('You need to provide password and email');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 401 for Invalid Password', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password:'123456ggh' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('The password is invalid or the user does not have a password.');
        if (err) return done(err);
        done();
      });
  });
})


describe('Home Page', () => {
  it('It returns a status of 200 and welcomes user`s to the home page', (done) => {
    chai.request(app)
      .get('/')   
      .end((err, res) => {        
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It returns a status of 200 when a random route is used ', (done) => {
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
  it('It returns status 200 when the user sign out', (done) => {
    request(app)
      .post('/user/signout')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('You are successfully signed out');
        if (err) return done(err);
        done();
      });
  });
});


describe('Create Group', () => {
  const groupName = 'Bugger';
  const userName = 'Ebuka';
  it('It returns status 201 when the user creates group', (done) => {
    request(app)
      .post('/group')
      .send({ groupName, userName })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 when the Group Name is Invalid', (done) => {
    request(app)
      .post('/group')
      .send({ userName, groupName:'' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Username or Groupname is invalid')
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 when the User Name is Invalid', (done) => {
    request(app)
      .post('/group')
      .send({ groupName, userName: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Username or Groupname is invalid')
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 409 when the group already exist', (done) => {
    request(app)
      .post('/group')
      .send({ groupName, userName })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Group already exists')
        if (err) return done(err);
        done();
      });
  });


});


