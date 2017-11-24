'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn({
      tableName: 'Users',
      shame: 'public'
    },
    'password',
    Sequelize.STRING
    );
  },

  down: (queryInterface, Suquelize) => {
    queryInterface.removeColumn({
      tableName: 'Users',
      shame: 'public'
    },'password');
  }
};
