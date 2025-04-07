import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import gameRoutes from "./routes/gameRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import signUpRoutes from "./routes/signUpRoutes.js";
import signInRoutes from "./routes/signInRoutes.js";

dotenv.config();

const app = express();

// Activer CORS avec des options spécifiques pour l'origine
const corsOptions = {
  origin: "http://localhost:5173", // Remplace par l'URL de ton frontend
  methods: "GET,POST,PUT,DELETE", // Les méthodes autorisées
  allowedHeaders: "Content-Type,Authorization" // Les en-têtes autorisés
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
app.use("/api/auth/login", signInRoutes); // POST /api/auth/login
app.use("/api/auth/register", signUpRoutes);
console.log("Register route initialized"); // POST /api/auth/register
app.use("/api/games", gameRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/recommendations", recommendRoutes);

// Route par défaut pour gérer les requêtes vers la racine
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Définir le port sur lequel le serveur écoute
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
