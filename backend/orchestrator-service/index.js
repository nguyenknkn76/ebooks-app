const express = require('express');
const { Kafka, Partitioners} = require('kafkajs');
const app = express();
app.use(express.json());

// kafka config
const kafka = new Kafka({
  clientId: 'orchestrator',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

(async () => {
  await producer.connect();
  await consumer.connect();

  // sub to topic for res
  await consumer.subscribe({ topic: 'service1-response', fromBeginning: true });
  await consumer.subscribe({ topic: 'service2-response', fromBeginning: true });

  /* 
    consumer logic => solve messages from topics
    topic = service1-res => trigger next step of saga 
    topic = service2-res => end saga 
  */ 
  consumer.run({
    eachMessage: async ({ topic, message }) => {
      const response = JSON.parse(message.value.toString());
      if (topic === 'service1-response') {
        console.log('received from service1:', response);
        // trigger next step of saga
        await producer.send({
          topic: 'service2',
          messages: [{ value: JSON.stringify({ action: 'process-ev2', payload: response }) }],
        });
      } else if (topic === 'service2-response') {
        console.log('received from service2:', response);
        // end saga
        // console.log('saga completed nhe. this is final response:', response);
      }
    },
  });
})();

app.post('/start-saga', async (req, res) => {
  const { data } = req.body;

  // sending ev 1 to starting saga
  await producer.send({
    topic: 'service1',
    messages: [{ value: JSON.stringify({ action: 'process-ev1', payload: data }) }],
  });

  res.send({ message: 'Saga started' });
});

app.listen(3000, () => {
  console.log('Orchestrator Service running on port 3000');
});
