import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChapterTable2.scss';

const ChapterTable2 = ({ chapters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleView = (chapterId) => {
    navigate(`/adminchapters/${chapterId}`);
  };

  const filteredChapters = chapters.filter(chapter =>
    chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.chapter_number.toString().includes(searchTerm)
  );

  return (
    <div className="chapter-table-container">
      <div className="chapter-table-header">
        <h2>Chapters List</h2>
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="chapter-table">
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Name</th>
              <th>Comments</th>
              <th>Text File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredChapters.map((chapter) => (
              <tr key={chapter.id}>
                <td>Chapter {chapter.chapter_number}</td>
                <td>{chapter.name}</td>
                <td>{chapter.comments?.length || 0}</td>
                <td>
                  {chapter.text_file ? (
                    <span className="file-status has-file">Available</span>
                  ) : (
                    <span className="file-status no-file">Not available</span>
                  )}
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => handleView(chapter.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChapterTable2;