const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
    index: true
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
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  lastDonationDate: Date,
  totalDonations: {
    type: Number,
    default: 0
  },
  availability: {
    isAvailable: { type: Boolean, default: false },
    preferredDays: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    preferredTime: {
      from: String,
      to: String
    }
  },
  medicalInfo: {
    hasAnyDisease: Boolean,
    diseaseDetails: String,
    isDiabetic: Boolean,
    isHypertensive: Boolean
  },
  consentGiven: {
    type: Boolean,
    default: false
  },
  notificationPreferences: {
    emergencyAlerts: { type: Boolean, default: true },
    smsEnabled: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

donorSchema.index({ location: '2dsphere' });
donorSchema.index({ bloodGroup: 1, isAvailable: 1 });

donorSchema.virtual('donationHistory', {
  ref: 'DonationHistory',
  localField: '_id',
  foreignField: 'donorId'
});

donorSchema.virtual('notifications', {
  ref: 'Notification',
  localField: '_id',
  foreignField: 'recipientId'
});

module.exports = mongoose.model('Donor', donorSchema);