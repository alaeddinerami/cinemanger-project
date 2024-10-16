import React from "react";
import logo from "../../assets/images/logo.png";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      <div className="text-white flex px-8 py-5">
        <div className="h-8 w-24">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="flex-1 flex justify-center self-center space-x-4">
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Movies
          </Link>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Schedule
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Coming Soon
          </a>
        </div>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
