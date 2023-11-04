import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = () => {
    setOtpSent(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dial_code = "+91";
    const payload = {
      phone,
      dial_code,
      otp,
    };
    try {
      const responce = await axios.post(
        "https://staging.fastor.in/v1/pwa/user/login",
        payload
      );
      let token = responce.data.data.token;
      // console.log(responce.data.data.token);
      localStorage.setItem("token", JSON.stringify(token));
      console.log(token);
      navigate("/restaurant-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formdiv">
      <h1>Login</h1>
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      {otpSent && (
        <div>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
