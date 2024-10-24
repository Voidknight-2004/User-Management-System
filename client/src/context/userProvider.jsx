import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [canEdit, setCanEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentRoles, setCurrentRoles] = useState([]);
  const [profile, setProfile] = useState("");
  const [selectedOption, setSelectedOption] = useState("default");

  return (
    <UserContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        currentRoles,
        setCurrentRoles,
        profile,
        setProfile,
        selectedOption,
        setSelectedOption,
        canEdit,
        setCanEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
