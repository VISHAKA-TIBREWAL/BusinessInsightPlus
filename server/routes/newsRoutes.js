import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { summarizeText } from '../services/aiService.js';

dotenv.config();
const router = express.Router();

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`
    );
    
    // Process and summarize articles
    const articles = await Promise.all(
      response.data.articles.map(async (article) => {
        // Summarize the article content
        const summaryPoints = await summarizeText(article.content || article.description);
        
        return {
          id: article.url.split('/').pop() || Math.random().toString(36).substring(2, 15),
          title: article.title,
          summary: summaryPoints,
          content: article.content,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          source: article.source.name,
          url: article.url
        };
      })
    );
    
    res.json(articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news data', error: error.message });
  }
});

// Get news article by ID
router.get('/:id', async (req, res) => {
  try {
    // In a real implementation, this would fetch from the database
    // For this example, we'll fetch all and filter
    const newsApiKey = process.env.NEWS_API_KEY;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`
    );
    
    const article = response.data.articles.find(
      article => article.url.split('/').pop() === req.params.id
    );
    
    if (!article) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    // Summarize the article content
    const summaryPoints = await summarizeText(article.content || article.description);
    
    res.json({
      id: article.url.split('/').pop() || Math.random().toString(36).substring(2, 15),
      title: article.title,
      summary: summaryPoints,
      content: article.content,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name,
      url: article.url
    });
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).json({ message: 'Error fetching news article', error: error.message });
  }
});

// Save a news article for a user
router.post('/save', async (req, res) => {
  try {
    const { newsId, userId } = req.body;
    
    // In a real implementation, this would save to the database
    // For this example, we'll just acknowledge the request
    
    res.json({ message: 'News saved successfully', newsId, userId });
  } catch (error) {
    console.error('Error saving news:', error);
    res.status(500).json({ message: 'Error saving news', error: error.message });
  }
});

// Like a news article for a user
router.post('/like', async (req, res) => {
  try {
    const { newsId, userId } = req.body;
    
    // In a real implementation, this would save to the database
    // For this example, we'll just acknowledge the request
    
    res.json({ message: 'News liked successfully', newsId, userId });
  } catch (error) {
    console.error('Error liking news:', error);
    res.status(500).json({ message: 'Error liking news', error: error.message });
  }
});

export default router;