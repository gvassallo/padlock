'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Logins', {
      username: {
        type: Sequelize.STRING, 
        allowNull: false, 
        primaryKey: true 
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      service: {
        type: Sequelize.STRING, 
        allowNull: false,
        references: {
          model: 'Services',
          key: 'name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
