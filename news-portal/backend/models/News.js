const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' },
      len: { args: [5, 255], msg: 'Title must be between 5 and 255 characters' }
    }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Body is required' },
      len: { args: [10], msg: 'Body must be at least 10 characters' }
    }
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'author_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'news',
  timestamps: true
});

module.exports = News;
