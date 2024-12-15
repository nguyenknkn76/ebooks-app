const { producer } = require('./kafka');

const connectProducer = async () => {
  await producer.connect();
};

const sendMessage = async (topic, message) => {
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = { connectProducer, sendMessage };
