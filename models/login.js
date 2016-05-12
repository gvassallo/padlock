'use strict';
var NodeRSA = require('node-rsa'); 

var node_cryptojs = require('node-cryptojs-aes'); 
var CryptoJS = node_cryptojs.CryptoJS; 
var JsonFormatter = node_cryptojs.JsonFormatter; 
var randtoken = require('rand-token'); 

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
      allowNull: false, 
      validate: {
        len: [2, 30] 
      }
    }, 
    groupToken:{
      type: DataTypes.STRING,
      allowNull: true 
    } 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Login.belongsTo(models.User, {foreignKey: 'userId'}); 
      }, 
      encryptPwd: function(password, publicKey) { 
        var key = new NodeRSA();
        key.importKey(publicKey, 'pkcs1-public-pem'); 
        // return the encrypted password 
        return key.encrypt(password, 'base64'); 
      }, 
      genToken: function(){
        return randtoken.generate(16);  
      }
    }, 
    instanceMethods: {
      decryptPwd: function(privateKey_encrypted_str, master) {
        // encode the master password in base64
        var master_64 = new Buffer(master); 
        master_64 = master_64.toString('base64');    
        // decrypt the encrypted key using the master password 
        var pkcs1Key = CryptoJS.AES.decrypt(privateKey_encrypted_str, master_64, {format: JsonFormatter});  
        // convert to Utf8 format unmasked data
        var pkcs1Key_str = CryptoJS.enc.Utf8.stringify(pkcs1Key);
        var key = new NodeRSA();
        key.importKey(pkcs1Key_str, 'pkcs1'); 
        // return the decrypted password 
        return key.decrypt(this.password, 'utf8');  
      }
    }
  });
  return Login;
};
