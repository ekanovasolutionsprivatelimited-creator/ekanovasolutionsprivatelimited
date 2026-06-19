const BLOCKED_PATTERNS = [/<script/gi, /javascript:/gi, /onerror=/gi, /onload=/gi];

export function sanitizeText(value: string) {
  let clean = value.trim().replace(/\s+/g, ' ');
  for (const pattern of BLOCKED_PATTERNS) {
    clean = clean.replace(pattern, '');
  }
  return clean;
}

export function sanitizePayload<T extends Record<string, unknown>>(payload: T) {
  const next = { ...payload } as Record<string, unknown>;
  for (const key of Object.keys(next)) {
    const value = next[key];
    if (typeof value === 'string') {
      next[key] = sanitizeText(value);
    }
  }
  return next as T;
}

