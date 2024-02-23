import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthentication: (value: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Obtener el estado de autenticación almacenado en localStorage al inicio
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    return storedAuthStatus ? JSON.parse(storedAuthStatus) : false;
  });

  const [token, setToken] = useState<string | null>(() => {
    // Obtener el token almacenado en localStorage al inicio
    return localStorage.getItem("token");
  });

  const setAuthentication = (value: boolean) => {
    setIsAuthenticated(value);
  };

  // Almacenar el estado de autenticación en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  // Almacenar el token en localStorage cuando cambie
  useEffect(() => {
    if (isAuthenticated) {
      // Si está autenticado, almacena el token en localStorage
      localStorage.setItem("token", token || "");
    } else {
      // Si no está autenticado, elimina el token de localStorage
      localStorage.removeItem("token");
    }
  }, [isAuthenticated, token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
