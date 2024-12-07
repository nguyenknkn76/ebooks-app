const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'service2',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: 'service2-group' });

(async () => {
  await producer.connect();
  await consumer.connect();

  // sub to topic ev2 
  await consumer.subscribe({ topic: 'service2', fromBeginning: true });

  // consumer logic 
  consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Service2 received:', event);
      // do smt here business logic
      const result = { status: 'processed-ev2', originalPayload: event.payload };
      // send res back to orchestrator 
      await producer.send({
        topic: 'service2-response',
        messages: [{ value: JSON.stringify(result) }],
      });
    },
  });
})();
