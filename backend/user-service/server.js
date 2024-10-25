const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./config/db');  // PostgreSQL connection
const authConfig = require('./config/auth');  // JWT config
const { create } = require('domain');
const PROTO_PATH = './protos/user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;


// Function to create new user
async function createUser(call, callback) {
    console.log("this is user data", call.request)
    const { name, email, username, password } = call.request;

    // Kiểm tra username hoặc email đã tồn tại
    pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username], async (error, results) => {
        if (error) {
            // console.log(error)
            return callback({
                code: grpc.status.INTERNAL,
                details: 'Error querying database'
            });
        }

        if (results.rows.length > 0) {
            return callback({
                code: grpc.status.ALREADY_EXISTS,
                details: 'User with this email or username already exists'
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo access token và refresh token
        const accessToken = jwt.sign({ username }, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiration });
        const refreshToken = jwt.sign({ username }, authConfig.jwtSecret, { expiresIn: '7d' });
        console.log([name, email, username, hashedPassword, accessToken, refreshToken]);
        // Lưu user mới vào cơ sở dữ liệu
        pool.query(
            'INSERT INTO users (name, email, username, hash_password, access_token, refresh_token) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, username, hashedPassword, accessToken, refreshToken],
            (error, results) => {
                if (error) {
                    callback({
                        code: grpc.status.INTERNAL,
                        details: 'Error inserting user into database'
                    });
                } else {
                    const newUser = results.rows[0];
                    callback(null, {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        username: newUser.username,
                        access_token: newUser.access_token,
                        refresh_token: newUser.refresh_token
                    });
                }
            }
        );
    });
}

// Function to authenticate user
async function loginUser(call, callback) {
    const { username, password } = call.request;

    // Query to find user by username
    pool.query('SELECT * FROM users WHERE username = $1', [username], async (error, results) => {
        if (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Error querying database'
            });
            return;
        }

        if (results.rows.length > 0) {
            const user = results.rows[0];

            // Compare password with hashed password
            const passwordMatch = await bcrypt.compare(password, user.hash_password);
            if (passwordMatch) {
                // Generate JWT token
                const token = jwt.sign({ id: user.id, name: user.name, username: user.username }, authConfig.jwtSecret, {
                    expiresIn: authConfig.jwtExpiration
                });

                callback(null, { token });
            } else {
                callback({
                    code: grpc.status.UNAUTHENTICATED,
                    details: 'Invalid password'
                });
            }
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'User not found'
            });
        }
    });
}

// Function to fetch user from PostgreSQL database
function getUser(call, callback) {
    const userId = call.request.id;
    pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
        if (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Error querying database'
            });
            return;
        }

        if (results.rows.length > 0) {
            const user = results.rows[0];
            callback(null, {
                id: user.id.toString(),
                name: user.name,
                email: user.email
            });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'User not found'
            });
        }
    });
}

const server = new grpc.Server();

server.addService(userProto.UserService.service, { 
    GetUser: getUser,
    Login: loginUser,
    CreateUser: createUser,
});
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('User Service running at http://localhost:50051');
});
