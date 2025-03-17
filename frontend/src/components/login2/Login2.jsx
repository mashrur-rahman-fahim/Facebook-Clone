import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Login2.css";

export const Login2 = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginData, { withCredentials: true });
      localStorage.setItem('accessToken', res.data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-center justify-center lg:justify-between p-8">
      {/* Left Section */}
      <div className="lg:w-1/2 lg:pl-20 text-center lg:text-left">
        <h1 className="text-blue-600 text-6xl font-bold lg:mb-6">facebook</h1>
        <p
          className="text-xl lg:text-2xl font-normal lg:leading-7"
          style={{
            fontFamily: "SFProDisplay-Regular, Helvetica, Arial, sans-serif",
          }}
        >
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      <div className="mt-6 mb-6"></div>

      {/* Right Section (Login Box) */}
      <div className="login-box bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleLogin}>
          {error && <div className="error-banner text-red-500 text-center mb-4">{error}</div>}
          <input
            type="text"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            placeholder="Email address or phone number"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-[#1877F2] text-white px-5 py-2.5 text-lg rounded-md border-none cursor-pointer hover:bg-[#166FE5] font-bold">
            Log in
          </button>
        </form>

        <a
          href="#"
          className="text-blue-600 text-sm block text-center my-4 hover:underline"
        >
          Forgotten password?
        </a>

        <hr className="mb-6" />
        <div className="text-center">
          <button className="w-70 bg-[#42b72a] text-white px-5 py-3 text-lg rounded font-bold hover:bg-[#36a420]">
            Create new account
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 lg:absolute footer text-center">
        <a href="#" className="text-sm text-gray-600">
          <strong>Create a Page</strong> for a celebrity, brand or business.
        </a>
      </div>
    </div>
  );
};