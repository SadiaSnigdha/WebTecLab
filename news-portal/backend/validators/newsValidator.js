const { body } = require('express-validator');

exports.createNewsValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters'),
  
  body('body')
    .trim()
    .notEmpty().withMessage('Body is required')
    .isLength({ min: 10 }).withMessage('Body must be at least 10 characters')
];

exports.updateNewsValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters'),
  
  body('body')
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage('Body must be at least 10 characters')
];
