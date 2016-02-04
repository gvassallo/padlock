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
    this.service = {
        name: 'fb' 
    }
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

    // describe('/api/logins', ()=> {
    //     it('POST /api/logins with new Service', done => { 
    //         request(app) 
    //         .post('/api/logins')
    //         .set('Content-Type', 'application/json')
    //         .set('x-access-token', this.userData.token)
    //         .send({service: 'fb', username: 'io', password: 'pwd'})
    //         .expect(200)
    //         .expect('Content-Type', /json/) 
    //         .end((err, res) => {
    //             if (err) done(err);
    //             expect(res.body).to.be.an('object');
    //             expect(res.body).to.include.keys('service', 'username', 'password');
    //             // project.tasks = [ res.body ];
    //             done(err);
    //         });
    //     }); 
    //     
    //     it('POST /api/logins with same Service', done => { 
    //         request(app) 
    //         .post('/api/logins')
    //         .set('Content-Type', 'application/json')
    //         .set('x-access-token', this.userData.token)
    //         .send({service: this.service.name, username: 'me', password: 'pwd'})
    //         .expect(200)
    //         .expect('Content-Type', /json/) 
    //         .end((err, res) => {
    //             if (err) done(err);
    //             expect(res.body).to.be.an('object');
    //             expect(res.body).to.include.keys('service', 'username', 'password');
    //             // project.tasks = [ res.body ];
    //             done(err);
    //         });
    //     }); 
    //     
    //     it('POST /api/logins with username that already exists', done => { 
    //         request(app) 
    //         .post('/api/logins')
    //         .set('Content-Type', 'application/json')
    //         .set('x-access-token', this.userData.token)
    //         .send({service: this.service.name, username: 'me', password: 'pwd'})
    //         .expect(500)
    //         .expect('Content-Type', /json/)
    //         .end((err, res) => {
    //           expect(res.body).to.be.an('object');
    //           expect(res.body).to.include.keys('message');
    //           done(err);
    //         });
    //     }); 
    // }); 
    
    describe('/api/services', () => {
        it('POST /api/services ', done => { 
            request(app) 
            .post('/api/services')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({service: this.service})
            .expect(200)
            .expect('Content-Type', /json/) 
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys('name', 'userId');
                // project.tasks = [ res.body ];
                done(err);
            });
        }); 
        it('GET /api/services', done => {
            request(app)
            .get('/api/services')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.have.length.at.least(1);
              done(err);
            });
        }); 

        // it('GET /api/services/:name/logins', done => {
        //     request(app) 
        //     .get('/api/services/' + this.service.name + '/logins') 
        //     .set('Content-Type', 'application/json')
        //     .set('x-access-token', this.userData.token)
        //     .expect(200)
        //     .expect('Content-Type', /json/)
        //     .end((err, res) => {
        //       expect(res.body).to.have.length.at.least(2);
        //       done(err);
        //     });
        // }); 
    }); 
});     
