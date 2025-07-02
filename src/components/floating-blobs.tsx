"use client";
import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-red-500/20 blur-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
      />
      <motion.div
        className="absolute right-10 bottom-20 h-32 w-32 animate-pulse rounded-full bg-red-400/10 blur-2xl delay-1000"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.9, type: "spring" }}
      />
      <motion.div
        className="absolute top-1/2 right-20 h-16 w-16 animate-bounce rounded-full bg-white/5 blur-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1, type: "spring" }}
      />
    </>
  );
}
