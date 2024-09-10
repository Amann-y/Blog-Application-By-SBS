// src/Navbar.tsx
// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // If you're using react-router for routing
import Logo from "../../assets/amann2.png";
import { useGlobalContext } from "../../context/useUserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("Blog-Token");

  const navigate = useNavigate();

  const { removeUserData, theme, toggleTheme } = useGlobalContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    removeUserData();
    localStorage.removeItem("Blog-Token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  text-white">
      <div className="max-w-7xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          <div className="flex-1 flex items-center  sm:items-stretch sm:justify-start md:justify-between">
            <div className="">
              <Link to="/" className="">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-12 h-auto rounded animate__animated animate__slow animate__pulse animate__infinite	"
                />
              </Link>
            </div>
            <div className="hidden sm:flex sm:ml-6">
              <div className="flex space-x-4 animate__animated animate__fadeInDown animate__slower">
                <Link
                  to="/"
                  className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>

                {!token ? (
                  <>
                    <Link
                      to="/login"
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Sign-Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/user-info"
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Account Info
                    </Link>
                    <Link
                      to="/user-blogs"
                      className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      Your Blogs
                    </Link>
                    <Link
                      to="/create-blog"
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Create Blog
                    </Link>

                    <Link
                      to="/login"
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </>
                )}

                <button
                  onClick={toggleTheme}
                  className="px-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-xl text-gray-100 hover:text-white hover:bg-gray-700 "
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1  animate__animated animate__fadeInDown animate__slower">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign-Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/user-info"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Account Info
              </Link>

              <Link
                to="/user-blogs"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Your Blogs
              </Link>
              <Link
                to="/create-blog"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Create Blog
              </Link>

              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="px-1 rounded ml-3  bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
