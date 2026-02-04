"use client";

type Stock = {
  sector: string;
  investment: number;
  presentValue: number;
  gainLoss: number;
};

export default function SectorSummary({ stocks }: { stocks: Stock[] }) {

  // group by sector
  const sectorMap: Record<string, Stock[]> = {};

  stocks.forEach(stock => {
    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = [];
    }
    sectorMap[stock.sector].push(stock);
  });

  return (
    <div className="mb-8 space-y-4">

      {Object.entries(sectorMap).map(([sector, sectorStocks]) => {

        const totalInvestment = sectorStocks.reduce(
          (sum, s) => sum + s.investment,
          0
        );

        const totalPresentValue = sectorStocks.reduce(
          (sum, s) => sum + s.presentValue,
          0
        );

        const totalGainLoss = sectorStocks.reduce(
          (sum, s) => sum + s.gainLoss,
          0
        );

        return (
          <div
            key={sector}
            className="border rounded p-4 bg-gray-50"
          >
            <h2 className="text-lg font-semibold mb-2">
              {sector} Sector
            </h2>

            <div className="flex gap-6">

              <p>
                <strong>Investment:</strong>{" "}
                {totalInvestment.toFixed(2)}
              </p>

              <p>
                <strong>Present Value:</strong>{" "}
                {totalPresentValue.toFixed(2)}
              </p>

              <p
                className={
                  totalGainLoss >= 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                Gain/Loss: {totalGainLoss.toFixed(2)}
              </p>

            </div>
          </div>
        );
      })}

    </div>
  );
}
