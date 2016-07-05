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

    this.jon = {
      username : 'jon',
      email : 'j@targaryen.com',
      password : 'r+l=j',
      uuid: '3d48c975-a116-4ce1-8965-28b257541415'
    }

    this.login = {
      id: '', 
      service: 'fb', 
      username: 'gabri',
      password: 'pwd' 
    }; 

    this.group = {
      name: 'Legion of Whom'
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
      var password = this.login.password; 
      request(app) 
        .post('/api/logins') 
        .set('Content-Type', 'application/json')
        .set('x-access-token', user.token)
        .send({login: this.login})
        .expect(200)
        .expect('Content-Type', /json/) 
        .end((err, res) => {
          if (err) {done(err);}
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('service', 'username', 'password');
          this.login = res.body; 
          this.login.password = password; 
          done(err);
        });
    }); 

    it('POST /api/logins with service null', done => { 
      request(app) 
        .post('/api/logins') 
        .set('Content-Type', 'application/json')
        .set('x-access-token', this.userData.token)
        .send({username: null, password: 'pwd', service: 'fb'})
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('message');
          done(err);
        });
    }); 

    it('POST /api/logins/:id to GET the login encrypted', done => {
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
          expect(res.body.password).to.eql(this.login.password); 
          done(err); 
        }); 
    }); 

    it('POST /api/logins/:id with wrong master', done => {
      request(app)
        .post('/api/logins/' + this.login.uuid) 
        .set('Content-Type', 'application/json')
        .set('x-access-token', this.userData.token)
        .send({master: 'wrongpassword'})
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('message');
          done(err);
        });
    }); 

    it('POST /api/logins/:id with wrong loginId', done => {
      request(app)
        .post('/api/logins/1d3b8230-4f2d-11e5-8491-21ee032441c1') 
        .set('Content-Type', 'application/json')
        .set('x-access-token', this.userData.token)
        .send({master: 'wrongpassword'})
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('message');
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
        .send({login: this.login})
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

  describe('/api/groups', () => {

    it('GET /api/groups is empty', done => {
      request(app)
        .get('/api/groups')
        .set('Content-Type', 'application/json')
        .set('x-access-token', this.userData.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(0);
          done(err);
        });
    });

    it('POST /api/groups', done => {
      var group = this.group;
      request(app)
        .post('/api/groups')
        .set('Content-Type', 'application/json')
        .set('x-access-token', this.userData.token)
        .send(group)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('uuid', 'name');
          group.uuid = res.body.uuid;
          done(err);
        });
    });

    it('POST /api/groups fake group', done => {
      request(app)
        .post('/api/groups')
        .set('Content-Type', 'application/json')
        .set('x-access-token', this.userData.token)
        .send({})
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('message');
          done(err);
        });
    });

    describe('/api/groups/:uuid', () => {

      it('GET /api/groups/:uuid', done => {
        var group = this.group;
        request(app)
          .get('/api/groups/' + group.uuid)
          .set('Content-Type', 'application/json')
          .set('x-access-token', this.userData.token)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('uuid', 'name', 'members');
            expect(res.body.uuid).to.be.equal(group.uuid);
            for (var user of res.body.members) {
              expect(user).to.include.keys('username', 'email', 'uuid');
              expect(user).to.not.include.keys('UserGroup', 'password');
            }
          })
          .end(done);
      });

      it('GET /api/groups/:uuid with wrong uuid', done => {
        request(app).get('/api/groups/' + '6d953b00-4f2c-11e5-ac6d-df4c81dc95fa')
          .set('Content-Type', 'application/json')
          .set('x-access-token', this.userData.token)
          .expect(404)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('message');
          })
          .end(done);
      });


      it('GET /api/groups/:uuid', done => {
        var group = this.group;
        request(app)
          .get('/api/groups/' + group.uuid)
          .set('Content-Type', 'application/json')
          .set('x-access-token', this.userData.token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('uuid', 'name', 'members');
            expect(res.body.uuid).to.be.equal(group.uuid);
            expect(res.body.members).to.have.length.at.least(1);
            for (var user of res.body.members) {
              expect(user).to.include.keys('username', 'email', 'uuid');
              expect(user).to.not.contain.any.keys('UserGroup', 'password');
            }
            done(err);
          });
      });

      describe('/api/groups/:uuid/logins', () => {
         
        it('POST /api/groups/:uuid/logins', done => {
          var newlogin = {
            service: 'new service', 
            username: 'user', 
            password: 'pass' 
          }; 
          request(app)
            .post('/api/groups/'+ this.group.uuid + '/logins')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({login: newlogin}) 
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              // TODO change 
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('service', 'username', 'password');
              this.login = res.body; 
              this.login.password = newlogin.password; 
              done(err);
            });
        }); 

        it('GET /api/groups/:uuid/logins', done =>  {
          request(app)
            .get('/api/groups/'+this.group.uuid+'/logins')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(200) 
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.length.at.least(1);
              for (var login of res.body) {
                expect(login).to.include.keys('username', 'password', 'service', 'uuid');
              }
              done(err);
            }); 
        }); 

        it('POST /api/groups/:uuid/logins with wrong group id', done => {
          var newlogin = {
            service: 'new service', 
            username: 'user', 
            password: 'pass' 
          }; 
          request(app)
            .post('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/logins')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({login: newlogin}) 
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('POST /api/groups/:uuid/logins with wrong login', done => {
          var fakelogin = {
             password: 'aaa'
          }; 
          request(app)
            .post('/api/groups/'+ this.group.uuid + '/logins')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({login: fakelogin}) 
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('GET /api/groups/:uuid/logins with wrong group id', done =>  {
          request(app)
            .get('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/logins')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('POST /api/groups/:uuid/logins/:loginId', done => {
          request(app)
            .post('/api/groups/'+ this.group.uuid + '/logins/'+this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({master: this.userData.password})
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object'); 
              expect(res.body).to.include.keys('service', 'username', 'password');
              expect(res.body.password).to.eql(this.login.password); 
              done(err); 
            });
        }); 

        it('POST /api/groups/:uuid/logins/:loginId with wrong group id', done => {
          request(app)
            .post('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/logins/'+this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({master: this.userData.password})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('POST /api/groups/:uuid/logins/:loginId with wrong login id', done => {
          request(app)
            .post('/api/groups/'+this.group.uuid+'/logins/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({master: this.userData.password})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('POST /api/groups/:uuid/logins/:loginId with wrong master pass', done => {
          request(app)
            .post('/api/groups/'+ this.group.uuid + '/logins/' + this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({master: 'wrong master'})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('PUT /api/groups/:uuid/logins/:loginId', done => {
          this.login.username = 'Jessicaaaaaa'; 
          this.login.password = 'ur still a lil bitch'; 
          request(app)
            .put('/api/groups/'+ this.group.uuid + '/logins/'+this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({master: this.userData.password, login: this.login})
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object'); 
              expect(res.body).to.include.keys('service', 'username', 'password');
              expect(res.body.username).to.be.eql(this.login.username); 
              done(err); 
            });
        }); 

        it('PUT /api/groups/:uuid/logins/:loginId with wrong group id', done => {
          this.login.username = 'Jessicaaaaaa'; 
          this.login.password = 'ur still a lil bitch'; 
          request(app)
            .put('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/logins/'+this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({master: this.userData.password, login: this.login})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('PUT /api/groups/:uuid/logins/:loginId with wrong login id', done => {
          this.login.username = 'Jessicaaaaaa'; 
          this.login.password = 'ur still a lil bitch'; 
          request(app)
            .put('/api/groups/'+ this.group.uuid + '/logins/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({login: this.login})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('PUT /api/groups/:uuid/logins/:loginId with wrong login', done => {
          this.login.username = 'Jessicaaaaaa'; 
          this.login.password = 'ur still a lil bitch'; 
          request(app)
            .put('/api/groups/'+ this.group.uuid + '/logins/'+this.login.uuid) 
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send({})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        }); 

        it('DELETE /api/groups/:uuid/logins/:loginId', done => {
          request(app)
            .del('/api/groups/'+ this.group.uuid + '/logins/' + this.login.uuid)
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

        it('DELETE /api/groups/:uuid/logins/:loginId with wrong group id', done => {
          request(app)
            .del('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/logins/'+this.login.uuid)
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        });
        
        it('DELETE /api/groups/:uuid/logins/:loginId with wrong login id', done => {
          request(app)
            .del('/api/groups/'+ this.group.uuid + '/logins/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.keys('statusCode', 'message');
              done(err);
            });
        });

      }); 
      describe('/api/groups/:uuid/members', done => { 
        it('GET /api/groups/:uuid/members', done => {
          request(app)
            .get('/api/groups/' + this.group.uuid + '/members')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.length(1);
              done(err);
            });
        });

        it('PUT /api/groups/:uuid/members', done => {
          request(app)
            .put('/api/groups/' + this.group.uuid + '/members')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send(this.jon)  
            .expect(200)
            .end((err, res) => {
              done(err);
            });
        });


        it('PUT /api/groups/:uuid/members with wrong group uuid', done => {
          request(app)
            .put('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/members')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send(this.userData)
            .expect(404)
            .end((err, res) => {
              expect(res.body).to.include.keys('statusCode', 'message');
              expect(res.body.message).to.match(/[Gg]roup[\S\s]+not found/);
              done(err);
            });
        });

        it('PUT /api/groups/:uuid/members with wrong user', done => {
          var fakeuser = {
             email: 'wrong@wrong.com'
          }; 
          request(app)
            .put('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/members')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .send(this.fakeuser)
            .expect(404)
            .end((err, res) => {
              expect(res.body).to.be.an('Object'); 
              expect(res.body).to.include.keys('statusCode', 'message');
              expect(res.body.message).to.match(/[Uu]ser not found/);
              done(err);
            });
        });

        it('GET /api/groups/:uuid/members', done => {
          request(app)
            .get('/api/groups/' + this.group.uuid + '/members')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.userData.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.length(2);
              for (var user of res.body) {
                expect(user).to.include.keys('username', 'email', 'uuid');
                expect(user).to.not.contain.any.keys('password');
              }
              done(err);
            });
        });

        //@TODO more test!!
        describe('/api/groups/:uuid/members/:userId', () => {
          it('DELETE /api/groups/:uuid/members/:userId wrong groupId', done => {
            var group = this.group; 
            request(app)
              .del('/api/groups/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa/members/'+ this.userData.uuid)
              .set('Content-Type', 'application/json')
              .set('x-access-token', this.userData.token)
              .expect(404)
              .expect('Content-Type', /json/)
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.match(/[Gg]roup[\S\s]+not found/);
                done(err);
              });
          });

          it('DELETE /api/groups/:uuid/members/:userId wrong groupId', done => {
            var group = this.group; 
            request(app)
              .del('/api/groups/'+ group.uuid + '/members/6d953b00-4f2c-11e5-ac6d-df4c81dc95fa')
              .set('Content-Type', 'application/json')
              .set('x-access-token', this.userData.token)
              .expect(404)
              .expect('Content-Type', /json/)
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body.message).to.match(/[Gg]roup[\S\s]+not found/);
                done(err);
              });
          });

          it('DELETE /api/groups/:uuid/members/:userId', done => {
            var group = this.group; 
            request(app)
              .del('/api/groups/' + group.uuid + '/members/'+ this.jon.uuid)
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
          
          //TODO change location
          it('DELETE /api/groups/:uuid', done => {
            request(app)
              .del('/api/groups/'+this.group.uuid)
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

          it('DELETE /api/groups/:uuid', done => {
            request(app)
              .del('/api/groups/'+this.group.uuid)
              .set('Content-Type', 'application/json')
              .set('x-access-token', this.userData.token)
              .expect(404)
              .expect('Content-Type', /json/)
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.match(/[Gg]roup[\S\s]+not found/);
                done(err);
              });
          });

        }); // /api/groups/:uuid/members/:userId
      }); // /api/groups/:uuid/members
    });
  });

  describe('/api/users', () => {
    it('GET /api/users/me', done => {
      var user = this.userData;
      request(app)
        .get('/api/users/me')
        .set('Content-Type', 'application/json')
        .set('x-access-token', user.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('uuid', 'fullName', 'email');
          expect(res.body.uuid).to.be.equal(user.uuid);
          done(err);
        });
    });

    it('GET /api/users/:uuid', done => {
      var user = this.userData;
      request(app)
        .get('/api/users/' + user.uuid)
        .set('Content-Type', 'application/json')
        .set('x-access-token', user.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('uuid', 'fullName', 'email');
          expect(res.body.uuid).to.be.equal(user.uuid);
          done(err);
        });
    });

    it('GET /api/users/:uuid with wrong uuid', done => {
      var user = this.userData;
      request(app)
        .get('/api/users/1d3b8230-4f2d-11e5-8491-21ee032441c1')
        .set('Content-Type', 'application/json')
        .set('x-access-token', user.token)
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('statusCode', 'message');
          done(err);
        });
    });

    it('PUT /api/users/me', done => {
      var user = this.userData;
      request(app)
        .put('/api/users/me')
        .set('Content-Type', 'application/json')
        .set('x-access-token', user.token)
        .send({ fullName: 'The Doctor' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('uuid', 'fullName');
          expect(res.body.fullName).to.equal('The Doctor');
          done(err);
        });
    });
  });


});     

