// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white py-4">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Text */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-semibold animate-bounce">Blog-App</h1>
            <p className="mt-2">© 2024 Blog-App. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="grid px-1 sm:px-5 grid-cols-4 text-[15px] text-center gap-3 animate__animated animate__fadeInDown animate__slower">
            <Link to="/" className="mt-2 md:mt-0 hover:text-gray-900 border-red-400 transition duration-300 col-span-12 sm:col-span-2 lg:col-span-1">Home</Link>
            <Link to="/about" className="mt-2 md:mt-0 hover:text-gray-900 transition duration-300 col-span-12 sm:col-span-2 lg:col-span-1">About</Link>
            <Link to="/login" className="mt-2 md:mt-0 hover:text-gray-900 transition duration-300 col-span-12 sm:col-span-2 lg:col-span-1">Login</Link>
            <Link to="/register" className="mt-2 md:mt-0 hover:text-gray-900 transition duration-300 col-span-12 sm:col-span-2 lg:col-span-1">Sign Up</Link>
          </div>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
