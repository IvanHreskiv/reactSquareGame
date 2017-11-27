'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn({
      tableName: 'Users',
      shame: 'public'
    },
    'username',
    {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn({
      tableName: 'Users',
      shame: 'public'
    },'username');
  }
};
