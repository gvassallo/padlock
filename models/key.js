'use strict';
module.exports = function(sequelize, DataTypes) {
  var Key = sequelize.define('Key', {
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
        Key.belongsTo(models.User, {foreignKey: 'userId'}); 
      }
    }
  });
  return Key;
};
