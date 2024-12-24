import React from 'react';
import './CommentItem.scss';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
};

const CommentItem = ({ comment1 }) => {
    const { comment, created_at, user } = comment1;

    return (
        <div className="comment-item">
            <div className="comment-header">
                <span className="user-name">{user.profile.name}</span>
                <span className="comment-time">{formatDate(created_at)}</span>
            </div>
            <div className="comment-body">
                {comment}
            </div>
        </div>
    );
};

export default CommentItem;
