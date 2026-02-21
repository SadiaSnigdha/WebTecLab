const { News, User, Comment } = require('../models');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
exports.getAllNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'DESC' } = req.query;

    const offset = (page - 1) * limit;

    const { count, rows: news } = await News.findAndCountAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          include: {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email']
          }
        }
      ],
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      count: news.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: {
        news
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
exports.getNewsById = async (req, res, next) => {
  try {
    const news = await News.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          include: {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email']
          },
          order: [['createdAt', 'ASC']]
        }
      ]
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      data: {
        news
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private
exports.createNews = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    const news = await News.create({
      title,
      body,
      authorId: req.user.id
    });

    // Fetch the created news with author details
    const createdNews = await News.findByPk(news.id, {
      include: {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }
    });

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: {
        news: createdNews
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
exports.updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Check if user is the author
    if (news.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own news'
      });
    }

    await news.update({ title, body });

    // Fetch updated news with author details
    const updatedNews = await News.findByPk(id, {
      include: {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }
    });

    res.json({
      success: true,
      message: 'News updated successfully',
      data: {
        news: updatedNews
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
exports.deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Check if user is the author
    if (news.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own news'
      });
    }

    await news.destroy();

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
