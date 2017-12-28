'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1111111,
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@demo.com',
        password: '$2a$08$cMHLsGwbXpJhCHEifwG6T.kdpRLZieTgEr4qUAAEywLTDwSqgHA3e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111112,
        firstName: 'Bob',
        lastName: 'Doe',
        email: 'bdoe@demo.com',
        username: 'bobdoe',
        password: '$2a$08$cMHLsGwbXpJhCHEifwG6T.kdpRLZieTgEr4qUAAEywLTDwSqgHA3e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111113,
        firstName: 'Jeff',
        lastName: 'Doe',
        email: 'jdoe@demo.com',
        username: 'jeffdoe',
        password: '$2a$08$cMHLsGwbXpJhCHEifwG6T.kdpRLZieTgEr4qUAAEywLTDwSqgHA3e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111114,
        firstName: 'Jey',
        lastName: 'Doe',
        email: 'jeydoe@demo.com',
        username: 'jeyfdoe',
        password: '$2a$08$cMHLsGwbXpJhCHEifwG6T.kdpRLZieTgEr4qUAAEywLTDwSqgHA3e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111115,
        firstName: 'Liza',
        lastName: 'Doe',
        email: 'ldoe@demo.com',
        username: 'lizadoe',
        password: '$2a$08$cMHLsGwbXpJhCHEifwG6T.kdpRLZieTgEr4qUAAEywLTDwSqgHA3e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1111116,
        firstName: 'Bill',
        lastName: 'Doe',
        email: 'billdoe@demo.com',
        username: 'billdoe',
        password: '$2a$08$cMHLsGwbXpJhCHEifwG6T.kdpRLZieTgEr4qUAAEywLTDwSqgHA3e',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
