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

  // ===== Financial Sector =====
  {
    name: "HDFC Bank",
    sector: "Financial",
    purchasePrice: 1490,
    quantity: 50,
    symbol: "HDFCBANK.NS"
  },
  {
    name: "Bajaj Finance",
    sector: "Financial",
    purchasePrice: 6466,
    quantity: 15,
    symbol: "BAJFINANCE.NS"
  },
  {
    name: "ICICI Bank",
    sector: "Financial",
    purchasePrice: 780,
    quantity: 84,
    symbol: "ICICIBANK.NS"
  },
  {
    name: "Bajaj Housing",
    sector: "Financial",
    purchasePrice: 130,
    quantity: 504,
    symbol: "BAJAJHFL.NS"
  },
  {
    name: "Savani Financials",
    sector: "Financial",
    purchasePrice: 24,
    quantity: 1080,
    symbol: "SAVANIFIN.NS"
  },

  // ===== Tech Sector =====
  {
    name: "Affle India",
    sector: "Technology",
    purchasePrice: 1151,
    quantity: 50,
    symbol: "AFFLE.NS"
  },
  {
    name: "LTI Mindtree",
    sector: "Technology",
    purchasePrice: 4775,
    quantity: 16,
    symbol: "LTIM.NS"
  },
  {
    name: "KPIT Tech",
    sector: "Technology",
    purchasePrice: 672,
    quantity: 61,
    symbol: "KPITTECH.NS"
  },
  {
    name: "Tata Tech",
    sector: "Technology",
    purchasePrice: 1072,
    quantity: 63,
    symbol: "TATATECH.NS"
  },
  {
    name: "BLS E-Services",
    sector: "Technology",
    purchasePrice: 232,
    quantity: 191,
    symbol: "BLSE.NS"
  },
  {
    name: "Tanla Platforms",
    sector: "Technology",
    purchasePrice: 1134,
    quantity: 45,
    symbol: "TANLA.NS"
  },

  // ===== Consumer Sector =====
  {
    name: "DMart",
    sector: "Consumer",
    purchasePrice: 3777,
    quantity: 27,
    symbol: "DMART.NS"
  },
  {
    name: "Tata Consumer",
    sector: "Consumer",
    purchasePrice: 845,
    quantity: 90,
    symbol: "TATACONSUM.NS"
  },
  {
    name: "Pidilite",
    sector: "Consumer",
    purchasePrice: 2376,
    quantity: 36,
    symbol: "PIDILITIND.NS"
  },

  // ===== Power Sector =====
  {
    name: "Tata Power",
    sector: "Power",
    purchasePrice: 224,
    quantity: 225,
    symbol: "TATAPOWER.NS"
  },
  {
    name: "KPI Green",
    sector: "Power",
    purchasePrice: 875,
    quantity: 50,
    symbol: "KPIGREEN.NS"
  },
  {
    name: "Suzlon",
    sector: "Power",
    purchasePrice: 44,
    quantity: 450,
    symbol: "SUZLON.NS"
  },
  {
    name: "Gensol",
    sector: "Power",
    purchasePrice: 998,
    quantity: 45,
    symbol: "GENSOL.NS"
  },

  // ===== Pipe Sector =====
  {
    name: "Hariom Pipes",
    sector: "Pipe",
    purchasePrice: 580,
    quantity: 60,
    symbol: "HARIOMPIPE.NS"
  },
  {
    name: "Astral",
    sector: "Pipe",
    purchasePrice: 1517,
    quantity: 56,
    symbol: "ASTRAL.NS"
  },
  {
    name: "Polycab",
    sector: "Pipe",
    purchasePrice: 2818,
    quantity: 28,
    symbol: "POLYCAB.NS"
  },

  // ===== Others =====
  {
    name: "Clean Science",
    sector: "Others",
    purchasePrice: 1610,
    quantity: 32,
    symbol: "CLEAN.NS"
  },
  {
    name: "Deepak Nitrite",
    sector: "Others",
    purchasePrice: 2248,
    quantity: 27,
    symbol: "DEEPAKNTR.NS"
  },
  {
    name: "Fine Organic",
    sector: "Others",
    purchasePrice: 4284,
    quantity: 16,
    symbol: "FINEORG.NS"
  },
  {
    name: "Gravita",
    sector: "Others",
    purchasePrice: 2037,
    quantity: 8,
    symbol: "GRAVITA.NS"
  },
  {
    name: "SBI Life",
    sector: "Others",
    purchasePrice: 1197,
    quantity: 49,
    symbol: "SBILIFE.NS"
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
