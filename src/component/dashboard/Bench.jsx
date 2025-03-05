import React, { useState } from 'react';
import { LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import { FiActivity, FiTrendingUp, FiAlertOctagon, FiSmile, FiFrown } from 'react-icons/fi';

const Bench = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  // Dummy data
  const stockData = [
    { date: '2023-01', price: 150 },
    { date: '2023-02', price: 165 },
    { date: '2023-03', price: 160 },
    { date: '2023-04', price: 175 },
    { date: '2023-05', price: 180 },
  ];

  const predictionData = [
    { x: 1, y: 155 },
    { x: 2, y: 160 },
    { x: 3, y: 170 },
    { x: 4, y: 175 },
    { x: 5, y: 185 },
  ];

  const news = {
    good: [
      'Company announces record profits',
      'New product launch exceeds expectations',
      'Positive analyst ratings',
      'Sustainable practices recognized',
      'Partnership with tech giant announced'
    ],
    bad: [
      'CEO steps down unexpectedly',
      'Supply chain issues reported',
      'Competitor releases superior product',
      'Regulatory investigation announced',
      'Q4 earnings miss estimates'
    ]
  }; // Keep previous news data

  return (
    <div className="min-h-screen p-6 bg-black pt-20 px-20">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#D6CC99]">Dashboard</h1>
        <select 
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#445D48] text-[#D6CC99] border-2 border-[#D6CC99] hover:bg-[#364b3a] transition-colors"
        >
          <option value="AAPL">Apple</option>
          <option value="GOOGL">Google</option>
          <option value="TSLA">Tesla</option>
          <option value="AMZN">Amazon</option>
        </select>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-3 gap-6 auto-rows-[240px]">
        {/* Sentiment Tile */}
        <div className="col-span-1 p-6 rounded-xl bg-[#445D48] flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-4">
            <FiSmile className="text-3xl text-[#D6CC99]" />
            <h2 className="text-xl font-semibold text-[#D6CC99]">Market Sentiment</h2>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-[#FDE5D4]">72%</span>
            <div className="px-3 py-1 rounded-full bg-[#D6CC99] text-[#445D48]">Positive</div>
          </div>
        </div>

        {/* Accuracy Tile */}
        <div className="col-span-1 p-6 rounded-xl bg-[#445D48] hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-6">
            <FiTrendingUp className="text-3xl text-[#D6CC99]" />
            <h2 className="text-xl font-semibold text-[#D6CC99]">Model Accuracy</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[#FDE5D4]">
              <span>24h</span><span className="font-mono">85%</span>
            </div>
            <div className="h-1 rounded-full bg-[#2d3b30]">
              <div className="w-4/5 h-1 rounded-full bg-[#D6CC99]"></div>
            </div>
          </div>
        </div>

        {/* Stock Chart Tile */}
        <div className="col-span-2 row-span-2 p-6 rounded-xl bg-[#445D48] hover:scale-[1.01] transition-transform">
          <div className="flex items-center gap-3 mb-6">
            <FiActivity className="text-3xl text-[#D6CC99]" />
            <h2 className="text-xl font-semibold text-[#D6CC99]">Price History</h2>
          </div>
          <div className="h-[calc(100%-60px)]">
            <LineChart width={800} height={300} data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3b30" />
              <XAxis dataKey="date" stroke="#FDE5D4" />
              <YAxis stroke="#FDE5D4" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2d3b30', border: 'none' }}
                itemStyle={{ color: '#D6CC99' }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#D6CC99" 
                strokeWidth={2}
                dot={{ fill: '#FDE5D4', strokeWidth: 1 }}
              />
            </LineChart>
          </div>
        </div>

        {/* Prediction Tile */}
        <div className="col-span-2 p-6 rounded-xl bg-[#445D48] hover:scale-[1.01] transition-transform">
          <div className="flex items-center gap-3 mb-6">
            <FiAlertOctagon className="text-3xl text-[#D6CC99]" />
            <h2 className="text-xl font-semibold text-[#D6CC99]">Price Predictions</h2>
          </div>
          <div className="h-[200px]">
            <ScatterChart width={800} height={200}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3b30" />
              <XAxis type="number" dataKey="x" name="Days" stroke="#FDE5D4" />
              <YAxis type="number" dataKey="y" name="Price" stroke="#FDE5D4" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2d3b30', border: 'none' }}
                itemStyle={{ color: '#D6CC99' }}
              />
              <Scatter 
                name="Predictions" 
                data={predictionData} 
                fill="#D6CC99" 
                shape={<circle r={6} />}
              />
            </ScatterChart>
          </div>
        </div>

        {/* Good News Tile */}
        <div className="col-span-1 p-6 rounded-xl bg-[#D6CC99] hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-4">
            <FiSmile className="text-3xl text-[#445D48]" />
            <h2 className="text-xl font-semibold text-[#445D48]">Positive News</h2>
          </div>
          <ul className="space-y-3">
            {news.good.slice(0,3).map((item, index) => (
              <li key={index} className="text-sm text-[#445D48] line-clamp-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bad News Tile */}
        <div className="col-span-1 p-6 rounded-xl bg-[#D6CC99] hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-4">
            <FiFrown className="text-3xl text-[#445D48]" />
            <h2 className="text-xl font-semibold text-[#445D48]">Negative News</h2>
          </div>
          <ul className="space-y-3">
            {news.bad.slice(0,3).map((item, index) => (
              <li key={index} className="text-sm text-[#445D48] line-clamp-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Bench;