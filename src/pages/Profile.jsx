// src/pages/Profile.js
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Importer le hook useAuth
import Wishlist from "../components/Wishlist";

const Profile = () => {
  const { user } = useAuth(); // Vérifier si l'utilisateur est connecté

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Redirect to="/signIn" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Profile
        </h1>

        {/* Profil Section */}
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-2">
            Welcome back, <strong>{user.username}</strong>!
          </p>
          <p className="text-gray-600">
            Here you can manage your preferences, check your wishlist, and more.
          </p>
        </div>

        {/* Wishlist Link */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/wishlist"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Go to Wishlist
          </Link>
        </div>

        {/* Wishlist Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Wishlist
          </h2>
          <Wishlist />
        </div>
      </div>
    </div>
  );
};

export default Profile;
