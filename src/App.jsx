// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar"; // Importer la Navbar

const App = () => {
  return (
    <div className="app-container">
      {/* Navbar ajoutée ici */}
      <Navbar />

      <header className="text-center mt-4">
        <h1>Welcome to Pixel & Bobines</h1>
        <p>Your place for movies and games!</p>
      </header>

      <main className="text-center mt-8">
        <h2>Explore the Best Content</h2>
        <p>Browse through our collection of movies and games</p>
      </main>

      <footer className="text-center mt-16">
        <p>&copy; 2025 Pixels & Bobines. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
