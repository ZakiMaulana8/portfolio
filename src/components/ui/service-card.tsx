"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  price: string;
  index: number;
}

export const ServiceCardPremium = ({ icon: Icon, title, desc, price, index }: ServiceProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white p-12 border border-black/5 hover:border-accent/30 transition-all duration-700 hover:shadow-high cursor-default overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-16">
          <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-700 group-hover:scale-110">
            <Icon size={24} strokeWidth={1} />
          </div>
          <div className="text-right">
            <span className="text-6xl font-serif text-black/5 group-hover:text-accent/10 transition-colors duration-700 select-none block leading-none">0{index + 1}</span>
          </div>
        </div>
        <h3 className="text-4xl font-black font-serif uppercase tracking-tight mb-6 leading-none group-hover:translate-x-2 transition-transform duration-700">{title}</h3>
        <p className="text-2xl font-script opacity-60 leading-tight mb-12 italic group-hover:opacity-100 transition-opacity duration-700 border-l-2 border-accent/10 pl-6">{desc}</p>
        <div className="flex items-center justify-between border-t border-black/5 pt-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] opacity-30">Starting</span>
          </div>
          <span className="text-2xl font-black font-sans tracking-tight text-accent">{price}</span>
        </div>
      </div>
    </motion.div>
  );
};
