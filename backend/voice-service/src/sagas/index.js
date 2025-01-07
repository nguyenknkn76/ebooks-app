// const saga1 = require('./saga1');
// const recommendVoiceSaga = require('./recommnedVoiceSaga');

// const startSagas = async () => {
//   await saga1();
//   // await recommendVoiceSaga();
//   console.log('All sagas have been started');
// }
const { Kafka, Partitioners } = require('kafkajs');
const voiceService = require('../services/voiceService');

const kafka = new Kafka({
  clientId: 'voice-service',
  brokers: ['localhost:9092'],
}); 

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: 'voice-service-group' });

const startSagas = async () => {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: 'voice-service', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log('Voice service received:', event);
        
        const voiceId = event.payload.data.voiceId;
        const voice = await voiceService.getVoiceById(voiceId);
        
        const result = { 
          status: 'processed-voice',
          data: voice
        };
        
        await producer.send({
          topic: 'voice-service-response',
          messages: [{ value: JSON.stringify(result) }],
        });
      } catch (error) {
        console.error('Error in voice service:', error);
      }
    },
  });
}

module.exports = {startSagas};