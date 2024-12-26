'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        username: 'john_doe',
        password_hash: 'hashed_password_1',
        email: 'john@example.com',
        access_token: 'sample_access_token_1',
        refresh_token: 'sample_refresh_token_1',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'jane_doe',
        password_hash: 'hashed_password_2',
        email: 'jane@example.com',
        access_token: 'sample_access_token_2',
        refresh_token: 'sample_refresh_token_2',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
