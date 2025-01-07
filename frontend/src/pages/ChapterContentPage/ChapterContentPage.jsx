import { useParams } from "react-router-dom";
import TextFileDisplay from "../../components/TextDisplayComps/TextFileDisplay";
import AudioControl from "../../components/AudioComps/AudioControl/AudioControl";
import CommentList from "../../components/CommentComps/CommentList/CommentList";
import CommentForm from "../../components/CommentComps/CommentForm/CommentForm";
import { useEffect, useState } from "react";
import BookService from "../../services/BookService";
import { useSelector } from "react-redux";

const ChapterContentPage = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioFileUrl, setAudioFileUrl] = useState(null);
  const customvoice = useSelector(state => state.customvoice);
  const loggedin = useSelector(state => state.loggedin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chapterData, commentsData] = await Promise.all([
          BookService.getChapterById(id),
          BookService.getCommentsByChapterId(id),
        ]);
        const audioFile = chapterData.audio_file.find(file => file.voice === customvoice);
        
        setAudioFileUrl(audioFile?.file_url);
        setChapter(chapterData);
        setComments(commentsData);
        
        await BookService.createHistory({
          user: loggedin?.user.id || "guest",
          chapter: id,
          book: chapterData.book,
          voice: customvoice
        });
      
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, customvoice, loggedin]);

  const handleCommentSubmit = async (commentData) => {
    console.log(commentData);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please login to comment');
        return;
      }

      await BookService.createComment({
        content: commentData.content,
        user: user.id,
        chapter: id
      });
      // Refresh comments
      const newComments = await BookService.getCommentsByChapterId(id);
      setComments(newComments);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!chapter) return <div className="not-found">Chapter not found</div>;

  return (
    <div>
      {audioFileUrl && <AudioControl fileUrl={audioFileUrl} />}
      {chapter.text_file && <TextFileDisplay chapter={chapter} />}
      <CommentForm onSend={handleCommentSubmit}/>
      {comments && <CommentList comments={comments} />}
    </div>
  );
};

export default ChapterContentPage;