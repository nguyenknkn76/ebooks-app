const { connectProducer, sendMessage } = require('../kafka/producer');
const { connectConsumer, subscribeToTopics, runConsumer } = require('../kafka/consumer');

const saga1 = async () => {
  await connectProducer();
  await connectConsumer();
  
  await subscribeToTopics(['service1-response', 'service2-response']);

  await runConsumer(async ({ topic, message }) => {
    const response = JSON.parse(message.value.toString());
    if (topic === 'service1-response') {
      console.log('received from service1:', response);
      // trigger next step of saga
      await sendMessage('service2', { action: 'process-ev2', payload: response });
    } else if (topic === 'service2-response') {
      console.log('received from service2:', response);
      // end saga
      console.log('saga completed. this is final response:', response);
    }
  });
};

module.exports = saga1;
