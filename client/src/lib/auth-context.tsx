import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { API_URL } from "./api";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify session on mount
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user && data.user.role === "admin") {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Login failed" }));
      throw new Error(error.message || "Login failed");
    }

    const data = await res.json();
    
    if (data.user?.role !== "admin") {
      throw new Error("Access denied. Admin role required.");
    }

    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    // Clear cookie by calling logout endpoint if available
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
