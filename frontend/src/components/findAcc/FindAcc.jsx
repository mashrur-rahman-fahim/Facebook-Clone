import React, { useEffect, useState } from "react";
import { authentication } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./FindAcc.css"; // Create this CSS file

export const FindAcc = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const user = await authentication();
      if (user) {
        navigate("/dashboard");
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/identity", { email });
      if (res.data.user) {
        navigate(`/recover/code/${email}`);
      } else {
        setError("No account found with this email.");
      }
    } catch (error) {
      setError("No account found with this email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="find-acc-container">
      <div className="find-acc-card">
        <div className="facebook-logo-container">
          <svg 
            className="facebook-logo" 
            viewBox="0 0 48 48" 
            fill="none"
          >
            <path 
              d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 className="find-acc-title">Find Your Account</h2>
        <p className="find-acc-subtitle">
          Please enter your email address to search for your account.
        </p>

        <form onSubmit={handleSubmit} className="find-acc-form">
          <div className="form-group">
            <input
              type="email"
              className="email-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="footer">
          <p className="copyright">
            Meta © 2025
          </p>
        </div>
      </div>
    </div>
  );
};