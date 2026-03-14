'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => { success: boolean; error?: string };
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = 'ThandoHlomuka';
const ADMIN_PASSWORD = 'Nozibusiso89';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const adminLogin = (username: string, password: string): { success: boolean; error?: string } => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('adminSession', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminSession');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}