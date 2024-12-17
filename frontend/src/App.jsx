import { BrowserRouter as Router, Link, Routes, Route, Navigate, useMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

import Test from './components/testComps/Test';

const App = () => {
  const loggedin = useSelector(state => state.loggedin);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  return (
    <div>
      <Header/>

      <Routes>
        <Route/>
      </Routes>

      <Test/>
      
      <Footer/>
    </div>
  );
};

export default App;
