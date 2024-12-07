const { produceEvent } = require('./producers');
const { consumeEvents } = require('./consumers');
const { produceEvent, consumeEvents } = require('./kafka');

const kafka = new Kafka({ clientId: 'voice-service', brokers: ['kafka:9092'] });
const producer = kafka.producer(); 
const consumer = kafka.consumer({ groupId: 'voice-group' });

const getVoiceData = async (event) => {
  const { bookId } = event;
  // Fetch voice data from database
  const voiceData = { id: 'voice1', name: 'Narrator Voice' };
  await produceEvent(producer, 'voice-data', { payload: voiceData });
};
consumeEvents(consumer, ['get-voice'], {
  'get-voice': getVoiceData,
});

module.exports = {startKafkaConsumer};
