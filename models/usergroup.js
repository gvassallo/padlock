'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserGroup = sequelize.define('UserGroup', {
    admin: {
      type: DataTypes.BOOLEAN,
      dafaultValue: false
    }
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
