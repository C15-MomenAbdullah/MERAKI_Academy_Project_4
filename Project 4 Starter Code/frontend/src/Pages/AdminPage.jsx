import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [propRes, bookRes] = await Promise.all([
          axios.get("http://localhost:5000/properties", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/bookings", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        if (propRes.data.success) setProperties(propRes.data.properties);
        if (bookRes.data.success) setBookings(bookRes.data.bookings);
      } catch (err) {
        console.error("Fetching data failed", err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteProperty = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete property");
    }
  };

  const handleUpdateBooking = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch {
      alert("Failed to update booking");
    }
  };

  return (
    <>
      <NavBar onLogout={() => navigate("/")} />
      <div className="container mt-4">
        <h2>Admin Dashboard</h2>
        <div className="row my-4">
          <div className="col-md-6 mb-3">
            <div className="card text-white bg-primary shadow">
              <div className="card-body">
                <h5 className="card-title">Total Properties</h5>
                <h3 className="card-text">{properties.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card text-white bg-success shadow">
              <div className="card-body">
                <h5 className="card-title">Total Bookings</h5>
                <h3 className="card-text">{bookings.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <h4 className="mt-5">All Properties</h4>
        <table className="table table-striped table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.city}</td>
                <td>${p.price}</td>
                <td>
                  <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/admin/edit-property/${p._id}`)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProperty(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="mt-5">All Bookings</h4>
        <table className="table table-striped table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Property</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.user.firstName} {b.user.lastName}</td>
                <td>{b.property.title}</td>
                <td>
                  <span className={`badge ${b.status === "confirmed" ? "bg-success" : b.status === "cancelled" ? "bg-danger" : "bg-warning"}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status !== "confirmed" && (
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdateBooking(b._id, "confirmed")}>
                      Accept
                    </button>
                  )}
                  {b.status !== "cancelled" && (
                    <button className="btn btn-sm btn-danger" onClick={() => handleUpdateBooking(b._id, "cancelled")}>
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
