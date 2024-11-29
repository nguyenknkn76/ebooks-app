const authorClient = require('../services/bookClient');

exports.createAuthor = async (req, res) => {
  try {
    const authorData = req.body; 
    const response = await authorClient.createAuthor(authorData);
    res.status(201).json({ message: 'Author created successfully', author: response.author });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ message: 'Failed to create author', error });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const response = await authorClient.getAllAuthors();
    // console.log(response);
    // const authors = response.authors;
    res.status(200).json(response.authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({
      message:'Failed to fetch authors',
      error
    });
  }
}

exports.getAuthorById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await authorClient.getAuthorById(id);
    res.status(200).json(response.author);
  } catch (error) {
    console.error('Error fetching author by ID:', error);
    res.status(500).json({ message: 'Failed to fetch author', error });
  }
};