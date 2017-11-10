import chai from 'chai';
import request from 'supertest';

import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

const email = 'jat@gmail.com';
const password = '123456';

describe('Create Group', () => {
  const group = 'Underhood';
  const userName = 'Ebuka';

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
        .eql('jat@gmail.com');
        res.body.should.have.nested.property('userData.displayName')
        .eql('Jat');
        res.body.should.have.nested.property('userData.uid')
        .eql('Sb1mgQOVOoXafC3MMnQXVjKlPdJ2');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if group name is undefined', (done) => {
    request(app)
    .post('/api/v1/group')
    .send({ userName })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be
      .eql('Group name is required');
      if (err) return done(err);
      done();
    });
  });

  it('should return validation error if group name field is empty', (done) => {
    request(app)
    .post('/api/v1/group')
    .send({ group: '', userName })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be
      .eql('Group name is required');
      if (err) return done(err);
      done();
    });
  });

  it('should return validation error if username is empty', (done) => {
    request(app)
    .post('/api/v1/group')
    .send({ group, userName: '' })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be
      .eql('Username is required');
      if (err) return done(err);
      done();
    });
  });

  it('should return validation error if username is undefined', (done) => {
    request(app)
    .post('/api/v1/group')
    .send({ group })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be
      .eql('Username is required');
      if (err) return done(err);
      done();
    });
  });

  it('should successfully create a group', (done) => {
    request(app)
      .post('/api/v1/group')
      .send({ userName, group })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('groupName');
        res.body.should.have.nested.property('groupName')
        .eql('Underhood');
        res.body.should.have.nested.property('userName')
        .eql('Ebuka');
        if (err) return done(err);
        done();
      });
  });

  it('should not create a group with an existing group name', (done) => {
    request(app)
      .post('/api/v1/group')
      .send({ userName, group: 'Exist' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Group already exist');
        if (err) return done(err);
        done();
      });
  });
});

describe('Add User to a Group', () => {
  it('should successfully add a user to a group', (done) => {
    request(app)
      .post('/api/v1/group/groupName/user')
      .send({ newUser: 'Jat', groupName: 'Facebook' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('User added successfully');
        res.body.should.have.property('user')
        .eql('Jat');
        res.body.should.have.property('groupName')
        .eql('Facebook');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if the group does not exist', (done) => {
    request(app)
      .post('/api/v1/group/groupName/user')
      .send({ newUser: 'Jat', groupName: 'Book' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Group does not exist');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if the user does not exist',
  (done) => {
    request(app)
      .post('/api/v1/group/groupName/user')
      .send({ newUser: 'Mike', groupName: 'Facebook' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The User does not exist');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Users and Messages in a Group',
() => {
  it('should successfully return all users and messages in a group',
  (done) => {
    request(app)
      .get('/api/v1/groups/Lll/Yank')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.nested.property('message')
        .eql('Messages and Users in Lll database');
        res.body.should.have.nested.property('messages')
        .eql([{ id: '-KyV-ysWPX3-u1fE-Aro',
          user: 'Yank',
          message: 'Mess',
          time: '10:02 am, Nov 9th',
          priority: 'Urgent' },
        { id: '-KyWIibYf7MwLHaXEnN1',
          user: 'Yank',
          message: 'hfikg',
          time: '4:03 pm, Nov 9th',
          priority: 'Normal' }]);
        res.body.should.have.nested.property('users')
          .eql([{ userName: 'Chap' }, { userName: 'Yank' }]);
        if (err) return done(err);
        done();
      });
  });
});
