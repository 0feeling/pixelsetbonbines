// backend/middlewares/authMiddleware.js
console.log("authMiddleware loaded");

import jwt from "jsonwebtoken";

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  // Récupérer le token de l'en-tête Authorization
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token is required." });
  }

  // Vérifier et décoder le token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // Ajouter les données de l'utilisateur à la requête (id, email, etc.)
    req.user = decoded; // { userId, email, etc. }
    next(); // Passer à la route suivante
  });
};

export default authenticateToken;
