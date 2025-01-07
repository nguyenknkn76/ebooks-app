// const saga1 = require('./saga1');

// const startSagas = async () => {
//   await saga1();
//   console.log('All sagas have been started');
// };

// module.exports = {startSagas};

const { Kafka, Partitioners } = require('kafkajs');
const historyService = require('../services/historyService');

const kafka = new Kafka({
  clientId: 'book-service',
  brokers: ['localhost:9092'],
}); 

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: 'book-service-group' });

const startSagas = async () => {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: 'book-service', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log('Book service received:', event);
        
        const histories = await historyService.getHistoriesByBookId(event.payload.bookId);
        
        const result = { 
          status: 'processed-book', 
          data: histories,
          bookId: event.payload.bookId
        };
        
        await producer.send({
          topic: 'book-service-response',
          messages: [{ value: JSON.stringify(result) }],
        });
      } catch (error) {
        console.error('Error processing book service message:', error);
      }
    },
  });
}

module.exports = {startSagas};