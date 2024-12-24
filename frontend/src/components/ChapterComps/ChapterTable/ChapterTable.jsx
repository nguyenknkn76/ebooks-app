import React, { useState } from "react";
import "./ChapterTable.scss";

const ChapterTable = ({ chapters }) => {
  const chaptersPerPage = 10;
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentChapters = chapters.slice(
    (currentPage - 1) * chaptersPerPage,
    currentPage * chaptersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (id) => {
    alert(`Viewing chapter with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      alert(`Deleted chapter with ID: ${id}`);
    }
  };

  return (
    <div className="chapter-table">
      <h2>Chapters</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Chapter</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentChapters.map((chapter) => (
            <tr key={chapter.id}>
              <td>{chapter.id}</td>
              <td>Chapter {chapter.chapter_number}</td>
              <td>{chapter.name}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleView(chapter.id)}
                >
                  View
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(chapter.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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

export default ChapterTable;