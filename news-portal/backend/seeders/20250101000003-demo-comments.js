'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [
      {
        text: 'Great initiative! This will definitely help boost the tech industry.',
        user_id: 2,
        news_id: 1,
        createdAt: new Date('2025-12-04T10:30:00Z'),
        updatedAt: new Date('2025-12-04T10:30:00Z')
      },
      {
        text: 'Hope this brings more jobs to the region.',
        user_id: 3,
        news_id: 1,
        createdAt: new Date('2025-12-04T11:00:00Z'),
        updatedAt: new Date('2025-12-04T11:00:00Z')
      },
      {
        text: 'Congratulations! This is a proud moment for the local tech community.',
        user_id: 1,
        news_id: 2,
        createdAt: new Date('2025-12-05T09:30:00Z'),
        updatedAt: new Date('2025-12-05T09:30:00Z')
      },
      {
        text: 'Amazing work! AI in healthcare can save many lives.',
        user_id: 3,
        news_id: 2,
        createdAt: new Date('2025-12-05T10:00:00Z'),
        updatedAt: new Date('2025-12-05T10:00:00Z')
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
