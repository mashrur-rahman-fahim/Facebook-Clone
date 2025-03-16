import React, { useState, useEffect } from 'react';
import './Home.css';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: ""
  });
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [passwordValid, setPasswordValid] = useState(false);
  const [errors, setErrors] = useState({
    signup: {},
    login: ""
  });

  useEffect(() => {
    // Validate password length
    setPasswordValid(signupData.password.length >= 8);
  }, [signupData.password]);

  const validateBirthdate = (dateString) => {
    const birthDate = new Date(dateString);
    const currentDate = new Date();
    const minDate = new Date(
      currentDate.getFullYear() - 16,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return birthDate <= minDate;
  };

  const handleInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setErrors({ ...errors, signup: {} });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginData, { withCredentials: true });
      localStorage.setItem('accessToken', res.data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ ...errors, login: error.response?.data?.message || "Invalid email or password" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validations
    if (!signupData.firstName) newErrors.firstName = "First name is required";
    if (!signupData.lastName) newErrors.lastName = "Last name is required";
    if (!signupData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!passwordValid) newErrors.password = "Password must be at least 8 characters";
    if (!signupData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select your birth date";
    } else if (!validateBirthdate(signupData.dateOfBirth)) {
      newErrors.dateOfBirth = "You must be at least 16 years old";
    }
    if (!signupData.gender) newErrors.gender = "Please select your gender";

    if (Object.keys(newErrors).length > 0) {
      return setErrors({ ...errors, signup: newErrors });
    }

    try {
      const res = await api.post('/auth/register', signupData, { withCredentials: true });
      localStorage.setItem('accessToken', res.data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ 
        ...errors, 
        signup: { general: error.response?.data?.message || "Registration failed. Please try again." } 
      });
    }
  };

  return (
    <div className="landing-container">
      <div className="header">
        <div className="logo">facebook</div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            {errors.login && <div className="error-banner">{errors.login}</div>}
            <div className="form-row">
              <input 
                name="email" 
                value={loginData.email} 
                onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                type="text" 
                placeholder="Email" 
              />
              <input 
                name="password" 
                value={loginData.password} 
                onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                type="password" 
                placeholder="Password" 
              />
              <button type="submit" className="login-button">Log In</button>
            </div>
            <div className="form-help">
              <a href="/login/identity">Forgot password?</a>
              <div className="separator"></div>
            </div>
          </form>
        </div>
      </div>

      <div className="main-content">
        <div className="left-section">
          <h1>Connect with friends and the world around you on Facebook.</h1>
          <div className="features">
            <div className="feature">
              <span><strong>See photos and updates</strong> from friends in News Feed.</span>
            </div>
            <div className="feature">
              <span><strong>Share what's new</strong> in your life on your Timeline.</span>
            </div>
            <div className="feature">
              <span><strong>Find more</strong> of what you're looking for with Facebook Search.</span>
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>Sign Up</h2>
          <p>It's quick and easy.</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            {errors.signup.general && <div className="error-banner">{errors.signup.general}</div>}
            
            <div className="name-inputs">
              <div className="input-group">
                <input 
                  name="firstName" 
                  value={signupData.firstName} 
                  onChange={handleInputChange}   
                  type="text" 
                  placeholder="First name" 
                  className={errors.signup.firstName ? 'error' : ''}
                />
                {errors.signup.firstName && <span className="error-message">{errors.signup.firstName}</span>}
              </div>
              <div className="input-group">
                <input 
                  name="lastName" 
                  value={signupData.lastName} 
                  onChange={handleInputChange}  
                  type="text" 
                  placeholder="Last name" 
                  className={errors.signup.lastName ? 'error' : ''}
                />
                {errors.signup.lastName && <span className="error-message">{errors.signup.lastName}</span>}
              </div>
            </div> 

            <div className="input-group">
              <input 
                name="email" 
                value={signupData.email} 
                onChange={handleInputChange} 
                type="email" 
                placeholder="Mobile number or email" 
                className={errors.signup.email ? 'error' : ''}
              />
              {errors.signup.email && <span className="error-message">{errors.signup.email}</span>}
            </div>

            <div className="input-group">
              <input 
                name="password" 
                value={signupData.password} 
                onChange={handleInputChange} 
                type="password" 
                placeholder="New password" 
                className={errors.signup.password ? 'error' : ''}
              />
              {errors.signup.password && <span className="error-message">{errors.signup.password}</span>}
              <div className="password-requirements">
                <p>Password must be at least 8 characters long</p>
              </div>
            </div>

            <div className="birthday-gender">
              <div className="input-group">
                <label>Birthday</label>
                <input 
                  name="dateOfBirth" 
                  value={signupData.dateOfBirth} 
                  onChange={handleInputChange} 
                  type="date" 
                  className={errors.signup.dateOfBirth ? 'error' : ''}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.signup.dateOfBirth && (
                  <span className="error-message">{errors.signup.dateOfBirth}</span>
                )}
              </div>
              
              <div className="input-group">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={signupData.gender} 
                  onChange={handleInputChange}
                  className={errors.signup.gender ? 'error' : ''}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Custom">Custom</option>
                </select>
                {errors.signup.gender && <span className="error-message">{errors.signup.gender}</span>}
              </div>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
            <p className="terms">By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.</p>
          </form>
        </div>
      </div>

      <div className="footer">
        <div className="languages">
          <a href="/">English (US)</a>
        </div>
        <div className="links">
          {['About', 'Developers', 'Careers', 'Privacy', 'Terms', 'Help'].map((link) => (
            <a key={link} href="/">{link}</a>
          ))}
        </div>
      </div>
    </div>
  );
};