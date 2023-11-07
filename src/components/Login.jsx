import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      localStorage.setItem("token", JSON.stringify(token));
      console.log(token);
      navigate("/restaurant-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
      }}
      className="otp-verification formdiv"
    >
      <h2>Enter Your Mobile Number</h2>
      <p>We will send you the 4-digit verification code</p>
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={phone}
        maxLength={10}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button onClick={handleSendOTP}>Send OTP</button> <br />
      <br />
      {otpSent && (
        <div className="otp-verification">
          <h2>OTP Verification</h2>
          <p>Enter the verification code we just sent on your Mobile Number.</p>

          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
          <p>
            Didn’t received code? <Link to="/">Resend</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
