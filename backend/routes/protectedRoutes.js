// backend/routes/protectedRoutes.js

import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Exemple de route protégée pour récupérer les informations de l'utilisateur connecté
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // L'ID de l'utilisateur est disponible dans req.user grâce au middleware
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      email: user.email,
      username: user.username
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
