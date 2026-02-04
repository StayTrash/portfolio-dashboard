import YahooFinance from "yahoo-finance2";

// create client instance
const yahooFinance = new YahooFinance();

export async function getCMP(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol);

    return quote.regularMarketPrice;

  } catch (error) {
    console.error("Yahoo fetch error:", error.message);
    return null;
  }
}
