const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'orchestrator-service',
  brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

const consumeEvents = async (topics, callback) => {
  await consumer.connect();
  for (const topic of topics) {
    await consumer.subscribe({ topic, fromBeginning: true });
  }
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      await callback(event);
    },
  });
};

module.exports = { consumeEvents };
