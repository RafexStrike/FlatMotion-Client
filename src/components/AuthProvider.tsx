"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Always try to fetch session from backend (works for both token and session cookies)
        console.log("[AuthProvider] Attempting to fetch session from backend...");
        const sessionData = await getCurrentUser();
        console.log("[AuthProvider] Session fetch response:", sessionData);

        // Handle both better-auth format and custom format
        const user = sessionData?.user || sessionData?.data?.user || sessionData?.user;

        if (user) {
          console.log("[AuthProvider] Session found, user:", user.email);
          setUser(user);
          // If there's a token in the response, store it
          if (sessionData.token) {
            setToken(sessionData.token);
            localStorage.setItem("token", sessionData.token);
          }
        } else {
          console.log("[AuthProvider] No valid session found, response was:", sessionData);
          // Clear any stale localStorage token
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } catch (err: any) {
        console.error("[AuthProvider] Failed to fetch session:", err.message);
        // Clear any stale localStorage token
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
