const Age = require('../models/age');

const createAge = async (ageData) => {
  const age = new Age(ageData);
  return await age.save();
};

const getAllAges = async () => {
  return await Age.find();
};

const getAgeById = async (id) => {
  return await Age.findById(id);
};

const updateAge = async (id, ageData) => {
  return await Age.findByIdAndUpdate(id, ageData, { new: true });
};

const deleteAge = async (id) => {
  return await Age.findByIdAndDelete(id);
};

module.exports = {
  createAge,
  getAllAges,
  getAgeById,
  updateAge,
  deleteAge
};