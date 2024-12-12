// userService/grpcServer.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const UserService = require('./services/userService');

const PROTO_PATH = './protos/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;
// const roleProto = grpc.loadPackageDefinition(packageDefinition).proto;

const startServer = () => {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, { 
    GetAllUsers: UserService.getAllUsers,
    GetUserById: UserService.getUserById,
    RegisterUser: UserService.registerUser,
    GetAllRoles: UserService.getAllRoles,
    Login: UserService.login,
  });
  
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('User Service gRPC server running at http://0.0.0.0:50051');
  });
};

startServer();
