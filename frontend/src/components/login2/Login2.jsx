import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Login2.css";

export const Login2 = () => {
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

      <div class="mt-6 mb-6"></div>

      {/* Right Section (Login Box) */}
      <div className="login-box bg-white p-8 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Email address or phone number"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <button className="w-full bg-[#1877F2] text-white px-5 py-2.5 text-lg rounded-md border-none cursor-pointer hover:bg-[#166FE5] font-bold">
          Log in
        </button>

        <a
          href="#"
          className="text-blue-600 text-sm block text-center my-4 hover:underline"
        >
          Forgotten password?
        </a>

        <hr className="mb-6" />

        <button className="w-full bg-[#42b72a] text-white px-5 py-3 text-lg rounded font-bold hover:bg-[#36a420]">
          Create new account
        </button>
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
