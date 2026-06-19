import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to load blog posts.', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabaseAdmin.from('blog_posts').insert(body).select('*').single();

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create blog post.', error }, { status: 500 });
  }
}

