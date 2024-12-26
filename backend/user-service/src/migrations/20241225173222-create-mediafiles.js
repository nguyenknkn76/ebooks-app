'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MediaFiles', {
      id: { 
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4, 
        primaryKey: true 
      },
      profile: { 
        type: Sequelize.UUID, 
        references: {
          model: 'Profiles',
          key: 'id',
        },
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_type: {
        type: Sequelize.STRING,
      },
      file_size: {
        type: Sequelize.INTEGER,
      },
      file_collection: {
        type: Sequelize.STRING,
      },
      createdAt: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn('now') 
      },
      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn('now') 
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MediaFiles');
  }
};
