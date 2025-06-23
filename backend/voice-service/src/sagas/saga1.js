const { connectProducer, sendMessage } = require('../kafka/producer');
const { connectConsumer, subscribeToTopic, runConsumer } = require('../kafka/consumer');

const saga1 = async () => {
  await connectProducer();
  await connectConsumer();
  
  await subscribeToTopic('service2');

  await runConsumer(async ({ message }) => {
    const event = JSON.parse(message.value.toString());
    console.log('Service2 received:', event);
    
    const result = { status: 'processed-ev2', originalPayload: event.payload };
    
    await sendMessage('service2-response', result);
  });
};

module.exports = saga1;
