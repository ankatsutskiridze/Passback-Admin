import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { API_URL } from "./api";

const AUTH_STORAGE_KEY = "passback_admin_user";

interface User {
  id: string | number;
  email: string;
  name: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function saveUserToStorage(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {}
}

function loadUserFromStorage(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.role === "admin") return parsed;
    }
  } catch {}
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify session on mount — use localStorage as primary, API verify as fallback
  useEffect(() => {
    const verify = async () => {
      // First check localStorage for persisted session
      const storedUser = loadUserFromStorage();
      if (storedUser) {
        setUser(storedUser);
        setIsLoading(false);

        // Background verify against backend (optional, don't block UI)
        try {
          const res = await fetch(`${API_URL}/auth/verify`, {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            if (data.user && data.user.role === "admin") {
              const mappedUser: User = {
                id: data.user.id,
                email: data.user.username || data.user.email || '',
                name: data.user.name || `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || data.user.username || '',
                role: data.user.role,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
              };
              setUser(mappedUser);
              saveUserToStorage(mappedUser);
            }
          }
          // Don't logout if verify fails — localStorage session is still valid
        } catch {}
        return;
      }

      // No localStorage session — try API verify (cookie-based, works on local dev)
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user && data.user.role === "admin") {
            const mappedUser: User = {
              id: data.user.id,
              email: data.user.username || data.user.email || '',
              name: data.user.name || `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || data.user.username || '',
              role: data.user.role,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
            };
            setUser(mappedUser);
            saveUserToStorage(mappedUser);
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

    // Map AdVision-UI user format to our format
    const mappedUser: User = {
      id: data.user.id,
      email: data.user.username || data.user.email || email,
      name: data.user.name || `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || email,
      role: data.user.role,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
    };

    setUser(mappedUser);
    saveUserToStorage(mappedUser);
  };

  const logout = () => {
    setUser(null);
    saveUserToStorage(null);
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
