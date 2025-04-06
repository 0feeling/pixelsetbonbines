// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center px-6 py-12 md:px-12">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-4">
          Welcome to Pixels & Bobines
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Discover personalized movie and video game recommendations based on
          your favorite media. Find the perfect match for your interests.
        </p>
        <a
          href="#recommendations"
          className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-700 transition duration-300"
        >
          Start Exploring
        </a>
      </div>
    </div>
  );
};

export default Home;
