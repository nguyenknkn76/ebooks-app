const bookClient = require('../services/bookClient');

exports.getBooks = (req, res) => {
  bookClient.GetBooks({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(response.books);
  });
};
