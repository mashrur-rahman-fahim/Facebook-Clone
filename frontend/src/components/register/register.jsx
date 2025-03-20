import React from 'react';

export const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Facebook Logo */}
      <h1 className="text-5xl font-semibold text-[#0866ff] mb-8">facebook</h1>
      
      {/* Registration Box */}
      <div className="bg-white p-6 unded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-2">Create a new account</h2>
        <p className="text-center mb-6 text-gray-600">It's quick and easy.</p>
        <form>
          {/* Name fields */}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Surname"
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            By clicking Sign Up, you agree to our{' '}
            <a href="#" className="text-blue-600">Terms</a>,{' '}
            <a href="#" className="text-blue-600">Privacy Policy</a>, and{' '}
            <a href="#" className="text-blue-600">Cookies Policy</a>.
          </p>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#00a400] text-white p-2 rounded font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          <a href="#" className="text-blue-600">Already have an account?</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
