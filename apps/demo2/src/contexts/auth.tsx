'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthState, User, Tenant } from '@/types';
import { USERS, TENANTS } from '@/mock/data';

interface AuthContextType extends AuthState {
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTenant = localStorage.getItem('tenant');
    
    if (savedUser && savedTenant) {
      setAuthState({
        isLoggedIn: true,
        user: JSON.parse(savedUser),
        tenant: JSON.parse(savedTenant),
      });
    }
  }, []);

  const login = (username: string) => {
    const user = USERS.find(u => u.name === username);
    if (user) {
      const tenant = TENANTS.find(t => t.id === user.tenantId);
      if (tenant) {
        const newState = {
          isLoggedIn: true,
          user,
          tenant,
        };
        setAuthState(newState);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tenant', JSON.stringify(tenant));
      }
    }
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
