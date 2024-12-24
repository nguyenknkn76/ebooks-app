import React from "react";
import "./ItemBook2.scss";
import { Link } from "react-router-dom";

const ItemBook2 = ({ book }) => {
  const {
    title,
    cover_image,
    genre,
    description,
    avg_rating,
    total_comments,
    total_followers,
    total_views,
    status,
  } = book;

  return (
    <div className="item-book2-container">
      <Link to={`/bookdetails/${book.id}`}>
        <img className="cover-image" src={cover_image} alt={title} />
      </Link>
      <div className="content">
        <Link to={`/bookdetails/${book.id}`} className="title-link">
          <h2 className="title">{title}</h2>
        </Link>
        <div className="stats">
          <span className="stat">⭐ {avg_rating.toFixed(2)}</span>
          <span className="stat">👥 {total_followers} </span>
          <span className="stat">👁️ {total_views} </span>
          <span className="stat">💬 {total_comments} </span>
          <span className={`status ${status.toLowerCase()}`}>{status}</span>
        </div>
        <div className="genres">
          {genre.map((g, index) => (
            <span key={index} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
        <div className="description-container">
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemBook2;
