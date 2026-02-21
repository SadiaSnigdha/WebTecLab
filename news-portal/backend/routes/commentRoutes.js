const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createCommentValidation, updateCommentValidation } = require('../validators/commentValidator');

// @route   GET /api/news/:newsId/comments
router.get('/news/:newsId/comments', commentController.getCommentsByNews);

// @route   POST /api/news/:newsId/comments
router.post('/news/:newsId/comments', authMiddleware, createCommentValidation, validate, commentController.createComment);

// @route   PUT /api/comments/:id
router.put('/:id', authMiddleware, updateCommentValidation, validate, commentController.updateComment);

// @route   DELETE /api/comments/:id
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
