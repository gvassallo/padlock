'use strict';
module.exports = function(sequelize, DataTypes) {
  var PrivateKey = sequelize.define('PrivateKey', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    value: {
      type:  DataTypes.TEXT, 
      allowNull: false 
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        PrivateKey.belongsTo(models.User, {foreignKey: 'userId'}); 
      }
    }
  });
  return PrivateKey;
};
