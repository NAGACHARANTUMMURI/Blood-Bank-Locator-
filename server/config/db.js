const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blood-bank-locator', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create geospatial indexes
    await createIndexes();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const collection of collections) {
      const collectionName = collection.name;

      switch (collectionName) {
        case 'users':
          await mongoose.connection.collection(collectionName).createIndex({ email: 1 }, { unique: true });
          break;
        case 'bloodbanks':
          await mongoose.connection.collection(collectionName).createIndex({ location: '2dsphere' });
          await mongoose.connection.collection(collectionName).createIndex({ verificationStatus: 1 });
          break;
        case 'hospitals':
          await mongoose.connection.collection(collectionName).createIndex({ location: '2dsphere' });
          break;
        case 'donors':
          await mongoose.connection.collection(collectionName).createIndex({ location: '2dsphere' });
          await mongoose.connection.collection(collectionName).createIndex({ bloodGroup: 1, isAvailable: 1 });
          break;
        case 'bloodinventories':
          await mongoose.connection.collection(collectionName).createIndex({ bloodBankId: 1, bloodGroup: 1, componentType: 1 }, { unique: true });
          await mongoose.connection.collection(collectionName).createIndex({ expiryDate: 1 });
          break;
        case 'bloodrequests':
          await mongoose.connection.collection(collectionName).createIndex({ status: 1, urgency: 1 });
          await mongoose.connection.collection(collectionName).createIndex({ createdAt: -1 });
          break;
        case 'dispatchrecords':
          await mongoose.connection.collection(collectionName).createIndex({ status: 1 });
          break;
        case 'notifications':
          await mongoose.connection.collection(collectionName).createIndex({ recipientId: 1, isRead: 1 });
          break;
      }
    }

    console.log('Database indexes created');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

module.exports = connectDB;