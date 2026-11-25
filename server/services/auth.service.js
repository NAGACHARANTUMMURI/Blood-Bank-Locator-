const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const jwtConfig = require('../config/jwt');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

exports.comparePassword = async (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

exports.generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    jwtConfig.refreshSecret,
    { expiresIn: jwtConfig.refreshExpiresIn }
  );
};

exports.sendTokenResponse = async (user, statusCode, res) => {
  const token = this.generateToken(user._id);

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + parseInt(jwtConfig.expiresIn) * 1000),
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified
    }
  });
};

exports.createUserWithRole = async (userData, role) => {
  const userExists = await User.findOne({ email: userData.email });

  if (userExists) {
    throw new Error('User with this email already exists');
  }

  const password = await this.hashPassword(userData.password);

  const user = await User.create({
    ...userData,
    role,
    password
  });

  return user;
};

module.exports = exports;