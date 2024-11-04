const userClient = require('../services/userClient');

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
    console.log('USER CONTROLLER =>>>> THIS IS USER:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};
// Controller function to get user information
// const getUser = (req, res) => {
//   const userId = req.params.id;

//   userClient.getUser({ id: userId }, (error, response) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     res.json(response);
//   });
// };

module.exports = { 
  getAllUsers,
  getUserById,
  registerUser
};
