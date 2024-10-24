import { FaHome, FaRegFileAlt, FaCog, FaAddressBook, FaAddressCard } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/userProvider";
import { useAuth } from "../context/AuthProvider";

const Sidebar = ({ sidebarToggle }) => {
  
  const [canView1, setCanView1] = useState(false);
  const [canView2, setCanView2] = useState(false);
  const { selectedOption,canEdit, setCanEdit } = useUser();
  const [permsList, setPermsList] = useState([]);

  const getPerms = async (token) => {
    const response = await axios.get(`roles/getperms/${selectedOption}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    if (response.status === 201) {
      const perms = data.Permissions.map((role) => role.permissions);
      setPermsList(perms);
      const admin = perms.find((x) => x === "create");
      if (admin) {
        setCanEdit(true);
      } else setCanEdit(false);
      const view1 = perms.find((x) => x === "view1");
      if (view1) setCanView1(true);
      else setCanView1(false);
      const view2 = perms.find((x) => x === "view2");
      if (view2) setCanView2(true);
      else setCanView2(false);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    getPerms(storedToken);
  }, [selectedOption]);

  return (
    <div
      className={` ${
        sidebarToggle ? "hidden" : "black"
      }  w-64 bg-gray-800 fixed h-full px-4 py-2`}
    >
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Dashboard</h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded hover:bg-blue-500 py-2">
          <a href="" className="px-3">
            <FaRegFileAlt className="inline-block w-6 h-6 mr-2 -mt-2"></FaRegFileAlt>
            Home
          </a>
        </li>

        {canEdit && (
          <li className="mb-2 rounded hover:bg-blue-500 py-2">
            <a href="/management" className="px-3">
              <FaCog className="inline-block w-6 h-6 mr-2 -mt-2" />
              Manage Roles
            </a>
          </li>
        )}
        {canView1 && (
          <li className="mb-2 rounded hover:bg-blue-500 py-2">
            <a href="/home" className="px-3">
              <FaAddressBook className="inline-block w-6 h-6 mr-2 -mt-2" />
              Placeholder 1
            </a>
          </li>
        )}
        {canView2 && (
          <li className="mb-2 rounded hover:bg-blue-500 py-2">
            <a href="/home" className="px-3">
              <FaAddressCard className="inline-block w-6 h-6 mr-2 -mt-2" />
              Placeholder 2
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
