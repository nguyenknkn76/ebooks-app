const express = require('express');
const { produceEvent, consumeEvents } = require('./kafka');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route để bắt đầu saga
app.post('/start-saga', async (req, res) => {
  const { event } = req.body;
  await produceEvent('saga-start', event);
  res.status(200).send('Saga started');
});

// Khởi tạo consumer để lắng nghe các sự kiện
const startConsumers = async () => {
  await consumeEvents(['saga-start', 'saga-next'], async (event) => {
    console.log('Received event:', event);
    // Xử lý sự kiện tại đây
  });
};

startConsumers().catch(console.error);

app.listen(port, () => {
  console.log(`Orchestrator service running on port ${port}`);
});
