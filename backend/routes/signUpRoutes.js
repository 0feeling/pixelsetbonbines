// backend/routes/signUpRoutes.js

import express from "express";
import bcrypt from "bcrypt"; // Utilisation de bcrypt pour le hachage des mots de passe
import User from "../models/User.js"; // Importer le modèle User
import jwt from "jsonwebtoken"; // Importation de jsonwebtoken

const router = express.Router();

// Route pour l'inscription d'un nouvel utilisateur - noter que nous utilisons la racine "/"
router.post("/register", async (req, res) => {
  console.log("Received request for /api/auth/register");
  console.log("Request body:", req.body); // Log pour déboguer

  const { username, email, password } = req.body;

  // Vérification des champs
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();

    // Vérification de JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      return res.status(500).json({ message: "Server configuration error." });
    }

    // Création du token JWT
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET, // Clé secrète pour signer le token
      { expiresIn: "1h" } // Expiration du token
    );

    console.log("Generated token:", token); // Log pour déboguer

    // Réponse après l'inscription réussie, incluant le token ET les données utilisateur
    res.status(201).json({
      message: "User created successfully.",
      token,
      user: {
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Error during user creation: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
});

export default router;
