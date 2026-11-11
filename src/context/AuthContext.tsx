import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  adminEmail: string;
}

const AUTH_KEY = 'bayan_admin_session';

const AuthContext = createContext<AuthContextType>({
  isAdminAuthenticated: false,
  login: () => false,
  logout: () => {},
  adminEmail: '',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const adminEmail = 'mkccc86@gmail.com';
  const expectedPassword = 'Bayan@0786';

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === adminEmail.toLowerCase() && pass === expectedPassword) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout, adminEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AuthContext);

