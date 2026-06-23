import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const demoProfiles = {
  user: {
    name: "Aarav Mehta",
    email: "user@tesla.shop",
    role: "user",
    addresses: ["221B Indiranagar, Bengaluru, Karnataka"],
    wishlist: ["tesla-ai-orb"],
    orders: ["TSL-2401", "TSL-2407"]
  },
  admin: {
    name: "TESLA Admin",
    email: "admin@tesla.shop",
    role: "admin",
    permissions: ["products", "orders", "users", "pricing", "inventory", "offers"]
  }
};

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const cached = localStorage.getItem("tesla-profile");
    return cached ? JSON.parse(cached) : null;
  });

  const login = (role, email) => {
    const nextProfile = { ...demoProfiles[role], email: email || demoProfiles[role].email };
    localStorage.setItem("tesla-profile", JSON.stringify(nextProfile));
    setProfile(nextProfile);
    return nextProfile;
  };

  const logout = () => {
    localStorage.removeItem("tesla-profile");
    setProfile(null);
  };

  const value = useMemo(() => ({ profile, login, logout }), [profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
