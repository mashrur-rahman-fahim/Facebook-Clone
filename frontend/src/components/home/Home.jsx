import React, { useState } from 'react';
import './Home.css';
import api from '../../api/axios';

export const Home = () => {
  const [signupData,setSignupData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    dateOfBirth:"",
    gender:""
  });
  const handleInputChange=(e)=>{
    setSignupData({...signupData,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
  
    e.preventDefault();
    try {
      const res= await api.post('/auth/register',signupData);
      console.log(res);
    
        alert(res.data.message);
     
    } catch (error) {
      alert(error.response.data.message);
      console.error(error.response.data.message);
    }
  }
  return (
    <div className="landing-container">
      <div className="header">
        <div className="logo">facebook</div>
        <div className="login-form">
          <form>
            <div className="form-row">
              <input type="text" placeholder="Email or phone number" />
              <input type="password" placeholder="Password" />
              <button className="login-button">Log In</button>
            </div>
            <div className="form-help">
              <a href="/">Forgot password?</a>
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
          <form className="signup-form">
            <div className="name-inputs">
              <input name="firstName" value={signupData.firstName} onChange={handleInputChange}   type="text" placeholder="First name" />
              <input name="lastName" value={signupData.lastName} onChange={handleInputChange}  type="text" placeholder="Last name" />
            </div> 
            <input name="email" value={signupData.email} onChange={handleInputChange} type="email" placeholder="Mobile number or email" />
            <input name="password" value={signupData.password} onChange={handleInputChange} type="password" placeholder="New password" />
            <div className="birthday-gender">
              <label>Birthday</label>
              <input name="dateOfBirth" value={signupData.dateOfBirth} onChange={handleInputChange} type="date" />
              <label>Gender</label>
              <select name="gender" value={signupData.gender} onChange={handleInputChange}>
                <option>Female</option>
                <option>Male</option>
                <option>Custom</option>
              </select>
            </div>
            <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
            <p className="terms">By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.</p>
          </form>
        </div>
      </div>

      <div className="footer">
        <div className="languages">
          <a href="/">English (US)</a>
        </div>
        <div className="links">
          <a href="/">About</a>
          <a href="/">Developers</a>
          <a href="/">Careers</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
          <a href="/">Help</a>
        </div>
      </div>
    </div>
  );
};