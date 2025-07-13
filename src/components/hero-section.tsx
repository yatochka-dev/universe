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
import BackgroundPattern from "~/components/bg-pattern";

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
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <BackgroundPattern />

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
