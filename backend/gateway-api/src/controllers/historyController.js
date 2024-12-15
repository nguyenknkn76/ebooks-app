const historyClient = require('../grpc/clients/bookClient');

exports.createHistory = async (req, res) => {
  try {
    const { user, chapterId, voice } = req.body;

    const response = await historyClient.createHistory({ user, chapterId, voice });

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating history:', error);
    res.status(500).json({
      message: 'Failed to create history',
      error: error.details || 'Internal server error',
    });
  }
};


exports.getAllHistories = async (req, res) => {
  try {
    const response = await historyClient.getAllHistories();
    // console.log("this is history controller",response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching histories:', error);
    res.status(500).json({
      message: 'Failed to fetch histories',
      error: error.details || 'Internal server error',
    });
  }
};

exports.getHistoryById = async (req, res) => {
  // console.log('controller now')
  try {
    const { id } = req.params;

    const response = await historyClient.getHistoryById(id);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching history by ID:', error);
    res.status(error.code || 500).json({
      message: error.details || 'Failed to fetch history by ID',
    });
  }
};

exports.getHistoriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log();
    const response = await historyClient.getHistoriesByUserId(userId);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching histories by userId:', error);
    res.status(error.code || 500).json({
      message: error.details || 'Failed to fetch histories by userId',
    });
  }
};