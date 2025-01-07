import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Modal, message } from 'antd';
import BookService from '../../../services/BookService';
import './LibraryTable.scss';

const LibraryTable = ({ libraries, onLibrariesChange, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const navigate = useNavigate();

  const handleView = (libraryId) => {
    if (onView) {
      onView(libraryId);
    }
  };

  const showDeleteConfirm = (libraryId) => {
    setSelectedLibraryId(libraryId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await BookService.deleteLibrary(selectedLibraryId);
      message.success('Library deleted successfully');
      setDeleteModalVisible(false);
      // Notify parent component to refresh libraries
      if (onLibrariesChange) {
        onLibrariesChange();
      }
    } catch (error) {
      message.error('Failed to delete library');
    } finally {
      setLoading(false);
      setSelectedLibraryId(null);
    }
  };

  const filteredLibraries = libraries.filter(library =>
    library.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-table-container">
      <div className="library-table-header">
        <h2>Libraries List</h2>
        <input
          type="text"
          placeholder="Search libraries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="library-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Books Count</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLibraries.map((library) => (
              <tr key={library.id}>
                <td>{library.name}</td>
                <td>{library.books?.length || 0}</td>
                {/* <td>0</td> */}
                <td>{format(new Date(library.created_at), 'MMM dd, yyyy')}</td>
                <td>
                  {library.updated_at 
                    ? format(new Date(library.updated_at), 'MMM dd, yyyy')
                    : '-'
                  }
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => handleView(library.id)}
                    >
                      View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => showDeleteConfirm(library.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Delete Library"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedLibraryId(null);
        }}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this library?</p>
      </Modal>
    </div>
  );
};

export default LibraryTable;