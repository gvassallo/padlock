'use strict';

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
          // Login.belongsTo(models.Service, { foreignKey: 'service'});
        }
    }
  });
  return Login;
};
