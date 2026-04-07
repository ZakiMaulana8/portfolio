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
  Briefcase
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
      rotate: [rotationBase - 8, rotationBase + 8, rotationBase - 8],
      scale: [1, 1.05, 1] 
    }}
    transition={{ duration: 4 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
    className={cn("drop-shadow-sm pointer-events-none", className)} 
    viewBox="0 0 100 100" 
    fill="none" 
  >
    {/* Kelopak Bunga (30% Warna - Amber 300) */}
    <circle cx="50" cy="20" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="80" cy="50" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="50" cy="80" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="20" cy="50" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="28" cy="28" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="72" cy="28" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="72" cy="72" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="28" cy="72" r="20" className="fill-amber-300 stroke-amber-900" strokeWidth="2.5" />
    
    <circle cx="50" cy="50" r="16" className="fill-amber-400 stroke-amber-900" strokeWidth="2.5" />
    <circle cx="43" cy="45" r="3" className="fill-amber-900" />
    <circle cx="57" cy="45" r="3" className="fill-amber-900" />
    <path d="M 43 55 Q 50 62 57 55" className="stroke-amber-900" strokeWidth="2.5" strokeLinecap="round" />
  </motion.svg>
);

const Tape = ({ className }: { className?: string }) => (
  <div 
    className={cn(
      "absolute h-8 bg-amber-100/90 backdrop-blur-sm border border-amber-300 shadow-[1px_2px_0px_rgba(120,53,15,0.2)] z-20 tape",
      className
    )} 
  />
);

const ProjectCard = ({ title, desc, img, rotation = 0 }: { title: string, desc: string, img: string, rotation?: number }) => (
  <motion.div 
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
    whileHover={{ rotate: 0, scale: 1.02 }}
    initial={{ rotate: rotation, opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group cursor-grab active:cursor-grabbing w-full max-w-[400px] mx-auto md:mx-0"
  >
    <div className="bg-white p-3 pb-12 border-2 border-amber-900 shadow-[6px_6px_0px_theme(colors.amber.900)] transition-all group-hover:shadow-[10px_10px_0px_theme(colors.amber.900)]">
      <div className="aspect-video bg-amber-200 border border-amber-900 overflow-hidden">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale-0 sepia-filter" 
        />
      </div>
      <div className="mt-4 px-2">
        <h3 className="text-3xl font-bold font-caveat">{title}</h3>
        <p className="text-xl opacity-80 font-caveat leading-tight">{desc}</p>
      </div>
      <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 group-hover:animate-spin transition-opacity">
        <Sparkles size={16} />
      </div>
    </div>
    <Tape className="-top-3 left-1/4 w-24 rotate-[-12deg]" />
  </motion.div>
);

const ToolSticker = ({ label, icon: Icon, delay = 0, color = "bg-white" }: { label: string, icon: any, delay?: number, color?: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: Math.random() * 20 - 10 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    whileHover={{ scale: 1.1, rotate: 0 }}
    className={cn(
      "px-6 py-3 border-2 border-amber-900 shadow-[4px_4px_0px_theme(colors.amber.900)] flex items-center gap-3 cursor-default transition-transform",
      color
    )}
  >
    <Icon size={20} />
    <span className="text-xl font-bold uppercase">{label}</span>
  </motion.div>
);

const TestimonialNote = ({ text, author, rotation = 0, color = "bg-amber-100" }: { text: string, author: string, rotation?: number, color?: string }) => (
  <motion.div
    drag
    dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    initial={{ rotate: rotation, opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "p-6 border-2 border-amber-900 shadow-[4px_4px_0px_theme(colors.amber.900)] relative max-w-[280px] cursor-grab active:cursor-grabbing",
      color
    )}
  >
    <div className="flex justify-between items-start mb-4">
      <MessageCircle size={20} className="opacity-30" />
      <div className="w-3 h-3 rounded-full bg-amber-900/10" />
    </div>
    <p className="text-2xl font-caveat italic leading-tight mb-6">"{text}"</p>
    <div className="border-t border-amber-900/20 pt-2 text-right">
      <p className="text-xl font-bold font-caveat">- {author}</p>
    </div>
    <Tape className="-top-3 left-1/3 w-20 rotate-12 opacity-80" />
  </motion.div>
);

const TimelineItem = ({ year, title, company, desc, side = "left" }: { year: string, title: string, company: string, desc: string, side?: "left" | "right" }) => (
  <div className={cn(
    "flex w-full mb-16 items-center justify-between",
    side === "right" ? "flex-row-reverse" : "flex-row"
  )}>
    <div className="hidden md:block w-5/12" />
    <div className="z-20 flex items-center order-1 bg-amber-400 border-4 border-amber-900 shadow-[4px_4px_0px_theme(colors.amber.900)] w-14 h-14 rounded-full relative group hover:scale-110 transition-transform">
      <h1 className="mx-auto font-bold text-xl uppercase">{year}</h1>
      <div className="absolute -top-1 -right-1 group-hover:block hidden">
        <Sparkles size={14} className="text-amber-900" />
      </div>
    </div>
    <motion.div 
      initial={{ x: side === "left" ? -50 : 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={cn(
        "order-1 bg-white p-6 border-2 border-amber-900 shadow-[8px_8px_0px_theme(colors.amber.400)] w-full md:w-5/12 relative group",
        side === "right" ? "rotate-1" : "-rotate-1"
      )}
    >
      <h3 className="mb-1 font-bold text-amber-950 text-2xl md:text-3xl uppercase leading-none">{title}</h3>
      <h4 className="mb-4 font-bold text-amber-600 text-xl italic">{company}</h4>
      <p className="text-2xl leading-tight opacity-90">{desc}</p>
      <Tape className={cn("-top-4 w-28", side === "left" ? "-right-6 rotate-12" : "-left-6 -rotate-12")} />
      
      <div className={cn(
        "absolute top-1/2 -translate-y-1/2 hidden md:block",
        side === "right" ? "-right-8" : "-left-8"
      )}>
        <PenTool className="opacity-10 group-hover:opacity-100 transition-opacity" size={24} />
      </div>
    </motion.div>
  </div>
);

export default function Portfolio() {
  const [currentAboutImg, setCurrentAboutImg] = useState(0);
  const aboutImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative font-caveat text-amber-950">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-pattern z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-8 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-amber-400 px-4 py-2 border-2 border-amber-900 shadow-[4px_4px_0px_theme(colors.amber.900)] -rotate-2 pointer-events-auto cursor-pointer hover:rotate-0 transition-transform"
        >
          <span className="text-2xl font-bold uppercase">Journal.</span>
        </motion.div>
        
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex gap-2 md:gap-4 pointer-events-auto"
        >
          <a href="#about" className="bg-amber-100 hover:bg-amber-300 px-3 py-1 md:px-5 md:py-2 border-2 border-amber-900 shadow-[3px_3px_0px_theme(colors.amber.900)] text-lg md:text-xl font-bold transition-all hover:-translate-y-1">About</a>
          <a href="#projects" className="bg-amber-100 hover:bg-amber-300 px-3 py-1 md:px-5 md:py-2 border-2 border-amber-900 shadow-[3px_3px_0px_theme(colors.amber.900)] text-lg md:text-xl font-bold transition-all hover:-translate-y-1">Work</a>
          <a href="#journey" className="bg-amber-100 hover:bg-amber-300 px-3 py-1 md:px-5 md:py-2 border-2 border-amber-900 shadow-[3px_3px_0px_theme(colors.amber.900)] text-lg md:text-xl font-bold transition-all hover:-translate-y-1">Journey</a>
          <a href="#tools" className="bg-amber-100 hover:bg-amber-300 px-3 py-1 md:px-5 md:py-2 border-2 border-amber-900 shadow-[3px_3px_0px_theme(colors.amber.900)] text-lg md:text-xl font-bold transition-all hover:-translate-y-1">Tools</a>
          <a href="#testimonials" className="bg-amber-100 hover:bg-amber-300 px-3 py-1 md:px-5 md:py-2 border-2 border-amber-900 shadow-[3px_3px_0px_theme(colors.amber.900)] text-lg md:text-xl font-bold transition-all hover:-translate-y-1">Words</a>
          <a href="#contact" className="bg-amber-100 hover:bg-amber-300 px-3 py-1 md:px-5 md:py-2 border-2 border-amber-900 shadow-[3px_3px_0px_theme(colors.amber.900)] text-lg md:text-xl font-bold transition-all hover:-translate-y-1">Say Hi</a>
        </motion.div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 text-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ type: "spring", damping: 10 }}
              className="bg-amber-400 p-8 md:p-12 border-4 border-amber-900 shadow-[10px_10px_0px_theme(colors.amber.900)] relative max-w-4xl"
            >
              <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tight leading-none mb-2">
                Creative Bits!
              </h1>
              <div className="flex items-center justify-center gap-3 text-2xl md:text-4xl font-bold">
                <Sparkles className="animate-pulse" />
                <p>Messy, but full of ideas.</p>
                <Sparkles className="animate-pulse delay-75" />
              </div>
              <Tape className="-top-4 -right-4 w-32 rotate-12" />
              <Tape className="-bottom-4 -left-4 w-32 rotate-[-8deg] hidden md:block" />
            </motion.div>

            {/* Decorative Flowers */}
            <CuteFlower className="absolute -top-16 -right-16 md:-top-24 md:-right-24 w-32 h-32 md:w-48 md:h-48" />
            <CuteFlower className="absolute -bottom-12 -left-12 w-20 h-20 md:w-32 md:h-32" rotationBase={45} delay={1} />
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 flex flex-col items-center opacity-60 text-xl font-bold"
          >
            <span>Scroll for secrets</span>
            <ChevronDown />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen py-24 px-6 md:px-20 flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-24">
          <motion.div 
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="relative cursor-pointer group"
            onClick={() => setCurrentAboutImg((prev) => (prev + 1) % aboutImages.length)}
          >
            <div className="bg-amber-100 p-4 pb-20 border-4 border-amber-900 shadow-[12px_12px_0px_theme(colors.amber.900)] rotate-3 transition-transform group-hover:rotate-0">
              <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-amber-300 border-2 border-amber-900 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentAboutImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={aboutImages[currentAboutImg]} 
                    alt="Me" 
                    className="w-full h-full object-cover sepia-filter" 
                  />
                </AnimatePresence>
              </div>
              <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-3xl font-bold italic">"Just an explorer."</p>
              </div>
            </div>
            <Tape className="-top-4 left-1/2 -translateX-1/2 w-40 rotate-1" />
            <div className="absolute -bottom-10 right-0 bg-amber-100 px-4 py-2 border-2 border-amber-900 shadow-[4px_4px_0px_theme(colors.amber.900)] font-bold animate-bounce hidden md:block">
              Click to swap!
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 border-2 border-amber-900 shadow-[8px_8px_0px_theme(colors.amber.400)] max-w-2xl rotate-[-1deg]"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4">
              <PenTool /> A Bit Random
            </h2>
            <div className="text-2xl md:text-3xl space-y-6 leading-relaxed">
              <p>
                Hi! I'm a <span className="highlight">Creative Developer</span> based in a world of pixels. I love building things that feel alive, a little messy, and very human.
              </p>
              <p>
                I believe that design shouldn't just be "clean"; it should have a <span className="highlight">soul</span>. Like a scrapbook, my code is a collection of memories and experiments.
              </p>
            </div>
            <div className="mt-12 flex gap-4 opacity-50">
              <Heart className="fill-amber-400 text-transparent" />
              <Camera />
              <Sparkles />
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-screen py-24 px-6 md:px-20 bg-amber-100/30">
          <h2 className="text-6xl md:text-8xl font-bold text-center mb-20 underline decoration-amber-400 decoration-wavy underline-offset-12">
            Stuff I've Made
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16 max-w-7xl mx-auto items-center">
            <ProjectCard 
              title="Dreamscape.js" 
              desc="A library for messy visuals" 
              img="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800" 
              rotation={-4}
            />
            <ProjectCard 
              title="Ink & Code" 
              desc="Digital calligraphy engine" 
              img="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" 
              rotation={3}
            />
            <ProjectCard 
              title="Moodboard" 
              desc="UI for storytellers" 
              img="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"
              rotation={-2} 
            />
             <ProjectCard 
              title="Retro Shader" 
              desc="Old CPU simulator" 
              img="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
              rotation={5} 
            />
             <ProjectCard 
              title="Paper API" 
              desc="Documentation for artists" 
              img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
              rotation={-3} 
            />
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section id="journey" className="py-24 px-6 md:px-20 relative bg-amber-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-24">
              <Briefcase size={60} className="text-amber-900" />
              <h2 className="text-6xl md:text-8xl font-bold uppercase underline decoration-amber-400 decoration-wavy underline-offset-12">The Journey</h2>
            </div>
            
            <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
              {/* Timeline center line */}
              <div className="absolute border-opacity-20 border-amber-900 h-full border-4 left-1/2 -translate-x-1/2 hidden md:block border-dashed" />
              
              <TimelineItem 
                year="2024" 
                title="Lead Creative" 
                company="Magic Studio" 
                desc="Building messy-yet-functional interactive experiences for high-end clients." 
                side="left"
              />
              <TimelineItem 
                year="2022" 
                title="Frontend Artist" 
                company="Dream Lab" 
                desc="Crafting pixels into smooth, soul-filled applications using modern web tech." 
                side="right"
              />
              <TimelineItem 
                year="2020" 
                title="Visual Designer" 
                company="Paper Pixels" 
                desc="Where it all began. Learning the art of balancing chaos and order in design." 
                side="left"
              />
            </div>
          </div>
          
          <div className="absolute top-1/4 right-0 opacity-10 -rotate-12 pointer-events-none">
            <CuteFlower className="w-[300px] h-[300px]" rotationBase={-10} />
          </div>
        </section>

        {/* TOOLS SECTION */}
        <section id="tools" className="py-24 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16 md:mb-24">
              <div className="bg-amber-400 p-6 md:p-8 border-4 border-amber-900 shadow-[10px_10px_0px_theme(colors.amber.900)] -rotate-3 relative">
                <h2 className="text-5xl md:text-8xl font-bold uppercase leading-none">My Toolbox</h2>
                <Tape className="-bottom-3 -right-6 w-24 rotate-12" />
              </div>
              <div className="relative">
                <p className="text-3xl md:text-4xl max-w-xl italic leading-tight">
                  These are the stickers I've collected on my laptop. Each one represents a tool I use to bring ideas to life.
                </p>
                <div className="absolute -top-10 -right-10 opacity-20 rotate-12 hidden md:block">
                  <PenTool size={120} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-8 justify-center items-center">
              <ToolSticker label="React" icon={Code} color="bg-amber-100" delay={0.1} />
              <ToolSticker label="Next.js" icon={Globe} color="bg-amber-200" delay={0.2} />
              <ToolSticker label="TypeScript" icon={PenTool} color="bg-amber-300" delay={0.3} />
              <ToolSticker label="Tailwind" icon={Layers} color="bg-amber-100" delay={0.4} />
              <ToolSticker label="Framer Motion" icon={Zap} color="bg-amber-400" delay={0.5} />
              <ToolSticker label="UI Design" icon={Camera} color="bg-amber-200" delay={0.6} />
              <ToolSticker label="Creative Bits" icon={Sparkles} color="bg-white" delay={0.7} />
              <ToolSticker label="Responsive" icon={Share2} color="bg-amber-100" delay={0.8} />
            </div>
            
            {/* Background Doodles */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none">
              <CuteFlower className="w-[500px] h-[500px]" rotationBase={20} />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-24 px-6 md:px-20 relative overflow-hidden bg-amber-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 relative">
              <h2 className="text-6xl md:text-8xl font-bold inline-block relative">
                Wall of Love
                <div className="absolute -bottom-4 left-0 w-full h-2 bg-amber-400 -rotate-1 z-[-1]" />
              </h2>
              <p className="text-2xl mt-4 italic opacity-70">Some scattered notes from lovely people.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <TestimonialNote 
                text="The messiest code I've ever seen, but it works like magic! Truly a creative wizard." 
                author="Sarah J. (Startup Founder)"
                rotation={-3}
                color="bg-amber-200"
              />
              <TestimonialNote 
                text="They really know how to make things feel human. Best aesthetic vibes I've ever seen in a dev." 
                author="Alex Chen (Design Lead)"
                rotation={4}
                color="bg-white"
              />
              <TestimonialNote 
                text="I love the scrapbook aesthetic. It's so refreshing to see something besides generic SaaS vibes." 
                author="Mika (Fellow Artist)"
                rotation={-2}
                color="bg-amber-300"
              />
               <TestimonialNote 
                text="Fast, reliable, and definitely a bit weird (in a good way). Would definitely collab again!" 
                author="David W. (Producer)"
                rotation={5}
                color="bg-amber-100"
              />
            </div>
          </div>
          
          {/* Decorative bits */}
          <div className="absolute -bottom-10 -right-10 opacity-10 rotate-45">
            <PenTool size={200} />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl w-full relative group"
          >
            <div className="bg-amber-100 p-8 md:p-20 border-4 border-amber-900 shadow-[15px_15px_0px_theme(colors.amber.900)] rotate-1 relative z-10 text-center">
              <h2 className="text-6xl md:text-8xl font-bold mb-8 italic">Say Hello!</h2>
              <p className="text-3xl md:text-4xl mb-12">I'm always down for a chaotic cup of coffee and some creative talk.</p>
              
              <div className="flex flex-col items-center gap-8">
                <a 
                  href="mailto:hello@pongo.dev" 
                  className="bg-amber-400 px-8 py-4 border-4 border-amber-900 shadow-[8px_8px_0px_theme(colors.amber.900)] text-3xl md:text-4xl font-bold flex items-center gap-4 hover:-translate-y-2 hover:shadow-[12px_12px_0px_theme(colors.amber.900)] transition-all active:translate-y-0"
                >
                  <Mail /> hello@pongo.dev
                </a>
                
                <div className="flex gap-10">
                  <a href="#" className="hover:scale-125 transition-transform">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  </a>
                  <a href="#" className="hover:scale-125 transition-transform">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="hover:scale-125 transition-transform">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-18 11.6 7.2.1 11.6-4.1 12.1-11.4-2.5-.2-4.4-2.6-4.1-5.1.4-2.4 2.8-4 5.3-3.6 1.3.2 2.4.9 3.2 1.9 1.1-.3 2.2-.7 3.2-1.2-1 1-1.9 2-2.9 2.5 1-.1 1.9-.3 2.8-.7-.6.7-1.3 1.4-2 1.9Z"></path></svg>
                  </a>
                </div>

              </div>

              {/* Doodle decorations */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-12 -left-12 opacity-40 group-hover:opacity-100 transition-opacity"
              >
                <CuteFlower className="w-24 h-24" />
              </motion.div>
            </div>
            <Tape className="-top-4 right-1/4 w-32 rotate-[-5deg]" />
          </motion.div>

          <footer className="absolute bottom-10 w-full text-center px-4">
             <p className="text-3xl font-bold text-amber-800 animate-pulse">Udah ah, pegel ngescroll! ✌️</p>
          </footer>
        </section>
      </main>

      {/* Global Scroll Progress or similar can go here */}
    </div>
  );
}
