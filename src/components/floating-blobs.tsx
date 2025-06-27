"use client";
import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-pulse"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-red-400/10 rounded-full blur-2xl animate-pulse delay-1000"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.9, type: "spring" }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1, type: "spring" }}
      />
    </>
  );
}
