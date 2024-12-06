const express = require('express');
const { produceEvent, consumeEvents } = require('./kafka');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/start-saga', async (req, res) => {
  const { event } = req.body;
  await produceEvent('saga-start', event);
  res.status(200).send('Saga started');
});

// init consumumer to hear event
const startConsumers = async () => {
  await consumeEvents(['saga-start', 'saga-next'], async (event) => {
    console.log('Received event:', event);
    //solve event here
  });
};

startConsumers().catch(console.error);

app.listen(port, () => {
  console.log(`Orchestrator service running on port ${port}`);
});
