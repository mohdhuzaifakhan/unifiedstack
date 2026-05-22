"use client";

import React from "react";
import Link from "next/link";
import { 
  User, 
  Brain, 
  Code2, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2, 
  Milestone,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";

export default function AboutPage() {
  const philosophies = [
    {
      title: "Deterministic Execution",
      desc: "Generative LLMs are highly fluid. We build strict, graph-based deterministic barriers using LangGraph to guarantee zero toxic leaks or random hallucinations, making AI enterprise-safe."
    },
    {
      title: "Stateful Modular Codebases",
      desc: "Premature microservices split engineering focus. We design modular monolith structures with strict interface domains, giving early startups rapid velocity with clean architectural clarity."
    },
    {
      title: "Zero Operational Overhead",
      desc: "Every database connection, API call, and container deployment is engineered to minimize latency and token counts. Efficiency drives production-grade scalability."
    }
  ];

  const skillCategories = [
    {
      title: "AI & Cognitive Core",
      skills: ["LangGraph & LangChain", "RAG Pipeline Orchestration", "Vector Databases (Pinecone, Chroma)", "Adversarial Red-Teaming", "Open-Source Models (Llama, Mistral)", "Structured Output Schemas"]
    },
    {
      title: "Full Stack & Web Core",
      skills: ["Next.js 15 & React 19", "TypeScript / ESNext", "React Native (Mobile)", "FastAPI / NestJS", "PostgreSQL / MongoDB", "RESTful / gRPC APIs"]
    },
    {
      title: "DevOps & Cloud Orchestration",
      skills: ["AWS Cloud Infra", "Docker Containerization", "Firebase Ecosystem", "GitHub Actions CI/CD", "Redis In-Memory Cache", "State persistence layers"]
    }
  ];

  const journeyTimeline = [
    {
      date: "2024 - Present",
      title: "Founder & Principal Engineer",
      company: "UnifiedStack",
      desc: "Architecting autonomous multi-agent cognitive platforms, real-time React Native mobile applications, and secure modular SaaS engines for global enterprise clients."
    },
    {
      date: "2023 - 2024",
      title: "Full Stack & AI Engineer",
      company: "InnovateTech Labs",
      desc: "Developed high-speed document indexing engines using LlamaIndex, Pinecone, and Claude. Built scalable NestJS REST APIs handling 5M+ daily requests."
    },
    {
      date: "2022 - 2023",
      title: "Junior Systems Developer",
      company: "ApexSoftware Solutions",
      desc: "Engineered responsive React portals, built real-time WebSocket vehicle dispatch trackers, and structured relational PostgreSQL database indexing."
    }
  ];

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background Gradient Mesh */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
            The Founder
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            Mohd Huzaifa
          </h1>
          <p className="mt-2 text-sm text-brand-cyan tracking-wider font-semibold uppercase">
            Full Stack Software Engineer & AI Architect
          </p>
        </div>

        {/* Profile Card & Intro */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mb-20">
          {/* Avatar Area */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] p-4 backdrop-blur-md w-full max-w-[280px]">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                  alt="Mohd Huzaifa Profile Placeholder"
                  className="h-full w-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-black/80 to-transparent" />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-brand-purple" />
                  2+ Years Professional
                </span>
                <span className="text-brand-cyan glow-text-cyan font-bold">India proprietorship</span>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed text-white/70">
            <h2 className="text-xl font-bold text-white tracking-tight">Professional Scoping</h2>
            <p>
              I am a dedicated **Full Stack Software Engineer** and **AI Architect** with over 2 years of professional, production-grade experience. My core capability lies in bridging the gap between chaotic generative AI models and robust, reliable enterprise system platforms.
            </p>
            <p>
              Throughout my engineering career, I have successfully designed modular monolithic web dashboards handling massive database loads, geolocated mobile networks executing ultra-fast tracking, and autonomous agent swarms utilizing cyclic state managers like LangGraph.
            </p>
            
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-5">
              <span className="block text-xs uppercase font-bold tracking-widest text-brand-cyan mb-2">
                Mission Statement
              </span>
              <p className="text-xs text-white/50 italic leading-relaxed">
                "Our mission is to replace unpredictable chat-based AI experiments with robust, secure, and production-tested software systems, helping global enterprises automate work with absolute reliability."
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="mb-20">
          <h2 className="text-center text-xl font-bold text-white tracking-tight mb-10">
            Our Architectural Philosophy
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {philosophies.map((phil, idx) => (
              <GlowingCard key={idx} className="p-6">
                <h3 className="text-base font-bold text-white tracking-tight mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-purple shrink-0" />
                  {phil.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {phil.desc}
                </p>
              </GlowingCard>
            ))}
          </div>
        </div>

        {/* Dynamic Skills Grid */}
        <div className="mb-20">
          <h2 className="text-center text-xl font-bold text-white tracking-tight mb-10">
            Technical Competencies
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-cyan mb-5 pb-2 border-b border-white/5">
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex gap-2 items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-purple shrink-0" />
                      <span className="text-xs text-white/70">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <div>
          <h2 className="text-center text-xl font-bold text-white tracking-tight mb-12">
            Engineering Timeline
          </h2>
          <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-10 max-w-3xl mx-auto">
            {journeyTimeline.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Node pointer */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-bg-black border-2 border-brand-purple">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                </div>

                <span className="text-xs font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded">
                  {item.date}
                </span>
                
                <h3 className="mt-3 text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <span className="block text-xs font-medium text-white/40 mt-0.5">
                  {item.company}
                </span>
                
                <p className="mt-3 text-xs leading-relaxed text-white/50">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Conversion Block */}
        <div className="mt-20 text-center border-t border-white/5 pt-12">
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule a scoping call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
