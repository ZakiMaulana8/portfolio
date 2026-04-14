"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import { 
  Sparkles, 
  PenTool, 
  ChevronDown, 
  Heart, 
  Mail, 
  Camera,
  Globe,
  Share2,
  Code,
  Zap,
  Layers,
  MessageCircle,
  Briefcase,
  Rocket,
  Coffee,
  ArrowUpRight,
  Fingerprint
} from "lucide-react";


import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Visual components
const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) => {
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

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <div className={cn("mask-reveal", className)}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const CuteFlower = ({ className, rotationBase = 0, delay = 0 }: { className?: string, rotationBase?: number, delay?: number }) => (
  <motion.svg 
    animate={{ 
      rotate: [rotationBase - 12, rotationBase + 12, rotationBase - 12],
      scale: [1, 1.05, 1] 
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    className={cn("drop-shadow-2xl pointer-events-none filter sepia-[0.2]", className)} 
    viewBox="0 0 100 100" 
    fill="none" 
  >
    <circle cx="50" cy="20" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="80" cy="50" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="50" cy="80" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="20" cy="50" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="28" cy="28" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="72" cy="28" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="72" cy="72" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    <circle cx="28" cy="72" r="18" className="fill-accent/20 stroke-accent/40" strokeWidth="1" />
    
    <circle cx="50" cy="50" r="15" className="fill-accent/40 stroke-accent" strokeWidth="1" />
  </motion.svg>
);

const Tape = ({ className, color = "bg-accent/20" }: { className?: string, color?: string }) => (
  <div 
    className={cn(
      "absolute h-10 backdrop-blur-[1px] border border-black/5 shadow-sm z-20 tape",
      color,
      className
    )} 
  />
);

const ProjectCard = ({ title, desc, img, rotation = 0, index }: { title: string, desc: string, img: string, rotation?: number, index: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group cursor-pointer w-full"
    >
      <div className="bg-white p-5 pb-16 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.03)] group-hover:shadow-[40px_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 ease-out perspective-1000">
        <div className="aspect-[4/5] bg-paper-dark overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
          <motion.img 
            style={{ y, scale: 1.35 }}
            src={img} 
            alt={title} 
            className="w-full h-full object-cover sepia-filter group-hover:sepia-0 group-hover:scale-[1.2] transition-all duration-[2s] ease-out shrink-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-5 right-5 w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="mt-10 px-2">
          <div className="flex items-center gap-3 mb-3">
             <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-accent">0{index + 1}</span>
             <div className="h-[1px] w-8 bg-accent/20" />
          </div>
          <h3 className="text-4xl font-bold font-serif uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-500">{title}</h3>
          <p className="text-xl opacity-60 font-script leading-snug max-w-[80%]">{desc}</p>
        </div>
      </div>
      <Tape className="-top-4 left-10 w-28 -rotate-6 opacity-60" />
      <Tape className="-bottom-2 right-12 w-24 rotate-3 opacity-40 bg-accent/30" />
    </motion.div>
  );
};

const ToolSticker = ({ label, icon: Icon, delay = 0, color = "bg-white" }: { label: string, icon: any, delay?: number, color?: string }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    setRotation(Math.random() * 20 - 10);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
      className={cn(
        "px-6 py-3 border border-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.03)] flex items-center gap-3 cursor-default transition-all hover:shadow-xl",
        color
      )}
    >
      <Icon size={18} className="text-primary/60" />
      <span className="text-lg font-bold uppercase font-sans tracking-[0.15em]">{label}</span>
    </motion.div>
  );
};

const Polaroid = ({ img, caption, rotation = 0 }: { img: string, caption: string, rotation?: number }) => (
  <motion.div
    whileHover={{ 
      scale: 1.05, 
      rotate: rotation / 2, 
      zIndex: 10,
      boxShadow: "40px 40px 100px rgba(0,0,0,0.15)"
    }}
    initial={{ opacity: 0, scale: 0.9, rotate: rotation }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    className={cn(
      "bg-white p-4 pb-12 border border-black/5 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] transition-all break-inside-avoid relative",
      rotation > 0 ? "rotate-2" : "-rotate-2"
    )}
  >
    <div className="aspect-square bg-paper-dark overflow-hidden mb-5 relative group">
      <img src={img} alt={caption} className="w-full h-full object-cover sepia-filter group-hover:sepia-0 grayscale-[0.3] group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000" />
      <div className="absolute inset-0 border-[8px] border-white/20 pointer-events-none" />
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
    </div>
    <p className="text-2xl font-script text-center font-bold tracking-tight text-primary/80">{caption}</p>
    <Tape className="-top-4 left-1/2 -translate-x-1/2 w-20 rotate-1 opacity-60 bg-accent/10" />
  </motion.div>
);

const TrackItem = ({ title, artist, time }: { title: string, artist: string, time: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer hover:bg-white/5 px-4 transition-all rounded-sm">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
        <Zap size={16} className="group-hover:animate-bounce" />
      </div>
      <div>
        <h4 className="text-xl font-bold font-serif uppercase tracking-tight leading-none mb-1">{title}</h4>
        <p className="text-lg font-script opacity-40 leading-none">{artist}</p>
      </div>
    </div>
    <span className="text-base font-sans opacity-20 group-hover:opacity-100 transition-opacity italic">{time}</span>
  </div>
);

const TestimonialNote = ({ text, author, rotation = 0, color = "bg-paper" }: { text: string, author: string, rotation?: number, color?: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    initial={{ rotate: rotation, opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "p-8 border border-black/5 shadow-[20px_20px_50px_rgba(0,0,0,0.03)] relative max-w-[320px] transition-all",
      color
    )}
  >
    <div className="flex justify-between items-start mb-6">
      <MessageCircle size={24} className="text-accent/30" />
      <div className="w-3 h-3 rounded-full bg-accent/10" />
    </div>
    <p className="text-2xl font-script italic leading-snug mb-8 text-primary/80">"{text}"</p>
    <div className="border-t border-black/5 pt-4">
      <p className="text-lg font-bold font-sans uppercase tracking-[0.2em] text-accent">- {author}</p>
    </div>
    <Tape className="-top-4 left-1/4 w-20 rotate-12 opacity-80" />
  </motion.div>
);

const TimelineItem = ({ year, title, company, desc, side = "left" }: { year: string, title: string, company: string, desc: string, side?: "left" | "right" }) => (
  <div className={cn(
    "flex w-full mb-20 items-center justify-between",
    side === "right" ? "flex-row-reverse" : "flex-row"
  )}>
    <div className="hidden md:block w-5/12" />
    <div className="z-20 flex items-center order-1 bg-accent border border-black/5 shadow-xl w-14 h-14 rounded-full relative group hover:scale-110 transition-transform">
      <h1 className="mx-auto font-bold text-xl font-sans text-paper">{year}</h1>
      <div className="absolute -top-2 -right-2 group-hover:block hidden">
        <Sparkles size={18} className="text-primary" />
      </div>
    </div>
    <motion.div 
      initial={{ x: side === "left" ? -40 : 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={cn(
        "order-1 bg-white p-8 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.02)] w-full md:w-5/12 relative group",
        side === "right" ? "rotate-[1deg]" : "-rotate-[1deg]"
      )}
    >
      <h3 className="mb-2 font-bold font-serif text-primary text-3xl uppercase tracking-tight leading-none group-hover:text-accent transition-colors">{title}</h3>
      <h4 className="mb-6 font-bold font-script text-accent text-2xl italic">{company}</h4>
      <p className="text-xl font-script leading-relaxed opacity-70">{desc}</p>
      <Tape className={cn("-top-4 w-28", side === "left" ? "-right-8 rotate-12 bg-accent/10" : "-left-8 -rotate-12 bg-accent/10")} />
    </motion.div>
  </div>
);

const ProcessCard = ({ number, title, desc, icon: Icon, rotation = 0 }: { number: string, title: string, desc: string, icon: any, rotation?: number }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, rotate: rotation / 2, scale: 1.02 }}
    className={cn(
      "bg-white p-10 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.02)] relative min-w-[280px] flex-1 transition-all",
      rotation > 0 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
    )}
  >
    <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent border border-black/5 flex items-center justify-center font-bold text-2xl font-sans text-paper rotate-[-5deg] shadow-lg">
      {number}
    </div>
    <div className="mb-8 text-accent group-hover:animate-pulse">
      <Icon size={40} strokeWidth={1} />
    </div>
    <h3 className="text-3xl font-bold font-serif uppercase tracking-tight mb-4">{title}</h3>
    <p className="text-xl font-script leading-relaxed opacity-60 italic">{desc}</p>
    <Tape className="-top-3 right-6 w-20 rotate-[-8deg] opacity-30 bg-accent/20" />
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, desc, price, rotation = 0 }: { icon: any, title: string, desc: string, price: string, rotation?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -12, rotate: 0, scale: 1.02 }}
    className={cn(
      "bg-white p-10 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.03)] relative flex flex-col items-center text-center group transition-all",
      rotation > 0 ? "rotate-1.5" : "-rotate-1.5"
    )}
  >
    <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform shadow-sm">
      <Icon size={32} className="text-accent" />
    </div>
    <h3 className="text-4xl font-bold font-serif uppercase tracking-tight mb-6">{title}</h3>
    <div className="w-full h-[1px] bg-black/5 mb-8" />
    <p className="text-2xl opacity-60 font-script leading-relaxed mb-10">{desc}</p>
    <div className="mt-auto pt-6 border-t border-dashed border-black/10 w-full flex items-center justify-center gap-2">
      <Sparkles size={14} className="text-accent" />
      <span className="text-xl font-bold font-sans tracking-widest text-primary/40 group-hover:text-primary transition-colors">{price}</span>
      <Sparkles size={14} className="text-accent" />
    </div>
    <Tape className="-top-3 -right-2 w-24 rotate-12 opacity-40 bg-accent/10" />
  </motion.div>
);

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [currentAboutImg, setCurrentAboutImg] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const aboutImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600"
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);

    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: true,
      smoothWheel: true,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const marqueeText = "CREATIVE CODE • BESPOKE DESIGN • BRAND NARRATIVES • INTERACTIVE SOLUTIONS • EXPERIENCE SYSTEMS • ";

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <div 
      className="min-h-screen overflow-x-hidden relative font-serif text-primary selection:bg-accent selection:text-paper"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-paper flex flex-col items-center justify-center p-10"
          >
            <div className="flex flex-col items-center gap-8">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col items-center gap-4"
               >
                  <Sparkles className="text-accent animate-spin-slow" size={40} />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.8em] text-primary/40">Portfolio Curation</span>
               </motion.div>
               <div className="w-[200px] h-[1px] bg-black/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-accent w-full"
                  />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Interactive Cursor */}
      <div 
        ref={cursorRef} 
        className={cn(
          "cursor-follow hidden md:block",
          !isHovering && "opacity-0"
        )} 
      />
      <div 
        ref={followerRef} 
        className={cn(
          "cursor-follower hidden md:block",
          !isHovering && "opacity-0"
        )} 
      />

      {/* Texture & Pattern Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] bg-noise z-[100]" />
      <div className="fixed inset-0 pointer-events-none bg-pattern z-0 opacity-50" />
      <div className="fixed inset-0 pointer-events-none bg-grain opacity-5 z-0" />

      {/* Navigation */}
      <motion.nav 
        style={{ y: useTransform(scrollY, [0, 50], [0, -100]), opacity: useTransform(scrollY, [0, 50], [1, 0]) }}
        className="fixed top-10 left-1/2 -translate-x-1/2 z-[110] w-fit px-4 py-2 bg-paper/30 backdrop-blur-xl rounded-full border border-black/5 shadow-2xl flex items-center gap-1 md:gap-4 transition-transform hover:scale-105 duration-500"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-1 border-r border-black/5 mr-2"
        >
          <span className="text-xl font-bold uppercase tracking-[0.2em] font-serif">Zaki.</span>
        </motion.div>
        
        {[
          ["About", "#about"],
          ["Work", "#projects"],
          ["Process", "#process"],
          ["Contact", "#contact"]
        ].map(([label, href]) => (
          <Magnetic key={label} strength={0.3}>
            <a 
              href={href} 
              className="px-5 py-2 rounded-full hover:bg-primary transition-all group relative overflow-hidden flex items-center justify-center min-w-[80px]"
            >
               <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] group-hover:text-paper transition-colors font-sans">
                {label}
               </span>
            </a>
          </Magnetic>
        ))}
      </motion.nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-6 pt-32 text-center relative overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 space-y-16 w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto"
            >
               <div className="inline-flex items-center gap-3 px-6 py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-16 shadow-sm rounded-full backdrop-blur-sm">
                <Sparkles size={12} />
                <span>Selected Works — Vol. 04</span>
                <Sparkles size={12} />
              </div>

              <div className="flex flex-col items-center">
                <Reveal className="block overflow-visible" delay={0.1}>
                  <h1 className="text-[14vw] md:text-[10vw] font-bold uppercase tracking-tight leading-[0.75] font-serif text-primary">
                    Sculpting
                  </h1>
                </Reveal>
                <Reveal className="block overflow-visible mt-6" delay={0.3}>
                  <h1 className="text-[14vw] md:text-[10vw] font-bold uppercase tracking-tight leading-[0.75] font-serif flex items-center justify-center gap-[4vw]">
                    <span className="text-accent italic font-script lowercase tracking-normal -mt-4">digital</span>
                    Emotions.
                  </h1>
                </Reveal>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12 text-2xl md:text-3xl font-script max-w-3xl mx-auto leading-relaxed border-t border-black/5 pt-12"
              >
                <p>Bridging the tactile warmth of high-end journals with cutting-edge <span className="text-primary font-bold">creative engineering.</span></p>
              </motion.div>
            </motion.div>

            {/* Hero Image Parallax */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotateX: 60, y: 100 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
               transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
               className="relative w-full max-w-5xl mx-auto h-[500px] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-paper-dark perspective-1000"
            >
               <motion.img 
                animate={{ scale: [1.1, 1] }}
                transition={{ duration: 4, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200" 
                className="w-full h-full object-cover filter brightness-90 grayscale-[0.2] sepia-[0.1] group-hover:scale-105 transition-transform duration-[3s]" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
               <div className="absolute bottom-12 left-12 text-left space-y-4">
                  <span className="text-paper/40 font-sans text-[10px] uppercase font-bold tracking-[0.5em] block">Inspiration — 001</span>
                  <h3 className="text-paper text-5xl font-serif italic font-light tracking-wide">The Architect's Flow.</h3>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="text-paper text-[10px] uppercase font-bold tracking-[0.4em]">View Project</span>
               </div>
               <Tape className="-top-4 right-1/4 w-32 -rotate-12 bg-paper/10" />
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mt-20 flex flex-col items-center opacity-20 text-[10px] font-bold tracking-[0.6em] uppercase"
          >
            <span>Begin the journey</span>
            <ChevronDown size={14} className="mt-4" />
          </motion.div>
        </section>

        {/* MARQUEE SECTION */}
        <div className="py-20 bg-primary overflow-hidden relative border-y border-white/5">
           <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[8vw] font-serif font-bold uppercase tracking-tighter text-paper/10 px-10">
                  {marqueeText}
                </span>
              ))}
           </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen py-48 px-6 md:px-20 max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative cursor-none group flex-1"
            onClick={() => setCurrentAboutImg((prev) => (prev + 1) % aboutImages.length)}
          >
            <div className="bg-white p-6 pb-24 shadow-[40px_40px_120px_rgba(0,0,0,0.08)] transition-all duration-700 group-hover:shadow-[60px_60px_150px_rgba(0,0,0,0.12)] -rotate-1 group-hover:rotate-0">
              <div className="aspect-[4/5] bg-paper-dark overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentAboutImg}
                    initial={{ opacity: 0, scale: 1.1, filter: "sepia(1) blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "sepia(0.2) blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "sepia(1) blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    src={aboutImages[currentAboutImg]} 
                    alt="Zaki" 
                    className="w-full h-full object-cover" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              <div className="absolute bottom-8 left-0 w-full text-center space-y-4">
                <p className="text-4xl font-bold italic font-script text-primary/30 transition-all group-hover:scale-105 group-hover:text-primary/60">"Curation is survival."</p>
                <div className="flex justify-center gap-2">
                   {aboutImages.map((_, i) => (
                     <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", i === currentAboutImg ? "bg-accent scale-150" : "bg-black/10")} />
                   ))}
                </div>
              </div>
            </div>
            <Tape className="-top-8 left-1/2 -translate-x-1/2 w-56 rotate-1 opacity-90 bg-accent/20" />
            <div className="absolute -bottom-6 -right-10 bg-primary text-paper px-8 py-4 font-bold uppercase tracking-[0.4em] text-[10px] hidden xl:block rotate-6 shadow-2xl font-sans group-hover:rotate-0 transition-transform">
              Tap to explore
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 space-y-16"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-accent" />
                 <span className="font-sans font-bold uppercase tracking-[0.6em] text-[10px] text-accent">Manifesto</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tight leading-[0.8] font-serif">
                Intentional <br />
                <span className="highlight italic font-script lowercase tracking-normal text-6xl md:text-8xl">by design.</span>
              </h2>
            </div>
            <div className="text-3xl md:text-4xl font-script space-y-10 leading-relaxed text-primary/80">
              <p>
                I believe that digital interfaces should be as visceral as a physical object. My process is a meticulous distillation of <span className="text-accent underline decoration-accent/20 underline-offset-8">raw chaos</span> into structured beauty.
              </p>
              <p>
                Every pixel I place carries a weight. I don't build tools; I engineer <span className="highlight font-sans text-xs tracking-[0.5em] font-bold uppercase px-4 py-1.5">Atmospheres</span> that resonate with the human pulse.
              </p>
            </div>
            <div className="pt-10 flex gap-12 opacity-30 hover:opacity-100 transition-all duration-700">
              <Magnetic strength={0.4}><Heart className="hover:text-red-700 hover:fill-red-700 cursor-pointer transition-colors" size={32} strokeWidth={1} /></Magnetic>
              <Magnetic strength={0.4}><Camera size={32} strokeWidth={1} className="cursor-pointer" /></Magnetic>
              <div className="w-16 h-[1px] bg-primary/20 self-center" />
              <Magnetic strength={0.4}><Fingerprint size={32} strokeWidth={1} className="text-accent cursor-pointer" /></Magnetic>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-48 px-6 md:px-20 bg-paper-dark/20 relative">
          <div className="max-w-8xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
               <div className="space-y-8">
                  <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">Artifacts — 2026 Edition</span>
                  <h2 className="text-8xl md:text-[11vw] font-bold uppercase tracking-tight leading-[0.75] font-serif">
                    The <br />
                    <span className="text-accent italic font-script lowercase tracking-tighter">exhibition.</span>
                  </h2>
               </div>
              <div className="max-w-sm space-y-6 pb-4">
                <p className="text-3xl font-script opacity-50 leading-relaxed italic border-l-2 border-accent/20 pl-8">"A curation of projects developed with technical precision and emotional resonance."</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-48 items-start">
              <ProjectCard 
                index={0}
                title="Aura Engine" 
                desc="Real-time fluid simulation for reactive web environments." 
                img="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000" 
                rotation={-1}
              />
              <div className="lg:mt-64">
                <ProjectCard 
                  index={1}
                  title="Nexus Proto" 
                  desc="A decentralized operating layer for independent storytellers." 
                  img="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000" 
                  rotation={2}
                />
              </div>
              <ProjectCard 
                index={2}
                title="Velvet OS" 
                desc="Exploring the tactile boundaries of glassmorphism in UI." 
                img="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000"
                rotation={-2} 
              />
              <div className="lg:mt-64">
                <ProjectCard 
                  index={3}
                  title="Echo Grid" 
                  desc="Algorithmic music visualizer bridging sound and geometry." 
                  img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000"
                  rotation={1} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section id="journey" className="py-48 px-6 md:px-20 relative bg-[#fffdf5]">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-40 space-y-8">
                <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">Temporal Records</span>
                <h2 className="text-8xl md:text-[8vw] font-bold uppercase tracking-tight relative z-10 font-serif">Chronology.</h2>
             </div>
            
            <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
              <div className="absolute border-opacity-5 border-primary h-full border-2 left-1/2 -translate-x-1/2 hidden md:block border-dashed" />
              
              <TimelineItem 
                year="2026" 
                title="Principal Creative" 
                company="Hyperion" 
                desc="Leading a team of explorers in the realm of high-fidelity spatial computing." 
                side="left"
              />
              <TimelineItem 
                year="2024" 
                title="Design Engineer" 
                company="Void" 
                desc="Crafting modular design systems for the next generation of web infrastructure." 
                side="right"
              />
              <TimelineItem 
                year="2022" 
                title="Creative Coder" 
                company="Self-Driven" 
                desc="Obsessive experimentation with GLSL, React, and the boundaries of interaction." 
                side="left"
              />
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-48 px-6 md:px-20 bg-paper-dark/30 overflow-hidden">
          <div className="max-w-8xl mx-auto">
             <div className="flex flex-col lg:flex-row items-center justify-between mb-48 gap-24">
                <div className="space-y-8 flex-1">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-[1px] bg-accent" />
                      <span className="font-sans font-bold uppercase tracking-[0.6em] text-[10px] text-accent">Methodology</span>
                   </div>
                    <h2 className="text-8xl md:text-[10vw] font-bold uppercase tracking-tight leading-[0.75] font-serif">
                      The <br />
                      <span className="highlight italic font-script lowercase tracking-normal text-7vw">distillation</span> <br/> 
                      process.
                    </h2>
                </div>
                <div className="bg-white p-12 border border-black/5 rotate-3 max-w-md shadow-2xl font-script text-3xl leading-relaxed text-primary/60 relative group hover:rotate-0 transition-transform duration-700">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent flex items-center justify-center text-paper rotate-12 shadow-xl">
                    <Zap size={24} />
                  </div>
                  "To build is to remove. Perfection is reached not when there is nothing more to add, but nothing left to take away."
                  <div className="mt-8 flex justify-end">
                     <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] opacity-40">— Principles Vol. 02</span>
                  </div>
                </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                <ProcessCard 
                  number="01" 
                  title="Observe" 
                  desc="Absorbing the requirements and capturing the invisible essence of the goal." 
                  icon={PenTool}
                  rotation={-2}
                />
                <ProcessCard 
                  number="02" 
                  title="Define" 
                  desc="Establishing the core primitives and the emotional vocabulary of the project." 
                  icon={Layers}
                  rotation={1}
                />
                <ProcessCard 
                  number="03" 
                  title="Forge" 
                  desc="Bridging high-end design with technical implementation using surgical code." 
                  icon={Code}
                  rotation={-1.5}
                />
                <ProcessCard 
                  number="04" 
                  title="Resonate" 
                  desc="Fine-tuning interactions until the experience feels alive and responsive." 
                  icon={Sparkles}
                  rotation={2}
                />
             </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-48 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-8xl mx-auto">
             <div className="text-center mb-40 space-y-8">
                <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] text-accent">Availability — Q3 2026</span>
                <h2 className="text-8xl md:text-[9vw] font-bold uppercase tracking-tight mt-4 leading-none font-serif text-primary">Let's Build.</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                <ServiceCard 
                  icon={Globe} 
                  title="Architecture" 
                  desc="Structural engineering of high-performance digital platforms using Next.js." 
                  price="Full Engagement"
                  rotation={-1}
                />
                <ServiceCard 
                  icon={Zap} 
                  title="Interaction" 
                  desc="Adding soul to existing products through bespoke motion and creative code." 
                  price="Weekly Sprints"
                  rotation={0.5}
                />
                <ServiceCard 
                  icon={Briefcase} 
                  title="Strategize" 
                  desc="Deep-dive consulting on design systems, visual identity, and technical feasibility." 
                  price="Daily Strategy"
                  rotation={-1.5}
                />
             </div>
          </div>
        </section>

        {/* SCRAPBOOK SECTION */}
        <section id="bits" className="py-48 px-6 md:px-20 relative overflow-hidden bg-paper-dark/10">
          <div className="max-w-8xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-40 gap-12">
               <div className="space-y-6">
                 <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40 text-center md:text-left block">The Vault</span>
                 <h2 className="text-8xl md:text-[8vw] font-bold uppercase tracking-tight leading-none font-serif text-center md:text-left">
                   Visual <br />
                   <span className="text-accent italic font-script lowercase tracking-tighter">ephemera.</span>
                 </h2>
               </div>
              <div className="bg-primary text-paper px-10 py-5 -rotate-2 shadow-2xl font-sans text-[10px] font-bold uppercase tracking-[0.6em] transition-transform hover:rotate-0 duration-500">
                Archived Bits — 002.
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-12 space-y-12">
              <Polaroid img="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600" caption="Morning Light" rotation={-3} />
              <Polaroid img="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=600" caption="Studio Grind" rotation={2} />
              <Polaroid img="https://images.unsplash.com/photo-1463919107954-463287661159?q=80&w=600" caption="Analog Setup" rotation={-2} />
              <Polaroid img="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600" caption="Grid Dreams" rotation={4} />
              <Polaroid img="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600" caption="Deep Focus" rotation={-2} />
              <Polaroid img="https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?q=80&w=600" caption="Routine Flow" rotation={2} />
              <Polaroid img="https://images.unsplash.com/photo-1454165833222-3870d516b421?q=80&w=600" caption="Strategy Session" rotation={-5} />
              <Polaroid img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" caption="Digital Pulse" rotation={3} />
            </div>
          </div>
        </section>

        {/* VIBE SECTION */}
        <section id="vibe" className="py-48 px-6 md:px-20 bg-primary text-paper overflow-hidden relative">
          <div className="absolute inset-0 opacity-5 blur-[120px] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent rounded-full animate-pulse" />
          </div>

          <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-32 items-center relative z-10">
            <div className="flex-1 space-y-12 text-center lg:text-left">
              <div className="inline-block px-6 py-2 bg-accent text-paper font-bold uppercase tracking-[0.5em] text-[10px] mb-6 rounded-full font-sans">
                Now Resonating
              </div>
              <h2 className="text-8xl md:text-[9vw] font-bold uppercase tracking-tight leading-none mb-10 font-serif">Sound <br /><span className="italic font-script lowercase tracking-normal text-accent">architecture.</span></h2>
              <p className="text-3xl md:text-4xl font-script opacity-40 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The auditory landscapes that fuel my technical explorations. Music is half the code.
              </p>
            </div>
            
            <div className="w-full lg:w-[700px]">
              <div className="bg-white/5 backdrop-blur-3xl p-12 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative rotate-1 group hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center justify-between mb-16 pb-8 border-b border-white/10">
                   <div className="flex items-center gap-6">
                      <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                      <h3 className="text-3xl font-bold uppercase tracking-[0.3em] font-serif">Late Night Radio</h3>
                   </div>
                  <Zap className="text-accent" size={24} />
                </div>
                <div className="space-y-4">
                  <TrackItem title="Digital Bloom" artist="Substrata" time="04:12" />
                  <TrackItem title="Neural Path" artist="Aether" time="03:58" />
                  <TrackItem title="Obsidian" artist="Koda" time="05:21" />
                  <TrackItem title="The Grid" artist="Daft Punk" time="02:30" />
                </div>
                <Tape className="-bottom-5 left-16 w-40 rotate-2 bg-accent/40" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen py-48 px-6 flex items-center justify-center overflow-hidden bg-paper relative">
          {/* Large Floating Text */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.02] pointer-events-none -rotate-12 select-none">
             <span className="text-[30vw] font-serif font-bold uppercase tracking-tighter">LET'S CONNECT</span>
          </div>

          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-6xl w-full relative text-center"
          >
            <div className="space-y-20">
               <div className="space-y-6">
                  <span className="font-sans font-bold uppercase tracking-[0.6em] text-[10px] opacity-40">Start Here</span>
                  <h2 className="text-[14vw] md:text-[12vw] font-bold uppercase tracking-tight leading-[0.7] font-serif">
                    Initiate <br />
                    <span className="text-accent font-script lowercase italic tracking-normal block -mt-4 drop-shadow-sm">dialogue.</span>
                  </h2>
               </div>
               
              <p className="text-3xl md:text-5xl font-script opacity-40 max-w-3xl mx-auto leading-relaxed italic">
                Looking for a creative engineer to bring your project to life? Let's bridge the gap.
              </p>
              
              <div className="flex flex-col items-center gap-16 pt-12">
                <Magnetic strength={0.3}>
                  <a 
                    href="mailto:hello@zaki.dev" 
                    className="group relative inline-flex flex-col items-center gap-4 py-8 px-12 border border-black/5 hover:border-accent transition-all duration-700 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl"
                  >
                    <span className="text-xs font-sans font-bold uppercase tracking-[0.4em] opacity-40 group-hover:text-accent transition-colors">Send a Transmission</span>
                    <span className="text-5xl md:text-7xl font-bold uppercase tracking-tight font-serif group-hover:text-accent transition-colors">hello@zaki.dev</span>
                    <div className="h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-1000 ease-out" />
                  </a>
                </Magnetic>
                
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 pt-12">
                  {["Github", "Dribbble", "LinkedIn", "Instagram"].map(label => (
                    <Magnetic key={label} strength={0.4}>
                      <a href="#" className="flex flex-col items-center group">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] group-hover:text-accent transition-colors font-sans">{label}</span>
                        <ArrowUpRight size={14} className="mt-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-64 pt-24 border-t border-black/10 flex flex-col items-center gap-10">
               <div className="font-script text-4xl opacity-30 italic">ZAKI STUDIOS &copy; 2026</div>
               <div className="flex items-center gap-8">
                  <div className="w-20 h-[1px] bg-primary/10" />
                  <Sparkles className="text-accent/40" size={18} />
                  <div className="w-20 h-[1px] bg-primary/10" />
               </div>
               <div className="text-[8px] font-sans font-bold uppercase tracking-[1em] opacity-20">All Rights Reserved — Curated with Intent</div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-12 left-12 opacity-[0.03] pointer-events-none hidden 2xl:block"
      >
        <PenTool size={400} strokeWidth={0.2} />
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-24 right-12 opacity-[0.03] pointer-events-none hidden 2xl:block"
      >
        <Fingerprint size={350} strokeWidth={0.2} className="text-accent" />
      </motion.div>
    </div>
  );
}
