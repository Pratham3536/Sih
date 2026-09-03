import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USER_ROLES } from "../data/mockData";
import { loginViaBackend } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("nhaa_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password, roleId) => {
    // Try backend API authentication (checks MongoDB)
    const res = await loginViaBackend(email, password, roleId);

    if (res && res.success && res.user) {
      setUser(res.user);
      localStorage.setItem("nhaa_user", JSON.stringify(res.user));
      localStorage.setItem("nhaa_jwt_token", res.user.jwtToken || res.token);
      return { success: true, user: res.user, dbSource: res.dbSource };
    }

    // Offline / Mock fallback
    const matchedRole = MOCK_USER_ROLES.find(
      (r) => r.id === roleId || r.email.toLowerCase() === email.toLowerCase()
    ) || MOCK_USER_ROLES[0];

    const fallbackUser = {
      email: email || matchedRole.email,
      name: matchedRole.officialName || email.split("@")[0].replace(".", " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      role: matchedRole.id,
      roleTitle: matchedRole.title,
      department: matchedRole.department,
      badge: matchedRole.badge,
      permissions: matchedRole.permissions,
      jwtToken: `mock-jwt-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
    };

    setUser(fallbackUser);
    localStorage.setItem("nhaa_user", JSON.stringify(fallbackUser));
    localStorage.setItem("nhaa_jwt_token", fallbackUser.jwtToken);
    return { success: true, user: fallbackUser, dbSource: "Offline Demo Fallback" };
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
