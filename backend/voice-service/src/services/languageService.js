const Language = require('../models/language');

const createLanguage = async (languageData) => {
  const language = new Language(languageData);
  return await language.save();
};

const getAllLanguages = async () => {
  return await Language.find();
};

const getLanguageById = async (id) => {
  return await Language.findById(id);
};

const updateLanguage = async (id, languageData) => {
  return await Language.findByIdAndUpdate(id, languageData, { new: true });
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