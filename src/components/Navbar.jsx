import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Pixels&Bobines</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/home"
              className="text-white hover:text-teal-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="text-white hover:text-teal-400 transition-colors duration-300"
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className="text-white hover:text-teal-400 transition-colors duration-300"
            >
              Games
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              className="text-white hover:text-teal-400 transition-colors duration-300"
            >
              Recommendations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
