const Comment = require('../models/comment');
const Chapter = require('../models/chapter');

const createComment = async (call, callback) => {
  const { chapter_id, user, comment } = call.request;

  try {
    const chapter = await Chapter.findById(chapter_id);
    if (!chapter) {
      return callback({ code: 404, message: 'Chapter not found' });
    }
    const newComment = new Comment({
      user,
      chapter: chapter_id,
      comment,
    });
    await newComment.save();
    chapter.comments.push(newComment._id);
    await chapter.save();

    const response = {
      id: newComment._id.toString(),
      chapter_id,
      user: newComment.user,
      comment: newComment.comment,
      created_at: newComment.created_at.toISOString(),
    };
    callback(null, response);
  } catch (error) {
    console.error('Error creating comment:', error);
    callback({ code: 500, message: 'Internal server error' });
  }
};

module.exports = { createComment };
