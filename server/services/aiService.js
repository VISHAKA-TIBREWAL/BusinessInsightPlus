import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Summarize text into bullet points using Gemini API
 * @param {string} text - The text to summarize
 * @returns {Promise<string[]>} - Array of summary points
 */
export async function summarizeText(text) {
  try {
    if (!text || text.length < 10) {
      return ['Not enough content to summarize.'];
    }
    
    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate the summary
    const prompt = `Summarize the following text into 5-10 concise, informative bullet points that capture the key information: 
    
    ${text}
    
    Format: Return ONLY the bullet points as an array of strings, with no additional text.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    // Parse the summary into bullet points
    // This depends on how Gemini formats the response, but generally it should be a list
    let bulletPoints = summary
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim());
    
    // If no bullet points were detected, split by newlines
    if (bulletPoints.length === 0) {
      bulletPoints = summary.split('\n').filter(line => line.trim().length > 0);
    }
    
    // Fallback: If still no bullet points, use the entire summary as one point
    if (bulletPoints.length === 0) {
      bulletPoints = [summary.trim()];
    }
    
    // Limit to 10 points maximum
    return bulletPoints.slice(0, 10);
  } catch (error) {
    console.error('Error in AI summarization:', error);
    return ['Error generating summary. Please try again later.'];
  }
}