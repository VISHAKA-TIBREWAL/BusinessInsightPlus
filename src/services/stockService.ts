import axios from 'axios';

// This would be replaced with actual API endpoints in production
const API_URL = 'http://localhost:5000/api';

/**
 * Fetch stock market news for a specific symbol
 */
export async function getStockMarketNews(symbol: string) {
  try {
    // In a real implementation, this would call the actual backend API
    // For demo purposes, we'll return mock data
    return getMockStockNewsData(symbol);
  } catch (error) {
    console.error(`Error fetching stock news for ${symbol}:`, error);
    throw error;
  }
}

/**
 * Get available stock symbols
 */
export async function getStockSymbols() {
  try {
    // In a real implementation, this would call the actual backend API
    // For demo purposes, we'll return mock data
    return getMockStockSymbols();
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
    throw error;
  }
}

/**
 * Get stock price data for a specific symbol
 */
export async function getStockPriceData(symbol: string, timeframe: string = 'daily') {
  try {
    // In a real implementation, this would call the actual backend API
    // For demo purposes, we'll return mock data
    return getMockStockPriceData(symbol, timeframe);
  } catch (error) {
    console.error(`Error fetching stock price data for ${symbol}:`, error);
    throw error;
  }
}

// Mock data for demonstration
function getMockStockNewsData(symbol: string) {
  const baseNews = [
    {
      id: 's1',
      headline: `${symbol} Reports Stronger Than Expected Quarterly Earnings`,
      summary: [
        `${symbol} exceeded analyst expectations with quarterly revenue of $12.8 billion, up 18% year-over-year.`,
        'The company raised its full-year guidance citing strong product demand and improving supply chains.',
        'Stock price jumped 7% in after-hours trading following the announcement.'
      ],
      imageUrl: 'https://images.pexels.com/photos/6801651/pexels-photo-6801651.jpeg',
      datetime: Date.now() - 3600000,
      source: 'Market Watch',
      url: 'https://example.com/stock/1',
      related: symbol
    },
    {
      id: 's2',
      headline: `${symbol} Announces Major Product Innovation at Annual Conference`,
      summary: [
        `${symbol} unveiled its next-generation product line with significant performance improvements.`,
        'The new products incorporate AI capabilities and improved energy efficiency.',
        'Analysts predict these innovations could help the company gain market share in competitive segments.'
      ],
      imageUrl: 'https://images.pexels.com/photos/7567460/pexels-photo-7567460.jpeg',
      datetime: Date.now() - 86400000,
      source: 'Tech Insights',
      url: 'https://example.com/stock/2',
      related: symbol
    },
    {
      id: 's3',
      headline: `${symbol} Expands Operations with New Facility in Asia`,
      summary: [
        `${symbol} has broken ground on a new manufacturing facility in Singapore.`,
        'The $2 billion investment will create approximately 3,000 jobs and increase production capacity by 25%.',
        'This expansion is part of the company\'s strategy to diversify its supply chain and reduce regional dependencies.'
      ],
      imageUrl: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg',
      datetime: Date.now() - 172800000,
      source: 'Business Expansion',
      url: 'https://example.com/stock/3',
      related: symbol
    },
    {
      id: 's4',
      headline: `Institutional Investors Increase Holdings in ${symbol}`,
      summary: [
        `Recent SEC filings show major institutional investors have increased their positions in ${symbol}.`,
        'Top asset management firms have added a combined $1.3 billion to their holdings in the last quarter.',
        'This vote of confidence comes despite broader market volatility affecting the sector.'
      ],
      imageUrl: 'https://images.pexels.com/photos/6801862/pexels-photo-6801862.jpeg',
      datetime: Date.now() - 259200000,
      source: 'Investor Daily',
      url: 'https://example.com/stock/4',
      related: symbol
    }
  ];

  // Add some randomness to make results vary between symbols
  return baseNews.slice(0, Math.floor(Math.random() * 2) + 3);
}

function getMockStockSymbols() {
  return [
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'Common Stock' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Common Stock' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Common Stock' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', type: 'Common Stock' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', type: 'Common Stock' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', type: 'Common Stock' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Common Stock' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'Common Stock' },
    { symbol: 'V', name: 'Visa Inc.', type: 'Common Stock' },
    { symbol: 'WMT', name: 'Walmart Inc.', type: 'Common Stock' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'Common Stock' },
    { symbol: 'MA', name: 'Mastercard Incorporated', type: 'Common Stock' },
    { symbol: 'PG', name: 'The Procter & Gamble Company', type: 'Common Stock' },
    { symbol: 'HD', name: 'The Home Depot, Inc.', type: 'Common Stock' },
    { symbol: 'BAC', name: 'Bank of America Corporation', type: 'Common Stock' },
    { symbol: 'DIS', name: 'The Walt Disney Company', type: 'Common Stock' },
    { symbol: 'KO', name: 'The Coca-Cola Company', type: 'Common Stock' },
    { symbol: 'ADBE', name: 'Adobe Inc.', type: 'Common Stock' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', type: 'Common Stock' },
    { symbol: 'CMCSA', name: 'Comcast Corporation', type: 'Common Stock' }
  ];
}

function getMockStockPriceData(symbol: string, timeframe: string) {
  // In a real implementation, this would return actual price data
  // For demo purposes, we'll return a placeholder object
  return {
    symbol,
    timeframe,
    prices: [/* would contain actual price data */],
    message: "This is a mock implementation. In a real application, this would fetch actual stock price data from an API."
  };
}