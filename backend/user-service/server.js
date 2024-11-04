// userService/grpcServer.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const bcrypt = require('bcrypt');
const { User } = require('./models');
const roleController = require('./controllers/roleController');
const { loginUser } = require('./controllers/authController');

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

const getAllUsers = async (call, callback) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email'] });
    const userList = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));
    callback(null, { users: userList });
  } catch (error) {
    callback(error, null);
  }
};

const getUserById = async (call, callback) => {
  const userId = call.request.id;
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'username', 'email'],
    });
    if (user) {
      callback(null, user.toJSON());
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }
  } catch (error) {
    callback(error, null);
  }
};

const registerUser = async (call, callback) => {
  const { username, password, email } = call.request;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: 'User with this email already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password_hash: hashedPassword,
      email,
    });

    callback(null, {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    callback(error, null);
  }
};

const getAllRoles = async (call, callback) => {
  try {
    const roles = await roleController.getAllRoles();
    const response = { roles: roles.map(role => ({ id: role.id, role: role.role })) };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

const login = async (call, callback) => {
  const { username, password } = call.request;
  // Simulate Express req and res for reusing controller logic
  const res = {
    json: (data) => callback(null, data),
    status: (code) => ({ json: (data) => callback({ code, message: data.error }) })
  };
  await loginUser({ body: { username, password } }, res);
}

const startServer = () => {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, { 
    GetAllUsers: getAllUsers,
    GetUserById: getUserById,
    RegisterUser: registerUser,
    GetAllRoles: getAllRoles,
    Login: login
  });
  
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('User Service gRPC server running at http://0.0.0.0:50051');
  });
};

startServer();
