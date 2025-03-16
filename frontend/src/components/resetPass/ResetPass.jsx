import React, { useCallback, useEffect, useState } from "react";
import { authentication } from "../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./ResetPass.css"; // Create this CSS file

export const ResetPass = () => {
  const { email, code } = useParams();
 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const verifyToken = useCallback(async () => {
    try {
      await api.post(`/auth/verify-code`, { email, code });
    } catch (error) {
      setError("Invalid or expired verification code");
      navigate("/");
    }
  }, [email, code, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await authentication();
      response && navigate("/dashboard");
    };
    
    fetchUsers();
    verifyToken();
  }, [navigate, verifyToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/auth/reset-password`, 
        { email, password },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
        setSuccess(true);
         navigate("/dashboard");
      }
    } catch (error) {
      setError("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="facebook-logo-container">
          <svg className="facebook-logo" viewBox="0 0 48 48" fill="none">
            <path 
              d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 className="reset-title">Create New Password</h2>
        <p className="reset-subtitle">
          Create a new password that's secure and easy to remember.
        </p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group">
            <input
              type="password"
              className="password-input"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Password updated successfully!</p>}
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="primary-button"
              disabled={loading || password.length < 8}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : "Continue"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/")}
              className="secondary-button"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="password-rules">
          <p className="rules-title">Password must contain:</p>
          <ul className="rules-list">
            <li className={password.length >= 8 ? "valid" : ""}>At least 8 characters</li>
          </ul>
        </div>

        <div className="footer">
          <p className="copyright">Meta © 2025</p>
        </div>
      </div>
    </div>
  );
};