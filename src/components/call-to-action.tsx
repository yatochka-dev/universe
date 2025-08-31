import { Button } from "~/components/ui/button";
import {
  MessageCircle,
  Instagram,
  Youtube,
  Music,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import getSettings from "~/data-access/settings";
import { DynamicIcon, type IconName } from "~/app/(app)/contact/socials";
import Link from "next/link";
import React from "react";

export default async function CallToAction() {
  const settings = await getSettings();
  return (
    <section className="overflow-hidden py-32 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      <div className="absolute top-0 left-0 h-full w-full">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-dots"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute right-20 bottom-20 h-24 w-24 animate-pulse rounded-full bg-pink-300/20 blur-xl delay-1000"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-8">
          <Sparkles className="mx-auto mb-4 h-12 w-12 animate-pulse text-yellow-300" />
        </div>

        <h2 className="mb-6 text-4xl font-bold md:text-6xl">
          Ready to Launch Your <span className="text-yellow-300">Future?</span>
        </h2>

        <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-red-100 md:text-2xl">
          Join <span className="font-bold text-white">1,100+ students</span>{" "}
          from <span className="font-bold text-white">24+ countries</span> who
          are already building the future
        </p>

        <div className="mb-12">
          <Button
            size="lg"
            asChild
            className="mx-auto flex max-w-sm transform items-center rounded-full bg-white px-12 py-6 text-xl font-bold text-red-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-white/25"
          >
            <Link
              href={settings.discord_community_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Join Our Discord
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          {!!settings.socials &&
            settings.socials.map((social) => {
              if (!social.show) return null;
              return (
                <Button
                  key={social.id}
                  variant="outline"
                  className="justify-start bg-transparent hover:scale-125"
                  asChild
                >
                  <Link
                    href={social.link}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <DynamicIcon
                      name={(social.icon as IconName) ?? "MessageCircle"}
                    />
                    <span className={"sr-only"}>{social.name}</span>
                  </Link>
                </Button>
              );
            })}
        </div>
      </div>
    </section>
  );
}
