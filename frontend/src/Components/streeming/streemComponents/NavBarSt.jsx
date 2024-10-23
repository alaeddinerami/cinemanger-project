import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import profilePic from "../../../assets/images/logo.png";

export default function NavBarSt() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-900  p-5 shadow-xl text-white flex justify-between items-center">
      <div className="flex items-center">   
        <div className="h-8 w-24 mr-8">
          <Link to="/streem">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="flex gap-5 ml-10">
          <Link
            to="/streem"
            className="text-lg font-medium text-gray-300 hover:bg-purple-400 px-5 rounded-lg hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-lg font-medium text-gray-300 hover:bg-purple-400 px-5 rounded-lg hover:text-white"
          >
            Movies
          </Link>
        </div>
      </div>

      <div className="relative">
        <img
          src={profilePic}
          alt="Profile"
          className="w-10 h-10  rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-5 w-48 bg-purple-100 rounded-md shadow-lg z-20">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
