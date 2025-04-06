// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/home" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" className="text-white">
            Movies
          </Link>
        </li>
        <li>
          <Link to="/games" className="text-white">
            Games
          </Link>
        </li>

        <li>
          <Link to="/recommandations" className="text-white">
            Recommandations
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
