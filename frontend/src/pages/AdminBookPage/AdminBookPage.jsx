import { useEffect, useState } from "react";
import VoiceTable from "../../components/audioComps/VoiceTable/VocieTable";
import BookInfoForm from "../../components/bookComps/BookInfoForm/BookInfoForm";
import BookTable from "../../components/bookComps/BookTable/BookTable";
import ChapterInfoForm from "../../components/chapterComps/ChapterInfoForm/ChapterInfoForm";
import ChapterTable from "../../components/chapterComps/ChapterTable/ChapterTable";
import data from "../../sample-data/data";
import BookService from "../../services/BookService";
import BookTable2 from "../../components/BookComps/BookTable2/BookTable2";
import CreateBookForm from "../../components/BookComps/CreateBookForm/CreateBookForm";
import ChapterTable2 from "../../components/ChapterComps/ChapterTable2/ChapterTable2";
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './AdminBookPage.scss';
const AdminBookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    sort: "-created_at",
    genres: [],
    publish_year: "",
    author: "",
    status: "",
    page: 1,
    limit: 10
  });
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BookService.getAllBooks(filter);
        setBooks(data.books);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCreateSuccess = async () => {
    setCreateModalVisible(false);
    // Refresh books list
    try {
      const data = await BookService.getAllBooks(filter);
      setBooks(data.books);
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-book-page">
      <div className="page-header">
        <h2>Book Management</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Book
        </Button>
      </div>

      <Modal
        title="Create New Book"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={800}
      >
        <CreateBookForm onSuccess={handleCreateSuccess} />
      </Modal>   
      <BookTable2 books = {books}/>
    </div>
  );
};

export default AdminBookPage;