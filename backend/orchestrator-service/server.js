const express = require('express');
const saga = require('./src/sagas/index');
const { connectProducer, sendMessage } = require('./src/kafka/producer');

const app = express();
app.use(express.json());

saga.startSagas();

app.post('/start-saga', async (req, res) => {
  const { data } = req.body;

  // sending event 1 to start saga
  await sendMessage('service1', { action: 'process-ev1', payload: data });

  res.send({ message: 'Saga started' });
});

app.listen(3333, () => {
  console.log('Orchestrator Service running on port 3333');
});
