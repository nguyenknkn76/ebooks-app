const commentService = require('../../services/commentService');
const Chapter = require('../../models/chapter');
const grpc = require('@grpc/grpc-js');

const formatCommentResponse = (comment) => ({
  id: comment._id.toString(),
  chapter_id: comment.chapter.toString(),
  user: comment.user,
  comment: comment.comment,
  created_at: comment.created_at.toISOString()
});

const createComment = async (call, callback) => {
  try {
    const { chapter_id, user, comment } = call.request;

    // Check chapter exists
    const chapter = await Chapter.findById(chapter_id);
    if (!chapter) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Chapter not found'
      });
    }

    // Create comment
    const newComment = await commentService.createComment({
      user,
      chapter_id,
      comment
    });

    // Update chapter
    chapter.comments.push(newComment._id);
    await chapter.save();

    callback(null, formatCommentResponse(newComment));
  } catch (error) {
    console.error('Error creating comment:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createComment
};