import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/favorite/favorites", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        if (res.data.success) {
          setFavorites(res.data.favorites);
        }
      } catch (err) {
        console.error("Error fetching favorites", err);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5000/favorite/favorites/${propertyId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFavorites((prev) => prev.filter((fav) => fav.property._id !== propertyId));
    } catch (err) {
      console.error("Error removing favorite", err);
    }
  };

  return (
    <>
      <NavBar onSearchChange={() => {}} onLogout={() => navigate("/")} />
      <div className="container mt-5">
        <h2 className="mb-4">My Favorites</h2>
        {favorites.length === 0 ? (
          <p>You have no favorite properties.</p>
        ) : (
          <div className="row">
            {favorites.map((fav) => {
              const prop = fav.property;
              return (
                <div key={prop._id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    {prop.images?.[0] && (
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div
                      onClick={() => removeFavorite(prop._id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        fontSize: "24px",
                        color: "red",
                        textShadow: "0 0 5px black",
                        userSelect: "none"
                      }}
                      aria-label="Remove from favorites"
                    >
                      <FaHeart />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{prop.title}</h5>
                      <p className="card-text">
                        <strong>City:</strong> {prop.city}
                      </p>
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/properties/${prop._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
