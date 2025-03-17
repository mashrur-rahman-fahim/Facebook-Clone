import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Login2.css";

export const Login2 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Left Section */}
      <div className="w-full md:w-1/2 text-center md:text-center mb-8">
        <h1 className="text-blue-600 text-4xl font-bold">facebook</h1>
        <p
          className="text-xl mt-4 font-bold"
          style={{
            fontFamily: "SFProDisplay-Regular, Helvetica, Arial, sans-serif",
            fontSize: "24px",
            lineHeight: "28px",
            width: "auto",
          }}
        >
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      {/* Right Section */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
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
        <button className="w-full bg-[#1877F2] text-white px-5 py-2.5 text-base rounded-md border-none cursor-pointer hover:bg-[#1a85e4] font-bold">
          Log in
        </button>

        <div className="mb-4"></div>

        <a
          href="#"
          className="text-blue-600 text-sm block text-center mb-4 hover:underline"
        >
          Forgotten password?
        </a>

        <hr className="mb-4" />

        <div className="mb-6"></div>

        <button className="w-full bg-[#42b72a] text-white p-3 rounded font-bold hover:bg-[#36a420]">
          Create new account
        </button>
      </div>
      {/* Footer Section */}
      <div className="mt-4 w-full text-center">
        <a href="#" className="text-sm text-black">
          <strong>Create a Page</strong> for a celebrity, brand or business.
        </a>
      </div>
    </div>
  );
};
