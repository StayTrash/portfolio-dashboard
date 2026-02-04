import axios from "axios";
import * as cheerio from "cheerio";

export async function getGoogleFinanceData(symbol) {
  try {

    const url = `https://www.google.com/finance/quote/${symbol.replace(".NS", "")}:NSE`;

    const response = await axios.get(url);

    const html = response.data;

    const $ = cheerio.load(html);

    const peRatio = $('div[data-test="pe-ratio"]').text();

    const earnings = $('div[data-test="latest-earnings"]').text();

    return {
      peRatio: peRatio || null,
      latestEarnings: earnings || null
    };

  } catch (error) {
    console.error("Google Finance scrape error:", error.message);

    return {
      peRatio: null,
      latestEarnings: null
    };
  }
}
