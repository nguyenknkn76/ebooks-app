const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'orchestrator-service',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

const produceEvent = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};

module.exports = { produceEvent };
