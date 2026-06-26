"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, FileText, BarChart3, Binary, ShieldCheck } from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";
import { getProjects, Project } from "@/lib/firebase";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProjects();
        setCaseStudies(data);
      } catch (err) {
        console.error("Failed to load case studies:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background gradients */}
      <div className="pointer-events-none absolute top-40 left-10 h-[300px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[350px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Deep Dives
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            Engineering Case Studies
          </h1>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">
            In-depth analysis detailing how we deploy cognitive agents, structured RAG indexing, and custom mobile caches under strict production SLA metrics.
          </p>
        </div>

        {/* Catalog List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {loading ? (
            <div className="col-span-2 text-center py-20 text-xs font-mono text-white/40">
              Retrieving dynamic engineering analyses...
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-xs text-white/40 italic border border-white/5 rounded-2xl bg-white/[0.01]">
              No engineering case studies published currently.
            </div>
          ) : (
            caseStudies.map((caseStudy) => (
            <GlowingCard key={caseStudy.id} className="p-6 sm:p-8 flex flex-col justify-between h-[360px]">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">
                    {caseStudy.category}
                  </span>
                  <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2 py-0.5 text-[9px] font-mono text-white/60">
                    SLA Audited
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                  {caseStudy.title}
                </h2>
                
                <p className="mt-3 text-xs leading-relaxed text-white/50 line-clamp-3">
                  {caseStudy.description}
                </p>

                {/* Quantitative statistics panel */}
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                  {caseStudy.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <span className="block text-sm font-extrabold text-white">{metric.value}</span>
                      <span className="block text-[8px] uppercase tracking-wider text-white/40">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                <span className="flex items-center gap-1.5 font-mono">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Tech Case Study
                </span>
                
                <Link
                  href={`/case-studies/${caseStudy.id}`}
                  className="flex items-center gap-1 font-bold text-brand-cyan hover:text-brand-purple transition-colors"
                >
                  Read Case Analysis
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </GlowingCard>
            ))
          )}
        </div>

        {/* Global SLA statement banner */}
        <div className="mt-16 rounded-2xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-cyan glow-text-cyan shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Our Performance Auditing Guarantee</h3>
            <p className="mt-1 text-xs text-white/40 leading-relaxed">
              Every system deployed by UnifiedStack undergoes exhaustive performance verification. We red-team multi-agent conversational limits, index vector databases with structural chunk validations, and guarantee zero operational leaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
