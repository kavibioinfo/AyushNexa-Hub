import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyBottomBar from "@/components/StickyBottomBar";
import ExitPopup from "@/components/ExitPopup";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  title: {
    default: "AyushNexa Hub | Free AI Tools & Business Growth Kits for Maharashtra",
    template: "%s | AyushNexa Hub",
  },
  description:
    "Free marriage biodata in Marathi, resume builder, expense tracker, EMI calculator, BMI tool. Premium business growth kits (₹199) & medical practice kits (₹399) for Maharashtra. Instant download, lifetime access.",
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
  alternates: {
    canonical: "https://hub.ayushnexa.com",
  },
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
  twitter: {
    card: "summary_large_image",
    title: "AyushNexa Hub | Free AI Tools & Business Growth Kits",
    description:
      "Free marriage biodata in Marathi, resume builder, expense tracker + premium business kits. Built for Maharashtra.",
    images: ["https://hub.ayushnexa.com/og-image.jpg"],
    creator: "@ayushnexa",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
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
        <WhatsAppButton />
        <StickyBottomBar />
        <ExitPopup />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}