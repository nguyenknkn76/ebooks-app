const historyClient = require('../services/bookClient');

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
