import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";

dotenv.config();
console.log(process.env.VITE_OPENAI_API_KEY);

const app = express();

// Activer CORS
app.use(cors());

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Définir le port sur lequel le serveur écoute
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Utiliser les routes
app.use("/api/games", gameRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/recommandations", recommendRoutes);

// Route par défaut pour gérer les requêtes vers la racine
app.get("/", (req, res) => {
  res.send("Backend is working!");
});
