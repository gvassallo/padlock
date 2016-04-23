'use strict';
module.exports = function(sequelize, DataTypes) {
  var LoginGroup = sequelize.define('LoginGroup', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        LoginGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
        LoginGroup.belongsTo(models.Login, { foreignKey: 'loginId' });
      }
    }
  });
  return LoginGroup;
};
