const chaiHttp = require('chai-http');
const chai = require('chai');

const app = require('../server/app');
const request = require('supertest');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const email = 'newton@gmail.com';
const password = '123456';

describe('Create Message', () => {
  const group = 'Facebook';
  const user = 'Newton';
  const message = 'This is a test message';
  const notification = 'Newton has posted in Facebook group';
  const priority = 'Normal';


  it('should return status 200 when the user logs in',
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
        .eql('newton@gmail.com');
        res.body.should.have.nested.property('userData.displayName')
        .eql('Newton');
        res.body.should.have.nested.property('userData.uid')
        .eql('iw1fohfINNfbOJbjBwy0jDQ8rlH2');
        res.body.should.have.nested.property('userData.apiKey')
        .eql('AIzaSyDx5Xi4OxL1F18jqNO1L1JyAhO8CM3J3h0');
        res.body.should.have.nested.property('userData.authDomain')
        .eql('post-it-app-8b2cb.firebaseapp.com');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 201 when a message is created', (done) => {
    request(app)
      .post('/group/user/message')
      .send({ group, user, message, notification, priority })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Message posted successfully');
        res.body.should.have.property('messageData');
        res.body.should.have.property('messageData')
        .eql('This is a test message');
        res.body.should.have.property('group');
        res.body.should.have.property('group')
        .eql('Facebook');
        res.body.should.have.property('user');
        res.body.should.have.property('user')
        .eql('Newton');
        res.body.should.have.property('notification');
        res.body.should.have.property('notification')
        .eql('Newton has posted in Facebook group');
        res.body.should.have.property('priority');
        res.body.should.have.property('priority')
        .eql('Normal');
        done();
      });
  });


  it('should return status 400 when the Group Name or Message field is Invalid',
    (done) => {
      request(app)
      .post('/group/user/message')
      .send({ notification, priority, user, group: '', message: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Message or Groupname field is invalid');
        if (err) return done(err);
        done();
      });
    });

  it('should return status 400 when Notification or Priority field is Invalid',
  (done) => {
    request(app)
      .post('/group/user/message')
      .send({ group, user, message, notification: '', priority: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Notification or Priority field is invalid');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Users who have read a message', () => {
  it('should return status 200 when the all notification is received',
  (done) => {
    const groupName = 'Bl';
    const messageID = '-KwiOgTT0onFnS1WltCn';
    request(app)
      .get(`/seen/${groupName}/${messageID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Users in Group Sent');
        res.body.should.have.property('users');
        expect('users').to.have.lengthOf(5);
        res.body.should.have.property('groupName');
        res.body.should.have.nested.property('groupName')
        .eql('Bl');
        res.body.should.have.property('messageID');
        res.body.should.have.nested.property('messageID')
        .eql('-KwiOgTT0onFnS1WltCn');
        if (err) return done(err);
        done();
      });
  });
});
