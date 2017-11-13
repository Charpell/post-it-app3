import chai from 'chai';
import request from 'supertest';

import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

const email = 'yank@gmail.com';
const password = '123456';

describe('Create Message', () => {
  const group = 'Facebook';
  const user = 'Yank';
  const message = 'This is a test message';
  const notification = 'Yank has posted in Facebook group';
  const priority = 'Normal';


  it('should successfully sign in a resgistered user',
  (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('Welcome to Post it app');
        res.body.should.have.nested.property('userData.email')
        .eql('yank@gmail.com');
        res.body.should.have.nested.property('userData.displayName')
        .eql('Yank');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully create a message', (done) => {
    request(app)
      .post('/api/v1/group/user/message')
      .send({ group, user, message, notification, priority })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('Message posted successfully');
        res.body.should.have.property('messageData')
        .eql('This is a test message');
        res.body.should.have.property('group')
        .eql('Facebook');
        res.body.should.have.property('user')
        .eql('Yank');
        res.body.should.have.property('notification')
        .eql('Yank has posted in Facebook group');
        res.body.should.have.property('priority')
        .eql('Normal');
        done();
      });
  });


  it('should return validation error if the group name field is undefined',
    (done) => {
      request(app)
      .post('/api/v1/group/user/message')
      .send({ notification, priority, user, message })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage')
        .eql('Group name is required');
        if (err) return done(err);
        done();
      });
    });

  it('should return validation error if the group name field is missing',
  (done) => {
    request(app)
    .post('/api/v1/group/user/message')
    .send({ notification, priority, user, group: '', message })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage')
      .eql('Group name is required');
      if (err) return done(err);
      done();
    });
  });

  it('should return validation error if the user name field is undefined',
  (done) => {
    request(app)
    .post('/api/v1/group/user/message')
    .send({ notification, priority, group, message })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage')
      .eql('Username is required');
      if (err) return done(err);
      done();
    });
  });

  it('should return validation error if the user name field is missing',
  (done) => {
    request(app)
    .post('/api/v1/group/user/message')
    .send({ notification, priority, user: '', group, message })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage')
      .eql('Username is required');
      if (err) return done(err);
      done();
    });
  });
});

describe('EndPoint: Read Message', () => {
  it('should return empty array if no user has read a message',
  (done) => {
    const groupName = 'Lll';
    const messageID = '-KyFtHJMfy45vGEpW5kL';
    request(app)
      .get(`/api/v1/seen/${groupName}/${messageID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('No user has read this message');
        res.body.should.have.nested.property('users')
        .eql([]);
        if (err) return done(err);
        done();
      });
  });

  it('should successfully return all users who have read a message',
  (done) => {
    const groupName = 'Lll';
    const messageID = '-KyWIibYf7MwLHaXEnN1';
    request(app)
      .get(`/api/v1/seen/${groupName}/${messageID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('Users who have read this message');
        expect('users').to.have.lengthOf(5);
        res.body.should.have.nested.property('groupName')
        .eql('Lll');
        res.body.should.have.property('messageID');
        res.body.should.have.nested.property('messageID')
        .eql('-KyWIibYf7MwLHaXEnN1');
        res.body.should.have.nested.property('users')
        .eql({ Bot: 'Bot', Yank: 'Yank' });
        if (err) return done(err);
        done();
      });
  });
});
