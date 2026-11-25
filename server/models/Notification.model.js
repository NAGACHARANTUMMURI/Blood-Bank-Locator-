const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'recipientModel',
    required: true,
    index: true
  },
  recipientModel: {
    type: String,
    enum: ['Hospital', 'BloodBank', 'Donor', 'User'],
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['blood_request', 'donation_request', 'dispatch_update', 'inventory_alert', 'verification', 'system'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel'
  },
  relatedModel: {
    type: String,
    enum: ['BloodRequest', 'DispatchRecord', 'BloodInventory', null]
  },
  isRead: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  channel: {
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true }
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  },
  deliveredAt: Date,
  readAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

notificationSchema.index({ recipientId: 1, isRead: 1 });
notificationSchema.index({ type: 1, priority: 1 });
notificationSchema.index({ createdAt: -1 });

notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

notificationSchema.statics.createForUser = async function(userId, type, title, message, options = {}) {
  const notification = new this({
    recipientId: userId,
    recipientModel: 'User',
    type,
    title,
    message,
    priority: options.priority || 'medium',
    channel: options.channel || { email: true, push: true },
    data: options.data
  });
  return notification.save();
};

module.exports = mongoose.model('Notification', notificationSchema);