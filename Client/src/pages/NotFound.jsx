// src/NotFound.js
import React from 'react';
// import './NotFound.css'; // Custom CSS for animations

const NotFound = () => {
  return (
    <div className="flex items-center justify-center md:min-h-[88vh] min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold animate-bounce bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">404</h1>
        <p className="text-xl mt-4">Oops! Page not found.</p>
        <p className="text-lg mt-2">The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
