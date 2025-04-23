import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { summarizeText } from '../services/aiService.js';

dotenv.config();
const router = express.Router();

// Get stock market news for a specific symbol
router.get('/news/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    
    const response = await axios.get(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2023-01-01&to=2023-12-31&token=${finnhubApiKey}`
    );
    
    // Process and summarize news
    const news = await Promise.all(
      response.data.slice(0, 5).map(async (item) => {
        // Summarize the news content
        const summaryPoints = await summarizeText(item.summary || item.headline);
        
        return {
          id: item.id || Math.random().toString(36).substring(2, 15),
          headline: item.headline,
          summary: summaryPoints,
          imageUrl: item.image,
          datetime: item.datetime * 1000, // Convert to milliseconds
          source: item.source,
          url: item.url,
          related: item.related || symbol
        };
      })
    );
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching stock news:', error);
    res.status(500).json({ message: 'Error fetching stock news', error: error.message });
  }
});

// Get stock symbols (companies)
router.get('/symbols', async (req, res) => {
  try {
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${finnhubApiKey}`
    );
    
    // Return first 100 symbols to avoid overwhelming response
    res.json(response.data.slice(0, 100));
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
    res.status(500).json({ message: 'Error fetching stock symbols', error: error.message });
  }
});

// Get stock price data
router.get('/price/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const resolution = req.query.resolution || 'D'; // D for daily
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    
    // Calculate from/to dates (1 month of data)
    const to = Math.floor(Date.now() / 1000);
    const from = to - 30 * 24 * 60 * 60; // 30 days ago
    
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${finnhubApiKey}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock price data:', error);
    res.status(500).json({ message: 'Error fetching stock price data', error: error.message });
  }
});

export default router;