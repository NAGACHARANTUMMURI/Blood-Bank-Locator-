require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'your-super-secret-refresh-key-change-in-production',
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d'
};