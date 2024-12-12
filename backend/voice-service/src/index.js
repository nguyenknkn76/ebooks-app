// const saga = require('../sagas/index');
// saga.startSagas();

const grpcServer = require('./grpc/server');
const saga = require('./sagas/index');

const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  saga.startSagas();
  grpcServer.runGrpcServer();
}

module.exports = {runApp}