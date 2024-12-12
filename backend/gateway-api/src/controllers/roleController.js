const userClient = require('../grpc/services/userClient');

exports.getAllRoles = (req, res) => {
  userClient.getAllRoles({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to retrieve roles' });
    }
    res.json(response.roles);
  });
};
