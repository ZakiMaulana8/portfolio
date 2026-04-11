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

// Visual components from 'mogra'
const CuteFlower = ({ className, rotationBase = 0, delay = 0 }: { className?: string, rotationBase?: number, delay?: number }) => (
  <motion.svg 
    animate={{ 
      rotate: [rotationBase - 12, rotationBase + 12, rotationBase - 12],
      scale: [1, 1.1, 1] 
    }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    className={cn("drop-shadow-xl pointer-events-none filter sepia-[0.1]", className)} 
    viewBox="0 0 100 100" 
    fill="none" 
  >
    <circle cx="50" cy="20" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="80" cy="50" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="50" cy="80" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="20" cy="50" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="28" cy="28" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="72" cy="28" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="72" cy="72" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    <circle cx="28" cy="72" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2" />
    
    <circle cx="50" cy="50" r="18" className="fill-amber-400 stroke-amber-900" strokeWidth="2" />
    <circle cx="43" cy="45" r="3.5" className="fill-amber-900" />
    <circle cx="57" cy="45" r="3.5" className="fill-amber-900" />
    <path d="M 40 58 Q 50 68 60 58" className="stroke-amber-900" strokeWidth="2.5" strokeLinecap="round" />
  </motion.svg>
);

const Tape = ({ className, color = "bg-amber-100/80" }: { className?: string, color?: string }) => (
  <div 
    className={cn(
      "absolute h-10 backdrop-blur-[2px] border border-black/5 shadow-sm z-20 tape",
      color,
      className
    )} 
  />
);

const ProjectCard = ({ title, desc, img, rotation = 0 }: { title: string, desc: string, img: string, rotation?: number }) => (
  <motion.div 
    initial={{ rotate: rotation, opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ rotate: 0, scale: 1.05, y: -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    viewport={{ once: true }}
    className="relative group cursor-pointer w-full max-w-[450px]"
  >
    <div className="bg-white p-4 pb-14 border border-amber-900/10 shadow-[20px_20px_60px_rgba(120,53,15,0.08)] group-hover:shadow-[30px_30px_80px_rgba(120,53,15,0.12)] transition-shadow">
      <div className="aspect-[4/3] bg-amber-50 overflow-hidden relative">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover sepia-filter group-hover:sepia-0 group-hover:scale-110 transition-all duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-6 px-2">
        <h3 className="text-3xl font-bold font-outfit uppercase tracking-tighter mb-1">{title}</h3>
        <p className="text-xl opacity-60 font-hand leading-tight">{desc}</p>
      </div>
      <div className="absolute bottom-4 right-6 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        <Rocket size={24} className="text-amber-500" />
      </div>
    </div>
    <Tape className="-top-4 left-10 w-28 -rotate-6 opacity-60" />
    <Tape className="-bottom-2 right-12 w-24 rotate-3 opacity-40 bg-amber-200" />
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
      whileHover={{ scale: 1.15, rotate: 0, zIndex: 30 }}
      className={cn(
        "px-8 py-4 border border-amber-900/10 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] flex items-center gap-4 cursor-default transition-all hover:shadow-xl",
        color
      )}
    >
      <Icon size={24} className="text-amber-900/70" />
      <span className="text-xl font-bold uppercase font-outfit tracking-widest">{label}</span>
    </motion.div>
  );
};

const Polaroid = ({ img, caption, rotation = 0 }: { img: string, caption: string, rotation?: number }) => (
  <motion.div
    whileHover={{ scale: 1.08, rotate: rotation / 2, zIndex: 10 }}
    initial={{ opacity: 0, scale: 0.9, rotate: rotation }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={cn(
      "bg-white p-4 pb-16 border border-amber-900/5 shadow-[15px_15px_40px_rgba(0,0,0,0.08)] transition-all break-inside-avoid relative",
      rotation > 0 ? "rotate-3" : "-rotate-3"
    )}
  >
    <div className="aspect-square bg-amber-50 overflow-hidden mb-6 relative">
      <img src={img} alt={caption} className="w-full h-full object-cover sepia-filter hover:sepia-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
      <div className="absolute inset-0 border-[10px] border-white/10 pointer-events-none" />
    </div>
    <p className="text-3xl font-hand text-center font-bold tracking-tight text-amber-900/80">{caption}</p>
    <Tape className="-top-5 left-1/2 -translate-x-1/2 w-24 rotate-1 opacity-70 bg-amber-100/90" />
  </motion.div>
);

const TrackItem = ({ title, artist, time }: { title: string, artist: string, time: string }) => (
  <div className="flex items-center justify-between py-5 border-b border-amber-900/5 group cursor-pointer hover:bg-amber-100/30 px-4 transition-all rounded-lg">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-amber-50 border border-amber-900/10 flex items-center justify-center text-amber-900/40 group-hover:text-amber-600 transition-colors">
        <Zap size={20} className="group-hover:animate-bounce" />
      </div>
      <div>
        <h4 className="text-2xl font-bold font-outfit uppercase tracking-tighter leading-none mb-1">{title}</h4>
        <p className="text-xl font-hand opacity-50 leading-none">{artist}</p>
      </div>
    </div>
    <span className="text-lg font-outfit opacity-30 group-hover:opacity-100 transition-opacity italic">{time}</span>
  </div>
);

const TestimonialNote = ({ text, author, rotation = 0, color = "bg-amber-50" }: { text: string, author: string, rotation?: number, color?: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    initial={{ rotate: rotation, opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "p-8 border border-amber-900/5 shadow-[20px_20px_50px_rgba(120,53,15,0.05)] relative max-w-[320px] transition-all",
      color
    )}
  >
    <div className="flex justify-between items-start mb-6">
      <MessageCircle size={24} className="text-amber-400/50" />
      <div className="w-4 h-4 rounded-full bg-amber-900/5" />
    </div>
    <p className="text-2xl font-hand italic leading-snug mb-8 text-amber-950/80">"{text}"</p>
    <div className="border-t border-amber-900/10 pt-4">
      <p className="text-xl font-bold font-outfit uppercase tracking-wider text-amber-600">- {author}</p>
    </div>
    <Tape className="-top-4 left-1/4 w-24 rotate-12 opacity-90" />
  </motion.div>
);

const TimelineItem = ({ year, title, company, desc, side = "left" }: { year: string, title: string, company: string, desc: string, side?: "left" | "right" }) => (
  <div className={cn(
    "flex w-full mb-20 items-center justify-between",
    side === "right" ? "flex-row-reverse" : "flex-row"
  )}>
    <div className="hidden md:block w-5/12" />
    <div className="z-20 flex items-center order-1 bg-amber-400 border border-amber-900/20 shadow-xl w-16 h-16 rounded-full relative group hover:scale-110 transition-transform">
      <h1 className="mx-auto font-bold text-2xl font-outfit">{year}</h1>
      <div className="absolute -top-2 -right-2 group-hover:block hidden">
        <Sparkles size={20} className="text-amber-900" />
      </div>
    </div>
    <motion.div 
      initial={{ x: side === "left" ? -60 : 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={cn(
        "order-1 bg-white p-8 border border-amber-900/5 shadow-[30px_30px_60px_rgba(0,0,0,0.04)] w-full md:w-5/12 relative group",
        side === "right" ? "rotate-1" : "-rotate-1"
      )}
    >
      <h3 className="mb-2 font-bold font-outfit text-amber-950 text-3xl uppercase tracking-tighter leading-none">{title}</h3>
      <h4 className="mb-6 font-bold font-hand text-amber-500 text-2xl italic">{company}</h4>
      <p className="text-2xl font-hand leading-relaxed opacity-70">{desc}</p>
      <Tape className={cn("-top-5 w-32", side === "left" ? "-right-8 rotate-12" : "-left-8 -rotate-12")} />
    </motion.div>
  </div>
);

const ProcessCard = ({ number, title, desc, icon: Icon, rotation = 0 }: { number: string, title: string, desc: string, icon: any, rotation?: number }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -15, rotate: rotation / 2 }}
    className={cn(
      "bg-white p-10 border border-amber-900/5 shadow-[25px_25px_60px_rgba(0,0,0,0.06)] relative min-w-[280px] flex-1 transition-all",
      rotation > 0 ? "rotate-2" : "-rotate-2"
    )}
  >
    <div className="absolute -top-7 -left-7 w-14 h-14 bg-amber-400 border border-amber-900/10 flex items-center justify-center font-bold text-3xl font-outfit rotate-[-10deg] shadow-lg">
      {number}
    </div>
    <div className="mb-8 text-amber-500">
      <Icon size={48} strokeWidth={1} />
    </div>
    <h3 className="text-3xl font-bold font-outfit uppercase tracking-tighter mb-4">{title}</h3>
    <p className="text-2xl font-hand leading-relaxed opacity-60">{desc}</p>
    <Tape className="-top-4 right-6 w-24 rotate-[-10deg] opacity-40 bg-amber-200" />
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
    whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
    className={cn(
      "bg-white p-10 border border-amber-900/5 shadow-[25px_25px_70px_rgba(120,53,15,0.06)] relative flex flex-col items-center text-center group transition-all",
      rotation > 0 ? "rotate-2" : "-rotate-2"
    )}
  >
    <div className="w-20 h-20 bg-amber-400 border border-amber-900/5 flex items-center justify-center mb-8 -rotate-6 group-hover:rotate-0 transition-transform shadow-lg">
      <Icon size={40} className="text-amber-950" />
    </div>
    <h3 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-6">{title}</h3>
    <p className="text-2xl opacity-60 font-hand leading-relaxed mb-8">{desc}</p>
    <div className="mt-auto pt-6 border-t border-dashed border-amber-900/10 w-full flex items-center justify-center gap-3">
      <Sparkles size={18} className="text-amber-400" />
      <span className="text-3xl font-bold font-hand italic text-amber-600">{price}</span>
      <Sparkles size={18} className="text-amber-400" />
    </div>
    <Tape className="-top-4 -right-2 w-28 rotate-12 opacity-60 bg-amber-50" />
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
    <div className="min-h-screen overflow-x-hidden relative font-outfit text-amber-950 font-[450] selection:bg-amber-300/30">
      {/* Texture & Pattern Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-noise z-[100]" />
      <div className="fixed inset-0 pointer-events-none bg-pattern z-0" />

      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[90] w-fit px-2 py-2 glass rounded-full shadow-2xl flex items-center gap-1 md:gap-2">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="px-4 py-2 border-r border-amber-900/10 mr-2"
        >
          <span className="text-xl font-bold uppercase tracking-tighter">Pongo.</span>
        </motion.div>
        
        {[
          ["About", "#about"],
          ["Work", "#projects"],
          ["Tools", "#tools"],
          ["Contact", "#contact"]
        ].map(([label, href]) => (
          <a 
            key={label}
            href={href} 
            className="px-4 py-2 rounded-full hover:bg-amber-900 overflow-hidden relative group transition-colors"
          >
             <span className="relative z-10 text-sm md:text-base font-bold uppercase tracking-widest group-hover:text-amber-50 transition-colors">
              {label}
             </span>
          </a>
        ))}
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-6 pt-32 text-center relative">
          <div className="relative z-10">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="max-w-5xl"
            >
               <div className="inline-block px-4 py-1 bg-amber-400 text-amber-950 text-sm font-bold uppercase tracking-[0.3em] mb-8 shadow-sm">
                Creative Bits & Bytes
              </div>
              <h1 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.85] mb-8 font-outfit">
                Messy but <br />
                <span className="text-amber-600 italic font-hand lowercase tracking-normal">intentional.</span>
              </h1>
              <div className="flex items-center justify-center gap-6 text-2xl md:text-3xl font-hand opacity-60">
                <Sparkles className="animate-float" />
                <p>Digital designer exploring the beauty of organized chaos.</p>
                <Sparkles className="animate-float delay-500" />
              </div>
            </motion.div>

            {/* Floating Assets */}
            <div className="absolute -top-32 -left-32 opacity-10 blur-sm pointer-events-none hidden lg:block">
              <CuteFlower className="w-96 h-96" />
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-12 flex flex-col items-center opacity-30 text-sm font-bold tracking-widest uppercase"
          >
            <span>Dip into the journal</span>
            <ChevronDown size={20} className="mt-2" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
            viewport={{ once: true }}
            className="relative cursor-pointer group flex-1"
            onClick={() => setCurrentAboutImg((prev) => (prev + 1) % aboutImages.length)}
          >
            <div className="bg-white p-6 pb-24 shadow-[40px_40px_80px_rgba(120,53,15,0.08)] transition-all group-hover:shadow-[50px_50px_100px_rgba(120,53,15,0.12)]">
              <div className="aspect-square bg-amber-50 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentAboutImg}
                    initial={{ opacity: 0, filter: "sepia(1) blur(10px)" }}
                    animate={{ opacity: 1, filter: "sepia(0.2) blur(0px)" }}
                    exit={{ opacity: 0, filter: "sepia(1) blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    src={aboutImages[currentAboutImg]} 
                    alt="Me" 
                    className="w-full h-full object-cover" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-amber-950/10 mix-blend-overlay" />
              </div>
              <div className="absolute bottom-8 left-0 w-full text-center">
                <p className="text-4xl font-bold italic font-hand text-amber-900/60 transition-transform group-hover:scale-110">"Snapshot of a curious mind."</p>
              </div>
            </div>
            <Tape className="-top-6 left-1/2 -translateX-1/2 w-48 rotate-2 opacity-80" />
            <div className="absolute -bottom-8 -right-8 bg-amber-950 text-amber-50 px-6 py-3 font-bold uppercase tracking-widest text-xs hidden md:block rotate-12 shadow-xl">
              Tap to shuffle
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex-1 space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Not just <br />
                <span className="highlight">pixels.</span>
              </h2>
            </div>
            <div className="text-2xl md:text-3xl font-hand space-y-8 leading-relaxed text-amber-950/70">
              <p>
                I'm a <span className="text-amber-600 font-bold">Creative Developer</span> who believes that digital interfaces should feel as warm and tactile as a physical notebook.
              </p>
              <p>
                My process is a slow dance between chaotic ideation and surgical implementation. I don't build websites; I curate <span className="highlight uppercase text-sm tracking-widest font-outfit">Digital Experiences</span> that leave a thumbprint on the user's memory.
              </p>
            </div>
            <div className="pt-10 flex gap-8 opacity-20 hover:opacity-100 transition-opacity">
              <Heart className="hover:fill-red-500 hover:text-red-500 cursor-pointer transition-all" size={32} />
              <Camera size={32} />
              <Coffee size={32} />
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32 px-6 md:px-20 bg-amber-50/20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
              <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
                Selected <br />
                <span className="text-amber-500 italic font-hand lowercase">works.</span>
              </h2>
              <p className="text-2xl font-hand opacity-50 max-w-sm">A collection of things I've built with love, sweat, and several cups of tea.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 items-start">
              <ProjectCard 
                title="Hyperlight" 
                desc="A modular animation library for the web." 
                img="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800" 
                rotation={-3}
              />
              <ProjectCard 
                title="Vantage UI" 
                desc="Premium interface kit for creators." 
                img="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" 
                rotation={2}
              />
              <div className="lg:pt-24">
                <ProjectCard 
                  title="Canvas Soul" 
                  desc="Generative art platform." 
                  img="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"
                  rotation={-4} 
                />
              </div>
              <ProjectCard 
                title="Monolith" 
                desc="Minimalistic state engine." 
                img="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
                rotation={3} 
              />
              <ProjectCard 
                title="Arcane.js" 
                desc="The future of visual scripting." 
                img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
                rotation={-2} 
              />
            </div>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section id="journey" className="py-32 px-6 md:px-20 relative bg-[#fffdf5]">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-32">
                <h2 className="text-8xl md:text-[10rem] font-bold uppercase tracking-tighter leading-none opacity-[0.05] absolute top-20 left-1/2 -translate-x-1/2 w-full">The Story</h2>
                <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter relative z-10">Professional Path</h2>
             </div>
            
            <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
              <div className="absolute border-opacity-10 border-amber-900 h-full border-2 left-1/2 -translate-x-1/2 hidden md:block border-dashed" />
              
              <TimelineItem 
                year="Present" 
                title="Design Engineer" 
                company="Independent" 
                desc="Crafting bespoke digital experiences for global brands and startups that value design." 
                side="left"
              />
              <TimelineItem 
                year="2022" 
                title="Sr. Frontend Dev" 
                company="Flux Studios" 
                desc="Led the development of high-performance interactive 3D web applications." 
                side="right"
              />
              <TimelineItem 
                year="2020" 
                title="Creative Coder" 
                company="Neon Labs" 
                desc="Experimented with WebGL and shaders to push the boundaries of browser tech." 
                side="left"
              />
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-32 px-6 md:px-20 bg-amber-400/[0.03]">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row items-center justify-between mb-32 gap-12">
                <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter max-w-2xl leading-[0.85]">
                  How I <br />
                  <span className="highlight">build things.</span>
                </h2>
                <div className="bg-amber-100 p-8 border border-amber-900/5 rotate-2 max-w-xs shadow-xl font-hand text-2xl">
                  "Chaos is the beginning of every great idea, but structure is how we survive it."
                </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-16 lg:gap-10 items-stretch">
                <ProcessCard 
                  number="01" 
                  title="Scribble" 
                  desc="Pen, paper, and unfiltered thoughts. This is where the magic (and the mess) starts." 
                  icon={PenTool}
                  rotation={-3}
                />
                <ProcessCard 
                  number="02" 
                  title="Wire" 
                  desc="Connecting the dots. Translating abstract feelings into usable flows." 
                  icon={Layers}
                  rotation={2}
                />
                <ProcessCard 
                  number="03" 
                  title="Forge" 
                  desc="Writing code that feels like poetry. Building with longevity and performance in mind." 
                  icon={Code}
                  rotation={-2}
                />
                <ProcessCard 
                  number="04" 
                  title="Polished" 
                  desc="The final 1%. Adding transitions, micro-interactions, and that special secret sauce." 
                  icon={Zap}
                  rotation={4}
                />
             </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-32">
                <span className="font-outfit font-bold uppercase tracking-[0.4em] text-sm text-amber-500">Collaborate</span>
                <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter mt-4 leading-none">Can I help?</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <ServiceCard 
                  icon={Globe} 
                  title="Web Design" 
                  desc="Tailor-made interfaces that tell your brand's unique story through pixels." 
                  price="Custom Quote"
                  rotation={-3}
                />
                <ServiceCard 
                  icon={Zap} 
                  title="Development" 
                  desc="Clean, modern codebases built with Next.js, Framer Motion, and high polish." 
                  price="Weekly Rate"
                  rotation={2}
                />
                <ServiceCard 
                  icon={MessageCircle} 
                  title="Strategy" 
                  desc="Creative consulting to help refine your product's vibe and user experience." 
                  price="Coffee & Call"
                  rotation={-2}
                />
             </div>
          </div>
        </section>


        {/* TOOLS SECTION */}
        <section id="tools" className="py-32 px-6 md:px-20 relative overflow-hidden bg-white/40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
            <div className="flex-1 space-y-8">
              <h2 className="text-7xl md:text-[10rem] font-bold uppercase tracking-tighter leading-none opacity-[0.05] absolute top-20 left-20">Tools</h2>
              <h2 className="text-7xl md:text-8xl font-bold uppercase tracking-tighter relative">Modern <br />Armory.</h2>
              <p className="text-2xl md:text-3xl font-hand text-amber-950/50 max-w-md">
                A selection of technologies I use to bridge the gap between imagination and reality.
              </p>
            </div>

            <div className="flex-1 flex flex-wrap gap-8 justify-center">
              <ToolSticker label="React" icon={Code} color="bg-amber-100" delay={0.1} />
              <ToolSticker label="Next.js" icon={Globe} color="bg-white" delay={0.2} />
              <ToolSticker label="Motion" icon={Zap} color="bg-amber-400" delay={0.3} />
              <ToolSticker label="Tailwind" icon={Layers} color="bg-amber-100" delay={0.4} />
              <ToolSticker label="TypeScript" icon={PenTool} color="bg-white" delay={0.5} />
              <ToolSticker label="Vite" icon={Sparkles} color="bg-amber-200" delay={0.6} />
            </div>
          </div>
        </section>

        {/* SCRAPBOOK SECTION */}
        <section id="bits" className="py-32 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-32 gap-12 text-center md:text-left">
              <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
                The <br />
                <span className="text-amber-500 italic font-hand lowercase">scrapbook.</span>
              </h2>
              <div className="bg-amber-950 text-amber-50 px-8 py-4 rotate-3 shadow-2xl">
                <span className="text-xl font-bold uppercase tracking-[0.3em]">Volume 02.</span>
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-12 space-y-12">
              <Polaroid img="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600" caption="Vintage Optics" rotation={-5} />
              <Polaroid img="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600" caption="Studio Vibes" rotation={4} />
              <Polaroid img="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600" caption="Analog Flows" rotation={-3} />
              <Polaroid img="https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?q=80&w=600" caption="Morning Ritual" rotation={6} />
              <Polaroid img="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600" caption="Deep Work" rotation={-4} />
              <Polaroid img="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600" caption="Layer Zero" rotation={3} />
            </div>
          </div>
        </section>

        {/* VIBE SECTION */}
        <section id="vibe" className="py-32 px-6 md:px-20 bg-amber-950 text-amber-50 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400 rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-amber-400 text-amber-950 font-bold uppercase tracking-widest text-sm mb-6">
                Now Playing
              </div>
              <h2 className="text-7xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">Auditory <br />Fuel.</h2>
              <p className="text-2xl md:text-3xl font-hand opacity-60 leading-relaxed max-w-lg mx-auto lg:mx-0">
                The frequencies I tune into while building digital worlds. Music is half the process.
              </p>
            </div>
            
            <div className="w-full lg:w-[600px]">
              <div className="bg-white/5 backdrop-blur-xl p-10 border border-white/10 shadow-2xl relative rotate-1">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
                   <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                      <h3 className="text-2xl font-bold uppercase tracking-widest">Late Night Journal</h3>
                   </div>
                  <Zap className="text-amber-400" />
                </div>
                <div className="space-y-4">
                  <TrackItem title="Digital Bloom" artist="Synapse" time="4:12" />
                  <TrackItem title="Ether" artist="Velvet" time="3:45" />
                  <TrackItem title="Paper Theory" artist="Mogra" time="5:20" />
                  <TrackItem title="Static Rain" artist="Echo" time="2:58" />
                </div>
                <Tape className="-bottom-5 left-12 w-32 rotate-2 bg-amber-400/80" />
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-32 px-6 md:px-20 relative overflow-hidden bg-amber-50/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none opacity-[0.05] absolute top-20 left-1/2 -translate-x-1/2 w-full">Kind Words</h2>
              <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter relative z-10">Wall of Love</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12">
              <TestimonialNote 
                text="The most creative developer I've worked with. They bring a soul to every project." 
                author="Sarah J. (Magic Co)"
                rotation={-3}
              />
              <TestimonialNote 
                text="Absolutely stunning aesthetics and smooth performance. A rare combination." 
                author="Alex Chen (Dream Lab)"
                rotation={2}
                color="bg-white"
              />
              <TestimonialNote 
                text="They transformed our messy ideas into a beautiful, cohesive digital journal." 
                author="Mika (Studio K)"
                rotation={-1}
                color="bg-amber-100"
              />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden bg-[#fffdf5]">
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl w-full relative text-center"
          >
            <div className="space-y-12">
               <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none">
                Start a <br />
                <span className="text-amber-600 font-hand lowercase italic tracking-normal">conversation.</span>
              </h2>
              <p className="text-3xl md:text-4xl font-hand opacity-50 max-w-2xl mx-auto">
                Have a wild idea or a structured project? I'm always looking for the next creative spark.
              </p>
              
              <div className="flex flex-col items-center gap-12 pt-12">
                <a 
                  href="mailto:pongo@design.dev" 
                  className="group relative inline-block text-4xl md:text-6xl font-bold uppercase tracking-tighter overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-amber-600 transition-colors">hello@pongo.dev</span>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-400 -rotate-1 group-hover:h-full transition-all duration-300 opacity-30" />
                </a>
                
                <div className="flex gap-12 opacity-30 hover:opacity-100 transition-opacity">
                  {["Github", "Dribbble", "LinkedIn"].map(label => (
                    <a key={label} href="#" className="text-xl font-bold uppercase tracking-widest hover:text-amber-600 transition-colors">
                      {label}.
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-32 pt-20 border-t border-amber-900/5 flex flex-col items-center gap-6">
               <div className="font-hand text-3xl opacity-30 italic">Pongo &copy; 2026</div>
               <div className="flex items-center gap-2">
                  <div className="w-10 h-[1px] bg-amber-900/20" />
                  <Sparkles className="text-amber-400" size={16} />
                  <div className="w-10 h-[1px] bg-amber-900/20" />
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
