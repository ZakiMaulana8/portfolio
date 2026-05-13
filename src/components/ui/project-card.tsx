"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Magnetic, Tape } from "./core-components";

interface ProjectProps {
  title: string;
  desc: string;
  img: string;
  index: number;
}

export const ProjectCardVertical = ({ title, desc, img, index }: ProjectProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex flex-col md:flex-row items-center gap-12 md:gap-32 mb-32 md:mb-64 relative",
        index % 2 !== 0 && "md:flex-row-reverse"
      )}
    >
      <div className="w-full md:w-[60%] group relative">
        <div className="aspect-[16/10] overflow-hidden relative border border-black/5 shadow-high bg-paper-dark">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            <Image 
              src={img} 
              alt={`${title} - Project Image`} 
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
          <div className="absolute top-8 right-8 mix-blend-difference text-white z-10">
            <span className="text-6xl font-serif italic opacity-40">0{index + 1}</span>
          </div>
        </div>
        <Tape className="-top-6 left-10 w-40 -rotate-3 opacity-30 bg-accent/20 z-20" />
      </div>
      
      <div className="w-full md:w-[40%] space-y-10 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Artifact {index + 1}</span>
          </div>
          <h3 className="text-5xl md:text-[6vw] font-black uppercase tracking-tighter leading-[0.8] font-serif italic">
            {title}
          </h3>
        </div>
        <p className="text-2xl md:text-3xl font-script opacity-60 leading-tight italic border-l-4 border-accent/10 pl-10">
          &ldquo;{desc}&rdquo;
        </p>
        <div className="pt-8">
           <Magnetic strength={0.3} text="VIEW PROJECT">
              <button className="px-10 py-5 border border-black/10 hover:bg-primary hover:text-white transition-all duration-700 font-black uppercase tracking-[0.4em] text-[9px]">
                 Explore Archive
              </button>
           </Magnetic>
        </div>
      </div>
    </motion.div>
  );
};
