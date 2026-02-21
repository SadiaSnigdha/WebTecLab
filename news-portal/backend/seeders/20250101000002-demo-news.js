'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('news', [
      {
        title: 'Govt Announces New Tech Park',
        body: 'A new state-of-the-art tech park will be established in Dhaka to boost the IT sector. The government has allocated significant resources to develop this infrastructure, which is expected to attract major technology companies and create thousands of job opportunities.',
        author_id: 1,
        createdAt: new Date('2025-12-04T10:00:00Z'),
        updatedAt: new Date('2025-12-04T10:00:00Z')
      },
      {
        title: 'Local Startup Wins Innovation Award',
        body: 'A Dhaka-based startup has won an international innovation award for AI-driven solutions in healthcare. The company developed a machine learning platform that helps diagnose diseases early, potentially saving thousands of lives.',
        author_id: 2,
        createdAt: new Date('2025-12-05T09:00:00Z'),
        updatedAt: new Date('2025-12-05T09:00:00Z')
      },
      {
        title: 'Historic Rainfall Disrupts Traffic Across the City',
        body: 'Unusually heavy overnight rainfall caused severe waterlogging in several major areas, leading to major traffic delays and public inconvenience. The meteorological department has issued warnings for continued rainfall in the coming days.',
        author_id: 1,
        createdAt: new Date('2025-12-10T14:28:49Z'),
        updatedAt: new Date('2025-12-10T14:28:49Z')
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('news', null, {});
  }
};
