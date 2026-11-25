const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    index: true
  },
  entity: {
    type: String,
    required: true,
    index: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userRole: {
    type: String,
    enum: ['hospital', 'bloodbank', 'donor', 'admin'],
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false
});

auditLogSchema.index({ entity: 1, action: 1, timestamp: -1 });
auditLogSchema.index({ userId: 1, timestamp: -1 });

auditLogSchema.statics.log = async function(action, entity, entityId, userId, userRole, details = {}, req = null) {
  const logEntry = new this({
    action,
    entity,
    entityId,
    userId,
    userRole,
    details,
    ipAddress: req?.ip || req?.connection?.remoteAddress,
    userAgent: req?.headers?.['user-agent']
  });
  return logEntry.save();
};

auditLogSchema.statics.logInventoryChange = async function(inventoryId, oldQuantity, newQuantity, userId, reason = '', req = null) {
  return this.log('inventory_update', 'BloodInventory', inventoryId, userId, 'bloodbank', {
    oldQuantity,
    newQuantity,
    quantityChange: newQuantity - oldQuantity,
    reason
  }, req);
};

auditLogSchema.statics.logDispatch = async function(dispatchId, action, userId, details = {}, req = null) {
  return this.log(action, 'DispatchRecord', dispatchId, userId, 'bloodbank', details, req);
};

module.exports = mongoose.model('AuditLog', auditLogSchema);