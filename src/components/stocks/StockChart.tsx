import React, { useEffect, useRef } from 'react';

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be replaced with actual chart library integration
    // and data fetching in a production environment
    if (chartRef.current) {
      renderMockChart(chartRef.current, symbol);
    }
    
    // Simulate loading stock data
    updateMockStockData(symbol);
    
    // We'd set up cleanup here for real chart implementations
    return () => {
      // Cleanup chart if needed
    };
  }, [symbol]);
  
  return (
    <div ref={chartRef} className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-gray-400 text-sm">
        Chart visualization for {symbol} would be displayed here
      </div>
    </div>
  );
};

// Mock functions for demonstration - would be replaced with actual API calls
function renderMockChart(element: HTMLDivElement, symbol: string) {
  // In a real implementation, we'd use a charting library like Chart.js,
  // ApexCharts, or Recharts to render the actual stock chart
  element.innerHTML = `
    <div class="w-full h-full flex flex-col items-center justify-center">
      <p class="text-primary-600 font-medium">${symbol} Stock Performance</p>
      <p class="text-xs text-gray-500 mt-2">Mock chart - would show real data in production</p>
      <div class="w-4/5 h-24 mt-4 relative">
        <div class="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
        <div class="absolute left-0 bottom-0 h-full w-full flex items-end">
          ${generateMockChartBars()}
        </div>
      </div>
    </div>
  `;
}

function generateMockChartBars() {
  const values = [];
  let trend = Math.random() > 0.5 ? 1 : -1;
  let currentValue = 50 + Math.random() * 20;
  
  for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.7) trend *= -1;
    currentValue += trend * (Math.random() * 5);
    currentValue = Math.max(10, Math.min(100, currentValue));
    values.push(currentValue);
  }
  
  return values.map((value, index) => {
    const height = value + '%';
    const isUp = index > 0 && value >= values[index - 1];
    const color = isUp ? 'bg-green-500' : 'bg-red-500';
    return `<div class="w-3 mx-px ${color}" style="height: ${height}"></div>`;
  }).join('');
}

function updateMockStockData(symbol: string) {
  // This would be replaced with actual API calls in production
  
  // Generate some mock stock data
  const price = (Math.random() * 200 + 50).toFixed(2);
  const change = (Math.random() * 10 - 5).toFixed(2);
  const marketCap = (Math.random() * 1000 + 100).toFixed(1) + 'B';
  const volume = (Math.random() * 10 + 1).toFixed(1) + 'M';
  
  // Update the UI with the mock data
  const priceEl = document.getElementById('current-price');
  const changeEl = document.getElementById('daily-change');
  const marketCapEl = document.getElementById('market-cap');
  const volumeEl = document.getElementById('volume');
  
  if (priceEl) priceEl.textContent = `$${price}`;
  
  if (changeEl) {
    const isPositive = parseFloat(change) >= 0;
    changeEl.textContent = `${isPositive ? '+' : ''}${change}%`;
    changeEl.className = `text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`;
  }
  
  if (marketCapEl) marketCapEl.textContent = marketCap;
  if (volumeEl) volumeEl.textContent = volume;
  
  // Update popular stocks prices
  document.querySelectorAll('.stock-price').forEach((el) => {
    const stockPrice = (Math.random() * 200 + 50).toFixed(2);
    el.textContent = `$${stockPrice}`;
  });
}

export default StockChart;