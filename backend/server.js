import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import gameRoutes from "./routes/gameRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import signUpRoutes from "./routes/signUpRoutes.js";
import signInRoutes from "./routes/signInRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config();

// Ajouter au début de server.js
const requiredEnvs = [
  "MONGO_URI",
  "JWT_SECRET",
  "TMDB_API_KEY",
  "RAWG_API_KEY"
];
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    console.error(`Error: Environment variable ${env} is missing`);
    process.exit(1);
  }
}

// Initialiser l'application Express
const app = express();

const corsOptions = {
  origin: "*", // Autorise toutes les origines pour tester (même si ce n'est pas sécurisé en production)
  methods: "GET,POST,PUT,DELETE", // Toutes les méthodes autorisées
  allowedHeaders: "Content-Type,Authorization" // Autorise les en-têtes nécessaires
};

app.use(cors(corsOptions));

// Vérifier si les variables d'environnement sont chargées
console.log("MONGO_URI:", process.env.MONGO_URI); // Affiche l'URI MongoDB

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Utiliser les routes
app.use("/api/auth", signInRoutes);
app.use("/api/auth", signUpRoutes);
console.log("Register route initialized"); // POST /api/auth/register
app.use("/api/games", gameRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/recommendations", recommendRoutes);
app.use("/api", protectedRoutes); // Déplacer cette ligne après l'initialisation de l'app

// Route par défaut pour gérer les requêtes vers la racine
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Définir le port sur lequel le serveur écoute
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
