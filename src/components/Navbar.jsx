import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-black z-50 flex items-center px-4 md:px-8">
      <Link to="/">
        <h1 className="text-white text-2xl font-bold">STREAMFLIX</h1>
      </Link>
      <div className="ml-auto">
        {user?.email ? (
          <div className="flex items-center space-x-4">
            {location.pathname === "/" ? (
              <Link to="/account">
                <button className="text-white">Account</button>
              </Link>
            ) : (
              <Link to="/">
                <button className="text-white">Home</button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="text-white">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-600 px-4 py-2 rounded text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
