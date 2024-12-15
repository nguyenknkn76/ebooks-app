const CommentClient = require('../grpc/clients/bookClient');

exports.createComment = async (req, res) => {
  const { chapter_id } = req.params;
  const { user, comment } = req.body;

  try {
    const response = await CommentClient.createComment(chapter_id, user, comment);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment', error });
  }
};
