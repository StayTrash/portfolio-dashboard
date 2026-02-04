import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getCMP(symbol) {
  try {

    const quote = await yahooFinance.quote(symbol);

    if (!quote) return null;

    // try multiple possible price fields
    return (
      quote.regularMarketPrice ||
      quote.postMarketPrice ||
      quote.preMarketPrice ||
      null
    );

  } catch (error) {
    console.error(`Yahoo fetch error for ${symbol}:`, error.message);
    return null;
  }
}
