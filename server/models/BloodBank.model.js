const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodBankName: {
    type: String,
    required: true
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pinCode: String,
    country: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  contactNumber: String,
  email: String,
  workingHours: {
    open: String,
    close: String
  },
  facilities: {
    hasRefrigeration: { type: Boolean, default: false },
    hasPlasmaProcessing: { type: Boolean, default: false },
    hasPlateletProcessing: { type: Boolean, default: false }
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bloodBankSchema.index({ location: '2dsphere' });
bloodBankSchema.index({ verificationStatus: 1 });

bloodBankSchema.virtual('inventories', {
  ref: 'BloodInventory',
  localField: '_id',
  foreignField: 'bloodBankId'
});

bloodBankSchema.virtual('dispatchRecords', {
  ref: 'DispatchRecord',
  localField: '_id',
  foreignField: 'bloodBankId'
});

module.exports = mongoose.model('BloodBank', bloodBankSchema);