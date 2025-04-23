import axios from 'axios';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY';

/**
 * Fetch and summarize top news articles
 */
export async function getAllNews() {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        apiKey: NEWS_API_KEY,
      },
      headers: {
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'axios/1.0',
      }
    });

    const articles = response.data.articles;

    // summarize each article using Gemini
    const summaries = await Promise.all(articles.map(async (article) => {
      try {
        const summaryResponse = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          {
            contents: [{
              parts: [{
                text: `Summarize this article into 5 bullet points:\n\nTitle: ${article.title}\n\nContent: ${article.content || article.description}`
              }]
            }]
          },
          {
            params: { key: GEMINI_API_KEY }
          }
        );

        const bullets = summaryResponse.data.candidates?.[0]?.content?.parts?.[0]?.text?.split('\n').filter(Boolean);
        return {
          ...article,
          id: article.url, // Use URL as fallback ID
          summary: bullets || [],
        };
      } catch (summaryError) {
        console.warn('Summary error for article:', article.title, summaryError);
        return {
          ...article,
          id: article.url,
          summary: ['Summary not available.'],
        };
      }
    }));

    return summaries;
  } catch (error) {
    console.error('Error fetching or summarizing news. Falling back to mock data:', error);
    return getMockNewsData();
  }
}


/**
 * Fetch a specific news article by ID
 */
export async function getNewsById(id: string) {
  const allNews = await getAllNews();
  return allNews.find(news => news.id === id) || null;
}

/**
 * Save a news article for a user (Mock)
 */
export async function saveNewsItem(newsId: string, userId: string) {
  try {
    console.log(`Saving news ${newsId} for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error('Error saving news:', error);
    throw error;
  }
}

/**
 * Like a news article for a user (Mock)
 */
export async function likeNewsItem(newsId: string, userId: string) {
  try {
    console.log(`Liking news ${newsId} for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error('Error liking news:', error);
    throw error;
  }
}

/**
 * Send content to Gemini API and get summary
 */
async function summarizeArticle(content: string): Promise<string[]> {
  if (!content || content.length < 20) return ['No summary available.'];

  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize the following news content into 5 bullet points:\n\n${content}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return text.split('\n').filter(Boolean); // bullet points
  } catch (error) {
    console.error('Error summarizing with Gemini. Using fallback message:', error);
    return ['Could not summarize this article.'];
  }
}

// Your existing mock fallback
function getMockNewsData() {
  return [
    {
      id: '1',
      title: 'Tech Giants Announce Collaboration on AI Safety Standards',
      summary: [
        'Major tech companies including Google, Microsoft, and OpenAI have formed a coalition to develop safety standards for artificial intelligence.',
        'The coalition aims to address concerns about AI risks while promoting innovation.',
        'Standards will focus on model evaluation, security benchmarks, and responsible deployment practices.',
        'This marks the first major industry-wide effort to self-regulate generative AI technologies.',
        'Critics argue that government regulation is still necessary alongside industry initiatives.'
      ],
      imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      publishedAt: '2023-11-15T08:30:00Z',
      source: 'TechDaily',
      url: 'https://example.com/news/1',
      content: 'In a landmark move, major technology companies have announced a collaborative effort to establish safety standards for artificial intelligence development and deployment...'
    },
    {
      id: '2',
      title: 'Federal Reserve Signals Potential Interest Rate Cuts for Next Quarter',
      summary: [
        'The Federal Reserve has indicated it may begin cutting interest rates in the coming quarter.',
        'This shift comes as inflation shows signs of cooling to near the target 2% annual rate.',
        'Markets responded positively with the S&P 500 gaining 1.2% following the announcement.',
        'Economists predict up to three quarter-point cuts may occur before year-end.',
        'Housing market analysts anticipate this could reinvigorate mortgage applications and home sales.'
      ],
      imageUrl: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
      publishedAt: '2023-11-14T14:45:00Z',
      source: 'Economic Times',
      url: 'https://example.com/news/2'
    },
    {
      id: '3',
      title: 'Startup Raises $50 Million to Develop Sustainable Battery Technology',
      summary: [
        'GreenCell, a cleantech startup, has secured $50 million in Series B funding.',
        'The company is developing batteries using abundant materials that avoid rare earth elements.',
        'Their technology promises 40% longer life and 30% faster charging than current lithium-ion batteries.',
        'Major investors include Breakthrough Energy Ventures and several automotive manufacturers.',
        'The funding will accelerate production scaling and commercial partnerships with electric vehicle makers.'
      ],
      imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      publishedAt: '2023-11-13T09:15:00Z',
      source: 'VentureBeat',
      url: 'https://example.com/news/3'
    },
    {
      id: '4',
      title: 'Global Supply Chain Improvements Lead to Decreased Shipping Costs',
      summary: [
        'Shipping costs have declined by 35% compared to last year\'s peak as supply chain disruptions ease.',
        'Port congestion has significantly reduced with container processing times back to pre-pandemic levels.',
        'Fuel prices and improved logistics efficiency are contributing to the cost reductions.',
        'Retail analysts expect the savings to eventually translate to consumer prices.',
        'Experts warn that geopolitical tensions could still cause regional disruptions.'
      ],
      imageUrl: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg',
      publishedAt: '2023-11-12T11:20:00Z',
      source: 'Logistics Today',
      url: 'https://example.com/news/4'
    },
    {
      id: '5',
      title: 'Major Retail Chain Announces Expansion with 200 New Stores',
      summary: [
        'National retail chain ValueMart has announced plans to open 200 new locations over the next two years.',
        'The expansion will create an estimated 15,000 jobs across 30 states.',
        'This comes against the trend of retail contractions and store closures in the industry.',
        'The company attributes success to its hybrid online/in-store model and value pricing strategy.',
        'Analysts see this as evidence of a possible broader retail recovery in certain segments.'
      ],
      imageUrl: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
      publishedAt: '2023-11-11T16:30:00Z',
      source: 'Retail Insider',
      url: 'https://example.com/news/5'
    },
    {
      id: '6',
      title: 'Healthcare Merger Creates Industry Giant with $30 Billion Market Cap',
      summary: [
        'The merger between MediCorp and HealthSystems has created one of the largest healthcare providers in the country.',
        'The combined entity will operate 350+ facilities across 28 states with over 60,000 employees.',
        'Regulatory approval came with conditions requiring divestiture in markets with potential monopolistic concerns.',
        'The companies project $800 million in cost synergies within the first three years.',
        'Patient advocacy groups express concerns about the potential impact on healthcare costs.'
      ],
      imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
      publishedAt: '2023-11-10T10:45:00Z',
      source: 'Healthcare Daily',
      url: 'https://example.com/news/6'
    }
    
  ];
}
