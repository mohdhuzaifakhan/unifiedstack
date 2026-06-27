"use client";

import FloatingCode from "@/components/ui/floating-code";
import GlowingCard from "@/components/ui/glowing-card";
import ParticleBackground from "@/components/ui/particle-background";
import { getGlobals, getProjects, getServices, getTestimonials, Globals, Project, Service, Testimonial } from "@/lib/firebase";
import { MOCK_GLOBALS, MOCK_SERVICES } from "@/lib/seedData";
import * as Lucide from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Lucide as any)[name];
  if (!IconComponent) return <Lucide.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "ai" | "cloud">("ai");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [globals, setGlobals] = useState<Globals | null>(null);
  const [loading, setLoading] = useState(true);

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

  const heroBadge = activeGlobals.hero?.badge || "Empowering Enterprise Workflows";
  const heroTitle = activeGlobals.hero?.title || "Building Intelligent Software & AI Systems";
  const heroSubtitle = activeGlobals.hero?.subtitle || "We engineer high-performance multi-agent cognitive platforms, deterministic RAG document systems, robust full stack SaaS, and premium mobile applications.";

  const trustMetrics = activeGlobals.trustMetrics || [];
  const specializations = activeGlobals.specializations || [];
  const techStack = activeGlobals.techStack || { frontend: [], backend: [], ai: [], cloud: [] };
  const processFlow = activeGlobals.processFlow || [];

  const trustMetricsList = trustMetrics.length > 0 ? trustMetrics : [
    { value: "2+", label: "Years Professional Experience" },
    { value: "99.8%", label: "System Uptime Delivered" },
    { value: "100%", label: "Production-Grade AI Architecture" },
    { value: "12x", label: "Workflow Latency Reductions" },
    { value: "India", label: "Sole Proprietorship Certified" }
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center overflow-hidden border-b border-white/5">
        {/* Futuristic animated particle backdrop */}
        <ParticleBackground />

        {/* Floating gradient glow elements */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-brand-purple/10 blur-[100px] animate-pulse-slow" />
        <div className="pointer-events-none absolute top-40 right-1/4 h-[350px] w-[350px] rounded-full bg-brand-cyan/10 blur-[120px] animate-pulse-slow" />

        {/* Floating Code Snippets for Premium Agency Visual Vibe */}
        <FloatingCode language="python" className="top-24 left-10 rotate-[-4deg]" delay={0.5} />
        <FloatingCode language="typescript" className="bottom-24 left-16 rotate-[3deg]" delay={2.5} />
        <FloatingCode language="rust" className="top-36 right-12 rotate-[6deg]" delay={1.5} />

        <div className="relative z-10 mx-auto max-w-4xl px-4">
          {/* Top Badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-brand-cyan glow-text-cyan">
            <Cpu className="h-3.5 w-3.5 animate-spin-slow" />
            {heroBadge}
          </div>

          {/* Large Title */}
          <h1
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-none"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          />

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="neon-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="relative border-b border-white/5 bg-bg-black/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 text-center">
            {trustMetrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent glow-text-purple sm:text-4xl">
                  {metric.value}
                </span>
                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="relative py-20 md:py-28 px-4">
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 -z-10 animated-grid-bg opacity-30" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              Expertise & Engineering
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Next-Gen Cognitive Services
            </p>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              We design modular architectures with deep algorithmic safety. Every product we ship is performance audited for low-latency scale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeServices.slice(0, 8).map((service, idx) => (
              <GlowingCard key={service.id || idx} className="p-6 flex flex-col justify-between h-[280px]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10 mb-5">
                    <DynamicIcon name={service.iconName} className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{service.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{service.description}</p>
                </div>
                <Link
                  href="/services"
                  className="group mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-cyan transition-colors hover:text-brand-purple"
                >
                  Learn More
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI SPECIALIZATION SECTION */}
      <section className="relative py-20 border-t border-b border-white/5 bg-bg-black/85">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Visual AI Pipelines Block */}
            <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md overflow-hidden sm:p-8">
              <div className="absolute top-0 right-0 h-[250px] w-[250px] rounded-full bg-brand-cyan/5 blur-[80px]" />

              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-white/40">// LangGraph Cognitive Swarm</span>
                <span className="rounded bg-brand-purple/20 px-2 py-0.5 text-[10px] font-mono text-brand-cyan glow-text-cyan">Stateful Sync</span>
              </div>

              {/* High Fidelity Node Graph Simulation */}
              <div className="space-y-4 font-mono text-xs text-white/60">
                <div className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                    <span>[Node: Query Intake]</span>
                  </div>
                  <span className="text-green-400">SUCCESS</span>
                </div>

                <div className="ml-4 flex items-center justify-between rounded-lg bg-brand-purple/10 border border-brand-purple/20 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan" />
                    <span>[Node: Supervisor Router]</span>
                  </div>
                  <span className="text-brand-cyan">EVALUATING</span>
                </div>

                <div className="ml-8 flex items-center justify-between rounded-lg bg-white/5 border border-white/10 p-3 opacity-50">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/30" />
                    <span>[Node: RAG Query Agent]</span>
                  </div>
                  <span>PENDING</span>
                </div>
              </div>
            </div>

            {/* Specialization Text Info */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
                Cognitive Systems Architecture
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Multi-Agent Cognitive Pipelines
              </p>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                We design AI agents built on **LangChain** and **LangGraph** frameworks capable of recursive thinking. By orchestrating specific agent roles, we guarantee deterministic outcomes fit for financial auditing, resume screening, or patient intake.
              </p>

              <div className="mt-8 space-y-6">
                {specializations.map((spec, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                      <DynamicIcon name={spec.iconName} className="h-5 w-5 text-brand-purple" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{spec.title}</h4>
                      <p className="mt-1 text-xs text-white/40 leading-relaxed">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="relative py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                Portfolio Show
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Featured Engineering Cases
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10"
            >
              All Projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-3 text-center py-10 text-xs font-mono text-white/40">
                Retrieving dynamic project profiles...
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-xs text-white/40 italic">
                No active project cases published currently.
              </div>
            ) : (
              projects.slice(0, 3).map((project) => (
                <GlowingCard key={project.id} className="flex flex-col justify-between overflow-hidden group">

                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-black to-transparent" />
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan">
                        {project.category}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-white tracking-tight group-hover:text-brand-purple transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/50 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Performance metrics display */}
                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx}>
                            <span className="block text-sm font-bold text-white">{metric.value}</span>
                            <span className="block text-[8px] uppercase tracking-wider text-white/40">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap max-w-[70%]">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-white/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects#${project.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-brand-purple text-white/70 hover:text-white transition-colors"
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
      <section className="relative py-20 border-t border-white/5 bg-bg-black/50 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
              Technical Stack
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white">
              Enterprise Ecosystem
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {(["ai", "frontend", "backend", "cloud"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === tab
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                  : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {tab === "ai" ? "AI / ML Frameworks" : tab}
              </button>
            ))}
          </div>

          {/* Grid Panel */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 text-center">
            {techStack[activeTab].map((tech, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.01] p-5 backdrop-blur-md transition-all hover:border-white/10 hover:bg-white/[0.03]"
              >
                <span className="text-3xl mb-3">{tech.icon}</span>
                <span className="text-sm font-semibold text-white/80">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section className="relative py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              Workflow Model
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Systematic Delivery Process
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processFlow.map((step, idx) => (
              <GlowingCard key={idx} className="p-6 border border-white/5 bg-white/[0.01] relative h-[180px]">
                <div className="absolute top-4 right-6 text-3xl font-mono font-extrabold text-brand-purple/15">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{step.name}</h4>
                <p className="mt-3 text-xs leading-relaxed text-white/50">{step.desc}</p>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      <section className="relative py-20 border-t border-b border-white/5 bg-bg-black/70 px-4">
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-10 h-[300px] w-[500px] rounded-full bg-brand-cyan/5 blur-[100px]" />

        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Client Review
          </h2>
          <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl mb-12">
            Trusted By Engineering Leaders
          </p>

          {loading ? (
            <div className="text-xs font-mono text-white/40 py-10">
              Retrieving dynamic feedback database...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-xs text-white/40 py-10 italic">
              No client reviews published currently.
            </div>
          ) : (
            <>
              <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md min-h-[220px]">
                <p className="text-base leading-relaxed text-white/80 italic">
                  "{testimonials[activeTestimonial]?.content}"
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                  {testimonials[activeTestimonial]?.image && (
                    <div className="h-10 w-10 rounded-full border border-white/10 overflow-hidden bg-white/5">
                      <img
                        src={testimonials[activeTestimonial]?.image}
                        alt={testimonials[activeTestimonial]?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <span className="block text-sm font-bold text-white">
                      {testimonials[activeTestimonial]?.name}
                    </span>
                    <span className="block text-[10px] text-white/40">
                      {testimonials[activeTestimonial]?.role}, {testimonials[activeTestimonial]?.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial slider selectors */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === idx ? "w-6 bg-brand-purple" : "w-2 bg-white/20"
                      }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 9. CONTACT CTA */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-purple/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl border border-white/5 bg-gradient-to-tr from-bg-black/90 to-brand-purple/10 p-10 md:p-16 rounded-3xl backdrop-blur-lg">
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight leading-tight">
            Let's Build Your <br />
            Next <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent glow-text-cyan">AI Product</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/50 leading-relaxed">
            Partner with UnifiedStack. Schedule a structured technical scoping call directly with Mohd Huzaifa to evaluate integration speeds.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="neon-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?calendly=true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              Schedule Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
