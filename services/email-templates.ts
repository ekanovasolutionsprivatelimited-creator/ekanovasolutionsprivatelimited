import { primaryWhatsappUrl, siteConfig } from '@/config/site';
import type { EnquiryInput } from '@/lib/validations';

function baseTemplate(content: string) {
  return `
  <div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#5b21b6,#0891b2);padding:20px;color:#fff;">
        <h2 style="margin:0;">${siteConfig.name}</h2>
        <p style="margin:8px 0 0;opacity:0.9;">Academic Projects and Technical Guidance</p>
      </div>
      <div style="padding:24px;color:#111827;line-height:1.6;">${content}</div>
      <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
        <a href="${siteConfig.social.instagram}" style="margin-right:12px;color:#7c3aed;">Instagram</a>
        <a href="${siteConfig.social.linkedIn}" style="color:#0ea5e9;">LinkedIn</a>
      </div>
    </div>
  </div>`;
}

export function adminEnquiryTemplate(data: EnquiryInput) {
  return baseTemplate(`
    <h3>New Enquiry Received</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>College:</strong> ${data.college}</p>
    <p><strong>Project Type:</strong> ${data.projectType}</p>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Budget:</strong> ${data.budget}</p>
    <p><strong>Message:</strong><br/>${data.message}</p>
  `);
}

export function customerAutoReplyTemplate(name: string) {
  return baseTemplate(`
    <h3>Thank you, ${name}.</h3>
    <p>Thank you for contacting EkaNova Solutions. We have received your enquiry successfully.</p>
    <p>Our team has received your response and will get back to you within 12 hours.</p>
    <p>
      <a href="${primaryWhatsappUrl}" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px;">
        Chat on WhatsApp
      </a>
    </p>
    <p>Regards,<br/>Team ${siteConfig.name}</p>
  `);
}


