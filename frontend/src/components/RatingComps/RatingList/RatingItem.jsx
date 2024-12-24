import React from "react";
import "./RatingItem.scss";

const RatingItem = ({ rating1 }) => {
  // { rating, review, user }
  const { rating, review, user } = rating1;


  return (
    <div className="rating-item">
      <div className="user-info">
        <img
          src={user.cover_image?.file_url || "https://via.placeholder.com/50"}
          alt={user.name}
          className="user-avatar"
        />
        <div className="user-details">
          <h4 className="user-name">{user.name}</h4>
          <div className="rating-stars">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? "filled" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="review">{review}</p>
    </div>
  );
};

export default RatingItem;
