'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profiles', [
      {
        id: Sequelize.UUIDV4(),
        user: '"6d7b7129-eca4-4afc-b295-240530dd6333"', // Thay bằng UUID thực tế
        name: 'John Doe',
        dob: '1990-01-01',
        phone: '123456789',
        address: '123 Main St',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: Sequelize.UUIDV4(),
        user: 'UUID_of_jane_doe', // Thay bằng UUID thực tế
        name: 'Jane Doe',
        dob: '1992-02-02',
        phone: '987654321',
        address: '456 Elm St',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
