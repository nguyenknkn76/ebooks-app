// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User, Role} = require('../models');

exports.getAllUsers = async (call, callback) => {
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

exports.getUserById = async (call, callback) => {
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

exports.registerUser = async (call, callback) => {
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

/*
  - func: getAllRoles() => roles
*/
exports.getAllRoles = async (call, callback) => {
  try {
    const roles = await Role.findAll();
    const response = { roles: roles.map(role => ({ id: role.id, role: role.role })) };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

/*
  - func: login (username, password) => access_token
  + check user exists
  + check password ~ compare with password hash
  + genrete token
*/
exports.login = async (call, callback) => {
  try {
    const { username, password } = call.request;
    const user = await User.findOne({where: { username }});
    if(!user) return res.status(400).json({error: 'User not found'});
  
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if(!isPasswordValid) return res.status(400).json({error: 'Invalid credentials'});
  
    const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
    
    callback(null, {access_token: token});
  } catch (error) {
    callback(error, null)
  }
}
