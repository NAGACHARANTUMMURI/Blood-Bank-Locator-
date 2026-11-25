const mongoose = require('mongoose');

const donationHistorySchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true,
    index: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  bloodBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodBank'
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  donationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  componentType: {
    type: String,
    enum: ['whole_blood', 'packed_rbc', 'plasma', 'platelets'],
    required: true,
    default: 'whole_blood'
  },
  unitsCollected: {
    type: Number,
    required: true,
    min: 1
  },
  donationType: {
    type: String,
    enum: ['voluntary', 'altruistic', 'replacement', 'emergency'],
    required: true,
    default: 'voluntary'
  },
  donationCenter: {
    name: String,
    address: String
  },
  collectionMethod: {
    type: String,
    enum: ['phlebotomy', 'apheresis'],
    default: 'phlebotomy'
  },
  weight: Number,
  status: {
    type: String,
    enum: ['completed', 'cancelled', 'no_show'],
    default: 'completed'
  },
  notes: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

donationHistorySchema.index({ donorId: 1, donationDate: -1 });
donationHistorySchema.index({ bloodBankId: 1, donationDate: -1 });
donationHistorySchema.index({ bloodGroup: 1 });

donationHistorySchema.statics.getDonorStats = async function(donorId) {
  const stats = await this.aggregate([
    { $match: { donorId: mongoose.Types.ObjectId(donorId) } },
    {
      $group: {
        _id: '$bloodGroup',
        totalDonations: { $sum: 1 },
        totalUnits: { $sum: '$unitsCollected' },
        lastDonation: { $max: '$donationDate' }
      }
    }
  ]);
  return stats;
};

module.exports = mongoose.model('DonationHistory', donationHistorySchema);