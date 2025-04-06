import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialisation de l'API OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Route pour obtenir des recommandations basées sur un jeu ou un film
router.get("/", async (req, res) => {
  const query = req.query.query; // Récupération du paramètre de recherche

  if (!query) {
    return res.status(400).json({ error: "Aucun jeu ou film fourni" });
  }

  try {
    // Construction du prompt
    const prompt = `
      Je veux une recommandation basée sur "${query}".
      - Si c'est un jeu vidéo, recommande-moi un film similaire.
      - Si c'est un film, recommande-moi un jeu vidéo similaire.
      - Explique brièvement pourquoi la recommandation est pertinente.
    `;

    // Appel à OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    });

    // Récupération et formatage de la réponse
    const recommendation =
      response.choices[0]?.message?.content || "Pas de recommandation trouvée.";

    res.json({ recommendation });
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    res.status(500).json({ error: "Problème avec l'API de recommandation." });
  }
});

export default router;
