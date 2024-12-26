const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './src/grpc/protos/user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

const createProfile = (data) => {
    return new Promise((resolve, reject) => {
        client.CreateProfile(data, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        });
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        client.GetAllUsers({}, (error, response) => {
            if (error) reject(error);
            else resolve(response.users);
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        client.GetUserById({ id }, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        });
    });
};    

const registerUser = (username, password, email) => {
    return new Promise((resolve, reject) => {
        client.RegisterUser({ username, password, email }, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        });   
    });
};

const login = (data, callback) => {
    return client.Login(data, callback);
}

// const login = (data) => {
//     return new Promise((resolve, reject) => {
//         client.Login(data, (error, response) => {
//             if (error) reject(error);
//             else resolve(response);
//         });
//     });
// };

const countUsers = () => {
  return new Promise((resolve, reject) => {
    client.CountUsers({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const countUsersThisMonth = () => {
  return new Promise((resolve, reject) => {
    client.CountUsersThisMonth({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

module.exports = {
    getAllUsers, 
    getUserById, 
    registerUser, 
    login,
    createProfile,
    countUsers,
    countUsersThisMonth
};
