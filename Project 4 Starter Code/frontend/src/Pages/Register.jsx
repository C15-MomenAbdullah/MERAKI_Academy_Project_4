import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WelcomeNavbar from "../components/welcomeNavbar";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const response = await axios.post("http://localhost:5000/users/register", formData);

      if (response.data.success) {
        dispatch(setData({
          user: response.data.user,
          token: response.data.token, 
        }));

        navigate("/");  
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <>
      <WelcomeNavbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card p-4 shadow"
          style={{
            maxWidth: "420px",
            width: "100%",
            borderRadius: "16px",
            border: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <h2 className="mb-4 text-center" style={{ fontWeight: "bold", color: "#0d6efd" }}>
            Register
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoFocus
                style={{ borderRadius: "8px" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </div>

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
                style={{ borderRadius: "8px" }}
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
                style={{ borderRadius: "8px" }}
              />
            </div>

            {error && (
              <div className="alert alert-danger" style={{ borderRadius: "8px" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontWeight: "500",
              }}
            >
              Register
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
