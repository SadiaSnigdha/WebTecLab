const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createCommentValidation, updateCommentValidation } = require('../validators/commentValidator');

router.get('/news/:newsId/comments', commentController.getCommentsByNews);

router.post('/news/:newsId/comments', authMiddleware, createCommentValidation, validate, commentController.createComment);

router.put('/:id', authMiddleware, updateCommentValidation, validate, commentController.updateComment);

router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
