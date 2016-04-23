'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserGroup = sequelize.define('UserGroup', {
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        UserGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
        UserGroup.belongsTo(models.User, { foreignKey: 'userId' });
      }
    }
  });
  return UserGroup;
};
