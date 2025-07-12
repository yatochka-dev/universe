import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/app/(app)/providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MindBridge",
  icons: {
    icon: "/favicon.ico",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense>
      <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </Suspense>
  );
}
