const userClient = require('../services/userClient');

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  userClient.login({ username, password }, (error, response) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.json({ access_token: response.access_token });
  });
};
