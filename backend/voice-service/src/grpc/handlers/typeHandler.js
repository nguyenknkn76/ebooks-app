const grpc = require('@grpc/grpc-js');
const typeService = require('../../services/typeService');

const createType = async (call, callback) => {
  try {
    const { type, description } = call.request;

    if (!type) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Type is required'
      });
    }

    const newType = await typeService.createType({
      type,
      description
    });

    callback(null, {
      id: newType._id.toString(),
      type: newType.type,
      description: newType.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllTypes = async (call, callback) => {
  try {
    const types = await typeService.getAllTypes();
    callback(null, {
      types: types.map(type => ({
        id: type._id.toString(),
        type: type.type,
        description: type.description
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getTypeById = async (call, callback) => {
  try {
    const type = await typeService.getTypeById(call.request.id);
    
    if (!type) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Type not found'
      });
    }

    callback(null, {
      id: type._id.toString(),
      type: type.type,
      description: type.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};


module.exports = { 
  createType,
  getAllTypes,
  getTypeById
};