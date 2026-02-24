const { User } = require('../models');

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


exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

  
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own profile'
      });
    }

  
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


exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own account'
      });
    }


    await user.destroy();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
