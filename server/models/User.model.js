const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['hospital', 'bloodbank', 'donor', 'admin'],
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  roleMetadata: {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital'
    },
    bloodBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodBank'
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);