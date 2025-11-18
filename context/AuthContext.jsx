// context/AuthContext.jsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import * as authActions from "@/lib/authActions";

/** Provider exports:
 *  user: firebase user or null
 *  loading: boolean
 *  login(email,password)
 *  register(email,password)
 *  logout()
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // firebase user object | null
  const [loading, setLoading] = useState(true);
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);

  // refresh token function
  const refreshToken = useCallback(async (u) => {
    if (!u) return;
    try {
      await u.getIdToken(true); // force refresh
      // authActions.setSessionFromUser would be called inside onAuthStateChanged handler below
    } catch (e) {
      console.error("refreshToken error", e);
    }
  }, []);

  // wrappers that call lib/authActions and also update local user state
  const register = useCallback(async (email, password) => {
    setLoading(true);
    const res = await authActions.registerUser(email, password);
    if (res.success) setUser(res.user || null);
    setLoading(false);
    return res;
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    const res = await authActions.loginUser(email, password);
    if (res.success) setUser(res.user || null);
    setLoading(false);
    return res;
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    const res = await authActions.logoutUser();
    setUser(null);
    setLoading(false);
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      setRefreshIntervalId(null);
    }
    return res;
  }, [refreshIntervalId]);

  useEffect(() => {
    // listen for firebase auth state changes
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);

      // ensure interval for refreshing token when signed in
      if (currentUser) {
        if (refreshIntervalId) {
          clearInterval(refreshIntervalId);
          setRefreshIntervalId(null);
        }
        const id = setInterval(() => refreshToken(currentUser), 1000 * 60 * 50); // every 50 minutes
        setRefreshIntervalId(id);
      } else {
        if (refreshIntervalId) {
          clearInterval(refreshIntervalId);
          setRefreshIntervalId(null);
        }
      }
    });

    return () => {
      unsub();
      if (refreshIntervalId) clearInterval(refreshIntervalId);
    };
  }, [refreshIntervalId, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
