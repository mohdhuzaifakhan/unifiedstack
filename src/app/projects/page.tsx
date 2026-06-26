"use client";

import GlowingCard from "@/components/ui/glowing-card";
import { MOCK_PROJECTS } from "@/lib/firebase";
import {
  Activity,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedProject, setExpandedProject] = useState<string | null>("unified-ai-platform");

  const categories = [
    { key: "all", label: "All Cases" },
    { key: "AI Agent Development", label: "AI Agents" },
    { key: "AI Testing & Evaluation Systems", label: "AI Evaluators" },
    { key: "Mobile App Development", label: "Mobile Apps" },
    { key: "Generative AI Solutions", label: "Generative AI" }
  ];

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const toggleExpand = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute top-40 left-10 h-[350px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Our Work
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            Shipped Software & AI Architectures
          </h1>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">
            Discover how we apply rigorous full stack architecture and autonomous agent swarms to solve high-impact operational friction.
          </p>
        </div>

        {/* Filter selection menu */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${activeFilter === cat.key
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                  : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Shipped cases list layout */}
        <div className="space-y-8">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProject === project.id;
            return (
              <GlowingCard
                key={project.id}
                id={project.id}
                className="overflow-hidden border border-white/5 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Visual mockup block */}
                  <div className="lg:col-span-4 relative min-h-[220px] bg-white/5 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover grayscale brightness-90 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-bg-black/90 via-bg-black/30 to-transparent" />

                    {/* Floating badge */}
                    <span className="absolute top-4 left-4 rounded-full bg-brand-purple/20 border border-brand-purple/30 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-brand-cyan glow-text-cyan">
                      {project.category}
                    </span>
                  </div>

                  {/* Standard details block */}
                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">
                        {project.title}
                      </h2>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Dynamic Metrics */}
                      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-left">
                            <span className="block text-lg font-extrabold text-white sm:text-xl">
                              {metric.value}
                            </span>
                            <span className="block text-[9px] uppercase tracking-widest text-white/40">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-brand-purple transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            Collapse Case Details
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Read Comprehensive Case Study
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        {project.playStoreLink && (
                          <a
                            href={project.playStoreLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 px-4 items-center justify-center rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan hover:bg-brand-cyan/20 hover:text-white transition-all gap-1.5"
                            aria-label="Download from Google Play"
                          >
                            <span>Play Store</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 px-4 items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple/30 text-xs font-semibold text-brand-purple hover:bg-brand-purple/20 hover:text-white transition-all gap-1.5"
                            aria-label="View Source on GitHub"
                          >
                            <span>GitHub</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/contact?project=${encodeURIComponent(project.title)}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-brand-purple text-white/70 hover:text-white transition-colors"
                          aria-label="Enquire about project"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible deep dive details panel */}
                {isExpanded && (
                  <div className="border-t border-white/5 bg-white/[0.01] p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
                      {/* Problem statement */}
                      <div>
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-purple mb-2">
                          <Cpu className="h-4 w-4" />
                          Problem Statement
                        </h4>
                        <p className="leading-relaxed text-white/60">
                          {project.problem}
                        </p>
                      </div>

                      {/* Engineered solution */}
                      <div>
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-2">
                          <Layers className="h-4 w-4" />
                          Engineered Solution
                        </h4>
                        <p className="leading-relaxed text-white/60">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Shipped outcomes */}
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-blue mb-3">
                        <Activity className="h-4 w-4" />
                        Quantifiable Results & Shipped Value
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {project.results.map((res, idx) => (
                          <li
                            key={idx}
                            className="rounded-lg bg-white/[0.02] border border-white/5 p-4 text-xs leading-relaxed text-white/50 relative"
                          >
                            <span className="absolute top-2 right-4 text-lg font-mono font-bold text-brand-purple/20">
                              {idx + 1}
                            </span>
                            {res}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architecture diagram if exists */}
                    {project.architecturalOverview && (
                      <div className="border-t border-white/5 pt-6 rounded-lg bg-black/40 border border-white/5 p-5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-brand-cyan mb-2">
                          System Architectural Strategy
                        </h4>
                        <p className="text-xs leading-relaxed text-white/40 italic font-mono">
                          {project.architecturalOverview}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </GlowingCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
