"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-2xl"
        >
          .
        </motion.span>
      ))}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
        >
          <Image
            src="/justa-kun-dot.png"
            alt="Justa-kun dot version"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 300px, 400px"
            priority
          />
        </motion.div>
        <div className="mt-8 text-2xl font-medium flex items-center">
          Coming soon
          <LoadingDots />
        </div>
      </div>
    </div>
  );
}
