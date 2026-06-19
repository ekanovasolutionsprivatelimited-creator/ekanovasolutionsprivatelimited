import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@/components/shared/GoogleAnalytics';
import { siteConfig } from '@/config/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Academic Projects and Technical Guidance`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
          <Toaster richColors closeButton />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

