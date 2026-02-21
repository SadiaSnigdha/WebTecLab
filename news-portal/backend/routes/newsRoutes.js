const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createNewsValidation, updateNewsValidation } = require('../validators/newsValidator');

// @route   GET /api/news
router.get('/', newsController.getAllNews);

// @route   GET /api/news/:id
router.get('/:id', newsController.getNewsById);

// @route   POST /api/news
router.post('/', authMiddleware, createNewsValidation, validate, newsController.createNews);

// @route   PUT /api/news/:id
router.put('/:id', authMiddleware, updateNewsValidation, validate, newsController.updateNews);

// @route   DELETE /api/news/:id
router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;
