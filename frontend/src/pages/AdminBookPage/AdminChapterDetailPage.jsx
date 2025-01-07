import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import './AdminChapterDetailPage.scss';
import EditChapterForm from '../../components/ChapterComps/EditChapterForm/EditChapterForm';
import TextFileDisplay from '../../components/TextDisplayComps/TextFileDisplay';
const AdminChapterDetailPage = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await BookService.getChapterById(id);
        setChapter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]); 

  console.log(chapter);

  if (loading) return <div>Loading chapter details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chapter) return <div>Chapter not found</div>;

  return (
    <div className="admin-chapter-detail">
      <EditChapterForm chapterId={chapter.id}/>
      <TextFileDisplay chapter={chapter}/>
    </div>
  );
};

export default AdminChapterDetailPage;