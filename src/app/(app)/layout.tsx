import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/app/(app)/providers";
import React, { Suspense } from "react";
import BackgroundPattern from "~/components/bg-pattern";
import FloatingBlobs from "~/components/floating-blobs";

export const metadata: Metadata = {
  title: "MindBridge",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense>
      <div className={"universe-background"}>
        <BackgroundPattern />
        <FloatingBlobs />

        <main className={"z-10"}>
          <Providers>{children}</Providers>
        </main>
      </div>
    </Suspense>
  );
}
