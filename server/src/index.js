import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/api/stocks", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        name: "TCS",
        sector: "Technology",
        purchasePrice: 3000,
        quantity: 10
      }
    ]
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
