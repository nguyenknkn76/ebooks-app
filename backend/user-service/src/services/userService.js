const { User, Profile, MediaFile, sequelize, Op } = require('../models');

const createUser = async (data) => {
  const transaction = await sequelize.transaction();
  
  try {
    const user = await User.create({
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      role: 'reader'
    }, { transaction });

    // Create empty profile
    await Profile.create({
      user: user.id,
      name: data.username,
      phone: '',
      address: '',
    }, { transaction });

    await transaction.commit();
    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateUserAndProfile = async (userId, data) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    // Update user
    if (data.username || data.email) {
      await user.update({
        username: data.username || user.username,
        email: data.email || user.email
      }, { transaction });
    }

    // Get or create profile
    let profile = await Profile.findOne({ where: { user: userId } });
    if (!profile) {
      profile = await Profile.create({
        user: userId,
        name: data.name,
        phone: data.phone || '',
        address: data.address || ''
      }, { transaction });
    } else {
      await profile.update({
        name: data.name || profile.name,
        phone: data.phone || profile.phone,
        address: data.address || profile.address
      }, { transaction });
    }

    // Handle avatar
    if (data.avatar) {
      const fileUrl = await uploadMediaFile2({
        bucket_name: process.env.AWS_BUCKET_NAME_AVATAR,
        file_name: data.avatar.file_name,
        file_content: data.avatar.file_content,
        file_type: data.avatar.file_type
      });

      // Update or create media file
      let mediaFile = await MediaFile.findOne({
        where: { profile: profile.id }
      });

      if (mediaFile) {
        await mediaFile.update({
          file_url: fileUrl,
          file_type: data.avatar.file_type
        }, { transaction });
      } else {
        await MediaFile.create({
          profile: profile.id,
          file_url: fileUrl,
          file_type: data.avatar.file_type,
          file_collection: 'avatar'
        }, { transaction });
      }
    }

    await transaction.commit();

    return await getUserById(userId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getAllUsers = async () => {
  return await User.findAll({
    include: [{
      model: Profile,
      include: [MediaFile]
    }],
    // distinct: true,
    // group: ['User.id', 'Profile.id', 'Profile->MediaFile.id']
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    include: [{
      model: Profile,
      include: [MediaFile]
    }]
  });
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.update(data);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.destroy();
};

const findByUsername = async (username) => {
  return await User.findOne({ 
    where: { username },
    include: [{
      model: Profile,
      include: [MediaFile]
    }]
  });
};

const countUsers = async () => {
  return await User.count();
};

const countUsersThisMonth = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return await User.count({
    where: {
      createdAt: {
        [Op.between]: [startOfMonth, endOfMonth]
      }
    }
  });
};

const getTotalUsersInTwelveMonths = async () => {
  const months = [];
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const startDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59, 999);

    const count = await User.count({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    months.push({
      month: startDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
      total: count
    });
  }

  return months;
};

const getUsersByUserIds = async (userIds) => {
  return await User.findAll({
    where: {
      id: {
        [Op.in]: userIds
      }
    },
    include: [{
      model: Profile,
      include: [MediaFile]
    }]
  });
};

module.exports = {
  getUsersByUserIds,
  getTotalUsersInTwelveMonths,
  findByUsername,
  createUser,
  getAllUsers, 
  getUserById,
  updateUser,
  deleteUser,
  countUsers,
  countUsersThisMonth,
  updateUserAndProfile,
};