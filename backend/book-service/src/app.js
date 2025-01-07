const grpcServer = require('./grpc/server');
const saga = require('./sagas/index');
const schedule = require('./utils/schedule');
const book = require('./models/book')
const chapter = require('./models/chapter')
const comment = require('./models/comment')
const genre = require('./models/genre')
const history = require('./models/history')
const mediaFile = require('./models/mediaFile')
const rating = require('./models/rating')


const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  saga.startSagas();
  grpcServer.startGrpcServer();
  schedule.resetMonthly();
  app.listen(3000, () => {
    console.log('Book Service running on port 3000');
  });
}

module.exports = {runApp}




