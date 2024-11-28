const bookClient = require('../services/bookClient');

exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    // console.log(bookData);
    const response = await bookClient.createBook(bookData); 
    console.log(response);
    const returnedObject = {
      message: 'Book created successfully', 
      book: response
    }
    // console.log(returnedObject);
    res.status(201).json(returnedObject);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book', error });
  }
};
