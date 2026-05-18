"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import {
  Zap,
  Terminal,
  ArrowRight,
  Globe,
  Code2,
  Cpu
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- NEOBRUTALISM COMPONENTS ---

const NeoCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white neo-border neo-shadow p-6 md:p-10", className)}>
    {children}
  </div>
);

const NeoButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={cn("bg-[#ff00ff] text-white neo-button px-8 py-4 flex items-center justify-center gap-2 hover:bg-[#00ffff] hover:text-black", className)}
  >
    {children}
  </button>
);

const NeoTag = ({ text, color = "bg-[#00ffff]" }: { text: string, color?: string }) => (
  <div className={cn("inline-flex neo-border-sm neo-shadow-sm px-4 py-1 text-sm font-black uppercase", color)}>
    {text}
  </div>
);

// --- SECTIONS ---

const PROJECTS = [
  {
    title: "Ethereal Echoes",
    desc: "A sensory exploration of digital landscapes, blending spatial audio with interactive fluid dynamics.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
    tags: ["WebGL", "Audio", "Interactive"]
  },
  {
    title: "Silent Architecture",
    desc: "Monolithic structures rendered in pure code. A study of brutalism in the immaterial realm.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
    tags: ["GLSL", "React", "Three.js"]
  },
  {
    title: "Neural Canvas",
    desc: "Generative algorithms translating human emotional states into evolving abstract tapestries.",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000",
    tags: ["AI", "Generative", "Canvas"]
  },
  {
    title: "Chromatic Void",
    desc: "An experiment in color theory and perception, pushing the boundaries of digital luminescence.",
    img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000",
    tags: ["UX/UI", "Framer", "CSS"]
  }
];

