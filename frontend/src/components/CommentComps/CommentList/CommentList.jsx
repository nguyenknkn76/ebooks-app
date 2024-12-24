import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import './CommentList.scss';

const CommentList = ({ comments }) => {
  const commentsPerPage = 3;
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="comment-list-container">
      <div className="comment-list">
        {currentComments.map((comment1, index) => (
          <CommentItem key={index} comment1={comment1} />
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
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
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

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;