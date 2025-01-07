const Comment = require('../models/comment');

const createComment = async (commentData) => {
  const comment = new Comment(commentData);
  return await comment.save();
};

const getCommentsByChapter = async (chapterId) => {
  return await Comment.find({ chapter: chapterId })
    .sort({ created_at: -1 });
};

const updateComment = async (id, commentData) => {
  return await Comment.findByIdAndUpdate(id, {
    ...commentData,
    updated_at: Date.now()
  }, { new: true });
};

const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

module.exports = {
  createComment,
  getCommentsByChapter,
  updateComment,
  deleteComment
};