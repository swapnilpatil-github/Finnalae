import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with specific origin
app.use(
  cors({
    origin: "https://finnalae-ja8p.vercel.app", // Replace with your frontend deployment URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get('/api/news', async (req, res) => {
  const query = req.query.q || ''; // Get the query parameter or set it to an empty string
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&q=${query}`
    );
    res.set('Access-Control-Allow-Origin', '*');
    res.json(response.data); // Return the news articles as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
