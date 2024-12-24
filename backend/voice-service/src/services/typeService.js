const Type = require('../models/type');

const createType = async (data) => {
  const type = new Type(data);
  return await type.save();
};

const getAllTypes = async () => {
  return await Type.find();
};

const getTypeById = async (id) => {
  return await Type.findById(id);
};

const updateType = async (id, data) => {
  return await Type.findByIdAndUpdate(id, data, { new: true });
};

const deleteType = async (id) => {
  return await Type.findByIdAndDelete(id);
};

module.exports = {
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType
};