"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, BarChart3, Database, Layers, Loader2 } from "lucide-react";
import { getProjectById, Project } from "@/lib/firebase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CaseStudyDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const item = await getProjectById(resolvedParams.id);
        setProject(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white/60 font-mono text-xs">
        <Loader2 className="h-6 w-6 animate-spin text-brand-purple mr-2" />
        Compiling architectural logs...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Case Study Not Found</h2>
        <p className="mt-2 text-xs text-white/40 max-w-sm">
          The requested engineering file may have been archived or restrictively classified by the systems administrator.
        </p>
        <Link
          href="/case-studies"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-xs text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background visual elements */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Navigation back anchor */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        {/* Header block */}
        <header className="border-b border-white/5 pb-8 mb-10">
          <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
            {project.category}
          </span>
          
          <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight">
            Case Study: {project.title}
          </h1>

          <p className="mt-4 text-base text-white/60 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {/* Quantifiable Stats Summary Grid */}
        <div className="grid grid-cols-3 gap-4 border border-white/5 bg-white/[0.01] p-6 rounded-2xl text-center mb-12 backdrop-blur-md">
          {project.metrics.map((m, idx) => (
            <div key={idx}>
              <span className="block text-2xl font-extrabold text-white sm:text-3xl">{m.value}</span>
              <span className="block text-[10px] uppercase tracking-widest text-white/40 mt-1">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Image / Architecture Layout Mockup */}
        <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden aspect-video mb-12 shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-90 contrast-125"
          />
        </div>

        {/* Detailed Breakdown Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-white/70">
          {/* Problem */}
          <section className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight mb-4">
              <Layers className="h-5 w-5 text-brand-purple shrink-0" />
              1. Challenge Definition & Operational Bottlenecks
            </h3>
            <p className="leading-relaxed text-white/60">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight mb-4">
              <Database className="h-5 w-5 text-brand-cyan shrink-0" />
              2. Core Architectural Engineering Strategy
            </h3>
            <p className="leading-relaxed text-white/60">
              {project.solution}
            </p>
            {project.architecturalOverview && (
              <div className="mt-5 rounded bg-black/40 border border-white/5 p-4 text-xs font-mono text-white/40 leading-relaxed">
                <span className="block font-bold text-brand-cyan mb-1">// System Inter-connectivity Node State:</span>
                {project.architecturalOverview}
              </div>
            )}
          </section>

          {/* Shipped outcomes */}
          <section className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight mb-4">
              <BarChart3 className="h-5 w-5 text-brand-blue shrink-0" />
              3. Quantifiable Results & Production Benchmarks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.results.map((res, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/5 bg-white/[0.01] p-4 text-xs relative"
                >
                  <span className="absolute top-2 right-4 text-lg font-mono font-bold text-brand-purple/20">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed text-white/55">{res}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 border-t border-white/5 pt-10 text-center">
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}
