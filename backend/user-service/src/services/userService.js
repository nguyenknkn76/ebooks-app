const { User, Profile, MediaFile, sequelize, Op } = require('../models');

const createUser = async (data) => {
  const transaction = await sequelize.transaction();
  
  try {
    const user = await User.create({
      username: data.username,
      email: data.email,
      password_hash: data.password_hash
    }, { transaction });

    if (data.profile) {
      await Profile.create({
        ...data.profile,
        user: user.id
      }, { transaction });
    }

    await transaction.commit();
    return user;
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
    }]
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
module.exports = {
  findByUsername,
  createUser,
  getAllUsers, 
  getUserById,
  updateUser,
  deleteUser,
  countUsers,
  countUsersThisMonth
};