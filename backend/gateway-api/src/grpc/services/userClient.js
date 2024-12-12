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

// const getAllRoles = (data, callback) => client.GetAllRoles(data, callback);

// const getAllRoles = () => {
//     return new Promise((resolve, reject) => {
//         client.GetAllRoles({}, (error, response) => {
//             if (error) reject(error);
//             else resolve(respo   nse.roles);
//         });
//     });
// };
// module.exports = client;
module.exports = {
    getAllUsers, getUserById, registerUser, 
    getAllRoles: (data, callback) => client.GetAllRoles(data, callback),
    login: (data, callback) => client.Login(data, callback),
};
