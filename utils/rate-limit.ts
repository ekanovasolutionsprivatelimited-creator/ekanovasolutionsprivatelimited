const requests = new Map<string, number[]>();

export function isRateLimited(key: string, maxRequests = 5, windowMs = 60_000) {
  const now = Date.now();
  const current = requests.get(key) ?? [];
  const filtered = current.filter((timestamp) => now - timestamp <= windowMs);

  if (filtered.length >= maxRequests) {
    requests.set(key, filtered);
    return true;
  }

  filtered.push(now);
  requests.set(key, filtered);
  return false;
}

