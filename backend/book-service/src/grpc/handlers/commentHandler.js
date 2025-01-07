const grpc = require('@grpc/grpc-js');
const commentService = require('../../services/commentService');

const createComment = async (call, callback) => {
  try {
    const { content, user, chapter } = call.request;
    
    const comment = await commentService.createComment({
      content,
      user,
      chapter
    });

    callback(null, {
      id: comment._id.toString(),
      content: comment.content,
      user: comment.user,
      created_at: comment.created_at.toISOString(),
      updated_at: comment.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getCommentsByChapterId = async (call, callback) => {
  try {
    const comments = await commentService.getCommentsByChapter(call.request.chapter_id);
    
    callback(null, {
      comments: comments.map(comment => ({
        id: comment._id.toString(),
        content: comment.content,
        user: comment.user,
        created_at: comment.created_at.toISOString(),
        updated_at: comment.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createComment,
  getCommentsByChapterId
};
