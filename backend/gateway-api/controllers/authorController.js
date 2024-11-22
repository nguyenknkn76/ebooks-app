const authorClient = require('../services/bookClient');

exports.createAuthor = async (req, res) => {
  try {
    const authorData = req.body; // Dữ liệu từ Frontend
    const response = await authorClient.createAuthor(authorData); // Gọi Author Service qua gRPC
    res.status(201).json({ message: 'Author created successfully', author: response.author });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ message: 'Failed to create author', error });
  }
};
