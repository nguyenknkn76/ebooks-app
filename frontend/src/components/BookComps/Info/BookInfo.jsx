import React, { useState } from "react";
import "./BookInfo.scss";
import { FaEye, FaUser } from "react-icons/fa";
import { MdDateRange, MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { useSelector } from "react-redux";
import BookService from "../../../services/BookService";
import { Checkbox, message, Modal, Spin } from "antd";

const BookInfo = ({ book }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingLibraries, setFetchingLibraries] = useState(false);
  const loggedin = useSelector(state => state.loggedin);
  const {
    title,
    author,
    genres,
    description,
    publish_year,
    cover_img,
    status,
    views,
  } = book;
  
  const fetchUserLibraries = async () => {
    try {
      setFetchingLibraries(true);
      const data = await BookService.getLibrariesByUserId(loggedin.user.id);
      setLibraries(data);
    } catch (error) {
      message.error('Failed to fetch libraries');
    } finally {
      setFetchingLibraries(false);
    }
  };

  const showAddToLibraryModal = () => {
    if (!loggedin.user) {
      message.warning('Please login to add books to library');
      return;
    }
    setIsModalVisible(true);
    fetchUserLibraries();
  };

  const handleLibrarySelection = (checkedValues) => {
    setSelectedLibraries(checkedValues);
  };

  const handleAddToLibraries = async () => {
    if (selectedLibraries.length === 0) {
      message.warning('Please select at least one library');
      return;
    }
  
    setLoading(true);
    try {
      const updatePromises = selectedLibraries.map(libraryId => {
        const library = libraries.find(lib => lib.id === libraryId);
        const currentBooks = library.books || [];
        const updatedBooks = [...new Set([...currentBooks.map(b => b.id), book.id])]; // Remove duplicates
  
        return BookService.updateLibrary(libraryId, {
          name: library.name,
          books: updatedBooks
        });
      });
  
      await Promise.all(updatePromises);
      message.success('Book added to selected libraries');
      setIsModalVisible(false);
      setSelectedLibraries([]);
    } catch (error) {
      console.error('Update library error:', error);
      message.error(`Failed to add book to libraries: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-info-container">
      <div className="top-section">
        <div className="left-section">
          <img
            className="cover-image"
            src={cover_img?.file_url || "https://via.placeholder.com/200"}
            alt={title}
          />
          <div className="info">
            <h1 className="attribute">{title}</h1>
            <p className="attribute">
              <FaUser /> Author: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {author.pen_name || author.name}
            </p>
            <p className="attribute">
              <MdDateRange /> Release Year: &nbsp;{publish_year}
            </p>
            <p className="attribute">
              <MdOutlineSignalWifiStatusbar4Bar /> Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {status}
            </p>
            <p className="attribute">
              <FaEye /> View: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {views || 0}
            </p>
            <div className="genres">
              {genres.map((g, index) => (
                <span key={index} className="genre-tag">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="right-section">
          <button className="btn like-btn">Like</button>
          <button 
            className="btn add-library-btn"
            onClick={showAddToLibraryModal}
          >
            Add To Library
          </button>
          <button className="btn options-btn">More Options</button>
        </div>
      </div>

      <div className="bottom-section">
        <h3>Description</h3>
        <p className="description">{description}</p>
      </div>
      <Modal
        title="Add to Libraries"
        open={isModalVisible}
        onOk={handleAddToLibraries}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedLibraries([]);
        }}
        confirmLoading={loading}
      >
        {fetchingLibraries ? (
          <div className="loading-container">
            <Spin />
          </div>
        ) : libraries.length === 0 ? (
          <p>No libraries found. Create a library first.</p>
        ) : (
          <Checkbox.Group
            className="libraries-checkbox-group"
            onChange={handleLibrarySelection}
            value={selectedLibraries}
          >
            {libraries.map(library => (
              <div key={library.id} className="library-checkbox-item">
                <Checkbox value={library.id}>
                  {library.name}
                </Checkbox>
              </div>
            ))}
          </Checkbox.Group>
        )}
      </Modal>
    </div>
  );
};

export default BookInfo;
