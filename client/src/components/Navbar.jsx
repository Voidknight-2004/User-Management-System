import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useUser } from "../context/userProvider";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const {
    profile,
    setProfile,
    currentRoles,
    setCurrentRoles,
    selectedOption,
    setSelectedOption,
  } = useUser();

  // const [profile, setProfile] = useState("");

  // const [currentRoles, setCurrentRoles] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        await fetchRoles(storedToken);
      }
      if (storedToken) {
        setProfile(jwtDecode(storedToken).username);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchRoles = async (token) => {
    try {
      const username = jwtDecode(token).username;
      const response = await axios.get(`/users/getinfo/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (response.status === 201) {
        const roles = data.reduce((acc, user) => {
          user.Roles.forEach((role) => {
            if (!acc.some((r) => r.roleId === role.roleId)) {
              acc.push(role);
            }
          });
          return acc;
        }, []);
        const roleNames = roles.map((role) => role.role);
        setCurrentRoles(roleNames);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setSelectedOption("default");
    logout();
    navigate("/signin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between">
      <div className="flex items-center text-xl">
        <FaBars
          className="text-white me-4 cursor-pointer"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-white font-semibold">User management</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative flex items-center justify-center">
          <h1 className="mr-3 text-white">{`Welcome ${profile}`}</h1>
          <div className="relative group">
            <button className="text-white">
              <FaUserCircle className="w-6 h-6 mt-1 mr-4" />
            </button>
            <div className="z-10 hidden absolute rounded-lg bg-white shadow w-32 group-hover:block top-full right-0">
              <ul className="flex-col py-2 text-sm text-gray-950">
                <li>
                  <p
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <select
              id="select-menu"
              className="block appearance-none w-28 h-7 bg-white border border-gray-300 hover:border-gray-400 pr-4 text-center text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {currentRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
