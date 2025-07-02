import { Button } from "~/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { DiagonalDivider } from "./diagonal-divider";
import getHeroSection, { getHeroSectionDraft } from "~/data-access/hero";
import React from "react";
import { cn } from "~/lib/utils";
import getSettings from "~/data-access/settings";
import Link from "next/link";
import FloatingBlobs from "./floating-blobs";
import HeroCenter from "./hero-center";

function convertTextToJSX(
  text: string,
  customClass: string,
): React.ReactElement {
  // Split the text by asterisks, keeping the delimiters
  const parts = text.split(/(\*[^*]+\*)/);

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part is wrapped in asterisks
        if (part.startsWith("*") && part.endsWith("*")) {
          // Remove the asterisks and wrap in styled span
          const content = part.slice(1, -1);
          return (
            <span key={index} className={cn(customClass)}>
              {content}
            </span>
          );
        }
        // Return regular text as-is
        return part;
      })}
    </>
  );
}

export default async function Hero({ d }: { d: boolean }) {
  const config = d ? await getHeroSectionDraft() : await getHeroSection();
  const settings = await getSettings();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#000] via-[#111112] to-red-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.3),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 h-full w-full">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.05)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      {/* Animated Floating Blobs (client) */}
      <FloatingBlobs />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {/* Animated center content (client) */}
        <HeroCenter config={config} settings={settings} />
      </div>

      {/* Diagonal Divider */}
      <DiagonalDivider
        direction="right"
        color="#f9fafb"
        className="absolute right-0 bottom-0 left-0 h-24"
      />
    </section>
  );
}
