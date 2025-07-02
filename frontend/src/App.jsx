import { BrowserRouter as Router, Link, Routes, Route, Navigate, useMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from './components/common/Footer/Footer';
import Header from './components/Common/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import Container from './components/Common/Container/Container';
import ScrollToTop from './components/Common/ScrollToTop/ScrollToTop';
import ChapterContentPage from './pages/ChapterContentPage/ChapterContentPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage/AdvancedSearchPage';
import AccountPage from './pages/AccountPage/AccountPage';
import AdminPage from './pages/AdminPage/AdminPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import LibraryPage from './pages/LibraryPage/LibraryPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import AdminStatPage from './pages/AdminStatisticPage/AdminStatPage';
import AdminVoicePage from './pages/AdminVoicePage/AdminVoicePage';
import AdminBookPage from './pages/AdminBookPage/AdminBookPage';
import AdminUserPage from './pages/AdminUserPage/AdminUserPage';
import BookService from './services/BookService';
import AdminBookDetailPage from './pages/AdminBookPage/AdminBookDetailPage';
import AdminChapterDetailPage from './pages/AdminBookPage/AdminChapterDetailPage';
import HotPage from './pages/FilterPage/HotPage';
import RankingPage from './pages/FilterPage/RankingPage';

const App = () => {
  // const loggedin = useSelector(state => state.loggedin);
  // const isReader = loggedin?.user.role === 'reader';
  // const isLoggedin = loggedin !== null;
  // const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    BookService.getAllBooks()
    .then(books => {
      console.log(books);
    })
  }, []);
  return (
    <div id='app' style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {/* <EditBookForm bookId="67730e3bf07dbd4c85765d51"/> */}
      <ScrollToTop/>
      <Header/>
      <Container>
        {/* <Test/> */}
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/bookdetails/:id" exact element={<BookDetailPage/>} />
          <Route path="/chaptercontent/:id" exact element={<ChapterContentPage/>}/>
          <Route path="/advancedsearch" exact element={<AdvancedSearchPage/>}/>
          <Route path="/account" exact element={<AccountPage/>}/>
          <Route path="/histories" exact element={<HistoryPage/>}/>
          <Route path="/hot" exact element={<HotPage/>}/>
          <Route path='/ranking' exact element={<RankingPage/>}/>
          <Route path="/libraries" exact element={<LibraryPage/>}/>
          <Route path="/userprofile/:id" exact element={<UserProfilePage/>}/>
          
          <Route path="/admin" exact element={<AdminPage/>}/>
          <Route path="/adminusers" exact element={<AdminUserPage/>}/>
          <Route path="/adminbooks" exact element={<AdminBookPage/>}/>
          <Route path="/adminbooks/:id" exact element={<AdminBookDetailPage/>}/>
          <Route path="/adminchapters/:id" exact element={<AdminChapterDetailPage/>}/>
          <Route path="/adminvoices" exact element={<AdminVoicePage/>}/>
          <Route path="/adminstat" exact element={<AdminStatPage/>}/>
        </Routes>
      </Container>
      <Footer/>

      {/* <AdminTest/> */}
      {/* <Test/> */}
    </div>
  );
};

export default App;
