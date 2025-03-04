const grpc = require('@grpc/grpc-js');
const { startSagaProcess } = require('../../sagas/index');

const recommendVoice = async (call, callback) => {
  try {
    const bookId = call.request.book_id;
    const voice = await startSagaProcess(bookId);
    callback(null, voice);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = { recommendVoice };