import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to load enquiries.', error }, { status: 500 });
  }
}

