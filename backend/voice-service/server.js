require('dotenv').config();
const { connectDB } = require('./config/db');
const startGrpcServer = require('./services/voiceService');

connectDB().then(() => {
  startGrpcServer();
}).catch((error) => {
  console.error("Failed to connect to database:", error);
});
