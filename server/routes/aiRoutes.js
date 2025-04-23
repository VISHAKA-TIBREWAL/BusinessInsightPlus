import express from 'express';
import { summarizeText } from '../services/aiService.js';

const router = express.Router();

// Summarize a text
router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ message: 'Error summarizing text', error: error.message });
  }
});

export default router;