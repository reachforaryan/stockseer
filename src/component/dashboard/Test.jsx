import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StockDashboard() {
  const [timeFrame, setTimeFrame] = useState("1D");
  const [currentPrice] = useState(150.45);
  const [percentageChange] = useState(2.35);

  // Dummy data generators
  const generateStockData = (points) =>
    Array.from(
      { length: points },
      (_, i) => currentPrice + (Math.random() - 0.5) * 20
    );

  const generateVolumeData = (points) =>
    Array.from({ length: points }, () => Math.floor(Math.random() * 1000000));

  const generateRSI = () => Math.floor(Math.random() * 40 + 30);

  // Technical indicators
  const [rsi] = useState(generateRSI());
  const movingAverages = {
    "50-day": generateStockData(30),
    "200-day": generateStockData(30),
  };

  // Sector performance data
  const sectors = [
    { name: "Tech", change: 1.8 },
    { name: "Energy", change: -0.5 },
    { name: "Finance", change: 0.9 },
    { name: "Healthcare", change: 2.1 },
    { name: "Retail", change: -1.2 },
  ];

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: { color: "white" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 space-y-6 pt-20">
      {/* Top Section - Main Chart and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Price Chart */}
        <div className="lg:col-span-2 bg-zinc-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">AAPL - Apple Inc.</h2>
            <div className="flex gap-2">
              {["1D", "1W", "1M", "1Y"].map((frame) => (
                <button
                  key={frame}
                  onClick={() => setTimeFrame(frame)}
                  className={`px-4 py-2 rounded-lg ${
                    timeFrame === frame
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>
          </div>
          <div className="h-96">
            <Line
              data={{
                labels: generateStockData(24).map((_, i) => i),
                datasets: [
                  {
                    label: "Price",
                    data: generateStockData(24),
                    borderColor: "#10B981",
                    tension: 0.1,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-zinc-800 p-6 rounded-2xl space-y-6">
          <div className="space-y-2">
            <div className="text-zinc-400">Current Price</div>
            <div className="text-4xl font-bold">${currentPrice.toFixed(2)}</div>
            <div
              className={`text-xl ${
                percentageChange >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange}%
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-zinc-400">Predicted Price</div>
            <div className="text-4xl font-bold text-purple-400">$156.20</div>
            <div className="text-green-400">+3.8% vs current</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">RSI</span>
              <span
                className={
                  rsi > 70 ? "text-red-400" : rsi < 30 ? "text-green-400" : ""
                }
              >
                {rsi}
              </span>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full">
              <div
                className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"
                style={{ width: `${((rsi - 30) / 70) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Technical Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <div className="bg-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">Trading Volume</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: generateVolumeData(24).map((_, i) => i),
                datasets: [
                  {
                    label: "Volume",
                    data: generateVolumeData(24),
                    backgroundColor: "#3B82F6",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Moving Averages */}
        <div className="bg-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">Moving Averages</h3>
          <div className="h-64">
            <Line
              data={{
                labels: movingAverages["50-day"].map((_, i) => i),
                datasets: [
                  {
                    label: "50-day MA",
                    data: movingAverages["50-day"],
                    borderColor: "#8B5CF6",
                    tension: 0.1,
                  },
                  {
                    label: "200-day MA",
                    data: movingAverages["200-day"],
                    borderColor: "#10B981",
                    tension: 0.1,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Performance */}
        <div className="bg-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Sector Performance</h3>
          <div className="space-y-3">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className="flex items-center justify-between p-3 bg-zinc-700 rounded-lg"
              >
                <span>{sector.name}</span>
                <span
                  className={`${
                    sector.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {sector.change >= 0 ? "+" : ""}
                  {sector.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* News Sentiment */}
        <div className="bg-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">News Sentiment</h3>
          <div className="h-64">
            <Line
              data={{
                labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
                datasets: [
                  {
                    label: "Sentiment Score",
                    data: Array.from(
                      { length: 7 },
                      () => Math.random() * 100 - 50
                    ),
                    borderColor: "#F59E0B",
                    tension: 0.2,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Prediction Confidence */}
        <div className="bg-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Prediction Confidence</h3>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-green-400">89%</div>
              </div>
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  className="stroke-current text-zinc-700"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  className="stroke-current text-green-400"
                  strokeWidth="12"
                  strokeDasharray="565.48"
                  strokeDashoffset="565.48"
                  style={{ strokeDashoffset: 565.48 * (1 - 0.89) }}
                  fill="none"
                />
              </svg>
            </div>
            <div className="mt-4 text-zinc-400">Algorithm Confidence Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
