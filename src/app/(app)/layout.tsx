import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/app/(app)/providers";
import React, { Suspense } from "react";
import BackgroundPattern from "~/components/bg-pattern";
import FloatingBlobs from "~/components/floating-blobs";
import { Header } from "~/app/(app)/header";
import getSettings from "~/data-access/settings";
import { Footer } from "~/app/(app)/footer";

export const metadata: Metadata = {
  title: "MindBridge",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body>
        <Suspense>
          <Header {...settings} />
          <div className={"universe-background"}>
            <BackgroundPattern />
            <FloatingBlobs />

            <main className={"z-10"}>
              <Providers>{children}</Providers>
            </main>
          </div>
          <Footer {...settings} />
        </Suspense>
      </body>
    </html>
  );
}
