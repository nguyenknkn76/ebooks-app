const bookClient = require('../services/bookClient');

exports.getAuthors = async (req, res) => {
    try {
      const authors = await bookClient.getAuthors();
      res.json(authors);
    } catch (error) {
      console.error('Error in getAuthors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getAuthorById = async (req, res) => {
    try {
      const author = await bookClient.getAuthorById(req.params.id);
      res.json(author);
    } catch (error) {
      console.error('Error in getAuthorById:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };