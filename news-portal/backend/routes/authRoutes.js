const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerValidation, loginValidation } = require('../validators/authValidator');


router.post('/register', registerValidation, validate, authController.register);

router.post('/login', loginValidation, validate, authController.login);

router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
