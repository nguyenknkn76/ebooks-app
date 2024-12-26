import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "./logo.png"; 
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header-container">
      {/* Top Header */}
      <div className="header-top">
        <img src={logo} alt="Logo" className="header-logo" />
        <Link to="/account" className="account-link">
          Account
        </Link>
      </div>

      {/* For Admin */}
      <div className="header-bottom">
        <div className="header-navigation">
          <Link to="/admin" className="nav-link"> Home </Link>
          <Link to="/admin" className="nav-link">Dashboard</Link>
          <Link to="/adminstat" className="nav-link">Statistics</Link>
          <Link to='/adminusers' className="nav-link">Users</Link>
          <Link to='/adminbooks' className="nav-link">Books</Link>
          <Link to='/adminvoices'className="nav-link">Voices</Link>
        </div>

        
      </div>
      {/* Bottom Header */}
      <div className="header-bottom">
        <div className="header-navigation">
          <Link to="/" className="nav-link"> Home </Link>
          <Link  className="nav-link">Hot</Link>
          <Link to='/libraries' className="nav-link">Library</Link>
          <Link to='/histories' className="nav-link">History</Link>
          <Link className="nav-link">Ranking</Link>
          <Link to="/advancedsearch"className="nav-link">Advanced Search</Link>
        </div>
        <div className="header-search">
          <input
            type="text"
            className="search-input"
            placeholder="Find your next great listen"
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
