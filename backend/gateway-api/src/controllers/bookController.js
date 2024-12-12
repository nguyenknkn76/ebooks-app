const bookClient = require('../grpc/services/bookClient');

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
    res.status(200).json(response.books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
};

exports.getBookById = async (req, res) => {
  const id  = req.params.id;
  // console.log('this is book controller: ',id);
  try {
    const response = await bookClient.getBookById(id);
    if (!response) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: 'Failed to fetch book', error });
  }
};