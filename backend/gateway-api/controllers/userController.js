const userGrpcClient = require('../services/userGrpcClient');

exports.getUser = (req, res) => {
    const userId = req.params.userId;

    // Call gRPC client
    userGrpcClient.GetUser({ id: userId }, (error, response) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error fetching user data');
        }
        return res.json(response);
        
    });
};


