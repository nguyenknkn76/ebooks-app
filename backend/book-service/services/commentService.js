const Comment = require('../models/comment');

const getCommentsByChapterId = async (call, callback) => {
  try {
    const chapterId = call.request.chapterId;
    // console.log(chapterId);
    const comments = await Comment.find({ chapter_id: chapterId });
    callback(null, {
      comments: comments.map(comment => ({
        id: comment._id.toString(),
        // user_id: comment.user_id.toString(),
        user_id: comment.user_id,
        chapter_id: comment.chapter_id.toString(),
        comment: comment.comment,
        created_at: comment.created_at,
        replies: comment.replies,
      })),
    });
  } catch (error) {
    console.error('Error in getCommentsByChapterId:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const createComment = async (call, callback) => {
  try {
    console.log(call.request);
    const { chapter_id, user_id, comment } = call.request;

    const newComment = new Comment({
      chapter_id,
      user_id,
      comment,
      created_at: new Date(),
    });
    const savedComment = await newComment.save();

    callback(null, {
      comment: {
        id: savedComment._id.toString(),
        savedComment:savedComment.user_id,
        // user_id: savedComment.user_id.toString(),
        chapter_id: savedComment.chapter_id.toString(),
        comment: savedComment.comment,
        created_at: savedComment.created_at,
        replies: savedComment.replies,
      },
    });
  } catch (error) {
    console.error('Error in createComment:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

module.exports = { getCommentsByChapterId, createComment };