import { siteConfig } from '@/config/site';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export function isResendConfigured() {
  const apiKey = process.env.RESEND_API_KEY;
  return Boolean(apiKey && !apiKey.includes('YOUR_') && !apiKey.includes('your_'));
}

export async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  const from = process.env.RESEND_FROM_EMAIL || `EkaNova Solutions <onboarding@resend.dev>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [payload.to], subject: payload.subject, html: payload.html }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed: ${errorText}`);
  }

  return response.json();
}

export async function sendAdminNotificationEmail(html: string) {
  return sendEmail({
    to: siteConfig.businessEmail,
    subject: 'New enquiry on EkaNova Solutions website',
    html,
  });
}

export async function sendCustomerAutoReply(email: string, html: string) {
  return sendEmail({
    to: email,
    subject: 'We received your enquiry | EkaNova Solutions',
    html,
  });
}

