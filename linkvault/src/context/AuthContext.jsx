import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const KEY = "linkvault_user";
const DB = "linkvault_accounts";

function loadAccounts() {
  try {
    return JSON.parse(localStorage.getItem(DB) || "{}");
  } catch {
    return {};
  }
}
function saveAccounts(a) {
  localStorage.setItem(DB, JSON.stringify(a));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem(KEY) || "null");
      if (u) setUser(u);
    } catch {}
    setReady(true);
  }, []);

  function persist(u) {
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
  }

  function signup({ name, email, password }) {
    const accounts = loadAccounts();
    const id = email.toLowerCase().trim();
    if (accounts[id]) {
      return { error: "An account with this email already exists. Try logging in." };
    }
    const account = {
      id,
      name,
      email: id,
      password,
      createdAt: Date.now(),
      payout: { method: "PayPal", address: "" },
      notify: { conversions: true, weekly: true, tips: false },
    };
    accounts[id] = account;
    saveAccounts(accounts);
    const { password: _p, ...safe } = account;
    persist(safe);
    return { ok: true };
  }

  function login({ email, password }) {
    const accounts = loadAccounts();
    const id = email.toLowerCase().trim();
    const acc = accounts[id];
    if (!acc || acc.password !== password) {
      return { error: "Invalid email or password." };
    }
    const { password: _p, ...safe } = acc;
    persist(safe);
    return { ok: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(KEY);
  }

  function updateProfile(patch) {
    const accounts = loadAccounts();
    const acc = accounts[user.id];
    if (acc) {
      const merged = { ...acc, ...patch };
      accounts[user.id] = merged;
      saveAccounts(accounts);
      const { password: _p, ...safe } = merged;
      persist(safe);
    }
  }

  function deleteAccount() {
    const accounts = loadAccounts();
    delete accounts[user.id];
    saveAccounts(accounts);
    localStorage.removeItem("linkvault_sim_" + user.id);
    logout();
  }

  return (
    <AuthContext.Provider
      value={{ user, ready, signup, login, logout, updateProfile, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
