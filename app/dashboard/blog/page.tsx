'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function DashboardBlogPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, cover_image: coverImage || null }),
    });

    if (response.ok) {
      toast.success('Blog post created');
      setTitle('');
      setSlug('');
      setContent('');
      setCoverImage('');
    } else {
      const error = await response.json();
      toast.error(error.message || 'Failed to create post');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#06060e] p-6 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-4 text-2xl font-bold">Blog Management</h1>
        <form onSubmit={createPost} className="space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full rounded-lg border border-white/20 bg-transparent p-3" required />
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className="w-full rounded-lg border border-white/20 bg-transparent p-3" required />
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Cover Image URL" className="w-full rounded-lg border border-white/20 bg-transparent p-3" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Markdown content" rows={10} className="w-full rounded-lg border border-white/20 bg-transparent p-3" required />
          <button className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black" disabled={loading}>{loading ? 'Saving...' : 'Publish Post'}</button>
        </form>
      </div>
    </main>
  );
}

