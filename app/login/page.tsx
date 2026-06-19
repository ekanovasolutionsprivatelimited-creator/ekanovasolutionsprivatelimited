'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
    } catch {
      setError('Login is not ready yet. Please verify Supabase keys in .env.local.');
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#06060e] p-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-2xl font-bold">Admin Login</h1>
        <p className="mb-6 text-sm text-white/60">Sign in using Google to access dashboard.</p>
        {error ? <p className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-xs text-red-200">{error}</p> : null}
        <button onClick={signInWithGoogle} disabled={loading} className="w-full rounded-xl bg-white py-3 font-semibold text-black">
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>
      </div>
    </main>
  );
}

