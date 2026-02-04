"use client";

import { useEffect, useState } from "react";

type Stock = {
  name: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  symbol: string;
  cmp: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioPercent: number;
  peRatio: string | null;
  latestEarnings: string | null;
};

export default function Home() {

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStocks() {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/stocks");
    const data = await res.json();

    setStocks(data.data);

  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
  const loadData = async () => {
    await fetchStocks();
  };

  loadData();
}, []);


  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10">

      <h1 className="text-2xl font-bold mb-4">
        Portfolio Dashboard
      </h1>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(stocks, null, 2)}
      </pre>

    </main>
  );
}
