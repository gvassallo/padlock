'use strict';
module.exports = (sequelize, DataTypes) => {
  var Token = sequelize.define('Token', {
    value: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Token.belongsTo(models.User, { foreignKey: 'userId' });
      }
    }
  });
  return Token;
};

