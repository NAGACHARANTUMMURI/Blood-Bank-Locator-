const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  hospitalName: {
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
  department: String,
  type: {
    type: String,
    enum: ['General', 'Specialty', 'Teaching', 'Mission', 'Other'],
    default: 'General'
  },
  totalBeds: Number,
  emergencyContact: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

hospitalSchema.index({ location: '2dsphere' });

hospitalSchema.virtual('bloodRequests', {
  ref: 'BloodRequest',
  localField: '_id',
  foreignField: 'hospitalId'
});

module.exports = mongoose.model('Hospital', hospitalSchema);