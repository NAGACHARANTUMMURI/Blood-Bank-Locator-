const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const {
  register,
  login,
  getProfile,
  updateProfile,
  logout
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

module.exports = router;