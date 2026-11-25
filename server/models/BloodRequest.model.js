const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    unique: true,
    required: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
    index: true
  },
  requiredBloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  componentType: {
    type: String,
    enum: ['whole_blood', 'packed_rbc', 'plasma', 'platelets'],
    required: true
  },
  requiredUnits: {
    type: Number,
    required: true,
    min: 1
  },
  patientReference: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['critical', 'high', 'normal'],
    required: true,
    default: 'normal'
  },
  requiredBy: {
    type: Date,
    required: true
  },
  deliveryLocation: {
    address: String,
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
    }
  },
  contactInfo: {
    contactPerson: String,
    phone: String,
    extension: String
  },
  status: {
    type: String,
    enum: ['pending', 'matched', 'accepted', 'dispatched', 'delivered', 'cancelled', 'rejected'],
    default: 'pending'
  },
  matchedBloodBank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodBank'
  },
  dispatchRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DispatchRecord'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bloodRequestSchema.index({ status: 1, urgency: 1 });
bloodRequestSchema.index({ requiredBy: 1 });
bloodRequestSchema.index({ createdAt: -1 });

bloodRequestSchema.pre('validate', function(next) {
  if (!this.requestId) {
    const hospitalIdStr = this.hospitalId?.toString().substring(0, 8).toUpperCase();
    this.requestId = `REQ-${hospitalIdStr || 'HOSP'}-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);