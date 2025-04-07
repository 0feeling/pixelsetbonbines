// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Crée un contexte d'authentification
export const AuthContext = createContext();

// Le fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // L'état de l'utilisateur (null si non connecté)

  const login = (userData) => {
    setUser(userData); // Connecter l'utilisateur
  };

  const logout = () => {
    setUser(null); // Déconnecter l'utilisateur
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Un hook pour accéder au contexte dans les composants
export const useAuth = () => useContext(AuthContext);
