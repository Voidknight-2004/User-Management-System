import React, { useState } from "react";

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      roles: [
        { id: 1, name: "Admin" },
        { id: 2, name: "Editor" },
      ],
    },
    {
      id: 2,
      username: "jane_smith",
      roles: [
        { id: 3, name: "Author" },
        { id: 4, name: "Contributor" },
      ],
    },
    {
      id: 3,
      username: "bob_johnson",
      roles: [{ id: 5, name: "Subscriber" }],
    },
  ]);

  const [newRoleOptions, setNewRoleOptions] = useState([
    { id: 6, name: "Manager" },
    { id: 7, name: "Reviewer" },
    { id: 8, name: "Moderator" },
  ]);

  const [selectedNewRole, setSelectedNewRole] = useState(null);
  const [showAddRoleDropdown, setShowAddRoleDropdown] = useState(null);

  const handleDeleteRole = (userId, roleId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          roles: user.roles.filter((role) => role.id !== roleId),
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleAddRole = (userId) => {
    if (selectedNewRole) {
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            roles: [...user.roles, selectedNewRole],
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setSelectedNewRole(null);
      setShowAddRoleDropdown(null);
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
            <tr key={user.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">
                {user.roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <span className="text-gray-600">{role.name}</span>
                    <button
                      onClick={() => handleDeleteRole(user.id, role.id)}
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
                    onClick={() => toggleAddRoleDropdown(user.id)}
                    className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-700 focus:outline-none"
                  >
                    Add Role
                  </button>
                  {showAddRoleDropdown === user.id && (
                    <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 w-48">
                      {newRoleOptions.map((role) => (
                        <div
                          key={role.id}
                          onClick={() => {
                            handleNewRoleSelect(user.id, role);
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
                        handleAddRole(user.id);
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
