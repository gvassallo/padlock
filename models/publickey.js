'use strict';
module.exports = function(sequelize, DataTypes) {
  var PublicKey = sequelize.define('PublicKey', {
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
        PublicKey.belongsTo(models.User, {foreignKey: 'userId'}); 
      }
    }
  });
  return PublicKey;
};
