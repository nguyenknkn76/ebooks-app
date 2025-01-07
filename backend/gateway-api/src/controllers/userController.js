const userClient = require('../grpc/clients/userClient');

const getAllUsers = async (req, res) => {
  try {
    const users = await userClient.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users from User Service' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await userClient.getUserById(userId);
    if (response) {
      res.status(200).json(response.user);
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

const getTotalUsersInTwelveMonths = async (req, res) => {
  try {
    const response = await userClient.getTotalUsersInTwelveMonths();
    res.json(response.monthly_totals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
      const userId = req.params.id;
      const updateData = req.body;
      
      if (req.file) {
          updateData.avatar = {
              file_name: req.file.originalname,
              file_content: req.file.buffer.toString('base64'),
              file_type: req.file.mimetype
          };
      }

      const response = await userClient.updateUser({
          user_id: userId,
          ...updateData
      });

      res.json(response);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getUsersByUserIds = async (req, res) => {
  try {
    const { user_ids } = req.body;
    const users = await userClient.getUsersByUserIds(user_ids);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getTotalUsersInTwelveMonths,
  getAllUsers,
  getUserById,
  registerUser,
  countUsers, 
  countUsersThisMonth,
  updateUser,
  getUsersByUserIds
};
