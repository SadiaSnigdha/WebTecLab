const { User } = require('../models');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      count: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own profile'
      });
    }

    // Update user
    await user.update({ name, email });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is deleting their own account
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own account'
      });
    }

    // Delete user
    await user.destroy();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
