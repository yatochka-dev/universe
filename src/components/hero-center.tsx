"use client";

import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import React from "react";
import type {HeroSection, Setting} from "../../payload-types";

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
};

export default function HeroCenter({ config, settings }: Props) {
  return (
    <motion.div className="text-center" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
        <motion.div className="mb-8" variants={item}>
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-200 border border-red-500/30 backdrop-blur-sm">
          {config.topBadge.emoji}&nbsp;{config.topBadge.text}
        </span>
      </motion.div>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
      <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight" variants={item}>
        <span className="bg-gradient-to-r from-white via-gray-100 to-red-200 bg-clip-text text-transparent">
          {config.main.title}
        </span>
        <br />
        <span className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-300">
          {convertTextToJSX(config.main.subtitle, "text-red-400 font-semibold")}
        </span>
      </motion.h1>

        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
      <motion.p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed" variants={item}>
        {convertTextToJSX(config.main.paragraph, "text-red-300 font-medium")}
      </motion.p>

        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
      <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" variants={item}>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
        >
          <Link href={settings.discord_community_url} target="_blank" rel="noopener noreferrer">
            Join Our Community
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </Button>

        {config.video_button.show && !!config.video_button.url && (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
          >
            <Link href={config.video_button.url} target="_blank" rel="noopener noreferrer">
              <Play className="mr-3 h-5 w-5" />
              {config.video_button.text}
            </Link>
          </Button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto" variants={container}>
        {config.stats.map((stat) => (
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
         <motion.div key={stat.id} className="text-center" variants={item}>
            <div className="text-4xl font-bold text-white mb-2">
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
