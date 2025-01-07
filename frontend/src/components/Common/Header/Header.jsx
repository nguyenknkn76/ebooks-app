import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "./logo.png"; 
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../../reducers/LoggedinReducer";

const Header = () => {
  const [showFixedHeader, setShowFixedHeader] = useState(false);
  const loggedin = useSelector(state => state.loggedin);
  const isReader = loggedin?.user.role === 'reader';
  const isLoggedin = loggedin !== null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedHeader(window.scrollY > 75);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotiLogin = () => {
    console.log("Please login to use this feature");
  }

  const handleLogout = () => {
    dispatch(setLoggedIn(null));
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    navigate('/')
  };
  return (
    <div className="header-container">
      {/* Top Header */}
      <div className="header-top">
        <img src={logo} alt="Logo" className="header-logo"/>
        {
          loggedin ? (
            <div>
              Hello, <Link to={`/userprofile/${loggedin.user.id}`}>{loggedin.user.username}</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/account" className="account-link">
              Account
            </Link>
          )
        }
      </div>

      {/* ============== For Admin ========================*/}
      {
        (loggedin?.user.role === "admin") && 
        <div className="header-bottom">
          <div className="header-navigation">
            <Link to="/admin" className="nav-link"> Home </Link>
            <Link to="/admin" className="nav-link">Dashboard</Link>
            {/* <Link to="/adminstat" className="nav-link">Statistics</Link> */}
            <Link to='/adminusers' className="nav-link">Users</Link>
            <Link to='/adminbooks' className="nav-link">Books</Link>
            <Link to='/adminvoices'className="nav-link">Voices</Link>
          </div>
        </div>
      }
      {
        (loggedin === null || loggedin?.user.role === "reader") &&
        <div className={`header-bottom`}>
          <div className="header-navigation">
            <Link to="/" className="nav-link"> Home </Link>
            <Link to="/hot" className="nav-link">Hot</Link>
            {
              (isLoggedin && isReader) 
              ? 
                <>
                  <Link to='/libraries' className="nav-link" onClick={handleNotiLogin}>Library</Link>
                  <Link to='/histories' className="nav-link" onClick={handleNotiLogin}>History</Link>
                </>
              :
                <>
                  <Link className="nav-link" onClick={handleNotiLogin}>Library</Link>
                  <Link className="nav-link" onClick={handleNotiLogin}>History</Link>
                </>
            }

            <Link to='/ranking' className="nav-link">Ranking</Link>
            <Link to="/advancedsearch"className="nav-link">Advanced Search</Link>
          </div>
          <div className="header-search">
            <input
              type="text"
              className="search-input"
              placeholder="Find your next great book"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>
      }

      {/* =============== Bottom Header ====================*/}
      {/* ${showFixedHeader ? 'show' : ''} */}

    </div>
  );
};

export default Header;
