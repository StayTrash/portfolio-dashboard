import express from "express";
import cors from "cors";
import { getCMP } from "./services/yahooService.js";
import { getGoogleFinanceData } from "./services/googleService.js";
import { calculatePortfolio } from "./services/calculationService.js";
import { getCache, setCache } from "./cache/memoryCache.js";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/stocks", async (req, res) => {

  // 1. check cache first
  const cached = getCache();

  if (cached) {
    console.log("Serving from cache");
    return res.json({
      success: true,
      data: cached
    });
  }

  console.log("Fetching fresh data");

  const stocks = [
    {
      name: "TCS",
      sector: "Technology",
      purchasePrice: 3000,
      quantity: 10,
      symbol: "TCS.NS"
    },
    {
      name: "Infosys",
      sector: "Technology",
      purchasePrice: 1400,
      quantity: 20,
      symbol: "INFY.NS"
    }
  ];

  await Promise.all(
    stocks.map(async stock => {

      stock.cmp = await getCMP(stock.symbol);

      const googleData = await getGoogleFinanceData(stock.symbol);

      stock.peRatio = googleData.peRatio;
      stock.latestEarnings = googleData.latestEarnings;
    })
  );

  const enrichedStocks = calculatePortfolio(stocks);

  // 2. save in cache
  setCache(enrichedStocks);

  res.json({
    success: true,
    data: enrichedStocks
  });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
