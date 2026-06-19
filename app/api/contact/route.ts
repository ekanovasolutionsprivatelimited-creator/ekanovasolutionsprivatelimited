import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { enquirySchema } from '@/lib/validations';
import { sanitizePayload } from '@/utils/sanitize';
import { isRateLimited } from '@/utils/rate-limit';
import { tryGetSupabaseAdminClient } from '@/lib/supabase/server';
import { adminEnquiryTemplate, customerAutoReplyTemplate } from '@/services/email-templates';
import { resend } from '@/lib/resend';
import { siteConfig } from '@/config/site';

type LocalEnquiry = {
  name: string;
  email: string;
  phone: string;
  college: string;
  project_type: string;
  service: string;
  budget: string;
  message: string;
  status: string;
  dedupe_hash: string;
  created_at: string;
};

function extractErrorMessage(reason: unknown) {
  if (reason instanceof Error) return reason.message;
  try {
    return JSON.stringify(reason);
  } catch {
    return String(reason);
  }
}

async function saveEnquiryLocally(enquiry: LocalEnquiry) {
  try {
    const localDataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(localDataDir, 'enquiries.local.json');
    await mkdir(localDataDir, { recursive: true });

    let current: LocalEnquiry[] = [];
    try {
      const raw = await readFile(filePath, 'utf8');
      current = JSON.parse(raw) as LocalEnquiry[];
    } catch {
      current = [];
    }

    current.unshift(enquiry);
    await writeFile(filePath, JSON.stringify(current, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Local enquiry storage failed', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip, 8, 60_000)) {
      return NextResponse.json({ message: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    const body = await request.json();
    if (body.website) {
      return NextResponse.json({ message: 'Thanks! We will contact you soon.' });
    }

    const parsed = enquirySchema.safeParse(sanitizePayload(body));
    if (!parsed.success) {
      return NextResponse.json({ message: 'Please check your form values.', errors: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const dedupeHash = crypto
      .createHash('sha256')
      .update(`${data.email.toLowerCase()}-${data.message.toLowerCase()}`)
      .digest('hex');

    const enquiryPayload: LocalEnquiry = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      college: data.college,
      project_type: data.projectType,
      service: data.service,
      budget: data.budget,
      message: data.message,
      status: 'new',
      dedupe_hash: dedupeHash,
      created_at: new Date().toISOString(),
    };

    const supabaseAdmin = tryGetSupabaseAdminClient();
    let usedLocalFallback = false;
    let storageWarning = '';
    const isVercelRuntime = process.env.VERCEL === '1';

    if (supabaseAdmin) {
      const { data: duplicate } = await supabaseAdmin
        .from('enquiries')
        .select('id, created_at')
        .eq('dedupe_hash', dedupeHash)
        .gte('created_at', new Date(Date.now() - 10 * 60_000).toISOString())
        .limit(1)
        .maybeSingle();

      if (duplicate) {
        return NextResponse.json({ message: 'Enquiry already submitted recently.' }, { status: 409 });
      }

      const { error: insertError } = await supabaseAdmin.from('enquiries').insert(enquiryPayload);
      if (insertError) {
        if (insertError.code === 'PGRST205') {
          console.warn('Supabase table "enquiries" not found.');
        } else {
          console.error('Insert enquiry error', insertError);
        }

        if (!isVercelRuntime) {
          usedLocalFallback = await saveEnquiryLocally(enquiryPayload);
        }

        storageWarning = usedLocalFallback
          ? ' Enquiry stored locally at data/enquiries.local.json.'
          : ' Enquiry email can still be sent, but dashboard storage is currently unavailable.';
      }
    } else {
      if (!isVercelRuntime) {
        usedLocalFallback = await saveEnquiryLocally(enquiryPayload);
      }

      storageWarning = usedLocalFallback
        ? ' Enquiry stored locally at data/enquiries.local.json.'
        : ' Enquiry email can still be sent, but dashboard storage is currently unavailable.';
    }

    const adminHtml = adminEnquiryTemplate(data);
    const customerHtml = customerAutoReplyTemplate(data.name);
    let emailWarning = '';
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'EkaNova Solutions <onboarding@resend.dev>';
    const usingTestSender = fromEmail.toLowerCase().includes('onboarding@resend.dev');

    if (resendApiKey && !resendApiKey.includes('YOUR_') && !resendApiKey.includes('your_')) {
      const customerEmail = data.email.trim().toLowerCase();

      const [adminResult, customerResult] = await Promise.allSettled([
        resend.emails.send({
          from: fromEmail,
          to: siteConfig.businessEmail,
          subject: 'New enquiry on EkaNova Solutions website',
          html: adminHtml,
        }),
        resend.emails.send({
          from: fromEmail,
          to: customerEmail,
          subject: 'Enquiry received - we will contact you within 12 hours | EkaNova Solutions',
          html: customerHtml,
        }),
      ]);

      if (adminResult.status === 'rejected') {
        console.error('Admin email send failed', adminResult.reason);
      }
      if (customerResult.status === 'rejected') {
        const reasonMessage = extractErrorMessage(customerResult.reason);
        console.error('Customer auto-reply send failed', reasonMessage);

        if (
          reasonMessage.includes('statusCode":403') &&
          (reasonMessage.toLowerCase().includes('verify a domain') ||
            reasonMessage.toLowerCase().includes('domain is not verified'))
        ) {
          // Fallback preview copy to owner while domain is unverified.
          await resend.emails.send({
            from: fromEmail,
            to: siteConfig.businessEmail,
            subject: `[Preview] Customer auto-reply for ${customerEmail}`,
            html: customerHtml,
          });
          emailWarning =
            ' Customer confirmation is blocked until domain is verified. Preview sent to owner email.';
        } else {
          emailWarning = ' Auto-reply could not be delivered to the entered email.';
        }
      }
    } else {
      emailWarning = ' Email skipped: RESEND_API_KEY is not configured.';
    }

    if (!emailWarning && usingTestSender) {
      emailWarning =
        ' Using Resend test sender (onboarding@resend.dev). Verify your domain and switch RESEND_FROM_EMAIL for real user delivery.';
    }

    return NextResponse.json({
      message: `Enquiry submitted successfully.${storageWarning}${emailWarning}`,
    });
  } catch (error) {
    console.error('Contact route error', error);
    const message = error instanceof Error ? error.message : 'Unexpected error. Please try again.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
