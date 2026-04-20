"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Lenis from "lenis";
import { 
  Sparkles, 
  PenTool, 
  ChevronDown, 
  Heart, 
  Camera,
  Globe,
  Code,
  Zap,
  Fingerprint,
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

const ProjectCardHorizontal = ({ title, desc, img, index }: { title: string, desc: string, img: string, index: number }) => {
  return (
    <motion.div 
      className="relative group cursor-none w-[35vw] min-w-[500px] flex-shrink-0"
      data-cursor="VIEW"
    >
      <div className="bg-white p-8 pb-32 border border-black/5 shadow-[30px_30px_80px_rgba(0,0,0,0.04)] group-hover:shadow-[50px_50px_150px_rgba(0,0,0,0.12)] transition-all duration-1000 ease-[0.16,1,0.3,1] group-hover:-translate-y-8">
        <div className="aspect-[4/5] bg-paper-dark overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
          <motion.img 
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={img} 
            alt={title} 
            className="w-full h-full object-cover sepia-filter group-hover:sepia-0 transition-all duration-[3s]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
        <div className="mt-16 px-4 relative">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent">Artifact—0{index + 1}</span>
             <div className="h-[1px] flex-1 bg-accent/20" />
          </div>
          <h3 className="text-6xl font-bold font-serif uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors duration-700 leading-none">
            {title}
          </h3>
          <p className="text-2xl opacity-60 font-script leading-tight transform group-hover:translate-x-6 transition-transform duration-1000 italic">{desc}</p>
        </div>
      </div>
      <Tape className="-top-6 left-12 w-40 -rotate-6 opacity-60 bg-accent/10" />
      <Tape className="-bottom-4 right-16 w-32 rotate-3 opacity-40 bg-accent/40" />
    </motion.div>
  );
};

const FloatingPaper = ({ children, className, rotation = 0 }: { children: React.ReactNode, className?: string, rotation?: number }) => (
  <motion.div
    style={{ rotate: rotation }}
    animate={{ 
      y: [0, -15, 0],
      rotate: [rotation, rotation + 2, rotation]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={cn("bg-white p-6 shadow-2xl border border-black/5", className)}
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
      transition={{ duration: 1.2, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white p-16 border border-black/5 hover:border-accent/40 transition-all duration-1000 hover:shadow-high cursor-default"
    >
      <div className="flex justify-between items-start mb-16">
        <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-paper transition-all duration-1000 group-hover:scale-110">
          <Icon size={36} strokeWidth={1} />
        </div>
        <span className="text-7xl font-serif text-black/5 group-hover:text-accent/10 transition-colors duration-1000 select-none">0{index + 1}</span>
      </div>
      <h3 className="text-5xl font-bold font-serif uppercase tracking-tight mb-8 leading-none">{title}</h3>
      <p className="text-3xl font-script opacity-60 leading-relaxed mb-16 italic group-hover:opacity-100 transition-opacity duration-1000">{desc}</p>
      <div className="flex items-center justify-between border-t border-black/10 pt-10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.6em] opacity-40">Investment</span>
        </div>
        <span className="text-2xl font-bold font-sans tracking-widest text-accent">{price}</span>
      </div>
      <Tape className="-top-3 -right-3 w-24 rotate-12 opacity-0 group-hover:opacity-30 transition-opacity" />
    </motion.div>
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
  const horizontalRef = useRef<HTMLDivElement>(null);

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
      lerp: 0.08,
      wheelMultiplier: 1.2,
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
  
  const horizontalScroll = useScroll({
    target: horizontalRef,
  });

  const x = useTransform(horizontalScroll.scrollYProgress, [0, 1], ["0%", "-75%"]);

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
      {/* CUSTOM CURSOR SYSTEM */}
      <div 
        ref={cursorRef} 
        className={cn(
          "cursor-follow hidden md:flex items-center justify-center",
          cursorType && "scale-[5] bg-white mix-blend-difference"
        )} 
      >
        <AnimatePresence>
          {cursorType && (
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-[2px] font-bold uppercase tracking-[0.2em] text-primary text-center pointer-events-none"
            >
              {cursorType}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div ref={followerRef} className="cursor-follower hidden md:block" />

      {/* FIXED OVERLAYS */}
      <div className="bg-noise" />
      <div className="fixed inset-0 pointer-events-none bg-pattern z-0 opacity-30" />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[1000] origin-left" style={{ scaleX }} />

      {/* LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(40px)", scale: 1.1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[2000] bg-paper flex flex-col items-center justify-center"
          >
            <div className="relative overflow-hidden px-20 py-10">
              <motion.div
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-9xl md:text-[12vw] font-serif font-black uppercase tracking-tighter flex items-center gap-8"
              >
                Archive
                <Sparkles className="text-accent animate-spin-slow" size={60} />
              </motion.div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-accent"
                />
              </div>
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-xs font-sans font-bold uppercase tracking-[1em]"
            >
              Curation Vol. 04 — Est. 2026
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] p-12 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <Magnetic text="GO HOME">
             <div className="group space-y-1">
                <span className="text-3xl font-black uppercase tracking-tighter block leading-none">Zak.</span>
                <div className="h-[2px] w-0 group-hover:w-full bg-accent transition-all duration-700" />
             </div>
          </Magnetic>
        </div>
        <div className="flex flex-col items-end gap-6 pointer-events-auto">
           {["Work", "About", "Contact"].map((item, idx) => (
             <Magnetic key={item} strength={0.4} text={item.toUpperCase()}>
               <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-4">
                 <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-40 transition-opacity">0{idx + 1}</span>
                 <span className="text-sm font-bold uppercase tracking-[0.4em] hover:text-accent transition-colors">
                   {item}
                 </span>
               </a>
             </Magnetic>
           ))}
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <div className="max-w-8xl mx-auto z-10 relative">
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-6 px-8 py-3 border border-black/10 bg-white/40 backdrop-blur-xl rounded-full text-[10px] uppercase font-bold tracking-[0.6em] mb-24 shadow-high">
                <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
                <span>Open for Creative Collaborations</span>
              </div>
              
              <h1 className="text-[15vw] md:text-[13vw] font-black uppercase leading-[0.75] tracking-[calc(-0.06em)] font-serif mb-16">
                <SplitText text="Transcending" /> <br />
                <span className="text-accent italic font-script lowercase tracking-normal -mt-4 block transform -rotate-1">
                  <SplitText text="Human Interaction" delay={0.6} />
                </span>
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-center gap-24 mt-32 border-t border-black/5 pt-20">
                <p className="max-w-xl text-3xl font-script opacity-60 leading-relaxed italic text-left">
                  "Architecture of the invisible. We don't just build websites; we design emotional resonance via technical precision."
                </p>
                <div className="w-40 h-[1px] bg-accent/40 hidden md:block" />
                <div className="flex flex-col items-center gap-6">
                   <Magnetic strength={0.5} text="EXPLORE">
                     <div className="w-24 h-24 rounded-full border border-black/10 flex items-center justify-center group hover:border-accent transition-all duration-1000 cursor-pointer bg-white/20 backdrop-blur-sm">
                        <ChevronDown className="group-hover:translate-y-2 transition-transform duration-700" size={32} strokeWidth={1} />
                     </div>
                   </Magnetic>
                   <span className="text-[10px] font-sans font-bold uppercase tracking-[0.8em] opacity-20">Scroll to dive</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* DECORATIVE FLOATING PAPERS */}
          <div className="hidden 2xl:block">
            <FloatingPaper className="absolute top-[20%] left-[8%] w-72 h-96 -rotate-12" rotation={-12}>
               <div className="w-full h-full bg-paper-dark grayscale p-2 border border-black/5 overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
               </div>
               <Tape className="-top-6 left-1/2 -translate-x-1/2 w-40 rotate-2 bg-accent/20" />
            </FloatingPaper>

            <FloatingPaper className="absolute bottom-[10%] right-[10%] w-64 h-80 rotate-6" rotation={6}>
               <div className="w-full h-full bg-paper-dark p-2 border border-black/5 overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600" className="w-full h-full object-cover sepia-filter group-hover:sepia-0 transition-all duration-[3s]" />
               </div>
               <div className="absolute -bottom-8 -right-8 bg-primary text-paper px-6 py-4 font-bold text-[10px] uppercase tracking-[0.4em] rotate-12 shadow-2xl">
                  Subject—004
               </div>
            </FloatingPaper>
          </div>
        </section>

        {/* BRUTALIST MARQUEE */}
        <div className="py-32 bg-primary overflow-hidden relative border-y border-white/5">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="text-[12vw] font-serif font-black uppercase text-paper/10 px-20 tracking-tighter">
                  Selected Work — Selected Work —
                </span>
                <Sparkles className="text-accent opacity-20" size={100} />
              </div>
            ))}
          </div>
        </div>

        {/* HORIZONTAL EXHIBITION */}
        <section id="work" ref={horizontalRef} className="relative h-[400vh]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
             <motion.div style={{ x }} className="flex gap-[10vw] px-[10vw] items-center">
                <div className="w-[30vw] flex-shrink-0">
                   <h2 className="text-9xl font-bold uppercase tracking-tighter leading-none mb-12">
                      The <br /> <span className="text-accent font-script italic lowercase">exhibition.</span>
                   </h2>
                   <p className="text-3xl font-script opacity-40 leading-relaxed italic border-l-4 border-accent/20 pl-10">
                      A meticulous curation of digital artifacts designed with technical precision and emotional resonance.
                   </p>
                </div>
                {projects.map((proj, idx) => (
                  <ProjectCardHorizontal key={idx} {...proj} index={idx} />
                ))}
             </motion.div>
          </div>
        </section>

        {/* MANIFESTO / PHILOSOPHY */}
        <section id="about" className="py-80 px-12 md:px-24 bg-paper-dark border-y border-black/5 relative overflow-hidden">
           {/* Ambient Flower element */}
           <div className="absolute top-0 right-0 opacity-[0.03] translate-x-1/2 -translate-y-1/2">
              <Camera size={800} strokeWidth={1} />
           </div>

          <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-48 items-center">
             <div className="space-y-24 relative z-10">
                <div className="flex items-center gap-8">
                   <div className="w-24 h-[2px] bg-accent" />
                   <span className="font-sans font-bold uppercase tracking-[1em] text-[10px] text-accent">Manifesto — 2026</span>
                </div>
                <h2 className="text-9xl md:text-[10vw] font-black uppercase leading-[0.8] tracking-[calc(-0.05em)]">
                  Spirit <br />
                  <span className="text-accent font-script lowercase italic tracking-normal">in the</span> <br />
                  Pixel.
                </h2>
                <div className="space-y-12">
                  <p className="text-5xl font-script leading-snug opacity-90 italic">
                    "The web is not a static utility; it is a living, breathing canvas for human connection. We engineer atmospheres, not interfaces."
                  </p>
                  <p className="text-2xl font-script opacity-60 leading-relaxed max-w-2xl italic">
                    Every pixel we place carries a specific weight. We don't build tools; we forge artifacts that resonate with the human pulse, bridging the gap between digital coldness and tactile warmth.
                  </p>
                </div>
                <div className="pt-12">
                   <Magnetic strength={0.4} text="READ MORE">
                     <button className="px-12 py-6 bg-primary text-paper rounded-full font-bold uppercase tracking-[0.4em] text-xs hover:bg-accent transition-all duration-700 shadow-high active:scale-95">
                        Download Portfolio.pdf
                     </button>
                   </Magnetic>
                </div>
             </div>

             <div className="relative group perspective-1000">
                <motion.div 
                  whileHover={{ rotateY: -10, rotateX: 5, scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/5] bg-white shadow-high p-10 relative overflow-hidden"
                >
                  <div className="w-full h-full relative overflow-hidden bg-paper-dark">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800" className="w-full h-full object-cover filter brightness-90 grayscale contrast-125" />
                    <div className="absolute inset-0 bg-accent/10 pointer-events-none mix-blend-multiply" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                     <Zap className="text-white animate-pulse" size={48} strokeWidth={1} />
                  </div>
                </motion.div>
                <Tape className="-top-12 left-1/4 w-72 h-14 rotate-6 bg-accent/20" />
                <div className="absolute -bottom-12 -left-12 bg-white p-12 border border-black/10 shadow-2xl rotate-[-5deg] group-hover:rotate-0 transition-transform duration-1000 hidden xl:block">
                  <span className="text-4xl font-serif font-black text-accent tracking-tighter">AUTHENTICITY.</span>
                </div>
             </div>
          </div>
        </section>

        {/* SERVICES / FLOW */}
        <section className="py-80 px-12 md:px-24 overflow-hidden">
           <div className="max-w-8xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-20">
                 <div className="space-y-8">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.8em] opacity-40 block">Solutions & Systems</span>
                    <h2 className="text-9xl font-black uppercase tracking-tighter leading-none">
                       Creative <br /> <span className="text-accent italic font-script lowercase tracking-normal">Engineering.</span>
                    </h2>
                 </div>
                 <p className="max-w-md text-3xl font-script opacity-50 leading-relaxed italic pb-4 border-l-2 border-accent/20 pl-10">
                    Meticulous distillation of complex ideas into premium interactive systems.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.03] border border-black/[0.03] shadow-high">
                 <ServiceCardPremium 
                    index={0}
                    icon={PenTool}
                    title="Bespoke Design"
                    desc="Visual narratives that balance aesthetic purity with high-end functional depth."
                    price="$5,000+"
                 />
                 <ServiceCardPremium 
                    index={1}
                    icon={Code}
                    title="Interact Eng."
                    desc="High-fidelity creative engineering using React, Framer Motion & WebGL."
                    price="$8,000+"
                 />
                 <ServiceCardPremium 
                    index={2}
                    icon={Globe}
                    title="Ecosystems"
                    desc="Scalable architecture for modern luxury brands and independent visionaries."
                    price="$12,000+"
                 />
              </div>
           </div>
        </section>

        {/* CONTACT / CTA */}
        <section id="contact" className="py-80 px-12 overflow-hidden relative">
           <div className="max-w-8xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[12px] font-sans font-bold uppercase tracking-[1.2em] opacity-40 mb-16 block">Secure the legacy</span>
                <h2 
                  className="text-[16vw] md:text-[14vw] font-black uppercase tracking-[calc(-0.06em)] leading-[0.7] mb-32 cursor-pointer hover:text-accent transition-all duration-1000 ease-[0.16,1,0.3,1] relative" 
                  data-cursor="LET'S TALK"
                  onClick={() => window.location.href = 'mailto:hello@zakdesign.studio'}
                >
                  Reach Out.
                  <div className="absolute -top-12 -right-8">
                     <Sparkles className="text-accent animate-pulse" size={120} />
                  </div>
                </h2>
              </motion.div>
              
              <div className="flex flex-wrap items-center justify-center gap-24 border-y border-black/5 py-24 mb-32">
                 {["Instagram", "X (Twitter)", "LinkedIn", "Dribbble"].map((social) => (
                   <Magnetic key={social} strength={0.4} text="FOLLOW">
                      <span className="text-4xl font-script italic opacity-50 hover:opacity-100 transition-all duration-700 hover:text-accent cursor-pointer">
                        {social}
                      </span>
                   </Magnetic>
                 ))}
              </div>

              <div className="flex flex-col items-center gap-8">
                 <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] opacity-30">Current Time — {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} CEST</span>
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">Accepting 2 new projects for Q3 2026</span>
                 </div>
              </div>
           </div>

           {/* MASSIVE BACKGROUND TEXT */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 opacity-[0.03] select-none pointer-events-none">
              <span className="text-[45vw] font-black uppercase tracking-tighter whitespace-nowrap">Studio — Studio —</span>
           </div>
        </section>
      </main>

      <footer className="p-16 border-t border-black/5 bg-white/40 backdrop-blur-2xl relative z-20 overflow-hidden">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4">
             <span className="text-4xl font-black uppercase tracking-tighter">Zak Studio™</span>
             <span className="text-[10px] font-sans font-bold uppercase tracking-[0.6em] opacity-30">All Rights Reserved © 2026</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
             {["Privacy", "Terms", "Archive", "Manifesto"].map((link) => (
               <span key={link} className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                 {link}
               </span>
             ))}
          </div>

          <div className="flex items-center gap-8 px-8 py-4 bg-primary text-paper rounded-full shadow-2xl">
              <Fingerprint size={16} className="text-accent" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em]">Verified Artifact</span>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-r from-accent via-primary to-accent opacity-20" />
      </footer>
    </motion.div>
  );
}
