import React, { useState, useEffect, useRef } from "react";

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
                    : "border-gray-300 focus:ring-blue-500"
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
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </div>
                </div>
              )}
              {showTooltip.firstName && isFirstNameError && (
                <div className="absolute top-12 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded shadow-lg">
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
                    : "border-gray-300 focus:ring-blue-500"
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
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </div>
                </div>
              )}
              {showTooltip.surname && isSurnameError && (
                <div className="absolute top-12 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded shadow-lg">
                  What's your surname?
                </div>
              )}
            </div>
          </div>

          {/* Date of birth */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Date of birth</label>
            <div className="flex space-x-2">
              <select className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Day</option>
                {/* Add more options here */}
              </select>
              <select className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Month</option>
                {/* Add more options here */}
              </select>
              <select className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Year</option>
                {/* Add more options here */}
              </select>
            </div>
          </div>

          {/* Gender options */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-2" />
                Female
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-2" />
                Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-2" />
                Custom
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
              className="w-1/3 bg-[#00a400] text-white p-2 rounded font-semibold"
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
