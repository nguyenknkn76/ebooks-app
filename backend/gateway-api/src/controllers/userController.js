const userClient = require('../grpc/clients/userClient');

const getAllUsers = async (req, res) => {
  try {
    const users = await userClient.getAllUsers();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users from User Service' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userClient.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user from User Service' });
  }
};

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await userClient.registerUser(username, password, email);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


const countUsers = async (req, res) => {
  try {
    const response = await userClient.countUsers({});
    res.json({ total: response.total });
  } catch (error) {
    console.error('Count users error:', error);
    res.status(500).json({ error: error.message });
  }
};

const countUsersThisMonth = async (req, res) => {
  try {
    const response = await userClient.countUsersThisMonth();
    res.json({ 
      total: response.total,
      month: new Date().toLocaleString('default', { month: 'long' })
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getAllUsers,
  getUserById,
  registerUser,
  countUsers, 
  countUsersThisMonth
};
