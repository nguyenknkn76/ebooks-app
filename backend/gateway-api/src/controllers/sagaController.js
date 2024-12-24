const SagaClient = require('../grpc/clients/sagaClient');

exports.getVoices = async (req, res) => {
  try {
    const info = await SagaClient.getInfoSaga();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
