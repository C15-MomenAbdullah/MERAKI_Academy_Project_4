import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WelcomeNavbar from "../components/welcomeNavbar";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/users/login", formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        dispatch(setData({
          user: response.data.user,
          token: response.data.token,
        }));

        navigate("/properties");  
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <WelcomeNavbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="mb-4 text-center login-title">Login</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
