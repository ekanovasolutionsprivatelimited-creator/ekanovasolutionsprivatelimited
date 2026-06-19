import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    message: 'Razorpay integration placeholder ready. Implement server-side order creation when payment phase starts.',
    provider: 'razorpay',
    status: 'not_implemented',
  });
}

