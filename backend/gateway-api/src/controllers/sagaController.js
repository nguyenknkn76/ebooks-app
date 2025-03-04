const sagaClient = require('../grpc/clients/sagaClient');

exports.recommendVoice = async (req, res) => {
  try {
    const { bookId } = req.body;
    const voice = await sagaClient.recommendVoice({ book_id: bookId });
    res.json(voice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};