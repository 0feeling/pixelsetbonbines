const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Activer CORS
app.use(cors());

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Définir le port sur lequel le serveur écoute
const port = process.env.PORT || 5000;

// Importer les routes
const gameRoutes = require("./routes/gameRoutes");
const movieRoutes = require("./routes/movieRoutes");

// Utiliser les routes
app.use("/api/games", gameRoutes);
app.use("/api/movies", movieRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
