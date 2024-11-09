const bookClient = require('../services/bookClient');

exports.getCommentsByChapterId = async (req, res) => {
    try {
        const comments = await bookClient.getCommentsByChapterId(req.params.chapterId);
        console.log(comments)
        res.json(comments);
    } catch (error) {
        console.error('Error in getCommentsByChapterId:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createComment = async (req, res) => {
    console.log('THIS IS GET COMMENT BY CHAPTER ID IN COMMENT CONTROLLER ================================================================')

    try {
        const { chapterId } = req.params;
        const { userId, comment } = req.body;
        const newComment = await bookClient.createComment(chapterId, userId, comment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error in createComment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};