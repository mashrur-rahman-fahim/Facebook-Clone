import React, { useState, useEffect, useRef } from "react";
import "./register.css";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isSurnameTouched, setIsSurnameTouched] = useState(false);
  const [showTooltip, setShowTooltip] = useState({
    firstName: false,
    surname: false,
  });

  const firstNameRef = useRef(null);
  const surnameRef = useRef(null);

  const handleFirstNameBlur = () => {
    setIsFirstNameTouched(true);
  };

  const handleSurnameBlur = () => {
    setIsSurnameTouched(true);
  };

  const isFirstNameError = isFirstNameTouched && firstName.trim() === "";
  const isSurnameError = isSurnameTouched && surname.trim() === "";

  const handleClickOutside = (event) => {
    if (firstNameRef.current && !firstNameRef.current.contains(event.target)) {
      setShowTooltip((prev) => ({ ...prev, firstName: false }));
    }

    if (surnameRef.current && !surnameRef.current.contains(event.target)) {
      setShowTooltip((prev) => ({ ...prev, surname: false }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Facebook Logo */}
      <h1 className="text-6xl font-sans font-semibold text-[#0866ff] mb-8">
        facebook
      </h1>

      {/* Registration Box */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-sans font-semibold text-center mb-0">
          Create a new account
        </h2>
        <p className="text-center mb-0 text-gray-600">It's quick and easy.</p>
        <hr className="-mx-4 border-t border-gray-300 my-4" />

        <form>
          {/* Name fields */}
          <div className="flex space-x-4 mb-4">
            {/* First Name Field */}
            <div className="relative w-1/2" ref={firstNameRef}>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleFirstNameBlur}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                  isFirstNameError
                    ? "border-red-500 focus:ring-red-500 pr-10"
                    : "border-gray-300 focus:ring-black"
                }`}
              />
              {isFirstNameError && (
                <div
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() =>
                    setShowTooltip((prev) => ({
                      ...prev,
                      firstName: !prev.firstName,
                    }))
                  }
                >
                  <div className="bg-red-700 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    !
                  </div>
                </div>
              )}
              {showTooltip.firstName && isFirstNameError && (
                <div className="absolute top-12 left-0 bg-red-800 text-white text-sm px-2 py-1 rounded shadow-lg">
                  What's your name?
                </div>
              )}
            </div>

            {/* Surname Field */}
            <div className="relative w-1/2" ref={surnameRef}>
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                onBlur={handleSurnameBlur}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                  isSurnameError
                    ? "border-red-500 focus:ring-red-500 pr-10"
                    : "border-gray-300 focus:ring-black"
                }`}
              />
              {isSurnameError && (
                <div
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() =>
                    setShowTooltip((prev) => ({
                      ...prev,
                      surname: !prev.surname,
                    }))
                  }
                >
                  <div className="bg-red-700 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    !
                  </div>
                </div>
              )}
              {showTooltip.surname && isSurnameError && (
                <div className="absolute top-12 left-0 bg-red-800 text-white text-sm px-2 py-1 rounded shadow-lg">
                  What's your name?
                </div>
              )}
            </div>
          </div>
          {/* Date of birth */}
          <div className="mb-4">
            <label htmlFor="dob" className="block mb-1 text-gray-600">
              Date of Birth
            </label>
            <div id="dob" className="flex space-x-2">
              {/* Day */}
              <select
                aria-label="Day"
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  transformOrigin: "top",
                  transform: "translateY(0)",
                  position: "relative",
                }}
              >
                
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                aria-label="Month"
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  transformOrigin: "top",
                  transform: "translateY(0)",
                  position: "relative",
                }}
              >
                
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                aria-label="Year"
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  transformOrigin: "top",
                  transform: "translateY(0)",
                  position: "relative",
                }}
              >
                
                {Array.from({ length: 121 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>


          {/* Gender options */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Gender</label>
            <div className="flex space-x-3">
              <label className="flex items-center justify-between p-3 border rounded-lg w-full cursor-pointer hover:bg-gray-100">
                <span>Female</span>
                <input
                  type="radio"
                  name="gender"
                  className="form-radio accent-gray-500"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg w-full cursor-pointer hover:bg-gray-100">
                <span>Male</span>
                <input
                  type="radio"
                  name="gender"
                  className="form-radio accent-gray-500"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg w-full cursor-pointer hover:bg-gray-100">
                <span>Custom</span>
                <input
                  type="radio"
                  name="gender"
                  className="form-radio accent-gray-500"
                />
              </label>
            </div>
          </div>

          {/* Mobile number/email */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Mobile number or email address"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="New password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Terms and policies */}
          <p className="text-xs text-gray-600 mb-4">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-blue-600">
              Terms
            </a>
            ,{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
            , and{" "}
            <a href="#" className="text-blue-600">
              Cookies Policy
            </a>
            .
          </p>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/6 bg-[#00a400] text-white p-1.5 rounded-lg font-bold leading-relaxed text-[1.1rem]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          <a href="#" className="text-blue-600">
            Already have an account?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
