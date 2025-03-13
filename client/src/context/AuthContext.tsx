import React, { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, login as apiLogin, logout as apiLogout } from "../api";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export enum LoginResult {
  SUCCESS,
  INVALID_CREDENTIALS,
  SERVER_ERROR,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  useEffect(() => {
    const authenticate = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
      localStorage.setItem("isAuthenticated", JSON.stringify(authStatus));
    };

    authenticate();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const result = await apiLogin(username, password);
    if (result === LoginResult.SUCCESS) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    }
    return false;
  };

  const logout = async (): Promise<boolean> => {
    const result = await apiLogout();
    if (result) {
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};