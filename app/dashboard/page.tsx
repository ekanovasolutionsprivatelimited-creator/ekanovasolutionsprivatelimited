'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

interface EnquiryLite {
  id: string;
  created_at: string;
}

interface BlogLite {
  id: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data } = await supabase.auth.getSession();
        const userEmail = data.session?.user?.email;

        if (!userEmail) {
          router.push('/login');
          return;
        }

        setEmail(userEmail);

        const [enquiries, blogs] = await Promise.all([
          fetch('/api/admin/enquiries').then((res) => res.json()),
          fetch('/api/blog').then((res) => res.json()),
        ]);

        setEnquiryCount((enquiries as EnquiryLite[]).length || 0);
        setBlogCount((blogs as BlogLite[]).length || 0);
      } catch {
        setError('Dashboard setup is incomplete. Please check Supabase environment variables and refresh.');
      }
    };

    init();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#06060e] p-6 text-white">
      <div className="mx-auto max-w-5xl">
        {error ? (
          <div className="mb-6 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/60">{email}</p>
          </div>
          <Link href="/" className="rounded-lg border border-white/20 px-4 py-2 text-sm">Back to website</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Total Enquiries" value={String(enquiryCount)} href="/dashboard/enquiries" />
          <Card title="Blog Posts" value={String(blogCount)} href="/dashboard/blog" />
        </div>
      </div>
    </main>
  );
}

function Card({ title, value, href }: { title: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-3 text-4xl font-bold">{value}</p>
    </Link>
  );
}

