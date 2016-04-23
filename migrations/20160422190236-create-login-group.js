'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('LoginGroups', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      groupId: {
        type: Sequelize.UUID,
        references: {
          model: 'Groups',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      loginId: {
        type: Sequelize.UUID,
        references: {
          model: 'Logins',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('LoginGroups');
  }
};
