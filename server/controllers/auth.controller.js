const authService = require('../services/auth.service');
const User = require('../models/User.model');

const wrapAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.register = wrapAsync(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, phone, password, and role'
    });
  }

  const validRoles = ['hospital', 'bloodbank', 'donor', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
    });
  }

  try {
    const user = await authService.createUserWithRole(req.body, role);

    await authService.sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
});

exports.login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  const isMatch = await authService.comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  await authService.sendTokenResponse(user, 200, res);
});

exports.getProfile = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

exports.updateProfile = wrapAsync(async (req, res, next) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name and phone'
    });
  }

  const user = await User.findById(req.user.id);

  user.name = name;
  user.phone = phone;

  await user.save();

  res.json({
    success: true,
    data: user
  });
});

exports.logout = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = exports;