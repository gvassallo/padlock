'use strict';

var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt'));

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    },
    
    generateHash(password, callback) {
        return bcrypt.genSaltAsync(10)
                     .then(salt => bcrypt.hashAsync(password, salt));
    } 
    }, 
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareAsync(password, this.password);
      }
    }
  });
  return User;
};
