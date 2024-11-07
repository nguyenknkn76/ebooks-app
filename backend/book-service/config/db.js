const mongoose = require('mongoose');
const {createSampleData} = require('../sample-data/sampleData')
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    })
    // .then(createSampleData);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // console.log("bug loi lz")
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
