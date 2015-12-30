'use strict';
module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
    name:{
        type: DataTypes.STRING, 
        allowNull: false, 
        primaryKey: true 
    }
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Service.belongsTo(models.User, { foreignKey: 'userId'}); 
        Service.hasMany(models.Login, { foreignKey: 'service'});  
      }
    }
  });
  return Service;
};
