const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User}  = require('../models'); 

/*
  ! ? vc note ruom ra the @@
  check user 
  if (user exists) keep doing;
  else return false
*/
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ error: 'User not found' });

  // validate password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

  // generate jwt token
  const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
  res.json({ access_token: token });
};
