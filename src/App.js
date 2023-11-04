import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";
import Login from "./components/Login";
import { Register } from "./components/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/restaurant-list" element={<RestaurantList />} />
      <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
    </Routes>
  );
}

export default App;
