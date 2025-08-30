import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/properties");
        if (res.data.success && Array.isArray(res.data.properties)) {
          setProperties(res.data.properties);
        }
      } catch (err) {
        console.error("Error fetching properties", err);
      }
    };

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/favorite/favorites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          const favs = {};
          res.data.favorites.forEach((fav) => {
            favs[fav.property._id] = true;
          });
          setFavorites(favs);
        }
      } catch (err) {
        console.error("Error fetching favorites", err);
      }
    };

    fetchProperties();
    fetchFavorites();
  }, []);

  const toggleFavorite = async (propertyId) => {
    try {
      if (favorites[propertyId]) {
        await axios.delete(
          `http://localhost:5000/favorite/favorites/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFavorites((prev) => {
          const newFavs = { ...prev };
          delete newFavs[propertyId];
          return newFavs;
        });
      } else {
        await axios.post(
          "http://localhost:5000/favorite/favorites",
          { propertyId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFavorites((prev) => ({ ...prev, [propertyId]: true }));
      }
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Available Properties</h1>
      <div className="row">
        {properties.map((property) => (
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
                  <strong>Price:</strong> ${property.price}
                </p>
                <p className="card-text">
                  <strong>City:</strong> {property.city}
                </p>
                <p className="card-text">
                  <strong>Type:</strong> {property.type}
                </p>
                <button className="btn btn-primary w-100 mt-2">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