const ProjectCard = ({ title, desc, img, tags, index }: { title: string, desc: string, img: string, tags: string[], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, y: 50 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="mb-20 last:mb-0 relative"
    >
      <div className="absolute -top-6 -left-6 z-10">
        <div className="bg-[#ff00ff] text-white neo-border neo-shadow w-16 h-16 flex items-center justify-center text-3xl font-black rotate-12">
          {index + 1}
        </div>
      </div>
      <NeoCard className="flex flex-col lg:flex-row gap-10 p-0 overflow-hidden bg-[#f0f0f0]">
        <div className="w-full lg:w-1/2 neo-border-r relative min-h-[300px]">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500 filter contrast-125 saturate-150"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, i) => (
                <NeoTag key={tag} text={tag} color={i % 2 === 0 ? "bg-[#00ffff]" : "bg-[#fdf200]"} />
              ))}
            </div>
            <h3 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none">
              {title}
            </h3>
            <p className="text-xl md:text-2xl font-sans font-bold border-l-8 border-black pl-6 mb-10">
              {desc}
            </p>
          </div>
          <NeoButton className="self-start text-xl">
            VIEW PROJECT <ArrowRight />
          </NeoButton>
        </div>
      </NeoCard>
    </motion.div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, price, color }: any) => {
  return (
    <NeoCard className={cn("flex flex-col h-full hover:-translate-y-2 transition-transform", color)}>
      <div className="bg-white neo-border w-20 h-20 flex items-center justify-center mb-8 neo-shadow-sm rotate-3">
        <Icon size={40} />
      </div>
      <h3 className="text-3xl font-black uppercase mb-4">{title}</h3>
      <p className="text-lg font-bold mb-8 flex-grow bg-white p-4 neo-border">{desc}</p>
      <div className="flex justify-between items-center bg-black text-white p-4 neo-border">
        <span className="font-bold uppercase">Starting</span>
        <span className="font-black text-2xl text-[#00ffff]">{price}</span>
      </div>
    </NeoCard>
  );
};

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 32}px, ${e.clientY - 32}px, 0)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const { scrollYProgress } = useScroll();

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative font-sans selection:bg-[#ff00ff] selection:text-white motion-safe bg-pattern">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor-follow hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-4 bg-[#00ffff] neo-border-b z-[1000] origin-left" 
        style={{ scaleX: scrollYProgress, width: '100%' }} 
      />

      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[100] flex justify-between items-center pointer-events-none">
        <div className="bg-white neo-border neo-shadow-sm px-6 py-3 pointer-events-auto -rotate-2 hover:rotate-0 transition-transform">
          <span className="text-2xl font-black uppercase tracking-tighter">Zak Studio™</span>
        </div>
        <div className="hidden md:flex gap-4 pointer-events-auto">
          {["Works", "Manifesto", "Services"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="bg-white neo-border neo-shadow-sm px-6 py-2 font-black uppercase hover:bg-[#00ffff] hover:-translate-y-1 transition-all"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative pt-32 pb-20">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#ff00ff] neo-border neo-shadow rounded-full mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#00ffff] neo-border neo-shadow mix-blend-multiply animate-bounce" style={{ animationDuration: '3s' }} />
          </div>

          <div className="max-w-6xl mx-auto z-10 relative">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-white neo-border neo-shadow px-8 py-4 mb-12 rotate-2">
                <span className="text-xl font-black uppercase flex items-center gap-4">
                  <Zap className="text-[#ff00ff]" fill="#ff00ff" />
                  Engineering Experience for 2026
                  <Zap className="text-[#ff00ff]" fill="#ff00ff" />
                </span>
              </div>

              <h1 className="text-[15vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter mb-10">
                <span className="bg-white px-4 inline-block neo-border neo-shadow mb-4 -rotate-1 hover:rotate-1 transition-transform">BESPOKE</span>
                <br />
                <span className="bg-[#00ffff] px-4 inline-block neo-border neo-shadow rotate-2 hover:-rotate-1 transition-transform">DIGITAL</span>
                <br />
                <span className="bg-[#ff00ff] text-white px-4 inline-block neo-border neo-shadow -rotate-2 hover:rotate-2 transition-transform">REALITY</span>
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-20">
                <p className="max-w-xl text-2xl font-bold bg-white p-6 neo-border neo-shadow text-left">
                  Distilling complex engineering into highly structural digital presence. We build loud, we build bold.
                </p>
                <NeoButton className="text-2xl py-6 px-12 rotate-3 animate-pulse" onClick={() => document.getElementById('works')?.scrollIntoView()}>
                  ENTER THE VOID
                </NeoButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marquee */}
        <div className="py-6 bg-black neo-border-y overflow-hidden relative rotate-1 scale-110 z-20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-8">
                <span className="text-4xl font-black uppercase text-white tracking-widest">
                  NO MORE BORING WEBSITES
                </span>
                <span className="text-[#ff00ff] font-black text-4xl">+++</span>
              </div>
            ))}
          </div>
        </div>

        {/* Works Section */}
        <section id="works" className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="bg-white neo-border neo-shadow p-6 inline-block mb-20 -rotate-2">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              Selected <span className="text-[#ff00ff]">Works</span>
            </h2>
          </div>
          
          <div>
            {PROJECTS.map((proj, idx) => (
              <ProjectCard key={idx} {...proj} index={idx} />
            ))}
          </div>
        </section>

        {/* Marquee 2 */}
        <div className="py-6 bg-[#00ffff] neo-border-y overflow-hidden relative -rotate-2 scale-110 z-20">
          <div className="flex whitespace-nowrap animate-marquee" style={{ animationDirection: 'reverse' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-8">
                <span className="text-4xl font-black uppercase text-black tracking-widest">
                  BRUTALIST APPROACH
                </span>
                <span className="text-black font-black text-4xl">///</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-32 px-4 md:px-12 bg-white neo-border-y">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
              <div className="bg-[#ff00ff] text-white neo-border neo-shadow p-6 inline-block rotate-1">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                  Skill <span className="text-[#00ffff]">Tree</span>
                </h2>
              </div>
              <p className="text-2xl font-bold bg-[#fdf200] p-6 neo-border neo-shadow max-w-md -rotate-1">
                A meticulous audit of raw ambition transformed into structural digital presence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                icon={Terminal}
                title="Aesthetic Strategy"
                desc="Constructing visual narratives that balance structural purity with sensory depth."
                price="$6,000+"
                color="bg-[#00ffff]"
              />
              <ServiceCard
                icon={Code2}
                title="Experience Eng."
                desc="High-fidelity engineering using React, Framer & GLSL for visceral flow."
                price="$10,000+"
                color="bg-[#ff00ff]"
              />
              <ServiceCard
                icon={Cpu}
                title="Architectures"
                desc="Scalable ecosystems for modern visionaries and global luxury institutions."
                price="$15,000+"
                color="bg-[#fdf200]"
              />
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="py-40 px-4 md:px-12 max-w-7xl mx-auto text-center">
          <div className="bg-white neo-border neo-shadow p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-pattern opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-[10vw] md:text-[8vw] font-black uppercase leading-none mb-12 group-hover:scale-105 transition-transform">
                LET'S <span className="bg-black text-white px-4">TALK</span>
              </h2>
              
              <NeoButton 
                className="mx-auto text-3xl py-8 px-16 -rotate-2 hover:rotate-2"
                onClick={() => window.location.href = 'mailto:hello@zakdesign.studio'}
              >
                START A PROJECT <Globe className="animate-spin-slow" size={40} />
              </NeoButton>
            </div>
            
            <div className="absolute -top-10 -left-10 bg-[#00ffff] w-40 h-40 neo-border neo-shadow rounded-full mix-blend-multiply" />
            <div className="absolute -bottom-10 -right-10 bg-[#ff00ff] w-40 h-40 neo-border neo-shadow mix-blend-multiply" />
          </div>
        </section>
      </main>

      <footer className="bg-black text-white neo-border-t p-8 md:p-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-4xl font-black uppercase bg-[#ff00ff] text-black px-4 py-2 neo-border block mb-2 -rotate-1">Zak Studio™</span>
            <span className="text-sm font-bold uppercase tracking-widest text-[#00ffff]">NEOBRUTALISM BUILD 2026</span>
          </div>

          <div className="flex gap-4">
            {["Instagram", "Twitter", "LinkedIn"].map((social) => (
              <div key={social} className="bg-white text-black neo-border px-4 py-2 font-black uppercase hover:bg-[#00ffff] cursor-pointer hover:-translate-y-1 transition-transform">
                {social}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
