import React, { useState } from "react";
import "./RatingForm.scss";

const RatingForm = ({ onSubmit, onBack }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ rating, review });
    }
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <h2 className="rating-form__title">Rating Books</h2>
      <div className="rating-form__stars">
        <span>Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "active" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <div className="rating-form__review">
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
        />
      </div>
      <div className="rating-form__actions">
        <button type="button" className="btn btn-back" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn btn-complete">
          Complete
        </button>
      </div>
    </form>
  );
};

export default RatingForm;
