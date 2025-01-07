import React, { useState } from "react";
import "./CommentForm.scss";

const CommentForm =  ({onSend}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() && onSend) {
      // console.log("Comment Submitted:", comment);
      await onSend({content: comment});
      setComment("");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2 className="comment-form__title">Comments</h2>
      <div className="comment-form__input-container">
        <textarea
          className="comment-form__textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
        ></textarea>
        <button type="submit" className="comment-form__button"  disabled={!comment.trim()}>
          Send
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
