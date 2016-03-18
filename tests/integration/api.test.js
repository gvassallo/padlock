'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');

describe('rotues/api', ()=> {
        
    before(done => {
      this.userData = {
        uuid: '',
        fullname: 'Elliot',
        username: 'MrRobot',
        email: 'r@fsociety.com',
        password: '1234',
        token: ''
      };
    this.login = {
        id: '', 
        service: 'fb', 
        username: 'gabri',
        password: 'pwd' 
    }; 
    done();
    });

        
    describe('/api/auth', () => {
      it('POST /api/auth/register', done => {
        let user = this.userData;
        request(app)
          .post('/api/auth/register')
          .set('Content-Type', 'application/json')
          .send(this.userData)
          .expect(200)
          .end((err, res) => {
            expect(res.body.token).to.be.an('string');
            expect(res.body.user).to.be.an('object');
            expect(res.body.user).to.include.keys('fullName', 'username', 'email', 'uuid');
            user.token = res.body.token;
            user.uuid = res.body.user.uuid;
            done(err);
          });
      });

      it('POST /api/auth with username', done => {
        var user = this.userData;
        request(app)
          .post('/api/auth')
          .set('Content-Type', 'application/json')
          .send({ username: user.username, password: user.password })
          .expect(200)
          .end((err, res) => {
            expect(res.body.token).to.be.an('string');
            expect(res.body.user).to.be.an('object');
            expect(res.body.user.uuid).to.be.equal(user.uuid);
            done(err);
          });
      });

      it('POST /api/auth with email', done => {
        var user = this.userData;
        request(app)
          .post('/api/auth')
          .set('Content-Type', 'application/json')
          .send({ username: user.email, password: user.password })
          .expect(200)
          .end((err, res) => {
            expect(res.body.token).to.be.an('string');
            expect(res.body.user).to.be.an('object');
            expect(res.body.user.uuid).to.be.equal(user.uuid);
            done(err);
          });
      });

      it('GET /api as authenticated', done => {
        var user = this.userData;
        request(app)
          .get('/api')
          .set('Content-Type', 'application/json')
          .set('x-access-token', user.token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('statusCode', 'message');
            expect(res.body.statusCode).to.be.equal(200);
            done(err);
          });
      });

      it('GET /api with wrong token', done => {
        request(app)
          .get('/api')
          .set('Content-Type', 'application/json')
          .set('x-access-token', this.userData.token + 'hello')
          .expect(403)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('statusCode', 'message');
            expect(res.body.statusCode).to.be.equal(403);
            done(err);
          });
        });

      it('GET /api as not authenticated', done => {
        request(app)
          .get('/api')
          .expect(403)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('statusCode', 'message');
            expect(res.body.statusCode).to.be.equal(403);
            done(err);
          });
        });
      }); 

    describe('/api/logins', ()=> {
      it('POST /api/logins with new Login', done => { 
        var user = this.userData; 
        request(app) 
        .post('/api/logins') 
        .set('Content-Type', 'application/json')
        .set('x-access-token', user.token)
        .send({login: this.login, master: user.password})
        .expect(200)
        .expect('Content-Type', /json/) 
        .end((err, res) => {
          if (err) {done(err);}
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('service', 'username', 'password');
          this.login = res.body; 
          done(err);
        });
      }); 

        // it('POST /api/logins with wrong username or password', done => { 
        //     request(app) 
        //     .post('/api/logins') 
        //     .set('Content-Type', 'application/json')
        //     .set('x-access-token', this.userData.token)
        //     .send({username: null, password: 'pwd', service: 'fb'})
        //     .expect(500)
        //     .expect('Content-Type', /json/)
        //     .end((err, res) => {
        //       expect(res.body).to.be.an('object');
        //       expect(res.body).to.include.keys('message');
        //       done(err);
        //     });
        // }); 

        it('POST /api/logins/:id', done => {
          request(app)
          .post('/api/logins/' + this.login.uuid) 
          .set('Content-Type', 'application/json')
          .set('x-access-token', this.userData.token)
          .send({master: this.userData.password})
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {done(err);} 
            expect(res.body).to.be.an('object'); 
            expect(res.body).to.include.keys('service', 'username', 'password');
            done(err); 
          }); 
        }); 

        it('PUT /api/logins/:id', done => {
          this.login.username = 'new username'; 
          this.login.password = 'new password'; 
          request(app)
            .put('/api/logins/' + this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({login: this.login, master: this.userData.password})
            .expect(200)
            .expect('Content-Type', /json/) 
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('service', 'username', 'password');
              this.login = res.body; 
              done(err);
            });
          }); 
        it('DELETE /api/logins/:id', done => {
          var login = this.login;
          request(app)
            .del('/api/logins/' + login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.be.empty;
              done(err);
            });
        });
    }); 
  });  
//   describe('/api/users', () => {
//     it('GET /api/users/me', done => {
//       var user = this.userData;
//       request(app)
//         .get('/api/users/me')
//         .set('Content-Type', 'application/json')
//         .set('x-access-token', user.token)
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.include.keys('uuid', 'fullName', 'email');
//           expect(res.body.uuid).to.be.equal(user.uuid);
//           done(err);
//         });
//     });
//
//     it('GET /api/users/:uuid', done => {
//       var user = this.userData;
//       request(app)
//         .get('/api/users/' + user.uuid)
//         .set('Content-Type', 'application/json')
//         .set('x-access-token', user.token)
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.include.keys('uuid', 'fullName', 'email');
//           expect(res.body.uuid).to.be.equal(user.uuid);
//           done(err);
//         });
//     });
//
//     // it('GET /api/users/:uuid with wrong uuid', done => {
//     //   var user = this.userData;
//     //   request(app)
//     //     .get('/api/users/1d3b8230-4f2d-11e5-8491-21ee032441c1')
//     //     .set('Content-Type', 'application/json')
//     //     .set('x-access-token', user.token)
//     //     .expect(500)
//     //     .expect('Content-Type', /json/)
//     //     .end((err, res) => {
//     //       expect(res.body).to.be.an('object');
//     //       expect(res.body).to.include.keys('statusCode', 'message');
//     //       done(err);
//     //     });
//     // });
//
//     it('PUT /api/users/me', done => {
//       var user = this.userData;
//       request(app)
//         .put('/api/users/me')
//         .set('Content-Type', 'application/json')
//         .set('x-access-token', user.token)
//         .send({ fullName: 'The Doctor' })
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.include.keys('uuid', 'fullName');
//           expect(res.body.fullName).to.equal('The Doctor');
//           done(err);
//         });
//     });
//   });
// });     

