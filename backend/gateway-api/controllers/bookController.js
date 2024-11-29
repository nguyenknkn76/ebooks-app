const bookClient = require('../services/bookClient');

exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    // console.log(bookData);
    const response = await bookClient.createBook(bookData); 
    // console.log(response);
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

exports.getAllBooks = async (req, res) => {
  try {
    const response = await bookClient.getAllBooks();
    const booksResponse = response.books.map(book => {
      book.avg_rating = book.avg_rating.toFixed(1);
      return book;
    });
    res.status(200).json(booksResponse);

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      message: 'Failed to fetch books',
      error
    })
  }
};