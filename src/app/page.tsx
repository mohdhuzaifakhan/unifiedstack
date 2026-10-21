"use client";

import DynamicIcon from "@/components/dynamic-icon";
import GlowingCard from "@/components/ui/glowing-card";
import { getGlobals, getProjects, getServices, getTestimonials, Globals, Project, Service, Testimonial } from "@/lib/firebase";
import { MOCK_GLOBALS, MOCK_SERVICES } from "@/lib/seedData";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"ai" | "frontend" | "backend" | "cloud">("ai");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [globals, setGlobals] = useState<Globals | null>(null);
  const [loading, setLoading] = useState(true);
  const [architectureTab, setArchitectureTab] = useState<"agents" | "fullstack">("agents");

  useEffect(() => {
    async function loadData() {
      try {
        const [projData, testData, servData, globData] = await Promise.all([
          getProjects(),
          getTestimonials(),
          getServices(),
          getGlobals()
        ]);
        setProjects(projData);
        setTestimonials(testData);
        setServices(servData);
        setGlobals(globData);
      } catch (err) {
        console.error("Failed to load home page dynamic data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeServices = services.length > 0 ? services : MOCK_SERVICES;
  const activeGlobals = globals || MOCK_GLOBALS;

  const heroBadgeRaw = activeGlobals.hero?.badge || "Custom Software & AI Engineering Agency";
  const heroBadge = heroBadgeRaw.replace(/•\s*India\s*&\s*Global/i, "").trim() || "Custom Software & AI Engineering Agency";
  const heroTitle = activeGlobals.hero?.title || "We Build Web, Mobile & AI Apps That Grow Your Business";
  const heroSubtitle = activeGlobals.hero?.subtitle || "Got a software idea or a manual workflow slowing your business down? We design, engineer, and deploy high-converting web platforms, mobile apps, and 24/7 AI chatbots tailored to your exact business goals. Fast delivery, clean code, zero technical stress.";

  const trustMetrics = (activeGlobals.trustMetrics && activeGlobals.trustMetrics.length > 0)
    ? activeGlobals.trustMetrics
    : [
      { value: "15+ Apps", label: "Shipped Successfully" },
      { value: "100%", label: "On-Time Milestone Delivery" },
      { value: "< 1s", label: "Sub-Second App Speed" },
      { value: "Direct", label: "Work Directly With Founders" },
      { value: "100%", label: "Source Code & IP Ownership" }
    ];

  const specializations = activeGlobals.specializations || [];
  const techStack = activeGlobals.techStack || { frontend: [], backend: [], ai: [], cloud: [] };
  const processFlow = activeGlobals.processFlow || [];

  return (
    <div className="relative overflow-hidden w-full bg-white text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-3.5 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-24 text-center overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-white">
        {/* Subtle geometric dot background */}
        <div className="absolute inset-0 subtle-dot-bg opacity-60 pointer-events-none" />

        {/* Ambient soft glow tints */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[350px] sm:h-[450px] w-[500px] sm:w-[800px] rounded-full bg-blue-100/40 blur-[130px]" />
        <div className="pointer-events-none absolute top-40 right-10 h-[250px] sm:h-[300px] w-[300px] sm:w-[400px] rounded-full bg-indigo-100/35 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl w-full">
          {/* Top Pill Badge */}
          <div className="mx-auto mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 max-w-full text-center">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="whitespace-nowrap">{heroBadge}</span>
          </div>

          {/* Clean, Human Headline with identical font size to services page */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl mx-auto break-words"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          />

          {/* Reassuring Subtitle */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white whitespace-nowrap shrink-0 transition-colors"
            >
              <span className="whitespace-nowrap">Book a Free Scoping Call</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:border-slate-300 whitespace-nowrap shrink-0 transition-colors"
            >
              <span className="whitespace-nowrap">View Our Work</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          {/* Live Product Console Preview (100% Mobile Responsive) */}
          <div className="mt-10 sm:mt-14 w-full text-left rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-6 backdrop-blur-md">
            {/* Window Chrome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 sm:pb-4 border-b border-slate-100 gap-3">
              {/* Dots + Title */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="ml-1 text-[11px] sm:text-xs font-semibold text-slate-700 truncate">
                  How It Works <span className="text-slate-400 font-normal sm:inline hidden">•</span> <span className="text-slate-500 font-normal sm:inline hidden">Live Process Flow</span>
                </span>
              </div>

              {/* Segmented Switcher (Full width on mobile, auto on desktop) */}
              <div className="grid grid-cols-2 w-full sm:w-auto p-1 rounded-xl bg-slate-100/90 border border-slate-200/70 gap-1 shrink-0">
                <button
                  onClick={() => setArchitectureTab("agents")}
                  className={`rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition-all text-center cursor-pointer ${architectureTab === "agents"
                    ? "bg-white text-blue-700 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  Agentic AI & RAG Pipeline
                </button>
                <button
                  onClick={() => setArchitectureTab("fullstack")}
                  className={`rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition-all text-center cursor-pointer ${architectureTab === "fullstack"
                    ? "bg-white text-blue-700 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  Full-Stack Architecture
                </button>
              </div>
            </div>

            {/* Step Sequence Grid (Mobile: 1-col, Tablet: 2-col, Desktop: 4-col) */}
            {architectureTab === "agents" ? (
              <div className="pt-4 sm:pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-blue-600 text-[10px] sm:text-xs uppercase tracking-wider">Step 01</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">Objective Ingestion</div>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-normal break-words">
                      Agent receives complex objective, user prompt, or workflow trigger
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-blue-600 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-blue-700 text-[10px] sm:text-xs uppercase tracking-wider">Step 02</span>
                      <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-blue-900 tracking-tight">RAG Context Search</div>
                    <p className="text-[11px] sm:text-xs text-blue-700/80 mt-1 leading-normal break-words">
                      Retrieves grounded context from vector database with source citations
                    </p>
                  </div>

                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-indigo-600 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-indigo-700 text-[10px] sm:text-xs uppercase tracking-wider">Step 03</span>
                      <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-indigo-900 tracking-tight">Agentic Reasoning</div>
                    <p className="text-[11px] sm:text-xs text-indigo-700/80 mt-1 leading-normal break-words">
                      Coordinates tools, fine-tuned models, and executes multi-step logic
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-emerald-600 text-[10px] sm:text-xs uppercase tracking-wider">Step 04</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">Verified Execution</div>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-normal break-words">
                      Delivers audited, hallucination-free output to your platform
                    </p>
                  </div>
                </div>

                {/* Telemetry Grid (Clean 2x2 grid on mobile, 4-col on desktop) */}
                <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs text-slate-600">
                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                      <Activity className="h-3 w-3 text-emerald-600 shrink-0" />
                      Execution
                    </span>
                    <strong className="text-slate-800 text-[11px] sm:text-xs">Autonomous</strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">RAG Accuracy</span>
                    <strong className="text-slate-800 text-[11px] sm:text-xs">100% Grounded</strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Models</span>
                    <strong className="text-emerald-700 text-[11px] sm:text-xs">Fine-Tuned / LLMs</strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Deployment</span>
                    <strong className="text-blue-700 text-[11px] sm:text-xs truncate">Private Cloud & API</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 sm:pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-blue-600 text-[10px] sm:text-xs uppercase tracking-wider">Layer 01</span>
                      <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">Fast UI Design</div>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-normal break-words">
                      Modern, responsive screens built with Next.js & React
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-emerald-600 text-[10px] sm:text-xs uppercase tracking-wider">Layer 02</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">Secure Backend</div>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-normal break-words">
                      Handles logins, notifications & transactions
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-indigo-600 text-[10px] sm:text-xs uppercase tracking-wider">Layer 03</span>
                      <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">Safe Database</div>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-normal break-words">
                      PostgreSQL & Firebase with daily cloud backups
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-amber-600 text-[10px] sm:text-xs uppercase tracking-wider">Layer 04</span>
                      <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">Cloud Hosting</div>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-normal break-words">
                      Deployed on AWS & Vercel for 99.9% uptime
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs text-slate-600">
                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Uptime</span>
                    <strong className="text-slate-800 text-[11px] sm:text-xs">99.9% Guaranteed</strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Payments</span>
                    <strong className="text-slate-800 text-[11px] sm:text-xs">UPI & Cards</strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Backups</span>
                    <strong className="text-slate-800 text-[11px] sm:text-xs">Daily Cloud</strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Performance</span>
                    <strong className="text-blue-700 text-[11px] sm:text-xs">Sub-second</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION (Balanced on Mobile) */}
      <section className="relative border-b border-slate-200/80 bg-slate-50/60 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
            {trustMetrics.map((metric, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center ${idx === trustMetrics.length - 1 ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
                  }`}
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {metric.value}
                </span>
                <span className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 max-w-[140px] leading-tight">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="relative py-16 sm:py-20 md:py-28 px-4 bg-white">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Core Capabilities
            </span>
            <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Engineering Services Built to Scale
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              We specialize across 4 core engineering disciplines: Web Development, Mobile App Development, comprehensive AI Development, and robust Backend Infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeServices.slice(0, 8).map((service, idx) => (
              <GlowingCard key={service.id || idx} className="p-5 sm:p-6 flex flex-col justify-between min-h-[280px] sm:min-h-[300px]">
                <div>
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/80 mb-4 sm:mb-5">
                    <DynamicIcon name={service.iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{service.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-4">{service.description}</p>
                </div>
                <Link
                  href={`/services#${service.id}`}
                  className="group mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI ARCHITECTURE BREAKDOWN (Mobile Safe Simulation) */}
      <section className="relative py-16 sm:py-20 border-t border-b border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
            {/* Visual Node Graph Simulation (Mobile-friendly, no overflowing margins) */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 overflow-hidden">
              <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 gap-2">
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold truncate">// Production Agentic & RAG Pipeline</span>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] text-emerald-700 font-medium shrink-0">
                  Ready & Active
                </span>
              </div>

              {/* Node Sequence List */}
              <div className="space-y-2.5 sm:space-y-3 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3 sm:p-3.5 gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-slate-800 font-semibold text-[11px] sm:text-xs truncate sm:whitespace-normal">
                      [01. Task Ingestion & Goal Planning]
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold text-[10px] sm:text-[11px] shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    PLAN
                  </span>
                </div>

                <div className="sm:ml-4 flex items-center justify-between rounded-xl bg-blue-50/80 border border-blue-200 p-3 sm:p-3.5 gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                    <span className="text-blue-900 font-semibold text-[11px] sm:text-xs truncate sm:whitespace-normal">
                      [02. Deterministic RAG Document Search]
                    </span>
                  </div>
                  <span className="text-blue-700 font-bold text-[10px] sm:text-[11px] shrink-0 bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200">
                    RETRIEVAL
                  </span>
                </div>

                <div className="sm:ml-8 flex items-center justify-between rounded-xl bg-indigo-50/80 border border-indigo-200 p-3 sm:p-3.5 gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                    <span className="text-indigo-900 font-semibold text-[11px] sm:text-xs truncate sm:whitespace-normal">
                      [03. Agentic Reasoning & Tool Calling]
                    </span>
                  </div>
                  <span className="text-indigo-700 font-bold text-[10px] sm:text-[11px] shrink-0 bg-indigo-100/70 px-2 py-0.5 rounded border border-indigo-200">
                    EXECUTION
                  </span>
                </div>

                <div className="sm:ml-12 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3 sm:p-3.5 gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-slate-800 font-semibold text-[11px] sm:text-xs truncate sm:whitespace-normal">
                      [04. Verified Response & Workflow Sync]
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold text-[10px] sm:text-[11px] shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    DELIVERY
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                <span>RAG Accuracy: <strong className="text-slate-700">100% Grounded</strong></span>
                <span>Privacy: <strong className="text-slate-700">100% Confidential</strong></span>
              </div>
            </div>

            {/* Specialization Text Info */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                AI Engineering
              </span>
              <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Production AI: Agentic Workflows, RAG & Fine-Tuning
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                We engineer full-lifecycle AI systems: autonomous multi-step Agentic AI workflows, deterministic RAG retrieval pipelines, custom model fine-tuning, automated business processes, and intelligent conversational assistants built with verifiable accuracy and strict enterprise privacy.
              </p>

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                {specializations.map((spec, idx) => (
                  <div key={idx} className="flex gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                      <DynamicIcon name={spec.iconName} className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">{spec.title}</h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="relative py-16 sm:py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Our Work
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Real Projects We Have Built & Shipped
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all self-start sm:self-auto"
            >
              All Projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-xs font-mono text-slate-400">
                Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-xs text-slate-400 italic">
                No active projects published currently.
              </div>
            ) : (
              projects.slice(0, 3).map((project) => (
                <GlowingCard key={project.id} className="flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                        {project.category}
                      </span>
                      <h3 className="mt-2.5 sm:mt-3 text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Performance metrics display */}
                      <div className="mt-4 sm:mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3.5 sm:pt-4 text-center">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx}>
                            <span className="block text-xs sm:text-sm font-bold text-slate-900">{metric.value}</span>
                            <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-medium leading-tight mt-0.5">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between bg-slate-50/50">
                    <div className="flex gap-1.5 flex-wrap max-w-[75%]">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects#${project.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 transition-colors shrink-0"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlowingCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK */}
      <section className="relative py-16 sm:py-20 border-t border-slate-200/80 bg-slate-50/50 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Tools & Technologies
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Modern Technologies We Use
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600">
              We pick battle-tested tools that make your application fast, secure, and easy to maintain.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
            {(["ai", "frontend", "backend", "cloud"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                {tab === "ai" ? "AI & Automation" : tab === "frontend" ? "Web & Mobile" : tab === "backend" ? "Backend & APIs" : "Cloud & Database"}
              </button>
            ))}
          </div>

          {/* Grid Panel */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-6 text-center">
            {techStack[activeTab]?.map((tech, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5 transition-all hover:border-blue-200 hover:-translate-y-0.5"
              >
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3">{tech.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section className="relative py-16 sm:py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              How We Work
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple 6-Step Delivery Process
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600">
              No confusing technical jargon. You get regular updates and direct access to the developers building your project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processFlow.map((step, idx) => (
              <GlowingCard key={idx} className="p-5 sm:p-6 relative min-h-[160px] sm:min-h-[190px]">
                <div className="absolute top-4 right-5 sm:right-6 text-2xl sm:text-3xl font-mono font-extrabold text-slate-200">
                  {step.step}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{step.name}</h4>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA */}
      <section className="relative py-16 sm:py-20 px-4 text-center overflow-hidden bg-white">
        <div className="relative z-10 mx-auto max-w-4xl border border-blue-100/90 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Have an App or AI Idea? <br className="hidden sm:inline" />
            Let's <span className="text-blue-600">Build It Together</span>
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-lg text-xs sm:text-base text-slate-600 leading-relaxed">
            Talk directly with Mohd Huzaifa & Mohd Suhail. We will understand your requirements, explain the best approach, and share an honest quote with clear timelines.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white whitespace-nowrap shrink-0 transition-colors"
            >
              <span className="whitespace-nowrap">Start Your Project</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              href="/contact?calendly=true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:border-slate-300 whitespace-nowrap shrink-0 transition-colors"
            >
              <span className="whitespace-nowrap">Book a Consultation</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
