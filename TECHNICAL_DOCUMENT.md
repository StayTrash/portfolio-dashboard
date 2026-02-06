# Dynamic Portfolio Dashboard - Technical Document

## 1. Introduction

The **Dynamic Portfolio Dashboard** is a full-stack web application designed to provide real-time insights into a user’s stock portfolio. The system fetches live market prices, calculates investment metrics, groups holdings by sector, and visualizes performance using interactive charts.

The application was developed using:
- **Next.js** with TypeScript for the frontend
- **Node.js** for the backend
- **Tailwind CSS** for styling

Live financial data is retrieved using unofficial APIs and scraping techniques due to the absence of official public APIs from Yahoo Finance and Google Finance.

## 2. System Architecture

The application follows a client-server architecture:

```mermaid
graph TD
    Client[Frontend (Next.js)] -->|Request| API[Backend API (Node.js)]
    API -->|Fetch CMP| YF[Yahoo Finance]
    API -->|Scrape Data| GF[Google Finance]
    API -->|Store/Retrieve| Cache[Caching Layer]
```

### Frontend Responsibilities
- Display portfolio table
- Show sector summaries
- Render charts
- Trigger periodic data refresh

### Backend Responsibilities
- Fetch live CMP from Yahoo Finance
- Scrape Google Finance for P/E ratio and earnings
- Perform portfolio calculations
- Manage caching
- Handle errors

## 3. Data Flow

1. **Request**: Frontend sends request to `/api/stocks`.
2. **Cache Check**: Backend checks if valid data exists in the cache.
   - If **cached data exists** → Return immediate response.
   - If **no cache** → Proceed to fetch data.
3. **Data Fetching**:
   - Fetch CMP from Yahoo Finance.
   - Scrape Google Finance for additional metrics.
4. **Processing**:
   - Transform raw data.
   - Perform portfolio calculations (Service Layer).
5. **Response**:
   - Store result in cache.
   - Send structured JSON to frontend.

## 4. Real-Time Update Mechanism

To ensure live market updates, the frontend uses `setInterval` within React’s `useEffect` hook.

**Process:**
1. Initial fetch occurs on page load.
2. Subsequent fetches occur every **15 seconds**.
3. React state updates trigger UI re-render.

This approach ensures real-time updates and a smooth user experience without full page reloads.

## 5. API Strategy

### Yahoo Finance
Since Yahoo Finance does not offer an official API, the project uses the `yahoo-finance2` unofficial library to retrieve:
- **Current Market Price (CMP)**

*Fallback logic is implemented to handle missing price fields.*

### Google Finance
Google Finance does not provide an API. The project uses:
- **Axios** to fetch HTML pages.
- **Cheerio** to parse DOM elements.

**Scraping Targets:**
- P/E Ratio
- Latest Earnings

*If data is unavailable, safe fallback values (`null`) are returned.*

## 6. Data Transformation & Calculations

The backend cleans and structures raw API responses into a standardized stock object. Calculations are centralized in a service layer.

**Calculated Metrics:**
- **Investment** = `Purchase Price` × `Quantity`
- **Present Value** = `CMP` × `Quantity`
- **Gain/Loss** = `Present Value` − `Investment`
- **Portfolio %** = (`Investment` / `Total Investment`) × 100

## 7. Caching Strategy

An in-memory cache is implemented with:
- Cached data storage
- Timestamp tracking
- **15-second expiration**

**Benefits:**
- Reduced API calls
- Avoids rate limiting
- Faster response times

*The design allows easy migration to Redis for scalable environments.*

## 8. Performance Optimization

- **Parallel API Calls**: Utilizing `Promise.all` for concurrent data fetching.
- **Backend Caching**: Minimized redundant external requests.
- **Efficient React Rendering**: Optimized state updates.
- **Responsive UI**: Fast loading components using Tailwind CSS.
- *Future*: Optional memoization for large datasets.

## 9. Error Handling

All external API interactions are wrapped in `try/catch` blocks.

**Resilience Strategy:**
- System continues to function even if individual data points fail.
- Fallback values are returned.
- No server crashes occur.
- Frontend displays unavailable data as **N/A**.

## 10. Security Considerations

- **No Exposure**: No API keys or sensitive configurations are exposed on the client side.
- **Server-Side Execution**: Scraping and unofficial API calls are handled strictly on the server.
- **CORS**: Configured safely to prevent unauthorized cross-origin requests.

## 11. Sector Grouping

Stocks are grouped by sector in the frontend to mirror real-world portfolio management.

**Per Sector Metrics:**
- Total Investment
- Total Present Value
- Total Gain/Loss

## 12. Data Visualization

Charts are implemented using **Recharts**:

- **Pie Chart**: Displays portfolio distribution by stock.
- **Bar Chart**: Displays sector-wise gain/loss performance.

These visuals facilitate quick understanding of portfolio trends and performance.

## 13. Responsiveness

The dashboard layout adapts to different screen sizes using:
- **Tailwind CSS** utility classes.
- Responsive containers for charts.
- Scrollable tables for mobile views.

## 14. Technical Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **No Official APIs** | Used unofficial libraries (`yahoo-finance2`) and scraping (`cheerio`) with fallback handling. |
| **Rate Limiting** | Implemented backend caching to limit frequency of external requests. |
| **Data Inconsistency** | Added defensive checks and null handling to prevent crashes. |
| **Real-Time Updates** | Periodic frontend polling using `setInterval` (15s). |

## 15. Future Enhancements

- **Redis Caching**: For distributed and persistent caching.
- **WebSockets**: For true real-time streaming instead of polling.
- **User Customization**: Allow users to add/maintain their own portfolios.
- **Authentication**: User accounts and secure data persistence.

## 16. Conclusion

The **Dynamic Portfolio Dashboard** successfully implements all required features:
- Real-time updates
- Sector grouping & Calculations
- Performance optimizations
- Error handling
- Interactive UI

The system demonstrates proficiency in full-stack development, managing unstable external data sources, implementing performance strategies, and delivering a responsive, modern user experience.
