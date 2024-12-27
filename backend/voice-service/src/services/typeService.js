const Type = require('../models/type');

const createType = async (typeData) => {
  const type = new Type(typeData);
  return await type.save();
};

const getAllTypes = async () => {
  return await Type.find();
};

const getTypeById = async (id) => {
  return await Type.findById(id);
};

const updateType = async (id, typeData) => {
  return await Type.findByIdAndUpdate(id, typeData, { new: true });
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