const chapterClient = require('../grpc/clients/bookClient');
const fs = require('fs');

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

exports.getAllChapters = async (req, res) => {
  try {
    const response = await chapterClient.getAllChapters();
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).json({ message: 'Failed to fetch chapters', error });
  }
};

exports.getChaptersByBookId = async (req, res) => {
  const { book_id } = req.params;

  try {
    const response = await chapterClient.getChaptersByBookId(book_id);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching chapters by book ID:', error);
    res.status(500).json({ message: 'Failed to fetch chapters by book ID', error });
  }
};

exports.getChapterById = async (req, res) => {
  const { chapter_id } = req.params;

  try {
    const response = await chapterClient.getChapterById(chapter_id);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching chapter by ID:', error);
    res.status(500).json({ message: 'Failed to fetch chapter by ID', error });
  }
};

exports.editChapter = async (req, res) => {
  const { chapter_id } = req.params;
  const { name, text_file_id, audio_file_ids } = req.body;

  try {
    const response = await editChapter(chapter_id, name, text_file_id, audio_file_ids);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error editing chapter:', error);
    res.status(500).json({ message: 'Failed to edit chapter', error });
  }
};
exports.addAudioFile = async (req, res) => {
  const { chapter_id} = req.params;
  const {audio_file_name, audio_file_content} = req.body;
  // const { file } = req; // Sử dụng middleware multer để xử lý file

  try {
    // // Đọc nội dung file
    // const fileContent = fs.readFileSync(file.path);

    const response = await chapterClient.addAudioFile(
      chapter_id,
      audio_file_name,
      audio_file_content,
      "audio/mpeg",
      200
    );

    // // Xóa file tạm sau khi xử lý
    // fs.unlinkSync(file.path);

    res.status(201).json(response);
  } catch (error) {
    console.error('Error adding audio file:', error);
    res.status(500).json({ message: 'Failed to add audio file', error });
  }
};