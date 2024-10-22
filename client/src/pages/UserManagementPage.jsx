import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [newRoleOptions, setNewRoleOptions] = useState([]);
  const [selectedNewRole, setSelectedNewRole] = useState(null);
  const [showAddRoleDropdown, setShowAddRoleDropdown] = useState(null);
  const [token, setToken] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(`/users/getAll`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data)
      if (response.status === 201) setUsers(data);

      const roles = data.reduce((acc, user) => {
        user.Roles.forEach((role) => {
          if (!acc.some((r) => r.roleId === role.roleId)) {
            acc.push(role);
          }
        });
        return acc;
      }, []);
      console.log("hello")
      console.log(roles)
      setNewRoleOptions(roles);
    } catch (err) {
      console.log("Could not fetch users");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  const handleDeleteRole = async (username, role) => {
    try {
      const response = await axios.delete(
        `/users/${username}/deleterole/${role}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        getUserData();
      }
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
        alert("No Server Response");
      } else if (err.response?.status === 402) {
        console.log(err.response);
        alert("No permission to delete");
      } else if (err.response?.status === 404) {
        console.log(err.response);
        alert("Role not found");
      } else {
        console.log(err.response);
        alert("Role could not be deleted");
      }
    }
  };

  const handleAddRole = async (username) => {
    if (selectedNewRole) {
      try {
        const response = await axios.post(
          `/users/${username}/addrole/${selectedNewRole}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          getUserData();
          setSelectedNewRole(null);
          setShowAddRoleDropdown(null);
        }
      } catch (err) {
        if (!err?.response) {
          console.log(err.response);
          alert("No Server Response");
        } else if (err.response?.status === 402) {
          alert("Role already exists!");
        } else if (err.response?.status === 403) {
          alert("Role could not be added!");
        } else {
          alert("Unspecified error");
        }
      }
    }
  };

  const handleNewRoleSelect = (userId, role) => {
    setSelectedNewRole(role);
    setShowAddRoleDropdown(userId);
  };

  const toggleAddRoleDropdown = (userId) => {
    setShowAddRoleDropdown(showAddRoleDropdown === userId ? null : userId);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <table className="table-auto w-full rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Roles</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="border-b border-gray-200">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">
                {user.Roles.map((role) => (
                  <div
                    key={role.roleId}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-gray-600">{role.role}</span>
                    <button
                      onClick={() => handleDeleteRole(user.username, role.name)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      Delete Role
                    </button>
                  </div>
                ))}
              </td>
              <td className="px-4 py-2">
                <div className="relative inline-block">
                  <button
                    onClick={() => toggleAddRoleDropdown(user.username)}
                    className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-700 focus:outline-none"
                  >
                    Add Role
                  </button>
                  {showAddRoleDropdown === user.userId && (
                    <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 w-48">
                      {newRoleOptions.map((role) => (
                        <div
                          key={role.roleId}
                          onClick={() => {
                            handleNewRoleSelect(user.username, role);
                            setShowAddRoleDropdown((prev) => !prev);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {role.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedNewRole && (
                    <button
                      onClick={() => {
                        handleAddRole(user.username);
                        setShowAddRoleDropdown(null);
                      }}
                      className="ml-2 bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-700 focus:outline-none"
                    >
                      Add Role
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
