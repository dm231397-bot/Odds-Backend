// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Root route to check if backend is working
app.get("/", (req, res) => {
  res.send("✅ Odds backend is running successfully!");
});

// Endpoint to fetch odds from The Odds API
app.get("/odds/:sport", async (req, res) => {
  const sport = req.params.sport; // e.g., soccer_epl
  const region = "uk";
  const market = "h2h"; // winner market
  const apiKey = process.env.ODDS_API_KEY;

  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${region}&markets=${market}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch odds" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
