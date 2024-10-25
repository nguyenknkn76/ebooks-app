const userGrpcClient = require('../services/userGrpcClient');

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Gọi gRPC client để xác thực thông tin đăng nhập
    userGrpcClient.Login({ username, password }, (error, response) => {
        if (error) {
            console.error('Error logging in:', error);
            return res.status(401).send('Invalid username or password');
        }
        return res.json({ token: response.token });
    });
};

exports.register = (req, res) => {
    console.log("user info", req.body)
    const { name, email, username, password } = req.body;

    userGrpcClient.CreateUser({ name, email, username, password }, (error, response) => {
        if (error) {
            console.log(error)
            return res.status(400).send('User already exists or invalid data');
        }
        return res.status(201).json(response);
    });
};