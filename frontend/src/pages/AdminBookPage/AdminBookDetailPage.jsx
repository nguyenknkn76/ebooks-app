import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BookService from "../../services/BookService";
import BookInfoForm from "../../components/bookComps/BookInfoForm/BookInfoForm";
import ChapterTable from "../../components/chapterComps/ChapterTable/ChapterTable";
import RatingList from "../../components/RatingComps/RatingList/RatingList";
import EditBookForm from "../../components/BookComps/EditBookForm/EditBookForm"; 
import CreateBookForm from "../../components/BookComps/CreateBookForm/CreateBookForm";
import ChapterTable2 from "../../components/ChapterComps/ChapterTable2/ChapterTable2";
import RatingTable from "../../components/RatingComps/RatingTable2/RatingTable2";
import CreateChapterForm from "../../components/ChapterComps/CreateChapterForm/CreateChapterForm";
// import "./AdminBookDetailPage.scss";
import Togglabel from "../../components/Common/ToggleLabel/ToggleLabel";
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AdminBookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const togglabelRef = useRef();
  const [showCreateChapter, setShowCreateChapter] = useState(false);

  const handleCreateChapterSuccess = async () => {
    const chaptersData = await BookService.getChaptersByBookId(id);
    setChapters(chaptersData);
    setShowCreateChapter(false);
  };
  const toggleManually = () => {
      togglabelRef.current.toggleVisibility();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, ratingsData, chaptersData] = await Promise.all([
          BookService.getBookById(id),
          BookService.getRatingsByBookId(id),
          BookService.getChaptersByBookId(id)
        ]);

        setBook(bookData);
        setRatings(ratingsData);
        setChapters(chaptersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(book)
  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="admin-book-detail">
        <EditBookForm bookId={book.id}/>
      <div className="admin-book-detail__section">
        <h2>{book.title}'s chapters</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setShowCreateChapter(true)}
          className="admin-book-detail__create-chapter-btn"
        >
          Create Chapter
        </Button>
      </div>

      {/* <CreateChapterForm bookId={book.id}/> */}
      <Modal
        title="Create New Chapter"
        open={showCreateChapter}
        onCancel={() => setShowCreateChapter(false)}
        footer={null}
        width={800}
      >
        <CreateChapterForm 
          bookId={book.id} 
          onSuccess={handleCreateChapterSuccess}
        />
      </Modal>

      {chapters && <ChapterTable2 chapters={chapters}/>}
      {ratings && <RatingTable ratings={ratings}/>}
      

      {/* <div className="admin-book-detail__section">
        <h2>Chapters</h2>
        <ChapterTable chapters={chapters} bookId={id} />
      </div>

      <div className="admin-book-detail__section">
        <h2>Ratings & Reviews</h2>
        <RatingList ratings={ratings} />
      </div> */}
    </div>
  );
};

export default AdminBookDetailPage;