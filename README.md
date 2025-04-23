# BusinessNewsInsights

A MERN stack application that provides AI-summarized business news and stock market data.

## Features

- Google authentication via Firebase
- Business news aggregation with AI summarization
- Stock market data visualization
- User dashboard for saved/liked news management
- Backend API integration with NewsAPI and Finnhub

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **AI Summarization**: Google Gemini API

## Setup Instructions

1. Clone the repository
2. Create a `.env` file based on `.env.example` and fill in your API keys
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
# Start frontend
npm run dev

# Start backend
npm run server

# Start both (in separate terminal windows)
npm run dev & npm run server
```

## API Keys Required

- NewsAPI.org API key
- Finnhub.io API key
- Google Gemini API key
- Firebase project configuration

## Project Structure

```
businessnewsinsights/
├── public/
├── src/                # Frontend code
│   ├── components/     # React components
│   ├── contexts/       # Context providers
│   ├── pages/          # Page components
│   ├── services/       # API service modules
│   └── utils/          # Utility functions
├── server/             # Backend code
│   ├── models/         # MongoDB models
│   ├── routes/         # Express routes
│   └── services/       # Server-side services
└── package.json
```

## Environment Variables

See `.env.example` for required environment variables.

## License

VIT
# BusinessInsightPlus
