"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
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
    <div className="relative py-12 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Background gradients */}
      <div className="pointer-events-none absolute top-40 left-10 h-[300px] w-[500px] rounded-full bg-blue-50/70 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[350px] w-[600px] rounded-full bg-indigo-50/60 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Case Studies
          </span>
          <h1 className="mt-2.5 sm:mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-tight break-words">
            Detailed Project Case Studies
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore detailed case studies on how we built and launched custom mobile apps, AI chatbots, and software platforms for our clients.
          </p>
        </div>

        {/* Catalog List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {loading ? (
            <div className="col-span-2 text-center py-20 text-xs font-mono text-slate-400">
              Retrieving dynamic engineering analyses...
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-xs text-slate-400 italic border border-slate-200 rounded-2xl bg-slate-50">
              No engineering case studies published currently.
            </div>
          ) : (
            caseStudies.map((caseStudy) => (
              <GlowingCard key={caseStudy.id} className="p-6 sm:p-8 flex flex-col justify-between min-h-[350px]">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {caseStudy.category}
                    </span>
                    <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                      SLA Audited
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug line-clamp-2">
                    {caseStudy.title}
                  </h2>
                  
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {caseStudy.description}
                  </p>

                  {/* Quantitative statistics panel */}
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <span className="block text-base font-extrabold text-slate-900">{metric.value}</span>
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Technical Case Study
                  </span>
                  
                  <Link
                    href={`/case-studies/${caseStudy.id}`}
                    className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Read Full Breakdown
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </GlowingCard>
            ))
          )}
        </div>

        {/* Global SLA statement banner */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Our Performance Auditing Guarantee</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every system deployed by UnifiedStack undergoes exhaustive performance verification. We red-team multi-agent conversational limits, index vector databases with structural chunk validations, and guarantee zero operational leaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
