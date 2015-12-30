'use strict';
module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define('Login', {
    username: {
        type: DataTypes.STRING,
        allowNull: false, 
        primaryKey: true 
    }, 
    password:{
        type: DataTypes.STRING,
        allowNull: false 
    }, 
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Login.belongsTo(models.Service, { foreignKey: 'service'});
      }
    }
  });
  return Login;
};
