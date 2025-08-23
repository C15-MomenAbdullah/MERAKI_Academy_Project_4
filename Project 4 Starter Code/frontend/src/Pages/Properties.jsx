import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default PropertiesPage;
