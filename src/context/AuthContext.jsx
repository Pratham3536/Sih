import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USER_ROLES } from "../data/mockData";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("nhaa_user");
    return savedUser ? JSON.parse(savedUser) : {
      email: "counsellor@nhaa14566.gov.in",
      name: "Dr. Ananya Sharma",
      role: "counsellor",
      roleTitle: "Authorized Trauma Counsellor (NHAA)",
      jwtToken: "mock-jwt-token-sih2026-nhaa-sec-8849"
    };
  });

  const login = (email, password, roleId) => {
    const selectedRole = MOCK_USER_ROLES.find((r) => r.id === roleId) || MOCK_USER_ROLES[0];
    const newUser = {
      email,
      name: email.split("@")[0].replace(".", " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      role: selectedRole.id,
      roleTitle: selectedRole.title,
      jwtToken: `jwt-token-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
    };
    setUser(newUser);
    localStorage.setItem("nhaa_user", JSON.stringify(newUser));
    localStorage.setItem("nhaa_jwt_token", newUser.jwtToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nhaa_user");
    localStorage.removeItem("nhaa_jwt_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
