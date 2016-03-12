'use strict';
// var bluebird = require('bluebird'); 
// var NodeRSA = bluebird.promisifyAll(require('node-rsa')); 
var NodeRSA = require('node-rsa'); 

module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define('Login', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false 
    }, 
    password:{
        type: DataTypes.STRING,
        allowNull: false 
    }, 
    service: {
        type: DataTypes.STRING, 
        allowNull: false 
    }
    }, {
    classMethods: {
        associate: function(models) {
          // associations can be defined here
          Login.belongsTo(models.User, {foreignKey: 'userId'}); 
        }, 
        encryptPwd: function(password, pkcs1Key) { 
            var key = new NodeRSA();
            key.importKey(pkcs1Key, 'pkcs1'); 
            return key.encrypt(password, 'base64'); 
        }
    }, 
    instanceMethods: {
        decryptPwd: function(pkcs1Key) {
            var key = new NodeRSA(); 
            key.importKey(pkcs1Key, 'pkcs1'); 
            return key.decrypt(this.password, 'utf8');  
        }
    }
  });
  return Login;
};
