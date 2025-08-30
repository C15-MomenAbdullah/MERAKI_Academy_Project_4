import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import NavBar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState({});
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/properties");
        if (res.data.success && Array.isArray(res.data.properties)) {
          setProperties(res.data.properties);
          setFilteredProperties(res.data.properties);
        }
      } catch (err) {
        console.error("Error fetching properties", err);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(lowerSearch) ||
          prop.description.toLowerCase().includes(lowerSearch) ||
          prop.city.toLowerCase().includes(lowerSearch)
      );
    }
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogout = () => {
    dispatch(logOut());
    window.location.href = "/";
  };

  const openBookingForm = (property) => {
    setSelectedProperty(property);
    setShowBookingForm(true);
    setStartDate("");
    setEndDate("");
    setPhone("");
    setTotalPrice(0);
    setBookingError("");
    setBookingSuccess("");
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setSelectedProperty(null);
    setBookingError("");
    setBookingSuccess("");
  };

  const calculateTotalPrice = (start, end, pricePerMonth) => {
    const startD = new Date(start);
    const endD = new Date(end);
    const diffTime = endD - startD;
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const pricePerDay = pricePerMonth / 30;
    return diffDays * pricePerDay;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !phone.trim()) {
      setBookingError("Please fill in all required fields");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setBookingError("End date cannot be before start date");
      return;
    }
    const total = calculateTotalPrice(startDate, endDate, selectedProperty.price);
    setTotalPrice(total);
    try {
      const bookingData = {
        property: selectedProperty._id,
        user: user._id,
        startDate,
        endDate,
        phone,
        totalPrice: total,
      };
      const res = await axios.post("http://localhost:5000/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBookingSuccess("Booking confirmed!");
        setBookingError("");
        setTimeout(() => {
          closeBookingForm();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setBookingError(err.response?.data?.message || "Booking failed");
      setBookingSuccess("");
    }
  };

  return (
    <>
      <NavBar onLogout={handleLogout} onSearchChange={setSearchTerm} />

      <div className="container mt-5">
        <h1 className="mb-4">Available Properties</h1>
        {filteredProperties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          <div className="row">
            {filteredProperties.map((property) => (
              <div key={property._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div style={{ position: "relative" }}>
                    {property.images?.[0] && (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div
                      onClick={() => toggleFavorite(property._id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        fontSize: "28px",
                        color: favorites[property._id] ? "red" : "white",
                        textShadow: "0 0 5px black",
                        userSelect: "none",
                      }}
                      aria-label={
                        favorites[property._id]
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {favorites[property._id] ? <FaHeart /> : <FaRegHeart />}
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.description}</p>
                    <p className="card-text">
                      <strong>Price:</strong> ${property.price} per month
                    </p>
                    <p className="card-text">
                      <strong>City:</strong> {property.city}
                    </p>
                    {user ? (
                      <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={() => openBookingForm(property)}
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={() => navigate("/")}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBookingForm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content p-4">
              <h4 className="mb-3">Book: {selectedProperty.title}</h4>
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    min={startDate || new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XXXXXXXX"
                    required
                  />
                </div>

                {bookingError && <div className="alert alert-danger">{bookingError}</div>}
                {bookingSuccess && <div className="alert alert-success">{bookingSuccess}</div>}

                <button type="submit" className="btn btn-success w-100">
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={closeBookingForm}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertiesPage;
