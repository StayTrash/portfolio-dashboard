let cacheData = null;
let lastFetched = 0;

const CACHE_DURATION = 15000; // 15 seconds

export function getCache() {
  const now = Date.now();

  if (cacheData && now - lastFetched < CACHE_DURATION) {
    return cacheData;
  }

  return null;
}

export function setCache(data) {
  cacheData = data;
  lastFetched = Date.now();
}
