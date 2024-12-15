const ratingClient = require('../grpc/clients/bookClient');

exports.createRating = async (req, res) => {
  const { user, book_id, rating, review } = req.body;

  try {
    const response = await ratingClient.createRating({ user, book_id, rating, review });
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ message: 'Failed to create rating', error });
  }
};
