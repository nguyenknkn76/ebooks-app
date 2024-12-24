import React, { useState } from "react";
import RatingItem from "./RatingItem";
import "./RatingList.scss";

const RatingList = ({ ratings }) => {
  const ratingsPerPage = 3;
  const totalPages = Math.ceil(ratings.length / ratingsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentRatings = ratings.slice(
    (currentPage - 1) * ratingsPerPage,
    currentPage * ratingsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="rating-list-container">
      <div className="rating-list">
        {currentRatings.map((rating1, index) => (
          <RatingItem key={index} rating1={rating1} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter(page => page === currentPage)
        .map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default RatingList;