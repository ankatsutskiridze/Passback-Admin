import { API_URL } from "./api";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
};

export const fetchAdmin = async (endpoint: string) => {
  const res = await fetch(`${API_URL}/admin/${endpoint}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Request failed");
  }

  return res.json();
};

// Admin endpoint helpers
export const getUsers = () => fetchAdmin("users");
export const getStats = () => fetchAdmin("stats");
export const getCampaigns = () => fetchAdmin("campaigns");
