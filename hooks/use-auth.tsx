"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("teraq_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api.post<{ user: User; token: string }>("/auth/login", {
      email,
      password: pass,
    });
    
    api.setToken(res.token);
    localStorage.setItem("teraq_user", JSON.stringify(res.user));
    setUser(res.user);
    router.push("/dashboard");
  };

  const register = async (name: string, email: string, pass: string) => {
    const res = await api.post<{ user: User; token: string }>("/auth/register", {
      full_name: name,
      email,
      password: pass,
    });
    
    api.setToken(res.token);
    localStorage.setItem("teraq_user", JSON.stringify(res.user));
    setUser(res.user);
    router.push("/dashboard");
  };

  const logout = () => {
    api.setToken(null);
    localStorage.removeItem("teraq_user");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
