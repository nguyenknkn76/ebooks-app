// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('MediaFiles', [
//       {
//         id: Sequelize.UUIDV4(),
//         profile: 'UUID_of_john_doe_profile', // Thay bằng UUID thực tế của profile John Doe
//         file_url: 'http://example.com/file1.jpg',
//         file_type: 'image/jpeg',
//         file_size: 1024,
//         file_collection: 'collection1',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         id: Sequelize.UUIDV4(),
//         profile: 'UUID_of_jane_doe_profile', // Thay bằng UUID thực tế của profile Jane Doe
//         file_url: 'http://example.com/file2.jpg',
//         file_type: 'image/jpeg',
//         file_size: 2048,
//         file_collection: 'collection2',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('MediaFiles', null, {});
//   }
// };
