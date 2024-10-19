import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = Cookies.get("token");
    return token
      ? { isAuthenticated: true, user: jwtDecode(token) }
      : { isAuthenticated: false, user: null };
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth({ isAuthenticated: true, user: jwtDecode(token) });
    }
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 1, secure: true, sameSite: "Lax" });
    setAuth({ isAuthenticated: true, user: jwtDecode(token) });
  };

  const logout = () => {
    Cookies.remove("token");
    setAuth({ isAuthenticated: false, user: null });

  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
