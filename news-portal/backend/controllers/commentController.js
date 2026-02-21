const { Comment, User, News } = require('../models');

// @desc    Get all comments for a news
// @route   GET /api/news/:newsId/comments
// @access  Public
exports.getCommentsByNews = async (req, res, next) => {
  try {
    const { newsId } = req.params;

    // Check if news exists
    const news = await News.findByPk(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    const comments = await Comment.findAll({
      where: { newsId },
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      },
      order: [['createdAt', 'ASC']]
    });

    res.json({
      success: true,
      count: comments.length,
      data: {
        comments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create comment
// @route   POST /api/news/:newsId/comments
// @access  Private
exports.createComment = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const { text } = req.body;

    // Check if news exists
    const news = await News.findByPk(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    const comment = await Comment.create({
      text,
      userId: req.user.id,
      newsId
    });

    // Fetch the created comment with user details
    const createdComment = await Comment.findByPk(comment.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: {
        comment: createdComment
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is the author
    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own comments'
      });
    }

    await comment.update({ text });

    // Fetch updated comment with user details
    const updatedComment = await Comment.findByPk(id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    });

    res.json({
      success: true,
      message: 'Comment updated successfully',
      data: {
        comment: updatedComment
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is the author
    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }

    await comment.destroy();

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
