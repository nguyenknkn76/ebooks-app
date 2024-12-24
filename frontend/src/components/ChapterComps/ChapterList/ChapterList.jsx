import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChapterList.scss";
import { Link } from "react-router-dom";

const ChapterList = ({ chapters }) => {
  const chaptersPerPage = 6;
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentChapters = chapters.slice(
    (currentPage - 1) * chaptersPerPage,
    currentPage * chaptersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const midIndex = Math.ceil(currentChapters.length / 2);
  const firstColumnChapters = currentChapters.slice(0, midIndex);
  const secondColumnChapters = currentChapters.slice(midIndex);

  return (
    <div className="chapter-list-container">
      <div className="chapter-list">
        <div className="column">
          {firstColumnChapters.map((chapter, index) => (
            <Link key={chapter.id} to={`/chaptercontent/${chapter.id}`} className="chapter">
              Chapter {chapter.chapter_number}: {chapter.name}
            </Link>
            // <div key={index} className="chapter">
            // </div>
          ))}
        </div>
        <div className="column">
          {secondColumnChapters.map((chapter, index) => (
            <div key={index} className="chapter">
              {chapter.name}
            </div>
          ))}
        </div>
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
          .filter((page) => page === currentPage)
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

ChapterList.propTypes = {
  chapters: PropTypes.array.isRequired,
};

export default ChapterList;