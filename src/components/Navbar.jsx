import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isOnAccountPage = location.pathname === "/account";
  const isOnHomePage = location.pathname === "/";

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-white text-4xl font-bold cursor-pointer">
          STREAMFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          {isOnAccountPage ? (
            <Link to="/">
              <button className="text-white pr-4">Home</button>
            </Link>
          ) : (
            <Link to="/account">
              <button className="text-white pr-4">Account</button>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
