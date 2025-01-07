import { useEffect, useState } from "react";
import { Spin, message } from 'antd';
import LibraryTable from "../../components/LibraryComps/LibraryTable/LibraryTable";
import BookService from "../../services/BookService";
import { useSelector } from "react-redux";
import ListBooks11 from "../../components/BookComps/ListBook11/ListBooks11";
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "./LibraryPage.scss";
import CreateLibraryForm from "../../components/LibraryComps/CreateLibraryForm/CreateLibraryForm";

const LibraryPage = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const loggedin = useSelector(state => state.loggedin);

  const fetchLibraries = async () => {
    try {
      setLoading(true);
      const data = await BookService.getLibrariesByUserId(loggedin.user.id);
      setLibraries(data);
      console.log(data)
      setError(null);
    } catch (err) {
      setError(err.message);
      message.error('Failed to fetch libraries');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    fetchLibraries();
  };

  const handleViewLibrary = async (libraryId) => {
    try {
      const library = await BookService.getLibraryById(libraryId);
      setSelectedLibrary(library);
      
    } catch (err) {
      message.error('Failed to fetch library books');
    }
  };

  useEffect(() => {
    if (loggedin?.user?.id) {
      fetchLibraries();
    }
  }, [loggedin]);

  if (!loggedin?.user) return <div>Please login to view your libraries</div>;
  if (loading) return <div className="loading-container"><Spin size="large" /></div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="library-page">
      <div className="library-header">
        <h2>My Libraries</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Library
        </Button>
      </div>
      
      <LibraryTable 
        libraries={libraries} 
        onLibrariesChange={fetchLibraries}
        onView={handleViewLibrary}
      />

      <Modal
        title="Create New Library"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <CreateLibraryForm onSuccess={handleCreateSuccess} />
      </Modal>

      {selectedLibrary && (
        <div className="library-books">
          <h2 style={{paddingLeft: '20px'}}>{selectedLibrary.name}'s Books</h2>
          {selectedLibrary.books && <ListBooks11 books={selectedLibrary.books} /> }
        </div>
      )}
    </div>
  );
};

export default LibraryPage;