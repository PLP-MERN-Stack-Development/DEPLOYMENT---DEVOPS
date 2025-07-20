const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || 'development';
    const uri =
      env === 'production'
        ? process.env.PROD_MONGODB_URI
        : process.env.DEV_MONGODB_URI;

    if (!uri) {
      throw new Error(`No MongoDB URI found for ${env} environment`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
