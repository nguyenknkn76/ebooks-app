const userClient = require('../grpc/clients/userClient');

const createProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const { name, phone, address } = req.body;
    const avatar = req.file;

    const profileData = {
      user_id: userId,
      name,
      phone,
      address,
      avatar: avatar ? {
        file_name: avatar.originalname,
        file_content: avatar.buffer.toString('base64'),
        file_type: avatar.mimetype
      } : null
    };

    const response = await userClient.createProfile(profileData);
    res.status(201).json(response);
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProfile };