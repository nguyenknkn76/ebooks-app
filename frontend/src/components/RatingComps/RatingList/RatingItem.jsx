import React from "react";
import "./RatingItem.scss";

const RatingItem = ({ rating }) => {
  console.log(rating);
  const { created_at, star, review, user } = rating;

  // Hàm định dạng ngày tháng
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="rating-item">
      <div className="rating-header">
        <span className="user-name">{user.username}</span>
        <div className="rating-stars">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`star ${index < star ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="rating-date">{formatDate(created_at)}</span>
      </div>
      <div className="rating-review">{review}</div>
    </div>
  );
};

export default RatingItem;
