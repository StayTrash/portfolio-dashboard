import express from "express";
import cors from "cors";
import { getCMP } from "./services/yahooService.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/stocks", async (req, res) => {

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

  // fetch CMP for each stock
  for (let stock of stocks) {
    stock.cmp = await getCMP(stock.symbol);
  }

  res.json({
    success: true,
    data: stocks
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
