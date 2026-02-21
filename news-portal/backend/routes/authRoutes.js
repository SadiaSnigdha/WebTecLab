const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerValidation, loginValidation } = require('../validators/authValidator');

// @route   POST /api/auth/register
router.post('/register', registerValidation, validate, authController.register);

// @route   POST /api/auth/login
router.post('/login', loginValidation, validate, authController.login);

// @route   GET /api/auth/me
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
