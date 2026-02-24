const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { updateUserValidation } = require('../validators/authValidator');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', authMiddleware, updateUserValidation, validate, userController.updateUser);

router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
