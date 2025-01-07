const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/saga.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).saga;
const connectDB = require('../../config/db');
require('dotenv').config();
connectDB();

const startGrpcServer = async () => {
  const server = new grpc.Server();
  server.addService(bookProto.BookService.service, { 
    
  });
   server.bindAsync('0.0.0.0:50059', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50059');
  });
}

module.exports = {startGrpcServer};