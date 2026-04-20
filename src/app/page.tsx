"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useVelocity } from "framer-motion";
import Lenis from "lenis";
import { 
  Sparkles, 
  PenTool, 
  ChevronDown, 
  Camera,
  Globe,
  Code,
  Zap,
  Fingerprint,
  ArrowRight,
  Maximize2
} from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- PREMIUM COMPONENTS ---

const SplitText = ({ text, delay = 0, className, once = true }: { text: string, delay?: number, className?: string, once?: boolean }) => {
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

const Magnetic = ({ children, strength = 0.5, className, text }: { children: React.ReactNode, strength?: number, className?: string, text?: string }) => {
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

const Tape = ({ className, color = "bg-accent/20" }: { className?: string, color?: string }) => (
  <div 
    className={cn(
      "absolute h-10 backdrop-blur-[1px] border border-black/5 shadow-sm z-20 tape",
      color,
      className
    )} 
  />
);

const ProjectCardHorizontal = ({ title, desc, img, index, scrollYProgress }: { title: string, desc: string, img: string, index: number, scrollYProgress: any }) => {
  const isSelected = useTransform(scrollYProgress, 
    [index * 0.2, (index + 0.5) * 0.2, (index + 1) * 0.2], 
    [0.85, 1.05, 0.85]
  );
  
  const cardScale = useSpring(isSelected, { stiffness: 100, damping: 20 });
  const cardRotation = useTransform(scrollYProgress, 
    [index * 0.2, (index + 1) * 0.2], 
    [2, -2]
  );

  return (
    <motion.div 
      style={{ scale: cardScale, rotate: cardRotation }}
      className="relative group cursor-none w-[40vw] min-w-[550px] flex-shrink-0"
      data-cursor="EXPLORE"
    >
      <div className="bg-white p-10 pb-36 border border-black/5 shadow-high group-hover:shadow-[60px_60px_180px_rgba(0,0,0,0.15)] transition-all duration-1000 ease-[0.16,1,0.3,1] group-hover:-translate-y-12 overflow-hidden perspective-1000">
        <div className="aspect-[16/10] bg-paper-dark overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src={img} 
            alt={title} 
            className="w-full h-full object-cover sepia-filter group-hover:sepia-0 transition-all duration-[4s]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 hover:bg-accent hover:text-paper cursor-pointer">
             <Maximize2 size={20} />
          </div>
        </div>
        <div className="mt-20 px-8 relative">
          <div className="flex items-center gap-6 mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
             <span className="text-[12px] font-sans font-black uppercase tracking-[0.6em] text-accent">Artifact—No.0{index + 1}</span>
             <div className="h-[1px] flex-1 bg-accent/20" />
          </div>
          <h3 className="text-7xl font-bold font-serif uppercase tracking-[calc(-0.04em)] mb-8 group-hover:text-accent transition-colors duration-700 leading-none">
            {title}
          </h3>
          <p className="text-3xl font-script opacity-60 leading-relaxed transform group-hover:translate-x-8 transition-transform duration-1000 italic pr-20">{desc}</p>
        </div>
      </div>
      <Tape className="-top-8 left-20 w-48 -rotate-3 opacity-80 bg-accent/10" />
      <Tape className="-bottom-6 right-24 w-40 rotate-6 opacity-60 bg-accent/40" />
      
      <span className="absolute -top-12 -right-12 text-[15vw] font-black text-primary/5 select-none pointer-events-none group-hover:text-accent/10 transition-colors duration-1000">
        0{index + 1}
      </span>
    </motion.div>
  );
};

const FloatingPaper = ({ children, className, rotation = 0, delay = 0 }: { children: React.ReactNode, className?: string, rotation?: number, delay?: number }) => (
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

const ServiceCardPremium = ({ icon: Icon, title, desc, price, index }: { icon: any, title: string, desc: string, price: string, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white p-20 border border-black/5 hover:border-accent/60 transition-all duration-1000 hover:shadow-high cursor-default overflow-hidden"
    >
      <div className="absolute inset-0 bg-accent/[0.02] transform scale-0 group-hover:scale-100 transition-transform duration-1000 origin-bottom-right rounded-full" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-24">
          <div className="w-24 h-24 bg-accent/5 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-paper transition-all duration-1000 group-hover:scale-110 shadow-sm">
            <Icon size={40} strokeWidth={1} />
          </div>
          <div className="text-right">
            <span className="text-8xl font-serif text-black/5 group-hover:text-accent/10 transition-colors duration-1000 select-none block leading-none">0{index + 1}</span>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] opacity-20 block mt-4">Module</span>
          </div>
        </div>
        <h3 className="text-6xl font-black font-serif uppercase tracking-tight mb-10 leading-none group-hover:translate-x-4 transition-transform duration-1000">{title}</h3>
        <p className="text-4xl font-script opacity-60 leading-tight mb-20 italic group-hover:opacity-100 transition-opacity duration-1000 border-l-4 border-accent/10 pl-8">{desc}</p>
        <div className="flex items-center justify-between border-t border-black/10 pt-12">
          <div className="flex items-center gap-6">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-accent" 
            />
            <span className="text-[12px] font-sans font-black uppercase tracking-[0.8em] opacity-30">Starting from</span>
          </div>
          <span className="text-3xl font-black font-sans tracking-tight text-accent group-hover:scale-110 transition-transform duration-700">{price}</span>
        </div>
        <Tape className="-top-4 -right-12 w-48 rotate-12 opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>
    </motion.div>
  );
};

// --- HORIZONTAL SECTION COMPONENT ---

const HorizontalExhibition = ({ projects }: { projects: any[] }) => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  
  const skew = useTransform(smoothVelocity, [-1, 1], [-5, 5]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);

  return (
    <section id="work" ref={horizontalRef} className="relative h-[600vh] bg-paper-dark/20">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
         <div className="absolute top-[15%] left-[5%] opacity-[0.03] select-none pointer-events-none">
            <span className="text-[30vw] font-black uppercase tracking-tighter">WORKS</span>
         </div>

         <motion.div style={{ x, skewX: skew }} className="flex gap-[15vw] px-[15vw] items-center">
            <div className="w-[40vw] flex-shrink-0 space-y-16">
               <div className="space-y-8">
                  <span className="text-[12px] font-sans font-black uppercase tracking-[1em] text-accent">Gallery Archive</span>
                  <h2 className="text-9xl md:text-[11vw] font-black uppercase tracking-[calc(-0.06em)] leading-[0.75]">
                    The <br /> <span className="text-accent font-script italic lowercase tracking-normal -mt-4 block">exhibition.</span>
                  </h2>
               </div>
               <p className="text-4xl font-script opacity-50 leading-relaxed italic border-l-[6px] border-accent/20 pl-16 max-w-2xl">
                  "Selected experiments in the pursuit of technical purity and visceral emotional resonance."
               </p>
               <div className="flex items-center gap-8 group cursor-pointer" data-cursor="SCROLL">
                  <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-paper transition-all duration-700">
                     <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.5em] opacity-40">Drag or Scroll to explore</span>
               </div>
            </div>
            
            {projects.map((proj, idx) => (
              <ProjectCardHorizontal key={idx} {...proj} index={idx} scrollYProgress={scrollYProgress} />
            ))}

            <div className="w-[40vw] flex-shrink-0 text-center space-y-12">
               <span className="text-[10px] font-sans font-black uppercase tracking-[0.8em] opacity-20">End of Volume 04</span>
               <h3 className="text-8xl font-serif italic text-primary/10">More to come.</h3>
               <button className="px-16 py-8 border border-black/10 hover:bg-primary hover:text-paper transition-all duration-1000 font-bold uppercase tracking-[0.4em] text-xs">
                  Request Case Studies
               </button>
            </div>
         </motion.div>

         <motion.div 
           style={{ x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) }}
           className="absolute bottom-[10%] left-0 w-full h-1 bg-black/[0.03] overflow-hidden"
         >
            <motion.div 
              style={{ x: useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]) }}
              className="w-full h-full bg-accent/20"
            />
         </motion.div>
      </div>
    </section>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const projects = [
    { title: "Aura Engine", desc: "Real-time fluid simulation for reactive web environments.", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000" },
    { title: "Nexus Proto", desc: "A decentralized operating layer for independent storytellers.", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000" },
    { title: "Velvet OS", desc: "Exploring the tactile boundaries of glassmorphism in UI.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000" },
    { title: "Echo Grid", desc: "Algorithmic music visualizer bridging sound and geometry.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000" },
    { title: "Solaris", desc: "Sustainable energy visualization and management suite.", img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1000" },
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 2400);

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.1,
      smoothWheel: true,
      touchMultiplier: 2,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const cursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setCursorType(cursorData || null);

      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#fffcf0", "#f2eee0", "#1a1510", "#f2eee0", "#fffcf0"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.5, 0.55, 1],
    ["#1a1510", "#1a1510", "#fffcf0", "#1a1510", "#1a1510"]
  );

  if (!mounted) return null;

  return (
    <motion.div 
      style={{ backgroundColor, color: textColor }}
      className="min-h-screen overflow-x-hidden relative font-serif selection:bg-accent selection:text-paper"
    >
      <div 
        ref={cursorRef} 
        className={cn(
          "cursor-follow hidden md:flex items-center justify-center",
          cursorType && "scale-[6] bg-white mix-blend-difference"
        )} 
      >
        <AnimatePresence>
          {cursorType && (
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-[2px] font-black uppercase tracking-[0.1em] text-primary text-center pointer-events-none"
            >
              {cursorType}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div ref={followerRef} className="cursor-follower hidden md:block" />

      <div className="bg-noise" />
      <div className="fixed inset-0 pointer-events-none bg-pattern z-0 opacity-40" />
      
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: mounted ? (mousePos.x - window.innerWidth / 2) * 0.1 : 0,
              y: mounted ? (mousePos.y - window.innerHeight / 2) * 0.1 : 0
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-accent/10 blur-[150px] rounded-full" 
          />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[1000] origin-left" style={{ scaleX }} />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(60px)", scale: 1.2 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[2000] bg-paper flex flex-col items-center justify-center"
          >
            <div className="relative overflow-hidden px-24 py-12">
              <motion.div
                initial={{ y: "150%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-9xl md:text-[14vw] font-serif font-black uppercase tracking-[calc(-0.08em)] flex items-center gap-12"
              >
                Curation
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-accent" size={80} />
                </motion.div>
              </motion.div>
              <div className="absolute bottom-4 left-0 w-full h-[3px] bg-black/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-accent shadow-[0_0_20px_rgba(191,149,63,0.5)]"
                />
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20 flex items-center gap-10"
            >
               <span className="text-xs font-sans font-black uppercase tracking-[1.5em]">Volume 04</span>
               <div className="w-20 h-[1px] bg-black/10" />
               <span className="text-xs font-sans font-black uppercase tracking-[1.5em]">Archive</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] p-16 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <Magnetic text="ZAK DESIGN">
             <div className="group cursor-pointer">
                <span className="text-4xl font-black uppercase tracking-tighter block leading-none">Zak Studio™</span>
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.8em] opacity-40 group-hover:opacity-100 transition-opacity">Creative Archive</span>
             </div>
          </Magnetic>
        </div>
        <div className="flex flex-col items-end gap-10 pointer-events-auto">
           {["Works", "Manifesto", "Connect"].map((item, idx) => (
             <Magnetic key={item} strength={0.4} text={item.toUpperCase()}>
               <a href={`#${item.toLowerCase()}`} className="group flex flex-col items-end">
                 <span className="text-[10px] font-sans font-black uppercase tracking-[0.6em] opacity-20 group-hover:opacity-100 transition-all duration-700">0{idx + 1}</span>
                 <span className="text-2xl font-serif font-bold uppercase tracking-tight group-hover:text-accent group-hover:translate-x-2 transition-all duration-700">
                   {item}
                 </span>
               </a>
             </Magnetic>
           ))}
        </div>
      </nav>

      <main>
        <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
          <div className="max-w-8xl mx-auto z-10 relative">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-10 px-10 py-4 border border-black/10 bg-white/50 backdrop-blur-3xl rounded-full text-[11px] font-black uppercase tracking-[0.8em] mb-32 shadow-high group hover:bg-primary hover:text-paper transition-all duration-1000 cursor-none" data-cursor="OPEN">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 bg-accent rounded-full" 
                />
                <span>Engineering Presence for 2026</span>
              </div>
              
              <h1 className="text-[16vw] md:text-[14vw] font-black uppercase leading-[0.72] tracking-[calc(-0.07em)] font-serif mb-24">
                <SplitText text="Bespoke" /> <br />
                <span className="text-accent italic font-script lowercase tracking-normal -mt-6 block transform -rotate-2">
                  <SplitText text="Reality" delay={0.6} />
                </span>
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-center gap-32 mt-48 border-t border-black/5 pt-32">
                <p className="max-w-xl text-4xl font-script opacity-60 leading-tight italic text-left border-l-8 border-accent/10 pl-16">
                  "Distilling raw human ambition into curated interactive systems. We design for the sensory memory, not just the eyes."
                </p>
                <div className="flex flex-col items-center gap-8">
                   <Magnetic strength={0.6} text="ENTER">
                     <div className="w-32 h-32 rounded-full border border-black/10 flex items-center justify-center group hover:bg-accent hover:text-paper hover:border-transparent transition-all duration-1000 cursor-pointer shadow-high bg-white/20 backdrop-blur-md">
                        <ChevronDown className="group-hover:translate-y-4 transition-transform duration-1000" size={40} strokeWidth={1} />
                     </div>
                   </Magnetic>
                   <span className="text-[11px] font-sans font-black uppercase tracking-[1em] opacity-30 animate-pulse">Begin Exhibition</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden 2xl:block opacity-60 hover:opacity-100 transition-opacity duration-1000">
            <FloatingPaper className="absolute top-[18%] left-[10%] w-80 h-[500px] -rotate-12" rotation={-12}>
               <div className="w-full h-full bg-paper-dark grayscale p-3 border border-black/5 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600" className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[5s]" />
                  <div className="absolute top-4 left-4 bg-accent text-paper text-[8px] font-black px-2 py-1 uppercase font-sans">Plate 01</div>
               </div>
               <Tape className="-top-8 left-1/2 -translate-x-1/2 w-48 rotate-3 bg-accent/30" />
            </FloatingPaper>

            <FloatingPaper className="absolute bottom-[8%] right-[8%] w-72 h-96 rotate-9" rotation={9} delay={1}>
               <div className="w-full h-full bg-paper-dark p-3 border border-black/5 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-primary text-paper p-8 font-black text-xs uppercase tracking-[0.5em] rotate-12 shadow-high border border-white/10">
                  Vol. 04 — S/S 26
               </div>
            </FloatingPaper>
            
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0]
                }}
                transition={{ 
                  duration: 10 + Math.random() * 10, 
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full pointer-events-none"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%` 
                }}
              />
            ))}
          </div>
        </section>

        <div className="py-40 bg-primary overflow-hidden relative border-y-2 border-accent/20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-[14vw] font-serif font-black uppercase text-paper/5 px-20 tracking-[calc(-0.04em)] flex items-center gap-12">
                  The Archive <Sparkles className="text-accent/20" size={120} /> Experimental Works
                </span>
              </div>
            ))}
          </div>
        </div>

        <HorizontalExhibition projects={projects} />

        <section id="manifesto" className="py-96 px-16 md:px-32 bg-paper-dark border-y border-black/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 opacity-[0.05] translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
              <Globe size={1200} strokeWidth={1} className="animate-spin-slow text-accent" />
           </div>

          <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-64 items-center">
             <div className="space-y-32 relative z-10">
                <div className="flex items-center gap-12">
                   <div className="w-32 h-[3px] bg-accent" />
                   <span className="font-sans font-black uppercase tracking-[1.2em] text-[12px] text-accent">Manifesto 2026/04</span>
                </div>
                <h2 className="text-[11vw] font-black uppercase leading-[0.75] tracking-[calc(-0.07em)]">
                  Tactile <br />
                  <span className="text-accent font-script lowercase italic tracking-normal block -mt-4 transform -rotate-1">Alchemy.</span>
                </h2>
                <div className="space-y-16">
                  <p className="text-6xl font-script leading-tight opacity-90 italic max-w-4xl border-l-[10px] border-accent/10 pl-20 py-4">
                    "We do not build interfaces; we engineer atmospheres. The web is not an end, but a living medium for memory."
                  </p>
                  <p className="text-3xl font-script opacity-60 leading-relaxed max-w-3xl italic">
                    Every digital interaction is an opportunity for viscera. We distillation of complex engineering into curated moments of presence, bridging the chasm between mathematical coldness and human warmth.
                  </p>
                </div>
                <div className="pt-16 flex items-center gap-12">
                   <Magnetic strength={0.4} text="CURRICULUM">
                     <button className="px-16 py-8 bg-primary text-paper font-black uppercase tracking-[0.5em] text-xs hover:bg-accent transition-all duration-1000 shadow-high hover:-translate-y-2 group flex items-center gap-6">
                        Read History.pdf
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                     </button>
                   </Magnetic>
                   <div className="flex items-center gap-6 opacity-30">
                      <Zap size={24} className="text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em]">Premium Artifact</span>
                   </div>
                </div>
             </div>

             <div className="relative group perspective-2000">
                <motion.div 
                  whileHover={{ rotateY: -15, rotateX: 10, scale: 1.08 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/5] bg-white shadow-high p-12 relative overflow-hidden border border-black/5"
                >
                  <div className="w-full h-full relative overflow-hidden bg-paper-dark border border-black/5 shadow-inner">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000" className="w-full h-full object-cover filter brightness-90 grayscale saturate-150 contrast-125" />
                    <div className="absolute inset-0 bg-accent/10 pointer-events-none mix-blend-multiply opacity-60" />
                    <div className="absolute bottom-8 left-8 text-paper font-black text-6xl font-serif">04</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/20 rounded-full flex items-center justify-center backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000">
                     <Sparkles className="text-white animate-pulse" size={60} strokeWidth={1} />
                  </div>
                </motion.div>
                <Tape className="-top-16 left-1/3 w-80 h-16 rotate-6 bg-accent/20" />
                <div className="absolute -bottom-16 -left-16 bg-white p-16 border border-black/10 shadow-high rotate-[-8deg] group-hover:rotate-0 transition-all duration-1000 hidden xl:block z-20">
                  <span className="text-5xl font-serif font-black text-accent tracking-tighter block mb-2">INTEGRITY.</span>
                  <span className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">Artifact Code 992-B</span>
                </div>
             </div>
          </div>
        </section>

        <section id="services" className="py-96 px-16 md:px-32 overflow-hidden bg-white">
           <div className="max-w-9xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-48 gap-32 border-b border-black/5 pb-24">
                 <div className="space-y-12">
                    <span className="text-[11px] font-sans font-black uppercase tracking-[1em] opacity-30 block">The Taxonomy of Skill</span>
                    <h2 className="text-[10vw] font-black uppercase tracking-[calc(-0.06em)] leading-[0.8]">
                       Creative <br /> <span className="text-accent italic font-script lowercase tracking-normal">Distillation.</span>
                    </h2>
                 </div>
                 <div className="space-y-10 max-w-lg mb-10">
                    <p className="text-4xl font-script opacity-50 leading-tight italic border-l-[10px] border-accent/20 pl-16">
                       A meticulous audit of raw human ambition transformed into structural digital presence.
                    </p>
                    <div className="flex items-center gap-6 opacity-20">
                       <Zap size={14} />
                       <span className="text-[9px] font-black uppercase tracking-[0.5em]">High Precision Suite</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.05] border-x border-black/[0.05]">
                 <ServiceCardPremium 
                    index={0}
                    icon={PenTool}
                    title="Aesthetic Strategy"
                    desc="Constructing visual narratives that balance structural purity with sensory depth."
                    price="$6,000+"
                 />
                 <ServiceCardPremium 
                    index={1}
                    icon={Code}
                    title="Experience Eng."
                    desc="High-fidelity engineering using React, Framer & GLSL Shaders for visceral flow."
                    price="$10,000+"
                 />
                 <ServiceCardPremium 
                    index={2}
                    icon={Fingerprint}
                    title="Architectures"
                    desc="Scalable ecosystems for modern visionaries and global luxury institutions."
                    price="$15,000+"
                 />
              </div>
           </div>
        </section>

        <section id="connect" className="py-96 px-16 overflow-hidden relative">
           <div className="max-w-9xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <div className="flex flex-col items-center gap-12 mb-20">
                   <span className="text-[14px] font-sans font-black uppercase tracking-[1.5em] opacity-40">Ready to secure the legacy?</span>
                   <div className="w-1 h-32 bg-accent opacity-20" />
                </div>
                <h2 
                  className="text-[18vw] md:text-[15vw] font-black uppercase tracking-[calc(-0.08em)] font-serif leading-[0.65] mb-48 cursor-pointer hover:text-accent transition-all duration-1000 ease-[0.16,1,0.3,1] relative inline-block group" 
                  data-cursor="LET'S TALK"
                  onClick={() => window.location.href = 'mailto:hello@zakdesign.studio'}
                >
                  Reach Out.
                  <div className="absolute -top-16 -right-24 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                     <Sparkles className="text-accent animate-pulse" size={150} />
                  </div>
                </h2>
              </motion.div>
              
              <div className="flex flex-wrap items-center justify-center gap-32 border-y border-black/5 py-32 mb-48">
                 {["Instagram", "Twitter", "LinkedIn", "Dribbble"].map((social) => (
                   <Magnetic key={social} strength={0.4} text="FOLLOW">
                      <span className="text-5xl font-script italic opacity-40 hover:opacity-100 transition-all duration-1000 hover:text-accent cursor-pointer group flex items-center gap-6">
                        {social}
                        <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </span>
                   </Magnetic>
                 ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-20 px-10">
                 <div className="flex flex-col items-start gap-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] opacity-30">Studio Local Time</span>
                    <span className="text-2xl font-serif">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' })}</span>
                 </div>
                 
                 <div className="flex items-center gap-6 px-10 py-5 bg-primary text-paper rounded-full shadow-high border border-white/10 group cursor-pointer hover:bg-accent transition-all duration-1000">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.5em]">Capacity Reached / Q3 Booking Open</span>
                 </div>
                 
                 <div className="flex flex-col items-end gap-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] opacity-30">Verified Identity</span>
                    <Fingerprint className="text-accent" size={32} />
                 </div>
              </div>
           </div>

           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-[0.04] select-none pointer-events-none">
              <span className="text-[50vw] font-black uppercase tracking-[calc(-0.06em)] whitespace-nowrap">CREATIVE ARCHIVE — CREATIVE ARCHIVE —</span>
           </div>
        </section>
      </main>

      <footer className="p-20 border-t-2 border-black/5 bg-paper/60 backdrop-blur-3xl relative z-20 overflow-hidden">
        <div className="max-w-9xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="flex flex-col gap-6">
             <span className="text-5xl font-black uppercase tracking-tighter">Zak Studio™</span>
             <div className="flex items-center gap-6">
                <span className="text-[11px] font-black uppercase tracking-[0.8em] opacity-30 italic">Bespoke Reality Systems</span>
                <div className="w-12 h-[1px] bg-black/10" />
                <span className="text-[11px] font-black uppercase tracking-[0.8em] opacity-30">Est. 2026</span>
             </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-16">
             {["Ethos", "Terms", "Archive", "Manifesto", "Sitemap"].map((link) => (
               <span key={link} className="text-[11px] font-black uppercase tracking-[0.6em] opacity-40 hover:opacity-100 transition-opacity cursor-pointer relative group">
                 {link}
                 <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-700 group-hover:w-full" />
               </span>
             ))}
          </div>

          <div className="flex items-center gap-10 px-12 py-6 bg-primary text-paper rounded-full shadow-high border border-white/5 hover:border-accent/40 transition-all duration-700">
              <Code size={18} className="text-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.8em]">Build 9.2.0-A</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[12px] bg-gradient-to-r from-accent/40 via-primary to-accent/40 opacity-30" />
      </footer>
    </motion.div>
  );
}
