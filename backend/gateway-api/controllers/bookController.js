const bookClient = require('../services/bookClient');

//! STILL BUG HERE @@ REMEMBER TO RESTRUCT THIS SHIT
exports.getBooks = (req, res) => {
  bookClient.GetBooks({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(response.books);
  });
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookClient.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    console.error('Error in getBookById:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

