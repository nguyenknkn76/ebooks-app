const Language = require('../models/language');

const createLanguage = async (data) => {
  const language = new Language(data);
  return await language.save();
};

const getAllLanguages = async () => {
  return await Language.find();
};

const getLanguageById = async (id) => {
  return await Language.findById(id);
};

const updateLanguage = async (id, data) => {
  return await Language.findByIdAndUpdate(id, data, { new: true });
};

const deleteLanguage = async (id) => {
  return await Language.findByIdAndDelete(id);
};

module.exports = {
  createLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage
};