const libraryClient= require('../services/bookClient');

exports.createLibrary = async (req, res) => {
  const { user, name, book_ids } = req.body;

  try {
    const response = await libraryClient.createLibrary({ user, name, book_ids });
    res.status(201).json({
      id: response.id,
      message: response.message,
    });
  } catch (error) {
    console.error('Error creating library:', error);
    res.status(500).json({
      message: 'Failed to create library',
      error: error.details || 'Internal server error',
    });
  }
};

exports.getAllLibraries = async (req, res) => {
  try {
    const response = await libraryClient.getAllLibraries();
    res.status(200).json(response.libraries);
  } catch (error) {
    console.error('Error fetching libraries:', error);
    res.status(500).json({
      message: 'Failed to fetch libraries',
      error: error.details || 'Internal server error',
    });
  }
};

exports.getLibraryById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await libraryClient.getLibraryById(id);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching library by ID:', error);
    res.status(500).json({
      message: 'Failed to fetch library',
      error: error.details || 'Internal server error',
    });
  }
};

exports.getLibrariesByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await libraryClient.getLibrariesByUserId(id);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching libraries by userId:', error);
    res.status(500).json({
      message: 'Failed to fetch libraries',
      error: error.details || 'Internal server error',
    });
  }
};