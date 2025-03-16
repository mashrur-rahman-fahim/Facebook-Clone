import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authentication } from "../auth/auth";
import api from "../../api/axios";
import "./RecoverCode.css";

export const RecoverCode = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const sentCode = useCallback(async () => {
    try {
      setError("");
      setIsSending(true);
      setSendSuccess(false);
      await api.post("/auth/forgot-password", { email });
      setSendSuccess(true);
      setIsResending(true);
      setIsResending(false);
    } catch (error) {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsSending(false);
    }
  }, [email]);

  useEffect(() => {
    const fetchUsers = async () => {
      const user = await authentication();
      user && navigate("/dashboard");
    };
    fetchUsers();
    sentCode();
  }, [navigate, sentCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/verify-code", { email, code });
      res.data.success && navigate(`/reset-password/${email}/${code}`);
    } catch (error) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recover-container">
      <div className="recover-card">
        <div className="facebook-logo-container">
          <svg className="facebook-logo" viewBox="0 0 48 48" fill="none">
            <path 
              d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 className="recover-title">Enter Security Code</h2>
        <p className="recover-subtitle">
          Please check your emails for a message with your code. Your code is 6 numbers long.
        </p>

        <form onSubmit={handleSubmit} className="recover-form">
          <div className="form-group">
            <div className="email-display">
              <span>{email}</span>
              <button 
                type="button" 
                className="text-link"
                onClick={() => navigate("/login/identity")}
              >
                Not you?
              </button>
            </div>

            <input
              type="text"
              className="code-input"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              autoFocus
              required
            />

            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="primary-button"
              disabled={loading || code.length !== 6}
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

        <div className="resend-section">
          <p>Didn't receive a code?</p>
          <div className="resend-button-container">
            <button
              type="button"
              className="text-link"
              onClick={sentCode}
              disabled={isResending || isSending}
            >
              {isSending ? (
                <>
                  Sending...
                  <div className="spinner small"></div>
                </>
              ) : (
                "Send code again"
              )}
            </button>
          </div>
          {sendSuccess && (
            <p className="success-message">
              We've sent a new code to your email address.
            </p>
          )}
        </div>

        <div className="footer">
          <p className="copyright">Meta © 2025</p>
        </div>
      </div>
    </div>
  );
};