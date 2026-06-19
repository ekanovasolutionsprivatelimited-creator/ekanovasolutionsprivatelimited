import { notFound } from 'next/navigation';
import { tryGetSupabaseAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabaseAdmin = tryGetSupabaseAdminClient();

  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen bg-[#06060e] px-4 py-16 text-white">
        <article className="mx-auto max-w-3xl rounded-lg border border-amber-400/40 bg-amber-500/10 p-5 text-amber-100">
          Blog post cannot load because Supabase environment variables are missing or invalid.
        </article>
      </main>
    );
  }

  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#06060e] px-4 py-16 text-white">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <p className="mb-8 text-sm text-white/60">{new Date(post.created_at).toLocaleDateString()}</p>
        <div className="whitespace-pre-wrap leading-7 text-white/90">{post.content}</div>
      </article>
    </main>
  );
}
