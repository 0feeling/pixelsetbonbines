import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptTemplate = (query) =>
  `
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
  }
]

Input: "${query}"
`.trim();

router.get("/test", (req, res) => {
  res.json({ message: "recommendations route is working" });
});

router.get("/", async (req, res) => {
  const query = req.query.query?.trim();

  if (!query) {
    return res.status(400).json({ error: "Missing 'query' parameter" });
  }

  const prompt = promptTemplate(query);

  // 🔵 Étape 1 : Tentative avec Gemini
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro-exp-03-25"
    });
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const start = content.indexOf("[");
    const end = content.lastIndexOf("]");

    if (start === -1 || end === -1)
      throw new Error("JSON not found in Gemini response");

    const jsonPart = content.slice(start, end + 1);
    const parsed = JSON.parse(jsonPart);

    return res.json({ source: "google", data: parsed });
  } catch (geminiError) {
    console.warn("Gemini failed. Falling back to OpenAI.", geminiError.message);
  }

  // 🟣 Étape 2 : Fallback avec OpenAI
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned from OpenAI.");

    const start = content.indexOf("[");
    const end = content.lastIndexOf("]");
    if (start === -1 || end === -1) {
      throw new Error("Could not extract JSON array from OpenAI response");
    }

    const jsonPart = content.slice(start, end + 1);
    const parsed = JSON.parse(jsonPart);

    return res.json({ source: "openai", data: parsed });
  } catch (openaiError) {
    console.error("OpenAI fallback failed:", openaiError.message);
    return res.status(500).json({
      error: "Recommendation engine failed (Gemini + OpenAI)",
      details: openaiError.message
    });
  }
});

export default router;
