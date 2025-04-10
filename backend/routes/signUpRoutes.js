// backend/routes/signUpRoutes.js

import express from "express";
import bcrypt from "bcrypt"; // Utilisation de bcrypt pour le hachage des mots de passe
import User from "../models/User.js"; // Importer le modèle User

const router = express.Router();

// Route pour l'inscription d'un nouvel utilisateur
router.post("/register", async (req, res) => {
  console.log("Received request for /api/auth/register");
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

    // Réponse après l'inscription réussie
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error during user creation: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
});

export default router;
