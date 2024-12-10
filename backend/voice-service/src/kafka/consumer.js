const { consumer } = require('./kafka');

const connectConsumer = async () => {
  await consumer.connect();
};

const subscribeToTopic = async (topic) => {
  await consumer.subscribe({ topic: topic, fromBeginning: true });
};

const runConsumer = async (eachMessage) => {
  await consumer.run({ eachMessage });
};

module.exports = { connectConsumer, subscribeToTopic, runConsumer };
