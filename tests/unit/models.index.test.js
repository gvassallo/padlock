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

  it('return service model', done => {
    expect(this.models.Service).to.be.ok;
    done();
  });

  it('return login model', done => {
    expect(this.models.Login).to.be.ok;
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

  it('creates service model', done => {
    this.models.Service
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

});
