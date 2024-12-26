const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const UserHandler = require('./handlers/UserHandler');
const ProfileHandler = require('./handlers/profileHandler');

const PROTO_PATH = './src/grpc/protos/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const startGrpcServer = () => {
  try {
    const server = new grpc.Server();
    server.addService(userProto.UserService.service, { 
      GetAllUsers: UserHandler.getAllUsers,
      GetUserById: UserHandler.getUserById,
      RegisterUser: UserHandler.registerUser,
      Login: UserHandler.login,
      CreateProfile: ProfileHandler.createProfile,
      CountUsers: UserHandler.countUsers,
      CountUsersThisMonth: UserHandler.countUsersThisMonth,
    });
  
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
      console.log('User Service gRPC server running at http://0.0.0.0:50051');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {startGrpcServer};
