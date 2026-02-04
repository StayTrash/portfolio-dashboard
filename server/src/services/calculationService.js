export function calculatePortfolio(stocks) {

  let totalInvestment = 0;

  // first pass: calculate investment + present value
  stocks.forEach(stock => {

    stock.investment = stock.purchasePrice * stock.quantity;

    stock.presentValue = stock.cmp * stock.quantity;

    stock.gainLoss = stock.presentValue - stock.investment;

    totalInvestment += stock.investment;
  });

  // second pass: calculate portfolio %
  stocks.forEach(stock => {

    stock.portfolioPercent = totalInvestment > 0
      ? (stock.investment / totalInvestment) * 100
      : 0;
  });

  return stocks;
}
