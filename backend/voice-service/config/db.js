const mongoose = require('mongoose');
require('dotenv').config();
const {insertSampleData} = require('../src/sample-data/voiceS-sample-data')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    })
    // .then(insertSampleData);
    console.log("Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = {connectDB};
