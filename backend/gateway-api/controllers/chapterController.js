const chapterClient = require('../services/bookClient');

exports.createChapter = async (req, res) => {
  const { name, book_id, text_file_name, text_file_content, audio_file_name, audio_file_content } = req.body;

  try {
    const response = await chapterClient.createChapter({
      name,
      book_id,
      text_file_name,
      text_file_content,
      audio_file_name,
      audio_file_content,
    });
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating chapter:', error);
    res.status(500).json({ error: 'Failed to create chapter' });
  }
};
