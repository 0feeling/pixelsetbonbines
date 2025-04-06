import React from "react";
import { Routes, Route } from "react-router-dom"; // Importer Routes et Route, sans Router
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Games from "./pages/Games";
import Recommendations from "./pages/Recommendations";

const App = () => {
  return (
    <div className="app-container">
      {/* Navbar qui sera affichée sur toutes les pages */}
      <Navbar />

      {/* Définir les différentes pages (routes) */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/games" element={<Games />} />
        <Route path="/recommandations" element={<Recommendations />} />
        {/* Tu peux définir une route par défaut ici */}
      </Routes>

      <footer className="text-center mt-16">
        <p>&copy; 2025 Pixels & Bobines. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
