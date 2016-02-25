'use strict';
var bluebird = require('bluebird'); 
var NodeRSA = bluebird.promisifyAll(require('node-rsa')); 
var NodeRSA = require('node-rsa'); 
var key = NodeRSA({b: 512}); 

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
        encryptPwd: function(password) { 
            // return key.encrypt(password, 'base64'); 
            return "cryptedpwd"; 
        }
    }, 
    instanceMethods: {
        decryptPwd: function() {
          // return key.decrypt(this.password, 'utf8');  
            return "decrypted";  
        }
    }
  });
  return Login;
};
