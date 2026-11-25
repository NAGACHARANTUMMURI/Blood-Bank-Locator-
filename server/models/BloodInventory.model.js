const mongoose = require('mongoose');

const bloodInventorySchema = new mongoose.Schema({
  bloodBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodBank',
    required: true,
    index: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
    index: true
  },
  componentType: {
    type: String,
    enum: ['whole_blood', 'packed_rbc', 'plasma', 'platelets'],
    required: true
  },
  availableUnits: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  minimumStock: {
    type: Number,
    default: 5
  },
  expiryDate: {
    type: Date,
    required: true,
    index: true
  },
  collectionDate: {
    type: Date,
    required: true
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonationHistory'
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
  verificationStatus: {
    type: String,
    enum: ['verified', 'pending_verification', 'expired'],
    default: 'verified'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bloodInventorySchema.index({ bloodBankId: 1, bloodGroup: 1, componentType: 1 }, { unique: true });
bloodInventorySchema.index({ expiryDate: 1 });

bloodInventorySchema.methods.isExpiringSoon = function(days = 7) {
  const warningDate = new Date();
  warningDate.setDate(warningDate.getDate() + days);
  return this.expiryDate <= warningDate;
};

bloodInventorySchema.virtual('daysToExpiry').get(function() {
  const diffTime = this.expiryDate - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('BloodInventory', bloodInventorySchema);