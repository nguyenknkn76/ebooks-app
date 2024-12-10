const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'orchestrator',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

module.exports = { kafka, producer, consumer };
