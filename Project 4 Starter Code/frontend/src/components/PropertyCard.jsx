import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/properties");
        if (res.data.success && Array.isArray(res.data.properties)) {
          setProperties(res.data.properties);
        } else {
          console.error("Error");
        }
      } catch (err) {
        console.error("Error fetching properties", err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Available Properties</h1>
      <div className="row">
        {properties.map((property) => (
          <div key={property._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {property.images?.[0] && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">{property.description}</p>
                <p className="card-text"><strong>Price:</strong> ${property.price}</p>
                <p className="card-text"><strong>City:</strong> {property.city}</p>
                <p className="card-text"><strong>Type:</strong> {property.type}</p>
                <button className="btn btn-primary w-100 mt-2">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
