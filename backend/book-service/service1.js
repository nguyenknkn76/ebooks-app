const { Kafka, Partitioners } = require('kafkajs');

//for all 
const kafka = new Kafka({
  clientId: 'service1',
  brokers: ['localhost:9092'],
}); 

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: 'service1-group' }); // consumer here

(async () => {
  await producer.connect();
  await consumer.connect(); //consumer here 

  // sub to topic ev1 
  await consumer.subscribe({ topic: 'service1', fromBeginning: true });
  // ===> consumer <====
  consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Service1 received:', event);

      // do smt
      const result = { status: 'processed-ev1', originalPayload: event.payload };

      // send res back to orchestrator
      await producer.send({
        topic: 'service1-response',
        messages: [{ value: JSON.stringify(result) }],
      });
    },
  });
})();
