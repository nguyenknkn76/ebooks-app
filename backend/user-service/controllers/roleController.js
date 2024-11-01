const { Role } = require('../models');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return roles;
  } catch (error) {
    throw new Error('Error retrieving roles');
  }
};
