'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      { id: uuidv4(), role: 'reader', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), role: 'author', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), role: 'admin', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
