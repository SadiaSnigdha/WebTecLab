const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { updateUserValidation } = require('../validators/authValidator');

// @route   GET /api/users
router.get('/', userController.getAllUsers);

// @route   GET /api/users/:id
router.get('/:id', userController.getUserById);

// @route   PUT /api/users/:id
router.put('/:id', authMiddleware, updateUserValidation, validate, userController.updateUser);

// @route   DELETE /api/users/:id
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
