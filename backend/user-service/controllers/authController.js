const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import User model

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  
  // Check if user exists
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ error: 'User not found' });

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
  res.json({ access_token: token });
};
