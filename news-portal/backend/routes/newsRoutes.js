const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createNewsValidation, updateNewsValidation } = require('../validators/newsValidator');
const { createCommentValidation } = require('../validators/commentValidator');


router.get('/', newsController.getAllNews);

router.get('/:id', newsController.getNewsById);

router.post('/', authMiddleware, createNewsValidation, validate, newsController.createNews);

router.put('/:id', authMiddleware, updateNewsValidation, validate, newsController.updateNews);

router.delete('/:id', authMiddleware, newsController.deleteNews);

router.get('/:newsId/comments', commentController.getCommentsByNews);

router.post('/:newsId/comments', authMiddleware, createCommentValidation, validate, commentController.createComment);

module.exports = router;
