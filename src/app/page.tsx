"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Coffee
} from "lucide-react";


import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Visual components
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

const ProjectCard = ({ title, desc, img, rotation = 0 }: { title: string, desc: string, img: string, rotation?: number }) => (
  <motion.div 
    initial={{ rotate: rotation, opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ rotate: 0, scale: 1.02, y: -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    viewport={{ once: true }}
    className="relative group cursor-pointer w-full max-w-[450px]"
  >
    <div className="bg-white p-5 pb-16 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.03)] group-hover:shadow-[30px_30px_80px_rgba(0,0,0,0.08)] transition-all duration-500">
      <div className="aspect-[4/5] bg-paper-dark overflow-hidden relative">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover sepia-filter group-hover:sepia-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-8 px-2">
        <h3 className="text-3xl font-bold font-serif uppercase tracking-tight mb-2">{title}</h3>
        <p className="text-xl opacity-60 font-script leading-snug">{desc}</p>
      </div>
      <div className="absolute bottom-6 right-8 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        <Rocket size={20} className="text-accent" />
      </div>
    </div>
    <Tape className="-top-4 left-10 w-28 -rotate-6 opacity-60" />
    <Tape className="-bottom-2 right-12 w-24 rotate-3 opacity-40 bg-accent/30" />
  </motion.div>
);

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
    whileHover={{ scale: 1.05, rotate: rotation / 2, zIndex: 10 }}
    initial={{ opacity: 0, scale: 0.9, rotate: rotation }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={cn(
      "bg-white p-4 pb-12 border border-black/5 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] transition-all break-inside-avoid relative",
      rotation > 0 ? "rotate-2" : "-rotate-2"
    )}
  >
    <div className="aspect-square bg-paper-dark overflow-hidden mb-5 relative">
      <img src={img} alt={caption} className="w-full h-full object-cover sepia-filter hover:sepia-0 grayscale-[0.3] hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute inset-0 border-[8px] border-white/20 pointer-events-none" />
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
      <h3 className="mb-2 font-bold font-serif text-primary text-3xl uppercase tracking-tight leading-none">{title}</h3>
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
    whileHover={{ y: -10, rotate: rotation / 2 }}
    className={cn(
      "bg-white p-10 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.02)] relative min-w-[280px] flex-1 transition-all",
      rotation > 0 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
    )}
  >
    <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent border border-black/5 flex items-center justify-center font-bold text-2xl font-sans text-paper rotate-[-5deg] shadow-lg">
      {number}
    </div>
    <div className="mb-8 text-accent">
      <Icon size={40} strokeWidth={1} />
    </div>
    <h3 className="text-3xl font-bold font-serif uppercase tracking-tight mb-4">{title}</h3>
    <p className="text-xl font-script leading-relaxed opacity-60 italic">{desc}</p>
    <Tape className="-top-3 right-6 w-20 rotate-[-8deg] opacity-30 bg-accent/20" />
  </motion.div>
);

const FAQItem = ({ question, answer, rotation = 0 }: { question: string, answer: string, rotation?: number }) => (
  <motion.div 
    initial={{ x: -30, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    className={cn(
      "p-8 bg-white border border-amber-900/5 shadow-[20px_20px_50px_rgba(0,0,0,0.04)] mb-8 last:mb-0 relative group",
      rotation > 0 ? "rotate-1" : "-rotate-1"
    )}
  >
    <h4 className="text-3xl font-bold font-outfit uppercase tracking-tighter mb-4 flex items-center gap-3">
      <Sparkles size={22} className="text-amber-400 group-hover:scale-125 transition-transform" /> {question}
    </h4>
    <p className="text-2xl font-hand leading-relaxed opacity-60 italic border-l-4 border-amber-100 pl-6">"{answer}"</p>
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, desc, price, rotation = 0 }: { icon: any, title: string, desc: string, price: string, rotation?: number }) => (
  <motion.div
    whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
    className={cn(
      "bg-white p-10 border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.03)] relative flex flex-col items-center text-center group transition-all",
      rotation > 0 ? "rotate-1.5" : "-rotate-1.5"
    )}
  >
    <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform shadow-sm">
      <Icon size={32} className="text-accent" />
    </div>
    <h3 className="text-4xl font-bold font-serif uppercase tracking-tight mb-6">{title}</h3>
    <p className="text-2xl opacity-60 font-script leading-relaxed mb-8">{desc}</p>
    <div className="mt-auto pt-6 border-t border-dashed border-black/10 w-full flex items-center justify-center gap-2">
      <Sparkles size={14} className="text-accent" />
      <span className="text-xl font-bold font-sans tracking-widest text-primary/40">{price}</span>
      <Sparkles size={14} className="text-accent" />
    </div>
    <Tape className="-top-3 -right-2 w-24 rotate-12 opacity-40 bg-accent/10" />
  </motion.div>
);



export default function Portfolio() {
  const [currentAboutImg, setCurrentAboutImg] = useState(0);
  const aboutImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative font-serif text-primary selection:bg-accent/30 selection:text-primary">
      {/* Texture & Pattern Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] bg-noise z-[100]" />
      <div className="fixed inset-0 pointer-events-none bg-pattern z-0" />
      <div className="fixed inset-0 pointer-events-none bg-grain opacity-5 z-0" />

      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[110] w-fit px-3 py-2 bg-paper/60 backdrop-blur-md rounded-full border border-black/5 shadow-2xl flex items-center gap-1 md:gap-3">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="px-4 py-1 border-r border-black/5 mr-1"
        >
          <span className="text-xl font-bold uppercase tracking-widest font-serif">Pongo.</span>
        </motion.div>
        
        {[
          ["About", "#about"],
          ["Work", "#projects"],
          ["Process", "#process"],
          ["Contact", "#contact"]
        ].map(([label, href]) => (
          <a 
            key={label}
            href={href} 
            className="px-5 py-2 rounded-full hover:bg-primary transition-all group relative overflow-hidden"
          >
             <span className="relative z-10 text-xs md:text-sm font-bold uppercase tracking-[0.2em] group-hover:text-paper transition-colors font-sans">
              {label}
             </span>
          </a>
        ))}
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-6 pt-32 text-center relative overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-6xl"
            >
               <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.4em] mb-12 shadow-sm rounded-full">
                <Sparkles size={14} />
                <span>Selected Works & Experiments</span>
                <Sparkles size={14} />
              </div>
              <h1 className="text-[13vw] md:text-[9vw] font-bold uppercase tracking-tight leading-[0.8] mb-10 font-serif">
                Crafting <br />
                <span className="text-accent italic font-script lowercase tracking-normal -mt-4 block">digital legacies.</span>
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-xl md:text-2xl font-script opacity-60 max-w-2xl mx-auto leading-relaxed">
                <p>An independent Design Engineer bridging the tactile warmth of physical journals with surgical digital implementation.</p>
              </div>
            </motion.div>

            {/* Hero Image / Large Piece */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
               animate={{ opacity: 1, scale: 1, rotate: 1 }}
               transition={{ delay: 0.4, duration: 1.5 }}
               className="mt-20 relative w-full max-w-4xl mx-auto h-[400px] overflow-hidden group shadow-2xl"
            >
               <img src="/hero.png" className="w-full h-full object-cover filter brightness-95 sepia-[0.1] group-hover:scale-105 transition-transform duration-[3s]" />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
               <div className="absolute bottom-10 left-10 text-left">
                  <span className="text-paper/60 font-sans text-xs uppercase tracking-[0.5em] mb-2 block">Atmosphere — 001</span>
                  <h3 className="text-paper text-4xl font-serif italic">The Workspace.</h3>
               </div>
               <Tape className="-top-4 right-1/4 w-32 -rotate-12 bg-paper/20" />
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mt-20 flex flex-col items-center opacity-30 text-[10px] font-bold tracking-[0.5em] uppercase"
          >
            <span>Scroll to explore</span>
            <ChevronDown size={14} className="mt-4" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, rotate: -3 }}
            whileInView={{ opacity: 1, rotate: 1 }}
            viewport={{ once: true }}
            className="relative cursor-pointer group flex-1"
            onClick={() => setCurrentAboutImg((prev) => (prev + 1) % aboutImages.length)}
          >
            <div className="bg-white p-6 pb-20 shadow-[30px_30px_80px_rgba(0,0,0,0.05)] transition-all group-hover:shadow-[40px_40px_100px_rgba(0,0,0,0.1)]">
              <div className="aspect-[4/5] bg-paper-dark overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentAboutImg}
                    initial={{ opacity: 0, filter: "sepia(1) grayscale(1) blur(20px)" }}
                    animate={{ opacity: 1, filter: "sepia(0.2) grayscale(0.2) blur(0px)" }}
                    exit={{ opacity: 0, filter: "sepia(1) grayscale(1) blur(20px)" }}
                    transition={{ duration: 0.8 }}
                    src={aboutImages[currentAboutImg]} 
                    alt="Pongo" 
                    className="w-full h-full object-cover" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-3xl font-bold italic font-script text-primary/40 transition-transform group-hover:scale-105">"A snapshot of the curious."</p>
              </div>
            </div>
            <Tape className="-top-6 left-1/2 -translate-x-1/2 w-48 rotate-1 opacity-80 bg-accent/20" />
            <div className="absolute -bottom-6 -right-6 bg-primary text-paper px-6 py-2 font-bold uppercase tracking-[0.3em] text-[10px] hidden md:block rotate-6 shadow-xl font-sans">
              Tap to shuffle
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-12"
          >
            <div className="space-y-4">
               <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">Bio / Persona</span>
              <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tight leading-[0.9] font-serif">
                Not just <br />
                <span className="highlight">algorithms.</span>
              </h2>
            </div>
            <div className="text-2xl md:text-3xl font-script space-y-8 leading-relaxed text-primary/70">
              <p>
                I believe that digital interfaces should feel as warm and tactile as a physical notebook. My process is a slow dance between <span className="text-accent font-bold">intuitive ideation</span> and surgical implementation.
              </p>
              <p>
                I don't just build websites; I curate <span className="highlight font-sans text-xs tracking-[0.4em] font-bold uppercase px-3 py-1">Experience Ecosystems</span> that leave a lasting thumbprint on the user's sensory memory.
              </p>
            </div>
            <div className="pt-8 flex gap-10 opacity-20 hover:opacity-100 transition-all duration-500">
              <Heart className="hover:text-red-800 hover:fill-red-800 cursor-pointer transition-colors" size={28} strokeWidth={1.5} />
              <Camera size={28} strokeWidth={1.5} />
              <div className="w-10 h-[1px] bg-primary/20 self-center" />
              <Coffee size={28} strokeWidth={1.5} />
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32 px-6 md:px-20 bg-paper-dark/30 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8">
              <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tight leading-[0.85] font-serif">
                Selected <br />
                <span className="text-accent italic font-script lowercase">exhibits.</span>
              </h2>
              <div className="max-w-xs space-y-4">
                <p className="text-2xl font-script opacity-50">A curation of things built with precision, intent, and an unhealthy amount of tea.</p>
                <div className="h-[1px] w-20 bg-primary/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-32 items-start">
              <ProjectCard 
                title="Hyperlight" 
                desc="A modular neural-engine for reactive web physics." 
                img="/creative_code.png" 
                rotation={-2}
              />
              <ProjectCard 
                title="Vantage VII" 
                desc="The definitive interface kit for modern storytellers." 
                img="/design_system.png" 
                rotation={1}
              />
              <div className="lg:pt-24">
                <ProjectCard 
                  title="Canvas Soul" 
                  desc="Generative art platform bridging math and emotion." 
                  img="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"
                  rotation={-3} 
                />
              </div>
              <ProjectCard 
                title="Monolith" 
                desc="Minimalistic state engine for high-traffic apps." 
                img="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
                rotation={2} 
              />
              <ProjectCard 
                title="Arcane.js" 
                desc="Pushing the boundaries of visual browser scripting." 
                img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
                rotation={-1} 
              />
            </div>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section id="journey" className="py-32 px-6 md:px-20 relative bg-[#fffdf5]">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-32 space-y-4">
                <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">The Narrative</span>
                <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tight relative z-10 font-serif">Chronicles.</h2>
             </div>
            
            <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
              <div className="absolute border-opacity-5 border-primary h-full border-2 left-1/2 -translate-x-1/2 hidden md:block border-dashed" />
              
              <TimelineItem 
                year="2026" 
                title="Lead Creative" 
                company="Eos Labs" 
                desc="Orchestrating high-end digital environments for avant-garde luxury brands." 
                side="left"
              />
              <TimelineItem 
                year="2024" 
                title="Design Engineer" 
                company="Flux Studios" 
                desc="Bridging the gap between conceptual 3D design and high-performance frontend architecture." 
                side="right"
              />
              <TimelineItem 
                year="2022" 
                title="Creative Coder" 
                company="Independent" 
                desc="Deep dives into WebGL, shaders, and the poetry of generative systems." 
                side="left"
              />
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-32 px-6 md:px-20 bg-paper-dark/20">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-16">
                <div className="space-y-6">
                   <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">Methodology</span>
                    <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tight max-w-2xl leading-[0.8] font-serif">
                      The <br />
                      <span className="highlight italic font-script lowercase tracking-normal">sculpting</span> <br/> 
                      process.
                    </h2>
                </div>
                <div className="bg-white p-10 border border-black/5 rotate-2 max-w-sm shadow-xl font-script text-2xl leading-relaxed text-primary/60">
                  "Digital artifacts are not programmed; they are curated. Chaos is our primary medium."
                  <div className="mt-4 flex justify-end">
                     <span className="font-sans text-[10px] uppercase font-bold tracking-widest">— Journal v02</span>
                  </div>
                </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
                <ProcessCard 
                  number="01" 
                  title="Sketch" 
                  desc="Unfiltered observations. This is where abstract feelings become tangible lines." 
                  icon={PenTool}
                  rotation={-2}
                />
                <ProcessCard 
                  number="02" 
                  title="Frame" 
                  desc="Structure and flow. Designing the invisible paths that guide the soul." 
                  icon={Layers}
                  rotation={1.5}
                />
                <ProcessCard 
                  number="03" 
                  title="Forge" 
                  desc="High-performance implementation. Writing code that feels like poetry." 
                  icon={Code}
                  rotation={-1}
                />
                <ProcessCard 
                  number="04" 
                  title="Polish" 
                  desc="The final breath. Adding the micro-interactions that make it feel alive." 
                  icon={Zap}
                  rotation={2.5}
                />
             </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-32 space-y-4">
                <span className="font-sans font-bold uppercase tracking-[0.4em] text-[10px] text-accent">Collaborate</span>
                <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tight mt-4 leading-none font-serif text-primary">Can I help?</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <ServiceCard 
                  icon={Globe} 
                  title="Web Design" 
                  desc="Bespoke interfaces that tell your brand's unique story through high-fidelity pixels." 
                  price="Custom Quote"
                  rotation={-1.5}
                />
                <ServiceCard 
                  icon={Zap} 
                  title="Architect" 
                  desc="High-performance codebases built with Next.js, Framer Motion, and surgical polish." 
                  price="Weekly Rate"
                  rotation={1}
                />
                <ServiceCard 
                  icon={MessageCircle} 
                  title="Creative" 
                  desc="Direct consulting to refine your product's visual identity and emotional resonance." 
                  price="Coffee & Call"
                  rotation={-1}
                />
             </div>
          </div>
        </section>


        {/* TOOLS SECTION */}
        <section id="tools" className="py-32 px-6 md:px-20 relative overflow-hidden bg-paper-dark/10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-8">
              <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">Tech Stack</span>
              <h2 className="text-7xl md:text-8xl font-bold uppercase tracking-tight relative font-serif">Modern <br /><span className="italic font-script lowercase tracking-normal text-accent">armory.</span></h2>
              <p className="text-2xl md:text-3xl font-script text-primary/40 max-w-md">
                A selection of technologies I use to bridge the gap between imagination and browser reality.
              </p>
            </div>

            <div className="flex-1 flex flex-wrap gap-6 justify-center lg:justify-end">
              <ToolSticker label="React" icon={Code} color="bg-paper" delay={0.1} />
              <ToolSticker label="Next.js" icon={Globe} color="bg-white" delay={0.2} />
              <ToolSticker label="Motion" icon={Zap} color="bg-accent text-paper" delay={0.3} />
              <ToolSticker label="Tailwind" icon={Layers} color="bg-paper" delay={0.4} />
              <ToolSticker label="TypeScript" icon={PenTool} color="bg-white" delay={0.5} />
              <ToolSticker label="Shaders" icon={Sparkles} color="bg-paper-dark" delay={0.6} />
            </div>
          </div>
        </section>

        {/* SCRAPBOOK SECTION */}
        <section id="bits" className="py-32 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-32 gap-12 text-center md:text-left">
              <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tight leading-none font-serif">
                The <br />
                <span className="text-accent italic font-script lowercase">scrapbook.</span>
              </h2>
              <div className="bg-primary text-paper px-8 py-3 rotate-2 shadow-2xl font-sans text-xs font-bold uppercase tracking-[0.5em]">
                Edition 02.
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-12 space-y-12">
              <Polaroid img="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600" caption="Vintage Optics" rotation={-3} />
              <Polaroid img="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600" caption="Studio Vibes" rotation={2} />
              <Polaroid img="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600" caption="Analog Flows" rotation={-2} />
              <Polaroid img="https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?q=80&w=600" caption="Morning Ritual" rotation={4} />
              <Polaroid img="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600" caption="Deep Work" rotation={-2} />
              <Polaroid img="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600" caption="Layer Zero" rotation={2} />
            </div>
          </div>
        </section>

        {/* VIBE SECTION */}
        <section id="vibe" className="py-32 px-6 md:px-20 bg-primary text-paper overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-1 bg-accent text-paper font-bold uppercase tracking-[0.4em] text-[10px] mb-6 rounded-full font-sans">
                Now Playing
              </div>
              <h2 className="text-7xl md:text-8xl font-bold uppercase tracking-tight leading-none mb-6 font-serif">Auditory <br /><span className="italic font-script lowercase tracking-normal text-accent">fuel.</span></h2>
              <p className="text-2xl md:text-3xl font-script opacity-40 leading-relaxed max-w-lg mx-auto lg:mx-0">
                The frequencies I tune into while building digital worlds. Music is half the process.
              </p>
            </div>
            
            <div className="w-full lg:w-[600px]">
              <div className="bg-white/5 backdrop-blur-xl p-10 border border-white/10 shadow-2xl relative rotate-1">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
                   <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                      <h3 className="text-xl font-bold uppercase tracking-[0.2em] font-serif">Midnight Journal</h3>
                   </div>
                  <Zap className="text-accent" size={18} />
                </div>
                <div className="space-y-2">
                  <TrackItem title="Digital Bloom" artist="Synapse" time="4:12" />
                  <TrackItem title="Ether" artist="Velvet" time="3:45" />
                  <TrackItem title="Paper Theory" artist="Mogra" time="5:20" />
                  <TrackItem title="Static Rain" artist="Echo" time="2:58" />
                </div>
                <Tape className="-bottom-4 left-12 w-32 rotate-2 bg-accent/30" />
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-32 px-6 md:px-20 relative overflow-hidden bg-paper-dark/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24 space-y-4">
               <span className="font-sans font-bold uppercase tracking-[0.5em] text-[10px] opacity-40">Attestations</span>
               <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tight relative z-10 font-serif text-primary">Wall of Love.</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12">
              <TestimonialNote 
                text="The most creative developer I've worked with. They bring a soul to every digital object." 
                author="Sarah J. (Magic Co)"
                rotation={-2}
              />
              <TestimonialNote 
                text="Absolutely stunning aesthetics and surgical performance. A rare combination." 
                author="Alex Chen (Dream Lab)"
                rotation={1.5}
                color="bg-white"
              />
              <TestimonialNote 
                text="They transformed our messy ideas into a beautiful, cohesive digital journal." 
                author="Mika (Studio K)"
                rotation={-1}
                color="bg-paper-dark/50"
              />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden bg-paper">
          <motion.div 
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl w-full relative text-center"
          >
            <div className="space-y-12">
               <h2 className="text-[14vw] md:text-[10vw] font-bold uppercase tracking-tight leading-none font-serif">
                Start a <br />
                <span className="text-accent font-script lowercase italic tracking-normal block -mt-4">correspondence.</span>
              </h2>
              <p className="text-3xl md:text-4xl font-script opacity-40 max-w-2xl mx-auto leading-relaxed">
                Have a wild idea or a structured project? I'm always looking for the next creative spark.
              </p>
              
              <div className="flex flex-col items-center gap-12 pt-12">
                <a 
                  href="mailto:hello@pongo.dev" 
                  className="group relative inline-block text-4xl md:text-6xl font-bold uppercase tracking-tight overflow-hidden font-serif"
                >
                  <span className="relative z-10 group-hover:text-accent transition-colors">hello@pongo.dev</span>
                  <div className="absolute bottom-2 left-0 w-full h-[2px] bg-accent/40 -rotate-1 group-hover:h-full transition-all duration-500" />
                </a>
                
                <div className="flex gap-16 opacity-30 hover:opacity-100 transition-all duration-700">
                  {["Github", "Dribbble", "LinkedIn"].map(label => (
                    <a key={label} href="#" className="text-xs font-bold uppercase tracking-[0.5em] hover:text-accent transition-colors font-sans">
                      {label}.
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-40 pt-20 border-t border-black/5 flex flex-col items-center gap-8">
               <div className="font-script text-3xl opacity-20 italic">PONGO curated &copy; 2026</div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-primary/10" />
                  <Sparkles className="text-accent/30" size={14} />
                  <div className="w-12 h-[1px] bg-primary/10" />
               </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Background Doodle Elements */}
      <div className="fixed bottom-10 left-10 opacity-5 -rotate-12 pointer-events-none hidden xl:block">
        <PenTool size={300} strokeWidth={0.5} />
      </div>
    </div>
  );
}
