const express = require('express');
const { Kafka, Partitioners} = require('kafkajs');
const app = express();
app.use(express.json());

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

  await consumer.subscribe({ topic: 'book-service-response', fromBeginning: true });
  await consumer.subscribe({ topic: 'recommendation-service-response', fromBeginning: true });
  await consumer.subscribe({ topic: 'voice-service-response', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, message }) => {
      const response = JSON.parse(message.value.toString());
      if (topic === 'book-service-response') {
        console.log('received from book-service:', response);

        const histories = response.data;
        
        await producer.send({
          topic: 'recommendation-service',
          messages: [{ 
            value: JSON.stringify({ 
              action: 'process-recommendation', 
              payload: {
                histories: histories,
                bookId: response.bookId
              }
            }) 
          }],
        });
      } else if (topic === 'recommendation-service-response') {
        console.log('received from recommendation-service:', response);
        await producer.send({
          topic: 'voice-service',
          messages: [{ value: JSON.stringify({ action: 'process-voice', payload: response }) }],
        });
      } else if (topic === 'voice-service-response') {
        console.log('END SAGA with voice details:', response.data);
      }
    },
  });
})();

app.post('/start-saga', async (req, res) => {
  try {
    const bookId = "67730f4ef07dbd4c85765d56"; 
    
    await producer.send({
      topic: 'book-service',
      messages: [{ 
        value: JSON.stringify({ 
          action: 'process-book', 
          payload: {
            bookId: bookId
          }
        }) 
      }],
    });

    res.json({ 
      message: 'Saga started', 
      bookId: bookId 
    });
  } catch (error) {
    console.error('Error starting saga:', error);
    res.status(500).json({ error: 'Failed to start saga' });
  }
});

app.listen(4000, () => {
  console.log('Orchestrator Service running on port 4000');
});