// backend/routes/signInRoutes.js

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Importer jsonwebtoken
import User from "../models/User.js";

const router = express.Router();

// Route pour se connecter
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Utiliser une clé secrète pour signer le token
      { expiresIn: "1h" } // Expiration du token après 1 heure
    );

    res.status(200).json({
      message: "Login successful!",
      user: { email: user.email, username: user.username },
      token: token // Renvoi du token dans la réponse
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

export default router;
