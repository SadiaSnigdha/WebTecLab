'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Alice Rahman',
        email: 'alice@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Karim Hossain',
        email: 'karim@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nusrat Jahan',
        email: 'nusrat@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
