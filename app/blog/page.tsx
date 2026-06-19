import Link from 'next/link';
import { tryGetSupabaseAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const supabaseAdmin = tryGetSupabaseAdminClient();
  let posts: Array<{ id: string; title: string; slug: string; created_at: string }> = [];
  let setupError = false;

  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from('blog_posts')
      .select('id,title,slug,cover_image,created_at')
      .order('created_at', { ascending: false });
    posts = data ?? [];
  } else {
    setupError = true;
  }

  return (
    <main className="min-h-screen bg-[#06060e] px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold">Blog</h1>
        <p className="mb-10 text-white/60">Project ideas, technical guidance, and student tips.</p>

        {setupError ? (
          <div className="mb-8 rounded-lg border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
            Blog is ready, but Supabase is not configured yet. Add valid values in <code>.env.local</code> and restart.
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/50">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-white/60">{new Date(post.created_at).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
