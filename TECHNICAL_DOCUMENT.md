# Technical Document: Portfolio Dashboard

## Introduction
This document outlines the technical challenges faced during the development of the Dynamic Portfolio Dashboard and the solutions implemented to address them.

## Key Challenges & Solutions

### 1. Lack of Official Financial APIs
**Challenge:** Both Yahoo Finance and Google Finance do not provide free, official public APIs for real-time data.
**Solution:**
- **Yahoo Finance:** Used the `yahoo-finance2` library (unofficial) which reverse-engineers the internal API calls used by the Yahoo Finance website.
- **Google Finance:** Implemented web scraping using `axios` and `cheerio`. The application requests the specific stock page and parses the HTML to extract the "P/E Ratio" and "Latest Earnings" from specific DOM elements (`data-test` attributes).

### 2. Rate Limiting & Performance
**Challenge:** Frequent scraping or API calls can lead to IP bans or rate limits from the providers.
**Solution:**
- **Caching:** Implemented a simple in-memory cache on the server. Although the requirement is to update every 15 seconds, the server serves the cached data if multiple requests come within a short processing window, ensuring we don't over-fetch.
- **Batch Processing:** Data fetching is done in parallel using `Promise.all` to minimize the total wait time for the user, rather than sequential fetching.

### 3. Asynchronous Data Consistency
**Challenge:** Combining data from two different sources (Yahoo and Google) for a single stock entity.
**Solution:**
- The backend performs the data aggregation. It iterates through the static portfolio list, triggers async fetches for both sources, and awaits all promises to resolve before calculating the portfolio metrics (Investment, Present Value, Gain/Loss). This ensures the frontend always receives a complete, consistent dataset.

### 4. Real-time Updates in Frontend
**Challenge:** Keeping the dashboard updated without refreshing the page.
**Solution:**
- Used `useEffect` with `setInterval` in the Next.js `page.tsx` to poll the backend API every 15 seconds.
- React's state management ensures that only the changed values trigger a re-render of the relevant table rows and summary components.

## Tech Stack Decisions

- **Next.js (Frontend):** Chosen for its robust routing and server-side capabilities, though currently used primarily for client-side rendering (CSR) to handle the live intervals efficiently.
- **Tailwind CSS:** Enabled rapid UI development with utility classes, making it easy to implement the responsive design and conditional formatting (Red/Green colors).
- **Node.js/Express (Backend):** separated the scraping logic from the client to avoid CORS issues and to abstract the complexity of multiple data sources into a single clean API (`/api/stocks`).
