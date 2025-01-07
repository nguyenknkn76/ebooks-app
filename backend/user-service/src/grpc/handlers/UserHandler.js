const { User, Profile, MediaFile, sequelize } = require('../../models');
const userService = require('../../services/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const grpc = require('@grpc/grpc-js');
require('dotenv').config();

const formatUserResponse = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  profile: user.Profile ? {
    id: user.Profile.id,
    name: user.Profile.name,
    phone: user.Profile.phone,
    address: user.Profile.address,
    avatar: user.Profile.MediaFile ? {
      id: user.Profile.MediaFile.id,
      file_url: user.Profile.MediaFile.file_url,
      file_type: user.Profile.MediaFile.file_type
    } : null
  } : null
});

const countUsersThisMonth = async (call, callback) => {
  try {
    const count = await userService.countUsersThisMonth();
    callback(null, { total: count });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const countUsers = async (call, callback) => {
  try {
    const count = await userService.countUsers();
    callback(null, { total: count });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllUsers = async (call, callback) => {
  try {
    const users = await userService.getAllUsers();
    // console.log(users);
    callback(null, { 
      users: users.map(formatUserResponse) 
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getUserById = async (call, callback) => {
  try {
    const user = await userService.getUserById(call.request.id);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'User not found'
      });
    }
    callback(null, { user: formatUserResponse(user) });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const registerUser = async (call, callback) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, password, email } = call.request;
    
    // Check existing username
    const existingUsername = await User.findOne({ where: { username }});
    if (existingUsername) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: 'Username already exists'
      });
    }

    // Check existing email
    const existingEmail = await User.findOne({ where: { email }});
    if (existingEmail) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with transaction
    const user = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      role: 'reader'
    }, { transaction });

    // Create empty profile for user
    await Profile.create({
      user: user.id,
      name: username, // Default name is username
      phone: '',
      address: '',
    }, { transaction });

    await transaction.commit();

    callback(null, {
      id: user.id,
      username: user.username,
      email: user.email,
      message: 'User registered successfully'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Registration error:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message || 'Internal server error'
    });
  }
};

const updateUser = async (call, callback) => {
  try {
    const { user_id, ...updateData } = call.request;
    const updatedUser = await userService.updateUserAndProfile(user_id, updateData);
    
    callback(null, {
      user: formatUserResponse(updatedUser),
      message: 'User updated successfully'
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const login = async (call, callback) => {
  try {
    const { username, password } = call.request;
    
    // Validate input
    if (!username || !password) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Username and password are required'
      });
    }

    // Find user
    const user = await userService.findByUsername(username);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'User not found'
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Invalid password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    // console.log(user);
    callback(null, {
      access_token: token,
      user: formatUserResponse(user),
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message || 'Internal server error'
    });
  }
};

const getTotalUsersInTwelveMonths = async (call, callback) => {
  try {
    const monthlyTotals = await userService.getTotalUsersInTwelveMonths();
    callback(null, { monthly_totals: monthlyTotals });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getUsersByUserIds = async (call, callback) => {
  try {
    const users = await userService.getUsersByUserIds(call.request.user_ids);
    callback(null, { 
      users: users.map(formatUserResponse)
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  getUsersByUserIds,
  getTotalUsersInTwelveMonths,
  getAllUsers,
  getUserById,
  registerUser,
  login,
  countUsers,
  countUsersThisMonth,
  updateUser
};