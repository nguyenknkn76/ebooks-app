const bookClient = require('../services/bookClient');

exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    const response = await bookClient.createBook(bookData); 
    res.status(201).json({ message: 'Book created successfully', book: response.book });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book', error });
  }
};
