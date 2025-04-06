// backend/routes/recommendRoutes.js

import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.get("/test", (req, res) => {
  res.json({ message: "recommendations route is working" });
});

router.get("/", async (req, res) => {
  const query = req.query.query?.trim();

  if (!query) {
    return res.status(400).json({ error: "Missing 'query' parameter" });
  }

  try {
    const prompt = `
You are a recommendation engine that links games and movies.

If the input is a **game**, recommend 3 movies.  
If the input is a **movie**, recommend 3 games.  

For each recommendation, give:
- title
- genre
- short description (max 2 sentences)
- reason why it matches the input (1 sentence)
- estimated similarity percentage (between 60% and 100%)

Return the result in **valid JSON format**, like this:

[
  {
    "title": "Example Title",
    "genre": "Fantasy, Action",
    "description": "A quick pitch of what it's about.",
    "reason": "Because it shares themes of X and Y.",
    "match": 87
  },
  ...
]

Input: "${query}"
    `.trim();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Remplace gpt-4 par gpt-3.5-turbo
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: query } // Remplace 'userQuery' par 'query'
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from OpenAI.");
    }

    let parsed;
    try {
      parsed = JSON.parse(content); // GPT returns real JSON
    } catch (e) {
      console.warn("Could not parse GPT response as JSON:", content);
      return res.status(500).json({ error: "Invalid format from OpenAI." });
    }

    res.json(parsed);
  } catch (error) {
    console.error("OpenAI error:", error); // Afficher l'erreur complète
    console.error(error.stack); // Afficher la pile d'appel pour aider à comprendre d'où vient l'erreur
    res
      .status(500)
      .json({ error: "Recommendation engine failed", details: error.message });
  }
});

export default router;
