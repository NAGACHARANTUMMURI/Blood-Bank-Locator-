require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Hospital = require('../models/Hospital.model');
const BloodBank = require('../models/BloodBank.model');
const Donor = require('../models/Donor.model');
const BloodInventory = require('../models/BloodInventory.model');

const connectDB = require('../config/db');

// Sample data
const sampleHospitals = [
  {
    hospitalName: 'General Hospital',
    address: {
      line1: '123 Medical Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560001',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716]
    },
    contactNumber: '+1 234 567 8900',
    email: 'info@generalhospital.org',
    department: 'Emergency',
    type: 'General',
    totalBeds: 500
  },
  {
    hospitalName: 'City Medical Center',
    address: {
      line1: '456 Healthcare Ave',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560002',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [77.6000, 12.9750]
    },
    contactNumber: '+1 234 567 8901',
    email: 'contact@citymedical.org',
    department: 'Cardiology',
    type: 'Specialty',
    totalBeds: 300
  }
];

const sampleBloodBanks = [
  {
    bloodBankName: 'Karnataka Red Cross Blood Bank',
    address: {
      line1: '789 Blood Bank Lane',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560003',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [77.5800, 12.9600]
    },
    contactNumber: '+1 234 567 8902',
    email: 'info@redcrossblood.org',
    workingHours: { open: '08:00', close: '20:00' },
    facilities: {
      hasRefrigeration: true,
      hasPlasmaProcessing: true,
      hasPlateletProcessing: true
    },
    verificationStatus: 'verified'
  },
  {
    bloodBankName: 'Apollo Blood Center',
    address: {
      line1: '321 Hospital Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560004',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [77.6100, 12.9800]
    },
    contactNumber: '+1 234 567 8903',
    email: 'bloodcenter@apollo.com',
    workingHours: { open: '07:00', close: '21:00' },
    facilities: {
      hasRefrigeration: true,
      hasPlasmaProcessing: true,
      hasPlateletProcessing: false
    },
    verificationStatus: 'verified'
  }
];

