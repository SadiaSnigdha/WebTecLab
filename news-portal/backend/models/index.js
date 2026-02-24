const sequelize = require('../config/db');
const User = require('./User');
const News = require('./News');
const Comment = require('./Comment');


User.hasMany(News, { foreignKey: 'authorId', as: 'news' });
News.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

News.hasMany(Comment, { foreignKey: 'newsId', as: 'comments' });
Comment.belongsTo(News, { foreignKey: 'newsId', as: 'news' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  News,
  Comment
};
