const { loginUser } = require('../controllers/authController');

const login = async (call, callback) => {
    const { username, password } = call.request;
    // Simulate Express req and res for reusing controller logic
    const res = {
      json: (data) => callback(null, data),
      status: (code) => ({ json: (data) => callback({ code, message: data.error }) })
    };
    await loginUser({ body: { username, password } }, res);
  }

server.addService(proto.UserService.service, {
  Login: login,
});
