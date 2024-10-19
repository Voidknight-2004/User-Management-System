import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [profile, setProfile] = useState("");
  const userToken = Cookies.get("token");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setProfile(jwtDecode(userToken).username);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between  ">
      <div className="flex items-center text-xl">
        <FaBars
          className="text-white me-4 cursor-pointer"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-white font-semibold">User management</span>
      </div>
      <div className="flex items-center  gap-x-5 ">
        <div className="relative flex items-center justify-center">
          <h1 className="mr-3 ">{profile}</h1>
          <button className="text-white group">
            <FaUserCircle className="w-6 h-6 mt-1" />

            <div className="z-10 hidden absolute rounded-lg bg-white shadow w-32 group-focus:block top-full right-0">
              <ul className="flex-col py-2 text-sm text-gray-950">
                {/* <li>
                  <a href="">Profile</a>
                </li>
                <li>
                  <a href="">Setting</a>
                </li> */}
                <li >
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
