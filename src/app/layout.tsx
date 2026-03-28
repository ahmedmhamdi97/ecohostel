import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { RegisterSW } from "@/components/RegisterSW";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "Hostel Volunteer Manual",
  description: "Operational guide for hostel volunteers",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hostel Hub",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#18181b",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <SplashScreen />
        <RegisterSW />
        <main className="min-h-screen pb-safe">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
