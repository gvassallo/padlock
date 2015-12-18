'use strict';

var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt'));

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    fullName: DataTypes.STRING,

    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true,
        notEmpty: true
        }
    },
    password: DataTypes.STRING 
    }, 

    {
    classMethods: {
      associate(models) {
      User.hasMany(models.Token, { foreignKey: 'userId' });
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
