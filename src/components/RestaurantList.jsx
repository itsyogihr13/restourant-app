import React, { useState, useEffect } from "react";
import axios from "axios";
import poster from "../Assets/maxresdefault.jpg";
import { Link } from "react-router-dom";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [imageSuperimposed, setImageSuperimposed] = useState(false);
  const fetchData = async () => {
    const apiUrl = "https://staging.fastor.in/v1/m/restaurant?city_id=118";
    const authToken = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((response) => {
        console.log("Response:", response.data);
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="restaurant-list-container">
      <img className="responsive-poster-image" src={poster} alt="" />
      <h1 className="page-title">Restaurant List</h1>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <>
            <Link
              className="Link-tag"
              to={`/restaurant-details/${restaurant.restaurant_id}`}
            >
              <li key={restaurant.id} className="restaurant-item">
                <p className="restaurant-name">{restaurant.restaurant_name}</p>
                <p className="restaurant-rating">
                  Rating: {restaurant.rating.restaurant_avg_rating}
                </p>
                <p className="restaurant-status">Status: {restaurant.status}</p>
                <p className="restaurant-cost">
                  Cost for Two: {restaurant.avg_cost_for_two}
                </p>
                <p className="restaurant-city">
                  City: {restaurant?.location?.city_name}
                </p>
                <p className="restaurant-address">
                  Address: {restaurant?.location?.location_address}
                </p>
                <img
                  src={restaurant.images[0].url}
                  alt={restaurant.restaurant_name}
                  className="restaurant-image"
                />
              </li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
