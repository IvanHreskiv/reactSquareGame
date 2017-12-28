'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Scores', [
      {
        id: 1111118,
        score: 2,
        user_id: 1111114,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111119,
        score: 2,
        user_id: 1111114,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111144,
        score: 2,
        user_id: 1111114,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111133,
        score: 2,
        user_id: 1111114,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111122,
        score: 2,
        user_id: 1111116,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111112,
        score: 200,
        user_id: 1111115,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111113,
        score: 25,
        user_id: 1111113,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111114,
        score: 2,
        user_id: 1111112,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111115,
        score: 20,
        user_id: 1111111,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111116,
        score: 2,
        user_id: 1111116,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Scores', null, {});
  }
};
