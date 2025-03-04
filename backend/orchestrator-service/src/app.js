const grpcServer = require('./grpc/server');

const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  // saga.startSagas();
  grpcServer.startGrpcServer();
  // schedule.resetMonthly();
  app.listen(4004, () => {
    console.log('Orchestrator Service running on port 4004');
  });
}

module.exports = {runApp}




