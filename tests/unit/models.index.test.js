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

});