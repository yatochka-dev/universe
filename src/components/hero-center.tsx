"use client";

import { motion, type Variant, type Variants } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import React from "react";
import type { HeroSection, Setting } from "../../payload-types";

interface Props {
  config: HeroSection;
  settings: Setting;
}

/* Utility to convert *highlighted* text into JSX */
function convertTextToJSX(text: string, customClass: string) {
  const parts = text.split(/(\*[^*]+\*)/);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={idx} className={cn(customClass)}>
              {part.slice(1, -1)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
} satisfies Variants;

export default function HeroCenter({ config, settings }: Props) {
  return (
    <motion.div
      className="text-center"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div className="mb-8" variants={item}>
        <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-200 backdrop-blur-sm">
          {config.topBadge.emoji}&nbsp;{config.topBadge.text}
        </span>
      </motion.div>

      <motion.h1
        className="mb-8 text-5xl leading-tight font-bold md:text-7xl lg:text-8xl"
        variants={item}
      >
        <span className="bg-gradient-to-r from-white via-gray-100 to-red-200 bg-clip-text text-transparent">
          {config.main.title}
        </span>
        <br />
        <span className="text-3xl font-light text-gray-300 md:text-4xl lg:text-5xl">
          {convertTextToJSX(config.main.subtitle, "text-red-400 font-semibold")}
        </span>
      </motion.h1>

      <motion.p
        className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-300 md:text-2xl"
        variants={item}
      >
        {convertTextToJSX(config.main.paragraph, "text-red-300 font-medium")}
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        variants={item}
      >
        <Button
          asChild
          size="lg"
          className="transform rounded-full bg-gradient-to-r from-red-600 to-red-700 px-10 py-6 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-red-800 hover:shadow-red-500/25"
        >
          <Link
            href={settings.discord_community_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Our Community
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </Button>

        {config.video_button.show && !!config.video_button.url && (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-2 border-white/30 bg-transparent px-10 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
          >
            <Link
              href={config.video_button.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="mr-3 h-5 w-5" />
              {config.video_button.text}
            </Link>
          </Button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3"
        variants={container}
      >
        {config.stats.map((stat) => (
          <motion.div key={stat.id} className="text-center" variants={item}>
            <div className="mb-2 text-4xl font-bold text-white">
              {stat.value_number}
              {!stat.isExact && "+"}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
