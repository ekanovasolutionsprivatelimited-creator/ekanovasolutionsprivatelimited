const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  'http://localhost:3000';

export const siteConfig = {
  name: 'EkaNova Solutions',
  description:
    'EkaNova Solutions provides ready-made academic projects with source code, documentation, PPT, viva support, and technical guidance.',
  url: siteUrl,
  businessEmail: 'ekanovasolutionsprivatelimited@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/ekanova_solutions/',
    linkedIn: 'https://www.linkedin.com/in/yashvant-bankapur-59641a318/',
  },
  whatsappNumbers: ['918549070868', '917411288175'],
};

export const whatsappUrls = siteConfig.whatsappNumbers.map((number) => `https://wa.me/${number}`);
export const primaryWhatsappUrl = whatsappUrls[0];
export const secondaryWhatsappUrl = whatsappUrls[1];
