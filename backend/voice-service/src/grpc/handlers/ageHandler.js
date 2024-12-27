const grpc = require('@grpc/grpc-js');
const ageService = require('../../services/ageService');
const ggcttsService = require('../../services/ggcttsService');
const createAge = async (call, callback) => {
  try {
    const { name, rate, pitch, volumn } = call.request;
    
    const age = await ageService.createAge({ 
      name, 
      rate: parseFloat(rate), 
      pitch: parseFloat(pitch), 
      volumn: parseFloat(volumn) 
    });

    callback(null, {
      id: age._id.toString(),
      name: age.name,
      rate: age.rate || 0,
      pitch: age.pitch || 0,
      volumn: age.volumn || 0
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllAges = async (call, callback) => {
  const obj = {
    languageId:`676d0de796ffe37f31eec984` ,
    typeId: `676d248ea1998db20f2c953b`,
    gender: "FEMALE"
  }
  const voices = await ggcttsService.getGgcVoicesCustom(obj);

  console.log(voices);
  try {
    const ages = await ageService.getAllAges();
    callback(null, {
      ages: ages.map(age => ({
        id: age._id.toString(),
        name: age.name,
        rate: age.rate || 0,
        pitch: age.pitch || 0,
        volumn: age.volumn || 0
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAgeById = async (call, callback) => {
  try {
    const age = await ageService.getAgeById(call.request.id);
    
    if (!age) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Age not found'
      });
    }

    callback(null, {
      id: age._id.toString(),
      name: age.name,
      rate: age.rate || 0,
      pitch: age.pitch || 0,
      volumn: age.volumn || 0
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = { 
  createAge,
  getAllAges,
  getAgeById
};
