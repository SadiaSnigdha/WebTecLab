const { body } = require('express-validator');

exports.createCommentValidation = [
  body('text')
    .trim()
    .notEmpty().withMessage('Comment text is required')
    .isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters')
];

exports.updateCommentValidation = [
  body('text')
    .trim()
    .notEmpty().withMessage('Comment text is required')
    .isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters')
];
