"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

type Stock = {
  name: string;
  sector: string;
  portfolioPercent: number;
  gainLoss: number;
};

const COLORS = ["#4f46e5", "#16a34a", "#dc2626", "#f59e0b", "#0ea5e9"];

export default function Charts({ stocks }: { stocks: Stock[] }) {

  // Pie data (portfolio distribution)
  const pieData = stocks.map(stock => ({
    name: stock.name,
    value: stock.portfolioPercent
  }));

  // Sector bar data
  const sectorMap: Record<string, number> = {};

  stocks.forEach(stock => {
    sectorMap[stock.sector] =
      (sectorMap[stock.sector] || 0) + stock.gainLoss;
  });

  const barData = Object.entries(sectorMap).map(
    ([sector, gainLoss]) => ({
      sector,
      gainLoss
    })
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-10">

      {/* Pie Chart */}
      <div className="h-80 border rounded p-4">
        <h2 className="font-semibold mb-2">Portfolio Distribution</h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="h-80 border rounded p-4">
        <h2 className="font-semibold mb-2">Sector Gain/Loss</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="gainLoss" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
