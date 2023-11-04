import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import fastorLogo from "../Assets/fastor.png";
function RestaurantDetail() {
  const { id } = useParams();
  console.log(id, "id");

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchData = async () => {
    const apiUrl = "https://staging.fastor.in/v1/m/restaurant?city_id=118";
    const authToken = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      const restaurants = response.data;
      const foundRestaurant = restaurants.find((restaurant) => {
        console.log(restaurant.restaurant_id);
        return restaurant.restaurant_id === id;
      });

      console.log(foundRestaurant);
      console.log(restaurants);
      if (foundRestaurant) {
        setSelectedRestaurant(foundRestaurant);
      } else {
        setSelectedRestaurant(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setSelectedRestaurant(null);
    }
  };
  const shareImage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: selectedRestaurant.restaurant_name,
          text: "Check out this restaurant!",
          url: selectedRestaurant.images[0].url,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported in this browser.");
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  if (selectedRestaurant === null) {
    return <div className="not-found">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-detail-container">
      <h1 className="restaurant-name">{selectedRestaurant.restaurant_name}</h1>
      <div className="image-overlay">
        <ul className="restaurant-details">
          <li>
            <p>Rating: {selectedRestaurant.rating.restaurant_avg_rating}</p>
          </li>
          <li>
            <p>Status: {selectedRestaurant.status}</p>
          </li>
          <li>
            <p>Cost for Two: {selectedRestaurant.avg_cost_for_two}</p>
          </li>
          <li>
            <p>City: {selectedRestaurant?.location?.city_name}</p>
          </li>
          <li>
            <p>Address: {selectedRestaurant?.location?.location_address}</p>
          </li>
          <li>
            <img
              src={selectedRestaurant.images[0].url}
              alt={selectedRestaurant.restaurant_name}
              className="restaurant-image"
            />
          </li>
        </ul>
        <div className="fastor-logo-overlay">
          <img src={fastorLogo} alt="Fastor Logo" className="fastor-logo" />
        </div>
        <div className="button-container">
          <button className="superimpose-button">Superimpose</button>
          <button onClick={shareImage} className="share-button">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
