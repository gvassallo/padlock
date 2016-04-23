'use strict';

var expect = require('chai').expect;

describe('models/index', () => {

  before(done => {
    this.models = require('../../models'); // jshint ignore:line
    done();
  });

  it('returns user model', done => {
    expect(this.models.User).to.be.ok;
    done();
  });

  it('return token model', done => {
    expect(this.models.Token).to.be.ok;
    done();
  });

  it('return key model', done => {
    expect(this.models.Key).to.be.ok;
    done();
  });

  it('return login model', done => {
    expect(this.models.Login).to.be.ok;
    done();
  });

  it('return Group model', done => {
    expect(this.models.Group).to.be.ok;
    done();
  });

  it('return UserGroup model', done => {
    expect(this.models.UserGroup).to.be.ok;
    done();
  });

  it('creates user model', done => {
    this.models.User
      .sync({ force: true })
      .then(() => done())
      .error(error => done(error));
  });

  it('creates token model', done => {
    this.models.Token
      .sync({ force: true })
      .then(() => done())
      .error(error => done(error));
  });

  it('creates login model', done => {
    this.models.Login
      .sync({ force: true })
      .then(() => done())
      .error(error => done(error));
  });

  it('creates key model', done => {
    this.models.Key
      .sync({ force: true })
      .then(() => done())
      .error(error => done(error));
  });

  it('creates group model', done => {
    this.models.Group
      .sync({ force: true })
      .then(() => done())
      .error(error => done(error));
  });

  it('creates usergroup model', done => {
    this.models.UserGroup
      .sync({ force: true })
      .then(() => done())
      .error(error => done(error));
  });

});
