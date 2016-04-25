'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Logins', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      service: {
        type: Sequelize.STRING, 
        allowNull: false
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
      }, 
      groupId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Groups',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, 
      groupToken: {
        type: Sequelize.STRING, 
        allowNull: true 
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      } 
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Logins');
  }
};
