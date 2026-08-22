'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAdminApi } from '../lib/api';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (token: string, refreshToken: string, userData: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('lms_admin_token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetchAdminApi('/auth/me');
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          // If stored demo token
          const storedUser = localStorage.getItem('lms_admin_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setUser(null);
          }
        }
      } catch {
        const storedUser = localStorage.getItem('lms_admin_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = (token: string, refreshToken: string, userData: AdminUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lms_admin_token', token);
      localStorage.setItem('lms_admin_refresh_token', refreshToken);
      localStorage.setItem('lms_admin_user', JSON.stringify(userData));
    }
    setUser(userData);
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lms_admin_token');
      localStorage.removeItem('lms_admin_refresh_token');
      localStorage.removeItem('lms_admin_user');
    }
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
