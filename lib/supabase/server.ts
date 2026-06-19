import { createClient } from '@supabase/supabase-js';

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function hasPlaceholder(value: string) {
  return value.includes('YOUR_') || value.includes('your_');
}

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase service environment variables.');
  }

  if (!isValidHttpUrl(supabaseUrl)) {
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL. Must be an HTTP/HTTPS URL.');
  }
  if (hasPlaceholder(supabaseUrl) || hasPlaceholder(serviceRoleKey)) {
    throw new Error('Supabase environment variables still use placeholder values.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function tryGetSupabaseAdminClient() {
  try {
    return getSupabaseAdminClient();
  } catch {
    return null;
  }
}
