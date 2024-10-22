import "@stream-io/video-react-sdk/dist/css/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/providers/app.provider";
import StreamClientProvider from "@/providers/stream-client.provider";
import ThemeProvider from "@/providers/theme-provider";

const fontFamily = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BK Sharing",
  description: "Generated by create next app",
  icons: {
    icon: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontFamily.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <StreamClientProvider>{children}</StreamClientProvider>
          </AppProvider>
          <Toaster />
        </ThemeProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}
