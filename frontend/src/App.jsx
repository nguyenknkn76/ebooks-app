import { BrowserRouter as Router, Link, Routes, Route, Navigate, useMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import Container from './components/common/Container/Container';
import Test from './components/TestComps/Test';
import ScrollToTop from './components/Common/ScrollToTop/ScrollToTop';
import AdminTest from './components/TestComps/AdminTest';
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
const App = () => {
  // const loggedin = useSelector(state => state.loggedin);
  // const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Container>
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/bookdetails/:id" exact element={<BookDetailPage/>} />
          <Route path="/chaptercontent/:id" exact element={<ChapterContentPage/>}/>
          <Route path="/advancedsearch" exact element={<AdvancedSearchPage/>}/>
          <Route path="/account" exact element={<AccountPage/>}/>
          <Route path="/histories" exact element={<HistoryPage/>}/>
          <Route path="/libraries" exact element={<LibraryPage/>}/>
          <Route path="/userprofile" exact element={<UserProfilePage/>}/>
          
          <Route path="/admin" exact element={<AdminPage/>}/>
          <Route path="/adminusers" exact element={<AdminUserPage/>}/>
          <Route path="/adminbooks" exact element={<AdminBookPage/>}/>
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
