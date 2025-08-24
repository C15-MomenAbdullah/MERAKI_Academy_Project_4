import React from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = ({ onLogout, onLogin }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">REAL ESTATE</div>

        <input
          type="text"
          className="search-box"
          placeholder="Search properties..."
        />

        <select className="section-dropdown" defaultValue="">
          <option value="">All Sections</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="chalet">Chalet</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <button className="bookings-button">My Bookings</button>
            <button className="logout-button" onClick={onLogout}>
              Log Out
            </button>
          </>
        ) : (
          <button className="login-button" onClick={onLogin}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
