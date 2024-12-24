import React, { useState } from "react";
import "./CommentForm.scss";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && onSubmit) {
      console.log("Comment Submitted:", comment);
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
        <button type="submit" className="comment-form__button">
          Send
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
