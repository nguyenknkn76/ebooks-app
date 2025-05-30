const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'orchestrator-grpc',
  brokers: ['localhost:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});
const consumer = kafka.consumer({ groupId: 'orchestrator-service-group' });

const startSagaProcess = async (bookId) => {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: 'book-service-response', fromBeginning: true });
  await consumer.subscribe({ topic: 'recommendation-service-response', fromBeginning: true });
  await consumer.subscribe({ topic: 'voice-service-response', fromBeginning: true });

  await producer.send({
    topic: 'book-service',
    messages: [{ 
      value: JSON.stringify({
        action: 'process-book',
        payload: { bookId }
      })
    }]
  });
  
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
}

module.exports = { startSagaProcess };