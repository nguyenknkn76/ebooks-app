const Comment = require('../models/comment');

const createComment = async (data) => {
  const { user, chapter_id, comment } = data;
  
  const newComment = new Comment({
    user,
    chapter: chapter_id,
    comment,
  });

  return await newComment.save();
};

const getCommentsByChapterId = async (chapterId) => {
  return await Comment.find({ chapter: chapterId });
};

module.exports = {
  createComment,
  getCommentsByChapterId
};