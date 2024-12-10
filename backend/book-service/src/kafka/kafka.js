const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'service1',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const consumer = kafka.consumer({ groupId: 'service1-group' });

module.exports = { kafka, producer, consumer };
