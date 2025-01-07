// const saga1 = require('./saga1');
// const recommendVoiceSaga = require('./recommnedVoiceSaga');

// const startSagas = async () => {
//   await saga1();
//   await recommendVoiceSaga();
//   console.log('All sagas have been started');
// };

// module.exports = {startSagas};
const { Kafka, Partitioners } = require('kafkajs');

const getMostUsedVoice = (histories) => {
  const voiceCounts = histories.reduce((acc, history) => {
    const voiceId = history.voice;
    acc[voiceId] = (acc[voiceId] || 0) + 1;
    return acc;
  }, {});

  const mostUsedVoice = Object.entries(voiceCounts)
    .sort(([, a], [, b]) => b - a)[0];
    
  return mostUsedVoice ? mostUsedVoice[0] : null;
};

const kafka = new Kafka({
  clientId: 'recommendation-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: 'recommendation-service-group' });

const startSagas = async () => {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: 'recommendation-service', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log('Recommendation service received:', event);
        
        const mostUsedVoiceId = getMostUsedVoice(event.payload.histories);
        
        const result = { 
          status: 'processed-recommendation', 
          data: {
            voiceId: mostUsedVoiceId,
            bookId: event.payload.bookId
          }
        };
        
        await producer.send({
          topic: 'recommendation-service-response',
          messages: [{ value: JSON.stringify(result) }],
        });
      } catch (error) {
        console.error('Error in recommendation service:', error);
      }
    },
  });
}

module.exports = {startSagas};