const sampleDonors = [
  {
    bloodGroup: 'O+',
    location: {
      type: 'Point',
      coordinates: [77.5850, 12.9650]
    },
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Male',
    lastDonationDate: new Date('2026-10-01'),
    totalDonations: 8,
    availability: {
      isAvailable: true,
      preferredDays: ['Monday', 'Wednesday', 'Friday'],
      preferredTime: { from: '09:00', to: '17:00' }
    },
    consentGiven: true,
    notificationPreferences: {
      emergencyAlerts: true,
      smsEnabled: true
    }
  },
  {
    bloodGroup: 'A+',
    location: {
      type: 'Point',
      coordinates: [77.5900, 12.9700]
    },
    dateOfBirth: new Date('1985-08-20'),
    gender: 'Female',
    lastDonationDate: new Date('2026-10-15'),
    totalDonations: 12,
    availability: {
      isAvailable: true,
      preferredDays: ['Tuesday', 'Thursday', 'Saturday'],
      preferredTime: { from: '10:00', to: '18:00' }
    },
    consentGiven: true,
    notificationPreferences: {
      emergencyAlerts: true,
      smsEnabled: false
    }
  },
  {
    bloodGroup: 'B-',
    location: {
      type: 'Point',
      coordinates: [77.6050, 12.9850]
    },
    dateOfBirth: new Date('1992-03-10'),
    gender: 'Male',
    lastDonationDate: new Date('2026-11-10'),
    totalDonations: 6,
    availability: {
      isAvailable: false,
      preferredDays: ['Sunday'],
      preferredTime: { from: '09:00', to: '15:00' }
    },
    consentGiven: true,
    notificationPreferences: {
      emergencyAlerts: true,
      smsEnabled: true
    }
  },
  {
    bloodGroup: 'AB+',
    location: {
      type: 'Point',
      coordinates: [77.5750, 12.9550]
    },
    dateOfBirth: new Date('1988-12-25'),
    gender: 'Female',
    lastDonationDate: new Date('2026-09-20'),
    totalDonations: 15,
    availability: {
      isAvailable: true,
      preferredDays: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      preferredTime: { from: '08:00', to: '14:00' }
    },
    consentGiven: true,
    notificationPreferences: {
      emergencyAlerts: true,
      smsEnabled: false
    }
  },
  {
    bloodGroup: 'O-',
    location: {
      type: 'Point',
      coordinates: [77.5950, 12.9750]
    },
    dateOfBirth: new Date('1995-11-30'),
    gender: 'Male',
    lastDonationDate: new Date('2026-11-15'),
    totalDonations: 3,
    availability: {
      isAvailable: true,
      preferredDays: ['Everyday'],
      preferredTime: { from: '10:00', to: '18:00' }
    },
    consentGiven: true,
    notificationPreferences: {
      emergencyAlerts: true,
      smsEnabled: true
    }
  }
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const components = ['whole_blood', 'packed_rbc', 'plasma', 'platelets'];

const generateInventory = (bloodBankId) => {
  return bloodGroups.map(group => {
    return components.map(component => {
      const now = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(now.getDate() + 30 + Math.floor(Math.random() * 30));

      return {
        bloodBankId,
        bloodGroup: group,
        componentType: component,
        availableUnits: Math.floor(Math.random() * 20) + 1,
        minimumStock: 5,
        expiryDate,
        collectionDate: now,
        verificationStatus: 'verified'
      };
    });
  }).flat();
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Hospital.deleteMany({});
    await BloodBank.deleteMany({});
    await Donor.deleteMany({});
    await BloodInventory.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@bloodbanklocator.org',
      phone: '+1 234 567 8900',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });

    // Create hospital users and hospital records
    for (const hospital of sampleHospitals) {
      const hospitalUser = await User.create({
        name: hospital.hospitalName.split(' ')[0] + ' Hospital',
        email: `${hospital.hospitalName.replace(/\s/g, '').toLowerCase()}@hospital.org`,
        phone: hospital.contactNumber,
        password: 'hospital123',
        role: 'hospital',
        isVerified: true
      });

      const hospitalRecord = await Hospital.create({
        userId: hospitalUser._id,
        ...hospital
      });

      // Update user with hospital metadata
      await User.findByIdAndUpdate(hospitalUser._id, {
        'roleMetadata.hospitalId': hospitalRecord._id
      });
    }

    // Create blood bank users and blood bank records
    for (const bloodBank of sampleBloodBanks) {
      const bloodBankUser = await User.create({
        name: bloodBank.bloodBankName,
        email: `${bloodBank.bloodBankName.replace(/\s/g, '').toLowerCase()}@bloodbank.org`,
        phone: bloodBank.contactNumber,
        password: 'bloodbank123',
        role: 'bloodbank',
        isVerified: true
      });

      const bloodBankRecord = await BloodBank.create({
        userId: bloodBankUser._id,
        ...bloodBank,
        verifiedBy: adminUser._id,
        verifiedAt: new Date()
      });

      await User.findByIdAndUpdate(bloodBankUser._id, {
        'roleMetadata.bloodBankId': bloodBankRecord._id
      });

      // Create sample inventory
      const inventory = generateInventory(bloodBankRecord._id);
      await BloodInventory.insertMany(inventory);
    }

    // Create sample donors
    for (const donor of sampleDonors) {
      const donorUser = await User.create({
        name: `Donor ${donor.bloodGroup}`,
        email: `donor${donor.bloodGroup.replace(/[\+\-]/g, '')}@donor.org`,
        phone: `+1 234 567 ${Math.floor(Math.random() * 9000) + 1000}`,
        password: 'donor123',
        role: 'donor',
        isVerified: true
      });

      const donorRecord = await Donor.create({
        userId: donorUser._id,
        ...donor
      });

      await User.findByIdAndUpdate(donorUser._id, {
        'roleMetadata.donorId': donorRecord._id
      });
    }

    console.log('Database seeding completed successfully!');
    console.log(`Created: ${sampleHospitals.length} hospitals`);
    console.log(`Created: ${sampleBloodBanks.length} blood banks`);
    console.log(`Created: ${sampleDonors.length} donors`);
    console.log('Created: Sample inventory records');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedDatabase();
});