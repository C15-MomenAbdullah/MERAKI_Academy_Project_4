import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout, onSearchChange }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <nav className="navbar d-flex justify-content-between align-items-center px-3 py-2 bg-light shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <div
          className="logo fs-4 fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/properties")}
        >
          REAL ESTATE
        </div>

        <input
          type="text"
          className="form-control"
          style={{ width: "300px" }}
          placeholder="Search properties..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="d-flex align-items-center gap-4 fs-5">
        {user ? (
          <>
            <i
              className="bi bi-heart-fill text-danger"
              style={{ cursor: "pointer" }}
              title="Favourites"
              onClick={() => navigate("/favourites")}
            />
            <i
              className="bi bi-calendar-check-fill text-success"
              style={{ cursor: "pointer" }}
              title="My Bookings"
              onClick={() => navigate("/mybookings")}
            />
            <i
              className="bi bi-box-arrow-right text-secondary"
              style={{ cursor: "pointer" }}
              title="Log Out"
              onClick={onLogout}
            />
          </>
        ) : (
          <i
            className="bi bi-box-arrow-in-right text-primary"
            style={{ cursor: "pointer" }}
            title="Log In"
            onClick={() => navigate("/")}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
