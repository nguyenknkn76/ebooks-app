const { consumer } = require('./kafka');

const connectConsumer = async () => {
  await consumer.connect();
};

const subscribeToTopics = async (topics) => {
  for (const topic of topics) {
    await consumer.subscribe({ topic: topic, fromBeginning: true });
  }
};

const runConsumer = async (eachMessage) => {
  await consumer.run({ eachMessage });
};

module.exports = { connectConsumer, subscribeToTopics, runConsumer };
