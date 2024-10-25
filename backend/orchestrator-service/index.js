require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Kafka } = require('kafkajs');

// Load proto file
const packageDefinition = protoLoader.loadSync('./protos/saga.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const sagaProto = grpc.loadPackageDefinition(packageDefinition).saga;

// Cấu hình Kafka
const kafka = new Kafka({
  clientId: 'orchestrator',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'], // Đảm bảo biến môi trường KAFKA_BROKER được thiết lập đúng
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

// Khởi tạo Saga và gửi sự kiện tới Service 1
async function startSaga(call, callback) {
  await producer.connect();
  await producer.send({
    topic: 'service1_topic',
    messages: [{ value: JSON.stringify({ orderId: call.request.orderId }) }],
  });
  console.log('Sent message to service1_topic');
  
  callback(null, { status: 'Saga started' });
}

// Lắng nghe phản hồi từ Service 1 và tiếp tục Saga với Service 2
async function listenToService1Response() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'service1_response_topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log('Received response from Service 1:', data);

      // Tiếp tục Saga bằng cách gửi sự kiện tới Service 2
      await producer.send({
        topic: 'service2_topic',
        messages: [{ value: JSON.stringify({ orderId: data.orderId }) }],
      });
      console.log('Sent message to service2_topic');
    },
  });
}

// Khởi tạo server gRPC
function main() {
  const server = new grpc.Server();
  server.addService(sagaProto.OrchestratorService.service, { StartSaga: startSaga });
  server.bindAsync(
    `0.0.0.0:${process.env.ORCHESTRATOR_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`Orchestrator service running at 0.0.0.0:${process.env.ORCHESTRATOR_PORT}`);
      listenToService1Response();
    }
  );
}

main();
