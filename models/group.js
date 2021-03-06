'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate(models) {
        Group.belongsToMany(models.User, {
          through: models.UserGroup,
          as: 'members',
          foreignKey: 'groupId'
        });
        Group.hasMany(models.Login, {foreignKey: 'groupId'}); 
      }
    }
  });
  return Group;
};
