"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SplitText = ({ text, delay = 0, className, once = true }: { text: string, delay?: number, className?: string, once?: boolean }) => {
  const words = text.split(" ");
  return (
    <div className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em] overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once }}
            transition={{
              duration: 1.2,
              delay: delay + (i * 0.05),
              ease: [0.22, 1, 0.36, 1]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export const Magnetic = ({ children, strength = 0.5, className, text }: { children: React.ReactNode, strength?: number, className?: string, text?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative z-10", className)}
      data-cursor={text}
    >
      {children}
    </motion.div>
  );
};

export const Tape = ({ className, color = "bg-accent/20" }: { className?: string, color?: string }) => (
  <div
    className={cn(
      "absolute h-10 backdrop-blur-[1px] border border-black/5 shadow-sm z-20 tape",
      color,
      className
    )}
  />
);

export const FloatingPaper = ({ children, className, rotation = 0, delay = 0 }: { children: React.ReactNode, className?: string, rotation?: number, delay?: number }) => (
  <motion.div
    initial={{ y: 50, opacity: 0, rotate: rotation - 5 }}
    whileInView={{ y: 0, opacity: 1, rotate: rotation }}
    viewport={{ once: true }}
    animate={{
      y: [0, -20, 0],
      rotate: [rotation, rotation + 3, rotation]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }}
    className={cn("bg-white p-6 shadow-high border border-black/5 hover:scale-105 transition-transform duration-1000 cursor-default px-8 py-10", className)}
  >
    {children}
  </motion.div>
);
