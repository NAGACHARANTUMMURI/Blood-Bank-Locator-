const mongoose = require('mongoose');

const dispatchRecordSchema = new mongoose.Schema({
  dispatchId: {
    type: String,
    unique: true,
    required: true
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodRequest',
    required: true,
    index: true
  },
  bloodBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodBank',
    required: true
  },
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodInventory',
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  componentType: {
    type: String,
    enum: ['whole_blood', 'packed_rbc', 'plasma', 'platelets'],
    required: true
  },
  unitsDispatched: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['assigned', 'prepared', 'dispatched', 'in_transit', 'delivered', 'cancelled'],
    default: 'assigned'
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dispatcherNotes: String,
  trackingInfo: {
    driverName: String,
    vehicleNumber: String,
    departureTime: Date,
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date
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

dispatchRecordSchema.index({ status: 1 });
dispatchRecordSchema.index({ dispatchId: 1 });

dispatchRecordSchema.methods.updateStatus = function(newStatus, notes) {
  this.status = newStatus;
  if (notes) {
    this.dispatcherNotes = notes;
  }
  return this.save();
};

module.exports = mongoose.model('DispatchRecord', dispatchRecordSchema);