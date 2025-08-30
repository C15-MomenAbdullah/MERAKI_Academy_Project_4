import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Navbar"; 
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/slices/userSlice";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setBookings(res.data.bookings);
          setError("");
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (err) {
        console.error(err);
        setError("No bookings yet");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
      setError("You need to login first.");
    }
  }, [user, token]);

  
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel booking", err);
      alert("Failed to cancel booking, please try again.");
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    window.location.href = "/";
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <div className="container mt-5">
        <h1>My Bookings</h1>
        {loading && <p>Loading bookings...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                {booking.property?.images?.[0] && (
                  <img
                    src={booking.property.images[0]}
                    alt={booking.property.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{booking.property?.title}</h5>
                  <p className="card-text">{booking.property?.description}</p>
                  <p className="card-text">
                    <strong>Start Date:</strong>{" "}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>End Date:</strong>{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Total Price:</strong> ${booking.totalPrice}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        booking.status === "confirmed"
                          ? "text-success"
                          : booking.status === "pending"
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      {booking.status}
                    </span>
                  </p>
                  
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelBooking(booking._id)}
                    disabled={booking.status === "cancelled"} 
                  >
                    {booking.status === "cancelled" ? "Cancelled" : "Cancel Booking"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
