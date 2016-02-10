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
        allowNull: false, 
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      service: {
        type: Sequelize.STRING, 
        allowNull: false,
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
    return queryInterface.dropTable('Logins');
  }
};
