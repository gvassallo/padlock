'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PrivateKeys', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      value: {
        type: Sequelize.TEXT, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PrivateKeys');
  }
};
