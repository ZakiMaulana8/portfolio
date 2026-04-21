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
    [0.9, 1.02, 0.9]
  );
  
  const cardScale = useSpring(isSelected, { stiffness: 100, damping: 30 });
  const cardRotation = useTransform(scrollYProgress, 
    [index * 0.2, (index + 1) * 0.2], 
    [1, -1]
  );

  return (
    <motion.div 
      style={{ scale: cardScale, rotate: cardRotation }}
      className="relative group cursor-none w-[35vw] min-w-[450px] flex-shrink-0"
      data-cursor="EXPLORE"
    >
      <div className="bg-white p-8 pb-20 border border-black/5 shadow-high transition-all duration-1000 ease-[0.16,1,0.3,1] group-hover:-translate-y-8 overflow-hidden">
        <div className="aspect-[16/10] bg-paper-dark overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={img} 
            alt={title} 
            className="w-full h-full object-cover sepia-filter group-hover:sepia-0 transition-all duration-[4s]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
        <div className="mt-12 px-4 relative">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">No.0{index + 1}</span>
             <div className="h-[1px] flex-1 bg-accent/10" />
          </div>
          <h3 className="text-5xl font-bold font-serif uppercase tracking-tight mb-4 group-hover:text-accent transition-colors duration-700 leading-none">
            {title}
          </h3>
          <p className="text-xl font-script opacity-60 leading-relaxed italic pr-12">{desc}</p>
        </div>
      </div>
      <Tape className="-top-4 left-16 w-32 -rotate-2 opacity-60 bg-accent/10" />
      <Tape className="-bottom-4 right-16 w-24 rotate-3 opacity-40 bg-accent/20" />
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white p-12 border border-black/5 hover:border-accent/30 transition-all duration-700 hover:shadow-high cursor-default overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-16">
          <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-paper transition-all duration-700 group-hover:scale-110">
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

// --- HORIZONTAL SECTION COMPONENT ---

const HorizontalExhibition = ({ projects }: { projects: any[] }) => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  
  const skew = useTransform(smoothVelocity, [-1, 1], [-2, 2]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="work" ref={horizontalRef} className="relative h-[500vh] bg-paper-dark/20">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
         <div className="absolute top-[10%] left-[5%] opacity-[0.02] select-none pointer-events-none">
            <span className="text-[20vw] font-black uppercase tracking-tighter">WORKS</span>
         </div>

         <motion.div style={{ x, skewX: skew }} className="flex gap-[10vw] px-[10vw] items-center">
            <div className="w-[35vw] flex-shrink-0 space-y-12">
               <div className="space-y-6">
                  <span className="text-[10px] font-sans font-black uppercase tracking-[0.8em] text-accent">Gallery Archive</span>
                  <h2 className="text-8xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8]">
                    The <br /> <span className="text-accent font-script italic lowercase tracking-normal block">exhibition.</span>
                  </h2>
               </div>
               <p className="text-2xl font-script opacity-50 leading-relaxed italic border-l-4 border-accent/10 pl-10 max-w-xl">
                  "Selected experiments in the pursuit of technical purity and visceral emotional resonance."
               </p>
               <div className="flex items-center gap-6 group cursor-pointer" data-cursor="SCROLL">
                  <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-paper transition-all duration-700">
                     <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Scroll to explore</span>
               </div>
            </div>
            
            {projects.map((proj, idx) => (
              <ProjectCardHorizontal key={idx} {...proj} index={idx} scrollYProgress={scrollYProgress} />
            ))}

            <div className="w-[30vw] flex-shrink-0 text-center space-y-10">
               <span className="text-[9px] font-sans font-black uppercase tracking-[0.6em] opacity-20">End of Volume 04</span>
               <h3 className="text-6xl font-serif italic text-primary/10">More to come.</h3>
               <button className="px-10 py-5 border border-black/10 hover:bg-primary hover:text-paper transition-all duration-700 font-black uppercase tracking-[0.3em] text-[10px]">
                  Request Cases
               </button>
            </div>
         </motion.div>

         <div className="absolute bottom-[10%] left-0 w-full h-px bg-black/[0.05]">
            <motion.div 
               style={{ scaleX: scrollYProgress }}
               className="h-full bg-accent origin-left w-full"
            />
         </div>
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
    const timer = setTimeout(() => setLoading(false), 2000);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      smoothWheel: true,
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
        // Updated for better alignment
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 24}px, ${e.clientY - 24}px, 0)`;
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
  
  // More subtle background transition
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["#f8fafc", "#f1f5f9", "#0f172a", "#f8fafc"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    ["#0f172a", "#0f172a", "#f8fafc", "#0f172a"]
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
          cursorType && "scale-[4] bg-white mix-blend-difference"
        )} 
      >
        <AnimatePresence>
          {cursorType && (
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-[3px] font-black uppercase tracking-[0.1em] text-primary text-center pointer-events-none"
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
              scale: [1, 1.1, 1],
              rotate: [0, 45, 0],
              x: mounted ? (mousePos.x - window.innerWidth / 2) * 0.05 : 0,
              y: mounted ? (mousePos.y - window.innerHeight / 2) * 0.05 : 0
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-accent/5 blur-[120px] rounded-full" 
          />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[1000] origin-left" style={{ scaleX }} />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(40px)", scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[2000] bg-paper flex flex-col items-center justify-center"
          >
            <div className="relative overflow-hidden px-16 py-8">
              <motion.div
                initial={{ y: "150%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-7xl md:text-[8vw] font-serif font-black uppercase tracking-[calc(-0.06em)] flex items-center gap-8"
              >
                Archive
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-accent" size={60} />
                </motion.div>
              </motion.div>
              <div className="absolute bottom-2 left-0 w-full h-[2px] bg-black/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-accent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] p-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <Magnetic text="ZAK DESIGN">
             <div className="group cursor-pointer">
                <span className="text-3xl font-black uppercase tracking-tighter block leading-none">Zak Studio™</span>
                <span className="text-[9px] font-sans font-black uppercase tracking-[0.6em] opacity-40 group-hover:opacity-100 transition-opacity">Visual Archive</span>
             </div>
          </Magnetic>
        </div>
        <div className="flex items-center gap-10 pointer-events-auto">
           {["Works", "Manifesto", "Connect"].map((item, idx) => (
             <Magnetic key={item} strength={0.3} text={item.toUpperCase()}>
               <a href={`#${item.toLowerCase()}`} className="group relative py-2 overflow-hidden block">
                 <span className="text-lg font-serif font-bold uppercase tracking-tight group-hover:text-accent transition-all duration-500">
                    {item}
                 </span>
                 <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
               </a>
             </Magnetic>
           ))}
        </div>
      </nav>

      <main>
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto z-10 relative">
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-8 px-8 py-3 border border-black/10 bg-white/40 backdrop-blur-3xl rounded-full text-[10px] font-black uppercase tracking-[0.6em] mb-20 shadow-high group hover:bg-primary hover:text-paper transition-all duration-700 cursor-none" data-cursor="OPEN">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-accent rounded-full" 
                />
                <span>Engineering Experience for 2026</span>
              </div>
              
              <h1 className="text-[12vw] font-black uppercase leading-[0.75] tracking-[calc(-0.06em)] font-serif mb-16">
                <SplitText text="Bespoke" /> <br />
                <span className="text-accent italic font-script lowercase tracking-normal block transform -rotate-1">
                  <SplitText text="Digital Reality" delay={0.4} />
                </span>
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-center gap-20 mt-32 border-t border-black/5 pt-20">
                <p className="max-w-lg text-2xl font-script opacity-60 leading-tight italic text-left border-l-4 border-accent/20 pl-12 pr-4">
                  "Distilling complex engineering into curated moments of presence. We design for sensory memory."
                </p>
                <div className="flex flex-col items-center gap-6">
                   <Magnetic strength={0.4} text="ENTER">
                     <div className="w-24 h-24 rounded-full border border-black/10 flex items-center justify-center group hover:bg-accent hover:text-paper hover:border-transparent transition-all duration-1000 cursor-pointer shadow-high bg-white/20 backdrop-blur-md">
                        <ChevronDown className="group-hover:translate-y-2 transition-transform duration-700" size={32} strokeWidth={1} />
                     </div>
                   </Magnetic>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden xl:block opacity-40">
            <FloatingPaper className="absolute top-[20%] left-[8%] w-64 h-[400px] -rotate-6" rotation={-6}>
               <div className="w-full h-full bg-paper-dark grayscale border border-black/5 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" />
               </div>
               <Tape className="-top-6 left-1/2 -translate-x-1/2 w-40 bg-accent/20" />
            </FloatingPaper>

            <FloatingPaper className="absolute bottom-[10%] right-[10%] w-60 h-80 rotate-6" rotation={6} delay={1}>
               <div className="w-full h-full grayscale border border-black/5 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600" className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700" />
               </div>
            </FloatingPaper>
          </div>
        </section>

        <div className="py-24 bg-primary overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="text-[10vw] font-serif font-black uppercase text-paper/5 px-16 tracking-[calc(-0.04em)] flex items-center gap-10">
                  Experimental Works <Sparkles className="text-accent/20" size={100} /> The Archive
                </span>
              </div>
            ))}
          </div>
        </div>

        <HorizontalExhibition projects={projects} />

        <section id="manifesto" className="py-48 px-8 md:px-24 bg-paper-dark border-y border-black/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 opacity-[0.03] translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
              <Globe size={1000} strokeWidth={1} className="animate-spin-slow text-accent" />
           </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <div className="space-y-20 relative z-10">
                <div className="flex items-center gap-8">
                   <div className="w-20 h-[2px] bg-accent" />
                   <span className="font-sans font-black uppercase tracking-[1em] text-[10px] text-accent">Manifesto 26/04</span>
                </div>
                <h2 className="text-[8vw] font-black uppercase leading-[0.8] tracking-[calc(-0.06em)]">
                  Tactile <br />
                  <span className="text-accent font-script lowercase italic tracking-normal block -mt-2">Alchemy.</span>
                </h2>
                <div className="space-y-12">
                  <p className="text-4xl font-script leading-tight opacity-90 italic max-w-2xl border-l-4 border-accent/10 pl-12 py-2">
                    "We do not build interfaces; we engineer atmospheres. The digital medium is a tool for memory."
                  </p>
                  <p className="text-xl font-sans opacity-60 leading-relaxed max-w-2xl">
                    Every interaction is an opportunity for presence. We distill complex systems into curated moments, bridging the chasm between mathematical coldness and human warmth.
                  </p>
                </div>
                <div className="pt-8">
                   <Magnetic strength={0.3} text="CURRICULUM">
                     <button className="px-12 py-6 bg-primary text-paper font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent transition-all duration-700 shadow-high flex items-center gap-4">
                        Read History.pdf
                        <ArrowRight size={14} />
                     </button>
                   </Magnetic>
                </div>
             </div>

             <div className="relative group perspective-2000">
                <motion.div 
                  whileHover={{ rotateY: -10, rotateX: 5, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/5] bg-white shadow-high p-8 relative overflow-hidden border border-black/5"
                >
                  <div className="w-full h-full relative overflow-hidden bg-paper-dark border border-black/5">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000" className="w-full h-full object-cover filter brightness-90 grayscale contrast-110" />
                  </div>
                </motion.div>
                <div className="absolute -bottom-10 -left-10 bg-white p-12 border border-black/5 shadow-high rotate-[-6deg] hidden xl:block z-20">
                  <span className="text-3xl font-serif font-black text-accent tracking-tighter block">INTEGRITY.</span>
                </div>
             </div>
          </div>
        </section>

        <section id="services" className="py-48 px-8 md:px-24 overflow-hidden bg-white">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-20 border-b border-black/5 pb-16">
                 <div className="space-y-8">
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.8em] opacity-30 block">Taxonomy of Skill</span>
                    <h2 className="text-[8vw] font-black uppercase tracking-[calc(-0.06em)] leading-[0.8]">
                       Creative <br /> <span className="text-accent italic font-script lowercase tracking-normal">Distillation.</span>
                    </h2>
                 </div>
                 <div className="max-w-md mb-4">
                    <p className="text-2xl font-script opacity-50 leading-tight italic border-l-4 border-accent/10 pl-12">
                       A meticulous audit of raw ambition transformed into structural digital presence.
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.05]">
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
                    desc="High-fidelity engineering using React, Framer & GLSL for visceral flow."
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

        <section id="connect" className="py-48 px-8 overflow-hidden relative">
           <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <div className="flex flex-col items-center gap-8 mb-16">
                   <span className="text-[12px] font-sans font-black uppercase tracking-[1em] opacity-40">Ready to secure the legacy?</span>
                   <div className="w-[1px] h-20 bg-accent opacity-20" />
                </div>
                <h2 
                  className="text-[14vw] font-black uppercase tracking-[calc(-0.06em)] font-serif leading-[0.7] mb-32 cursor-pointer hover:text-accent transition-all duration-700 group relative inline-block" 
                  data-cursor="LET'S TALK"
                  onClick={() => window.location.href = 'mailto:hello@zakdesign.studio'}
                >
                  Reach Out.
                  <div className="absolute -top-12 -right-16 group-hover:scale-125 transition-transform duration-700">
                     <Sparkles className="text-accent animate-pulse" size={100} />
                  </div>
                </h2>
              </motion.div>
              
              <div className="flex flex-wrap items-center justify-center gap-16 border-y border-black/5 py-16 mb-32">
                 {["Instagram", "Twitter", "LinkedIn", "Dribbble"].map((social) => (
                   <Magnetic key={social} strength={0.3} text="FOLLOW">
                      <span className="text-3xl font-script italic opacity-40 hover:opacity-100 transition-all duration-700 hover:text-accent cursor-pointer">
                        {social}
                      </span>
                   </Magnetic>
                 ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center px-8">
                 <div className="flex flex-col md:items-start gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Local Time</span>
                    <span className="text-xl font-serif">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                 </div>
                 
                 <div className="flex items-center justify-center gap-4 px-8 py-4 bg-primary text-paper rounded-full group cursor-pointer hover:bg-accent transition-all duration-700">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Capacity Reached</span>
                 </div>
                 
                 <div className="flex flex-col md:items-end gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Identity</span>
                    <Fingerprint className="text-accent" size={24} />
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="p-16 border-t border-black/5 bg-paper/60 backdrop-blur-3xl relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
             <span className="text-3xl font-black uppercase tracking-tighter">Zak Studio™</span>
             <span className="text-[9px] font-black uppercase tracking-[0.6em] opacity-30 italic">Bespoke Digital Systems</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
             {["Ethos", "Terms", "Archive", "Manifesto"].map((link) => (
               <span key={link} className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                 {link}
               </span>
             ))}
          </div>

          <div className="flex items-center gap-8 px-10 py-4 bg-primary text-paper rounded-full border border-white/5">
              <Code size={16} className="text-accent" />
              <span className="text-[9px] font-black uppercase tracking-[0.6em]">Build 9.2.0-A</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
