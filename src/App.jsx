import React from "react";
import { Routes, Route } from "react-router-dom"; // Importer Routes et Route, sans Router
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Games from "./pages/Games";
import Recommendations from "./pages/Recommendations";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

// Importer les contextes nécessaires
import { AuthProvider } from "./contexts/AuthContext"; // Contexte pour l'authentification
import { WishlistProvider } from "./contexts/WishlistContext"; // Contexte pour la wishlist

const App = () => {
  return (
    // Envelopper l'application avec les fournisseurs de contextes
    <AuthProvider>
      <WishlistProvider>
        <div className="app-container">
          {/* Navbar qui sera affichée sur toutes les pages */}
          <Navbar />

          {/* Définir les différentes pages (routes) */}
          <Routes>
            <Route
              path="*"
              element={
                <div className="text-center text-white py-10">
                  Page not found
                </div>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/games" element={<Games />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            {/* Tu peux définir une route par défaut ici */}
          </Routes>
          <footer className="text-center mt-16">
            <p>&copy; 2025 Pixels & Bobines. All rights reserved.</p>
          </footer>
        </div>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
