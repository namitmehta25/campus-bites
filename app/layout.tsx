import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import VerificationBanner from "@/components/VerificationBanner";
import ParticlesBackground from "@/components/ParticlesBackground";
import Footer from "@/components/Footer";
import Script from "next/script";
import GlobalStyles from "@/components/GlobalStyles";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = { 
  width: "device-width", 
  initialScale: 1, 
  maximumScale: 1,
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR,
};

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} | Skip the Wait, Savor the Taste`,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: "campus food, food pre-order, college food delivery, university canteen, meal pre-order",
  authors: [{ name: `${process.env.NEXT_PUBLIC_APP_NAME} Team` }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} | Skip the Wait, Savor the Taste`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_APP_NAME} | Skip the Wait, Savor the Taste`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <GlobalStyles />
      </head>
      <body className={inter.className}>
        <Toaster position="top-center" />
        <Navbar useDarkMode={true} />
        <VerificationBanner />
        <ParticlesBackground />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Structured data for SEO */}
        <Script id="schema-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Campus Bites",
            "url": "https://campusbites.com",
            "description": "Pre-order food from your favorite campus canteens. Fast, reliable delivery for college students with exclusive deals and loyalty rewards.",
            "applicationCategory": "FoodOrderingApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "screenshot": "https://campusbites.com/images/app-screenshot.jpg",
            "softwareVersion": "1.0.0",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "250"
            }
          })}
        </Script>
      </body>
    </html>
  );
}
