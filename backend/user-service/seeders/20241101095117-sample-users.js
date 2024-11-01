'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: '123e4567-e89b-12d3-a456-426614174000', // UUID can be manually set or use a UUID generator here
        username: 'john_doe',
        password_hash: 'hashed_password_123', // ideally hashed
        email: 'john.doe@example.com',
        access_token: null,
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '987fbc97-4bed-5078-af07-9141ba07c9f3',
        username: 'jane_smith',
        password_hash: 'hashed_password_456',
        email: 'jane.smith@example.com',
        access_token: null,
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};