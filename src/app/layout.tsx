import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// ─── VIEWPORT CONFIG ───
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F172A", // Dark blue matches your hero
};

// ─── METADATA ───
export const metadata: Metadata = {
  // Title optimized for search + click-through
  title: {
    default: "AyushNexa Hub | Free AI Tools & Business Growth Kits for Maharashtra",
    template: "%s | AyushNexa Hub", // Page titles become "Vivah Biodata | AyushNexa Hub"
  },

  // Description packed with keywords people actually search
  description:
    "Free marriage biodata in Marathi, resume builder, expense tracker, EMI calculator, BMI tool. Premium business growth kits (₹199) & medical practice kits (₹399) for Maharashtra. Instant download, lifetime access.",

  // Keywords help some search engines (Bing, Yahoo)
  keywords: [
    "marriage biodata marathi",
    "vivah parichay patrika",
    "resume builder india",
    "expense tracker",
    "emi calculator",
    "bmi calculator",
    "business growth kit",
    "medical practice kit",
    "maharashtra tools",
    "ai tools",
    "digital assets",
    "ayushnexa",
  ],

  // Canonical URL prevents duplicate content penalties
  alternates: {
    canonical: "https://hub.ayushnexa.com",
  },

  // Robots directive (complements your robots.ts)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph = how your link looks on WhatsApp, Facebook, LinkedIn
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hub.ayushnexa.com",
    siteName: "AyushNexa Hub",
    title: "AyushNexa Hub | Free AI Tools & Business Growth Kits for Maharashtra",
    description:
      "Free marriage biodata, resume builder, EMI calculator + premium business & medical growth kits. Built for Maharashtra.",
    images: [
      {
        url: "https://hub.ayushnexa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AyushNexa Hub - Free AI Tools and Premium Growth Kits for Maharashtra",
      },
    ],
  },

  // Twitter Card = how your link looks on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "AyushNexa Hub | Free AI Tools & Business Growth Kits",
    description:
      "Free marriage biodata in Marathi, resume builder, expense tracker + premium business kits. Built for Maharashtra.",
    images: ["https://hub.ayushnexa.com/og-image.jpg"],
    creator: "@ayushnexa", // Replace with your actual handle
  },

  // Favicon and app icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Verification for Google Search Console
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Replace after adding property
  },

  // App metadata
  applicationName: "AyushNexa Hub",
  authors: [{ name: "AyushNexa Digital Solutions", url: "https://ayushnexa.com" }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}

        {/* Razorpay Payment Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
      </body>
    </html>
  );
}