'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn({
        tableName: 'Users',
        shame: 'public'
      },
      'reset_password_token',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn({
      tableName: 'Users',
      shame: 'public'
    },'reset_password_token');
  }
};

