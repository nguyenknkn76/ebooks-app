const grpc = require('@grpc/grpc-js');
const languageService = require('../../services/languageService');
const ggcttService = require('../../services/ggcttsService');
const createLanguage = async (call, callback) => {
  try {
    const { language_code, language, description } = call.request;

    if (!language_code || !language) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Language code and language are required'
      });
    }

    const newLanguage = await languageService.createLanguage({
      language_code,
      language,
      description
    });

    callback(null, {
      id: newLanguage._id.toString(),
      language_code: newLanguage.language_code,
      language: newLanguage.language,
      description: newLanguage.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllLanguages = async (call, callback) => {
  try {
    const languages = await languageService.getAllLanguages();
    callback(null, {
      languages: languages.map(lang => ({
        id: lang._id.toString(),
        language_code: lang.language_code,
        language: lang.language,
        description: lang.description
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getLanguageById = async (call, callback) => {
  try {
    const language = await languageService.getLanguageById(call.request.id);
    
    if (!language) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Language not found'
      });
    }

    callback(null, {
      id: language._id.toString(),
      language_code: language.language_code,
      language: language.language,
      description: language.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = { 
  createLanguage,
  getAllLanguages,
  getLanguageById
};