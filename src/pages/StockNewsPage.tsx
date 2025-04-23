import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../contexts/AuthContext';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  open: number;
  high: number;
  low: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  updatedAt?: any;
}

interface MarketIndexData {
  symbol: string;
  price: number;
  changePercent: string;
  updatedAt?: any;
}

const StockMarketPage: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [popularStocks, setPopularStocks] = useState<StockData[]>([]);
  const [marketIndexes, setMarketIndexes] = useState<MarketIndexData[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current stock data
        const stockRef = doc(db, 'stocks', symbol);
        const stockSnap = await getDoc(stockRef);

        if (stockSnap.exists()) {
          setStockData(stockSnap.data() as StockData);
        } else {
          throw new Error('No stock data available');
        }

        // Fetch popular stocks
        const popularSymbols = ['MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA'];
        const popularStocksData = await Promise.all(
          popularSymbols.map(async sym => {
            const snap = await getDoc(doc(db, 'stocks', sym));
            return snap.exists() ? (snap.data() as StockData) : null;
          })
        );
        setPopularStocks(popularStocksData.filter(Boolean) as StockData[]);

        // Fetch market indexes (SPY = S&P 500, DIA = Dow Jones, QQQ = NASDAQ)
        // Replaced with the provided code:
        const fetchMarketIndexes = async () => {
          const indexes = await Promise.all(
            ['SPY', 'DIA', 'QQQ'].map(async symbol => {
              const snap = await getDoc(doc(db, 'marketIndexes', symbol));
              return snap.exists() ? snap.data() as MarketIndexData : null;
            })
          );
          setMarketIndexes(indexes.filter(Boolean) as MarketIndexData[]);
        };
        await fetchMarketIndexes(); // Await the market indexes fetch

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, db]);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSymbol(e.target.value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getIndexName = (symbol: string) => {
    switch (symbol) {
      case 'SPY': return 'S&P 500';
      case 'DIA': return 'Dow Jones';
      case 'QQQ': return 'NASDAQ';
      default: return symbol;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Stock Market Dashboard → Updated Every 15 mins
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stock Data */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {symbol} Stock Data
                </h2>
                <select
                  value={symbol}
                  onChange={handleSymbolChange}
                  className="mt-2 sm:mt-0 block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="AAPL">Apple (AAPL)</option>
                  <option value="MSFT">Microsoft (MSFT)</option>
                  <option value="GOOGL">Alphabet (GOOGL)</option>
                  <option value="AMZN">Amazon (AMZN)</option>
                  <option value="META">Meta (META)</option>
                  <option value="TSLA">Tesla (TSLA)</option>
                </select>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : stockData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold">${formatNumber(stockData.price)}</span>
                      <span className={`ml-2 text-lg ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stockData.change >= 0 ? '+' : ''}{formatNumber(stockData.change)} ({stockData.changePercent})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      As of: {stockData.updatedAt?.toDate ? formatDate(stockData.updatedAt.toDate().toString()) : 'N/A'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">Open</p>
                      <p className="text-lg font-semibold">${formatNumber(stockData.open)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">High</p>
                      <p className="text-lg font-semibold">${formatNumber(stockData.high)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">Low</p>
                      <p className="text-lg font-semibold">${formatNumber(stockData.low)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">Previous Close</p>
                      <p className="text-lg font-semibold">${formatNumber(stockData.previousClose)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">Volume</p>
                      <p className="text-lg font-semibold">{stockData.volume.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </div>
          </div>

          {/* Right Column - Popular Stocks & Market Overview */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Stocks</h2>
              <div className="space-y-3">
                {popularStocks.map((stock, index) => (
                  <button
                    key={index}
                    onClick={() => setSymbol(stock.symbol)}
                    className={`w-full text-left p-3 rounded-md transition ${
                      symbol === stock.symbol ? 'bg-indigo-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{stock.symbol}</span>
                        <span className="text-sm text-gray-500 block">${formatNumber(stock.price)}</span>
                      </div>
                      <span className={`text-sm ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Overview</h2>
              <div className="space-y-4">
                {marketIndexes.map((index, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-700">{getIndexName(index.symbol)}</span>
                    <span className="font-medium">
                      {formatNumber(index.price)}
                      <span className={`ml-2 ${index.changePercent.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                        {index.changePercent.includes('-') ? '' : '+'}{index.changePercent}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMarketPage;