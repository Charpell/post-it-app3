// import chai from 'chai';
// import request from 'supertest';

// import app from '../server/app';

// const should = chai.should();
// const expect = chai.expect;

// const email = 'jat@gmail.com';
// const password = '123456';

// describe('Create Group', () => {
//   const group = 'Fsghy';
//   const userName = 'Ebuka';

//   it('should return status 200 when the user logs in',
//   (done) => {
//     request(app)
//       .post('/user/signin')
//       .send({ email, password })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message')
//         .eql('Welcome to Post it app');
//         res.body.should.have.nested.property('userData.email')
//         .eql('jat@gmail.com');
//         res.body.should.have.nested.property('userData.displayName')
//         .eql('Jat');
//         res.body.should.have.nested.property('userData.uid')
//         .eql('Sb1mgQOVOoXafC3MMnQXVjKlPdJ2');
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should return status 400 when the group name is undefined', (done) => {
//     request(app)
//     .post('/group')
//     .send({ userName })
//     .set('Accept', 'application/json')
//     .end((err, res) => {
//       res.status.should.equal(400);
//       res.body.should.be.a('object');
//       res.body.should.have.property('message');
//       res.body.message.should.be
//       .eql('Group name is required');
//       if (err) return done(err);
//       done();
//     });
//   });

//   it('should return status 400 for missing group name', (done) => {
//     request(app)
//     .post('/group')
//     .send({ group: '', userName })
//     .set('Accept', 'application/json')
//     .end((err, res) => {
//       res.status.should.equal(400);
//       res.body.should.be.a('object');
//       res.body.should.have.property('message');
//       res.body.message.should.be
//       .eql('Group name is required');
//       if (err) return done(err);
//       done();
//     });
//   });

//   it('should return status 400 when the username is undefined', (done) => {
//     request(app)
//     .post('/group')
//     .send({ group, userName: '' })
//     .set('Accept', 'application/json')
//     .end((err, res) => {
//       res.status.should.equal(400);
//       res.body.should.be.a('object');
//       res.body.should.have.property('message');
//       res.body.message.should.be
//       .eql('Username is required');
//       if (err) return done(err);
//       done();
//     });
//   });

//   it('should return status 400 for missing user name', (done) => {
//     request(app)
//     .post('/group')
//     .send({ group })
//     .set('Accept', 'application/json')
//     .end((err, res) => {
//       res.status.should.equal(400);
//       res.body.should.be.a('object');
//       res.body.should.have.property('message');
//       res.body.message.should.be
//       .eql('Username is required');
//       if (err) return done(err);
//       done();
//     });
//   });

//   it('should return status 201 when a group is created', (done) => {
//     request(app)
//       .post('/group')
//       .send({ userName, group })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(201);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('groupName');
//         res.body.should.have.nested.property('groupName')
//         .eql('Fsghy');
//         res.body.should.have.nested.property('userName')
//         .eql('Ebuka');
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should return status 409 when a group already exist', (done) => {
//     request(app)
//       .post('/group')
//       .send({ userName, group: 'Exist' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(409);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('message')
//         .eql('Group already exists');
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe('Add User to a Group', () => {
//   it('should return status 201 when a user is added to a Group', (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ user: 'Jat', groupName: 'Facebook' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(201);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('message')
//         .eql('User added successfully');
//         res.body.should.have.property('user');
//         res.body.should.have.property('user')
//         .eql('Jat');
//         res.body.should.have.property('groupName');
//         res.body.should.have.property('groupName')
//         .eql('Facebook');
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should return status 404 if the group does not exist', (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ user: 'Jat', groupName: 'Book' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('message')
//         .eql('Group dose not exists');
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should return status 404 when the user does not exist',
//   (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ user: 'Mike', groupName: 'Facebook' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('message')
//         .eql('The User dose not exist');
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe('EndPoint: Users and Messages in a Group',
// () => {
//   it('should return status 200 when the all users and messages are retrived',
//   (done) => {
//     request(app)
//       .get('/groups/:groupName/:user')
//       .send({ groupName: 'FILE', user: 'Hh' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('message')
//         .eql('Getting Messages and Users in :groupName database');
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe('EndPoint: Get all Groups of a User', () => {
//   it('should return status 200 when the user logs in',
//   (done) => {
//     request(app)
//       .post('/user/signin')
//       .send({ email, password })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message')
//         .eql('Welcome to Post it app');
//         res.body.should.have.nested.property('userData.email')
//         .eql('jat@gmail.com');
//         res.body.should.have.nested.property('userData.displayName')
//         .eql('Jat');
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should return status 200 when all groups of a user is received',
//   (done) => {
//     request(app)
//       .get('/group/Seun')
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.should.be.a('array');
//         res.body.should.have.lengthOf(30);
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should return status 200 when all groups of a user is received',
//   (done) => {
//     request(app)
//       .get('/group/Temi')
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.should.be.a('array');
//         res.body.should.have.lengthOf(1);
//         if (err) return done(err);
//         done();
//       });
//   });
// });
