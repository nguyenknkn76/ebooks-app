const { connectProducer, sendMessage } = require('../kafka/producer');
const { connectConsumer, subscribeToTopic, runConsumer } = require('../kafka/consumer');

const saga1 = async () => {
  await connectProducer();
  await connectConsumer();
  
  await subscribeToTopic('service1');

  await runConsumer(async ({ message }) => {
    const event = JSON.parse(message.value.toString());
    console.log('Service1 received:', event);

    const result = { status: 'processed-ev1', originalPayload: event.payload };
    
    await sendMessage('service1-response', result);
  });
};

module.exports = saga1;
