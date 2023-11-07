import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
export const Register = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dial_code = "+91";
    const payload = {
      phone,
      dial_code,
    };
    try {
      const responce = await axios.post(
        "https://staging.fastor.in/v1/pwa/user/register",
        payload
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formdiv">
      <h2>Enter Your Mobile Number for Registration</h2>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={phone}
          maxLength={10}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">Register </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
