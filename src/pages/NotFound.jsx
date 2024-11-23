import React from 'react';
import { Link } from 'react-router-dom'; // Add Link to navigate back

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1>
        <p className="text-xl text-gray-600 mt-4 animate__animated animate__fadeIn animate__delay-2s">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          {/* Using the specified button styling */}
          <Link to="/"
            type="button"
            className="w-full px-4 py-2 font-semibold text-white rounded-lg focus:outline-none bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go to Home
          </Link>
        </div>
        <div className="mt-12 text-gray-600">
          <p className="text-sm">You can also check out some of these links:</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link to="/about" className="hover:text-indigo-600">About Us</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
