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
          if (res.body.statusCode === 403) {
            console.log(res.body, user.token);
          }
          expect(res.body.statusCode).to.be.equal(200);
          done(err);
        });
    });
    }); 
}); 
    
    // describe('GET /api', () => {
    //     it('GET /api', done => {
    //       request(app)
    //         .get('/api')
    //         .set('Content-Type', 'application/json')
    //         .set('x-access-token', user.token)
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    //         .end((err, res) => {
    //           expect(res.body).to.be.an('object');
    //           expect(res.body).to.include.keys('statusCode', 'message');
    //           if (res.body.statusCode === 403) {
    //             console.log(res.body, user.token);
    //           }
    //           expect(res.body.statusCode).to.be.equal(200);
    //           done(err);
    //         });
    //         }); 
    // });

