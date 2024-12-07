const {Kafka} = require('kafkajs');
const clientId = "my-app";
const brokers = ["localhost:9092"];
const topic = "message-log";

const kafka = new Kafka({clientId, brokers});
// const producer = kafka.producer();
const consumer = kafka.consumer({groupId: clientId});

const consume = async() => {
    await consumer.connect();
    await consumer.subscribe({topic});
    await consumer.run({
        eachMessage: ({message}) => {
            console.log(`receviced  message: ${message.value}`);
        }
    })
}

module.exports = consume;