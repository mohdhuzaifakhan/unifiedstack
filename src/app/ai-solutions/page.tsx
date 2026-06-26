"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  Binary, 
  Layers, 
  Cpu, 
  ArrowUpRight, 
  CheckCircle2, 
  Workflow, 
  Database, 
  Gauge, 
  ShieldCheck 
} from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";
import { getGlobals, Globals } from "@/lib/firebase";
import { MOCK_GLOBALS } from "@/lib/seedData";

export default function AiSolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState<"agents" | "rag" | "finetuning">("agents");
  const [globals, setGlobals] = useState<Globals | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const globData = await getGlobals();
        setGlobals(globData);
      } catch (err) {
        console.error("Failed to load AI solutions globals:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeGlobals = globals || MOCK_GLOBALS;
  const solutions = activeGlobals.aiSolutions || MOCK_GLOBALS.aiSolutions;
  const current = solutions[selectedSolution];

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background visual meshes */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Advanced Architecture
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            Cognitive AI Blueprints
          </h1>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">
            Discover the structural pipelines and mathematical retrieval systems engineered at UnifiedStack to guarantee commercial safety.
          </p>
        </div>

        {/* Tab Selection buttons */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-12">
          <button
            onClick={() => setSelectedSolution("agents")}
            className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
              selectedSolution === "agents"
                ? "border-brand-purple/40 bg-brand-purple/5 shadow-lg"
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${selectedSolution === "agents" ? "bg-brand-purple text-white" : "bg-white/5 text-white/60"} shrink-0`}>
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-white">AI Agents</span>
              <span className="block text-[10px] text-white/40">Multi-agent swarms</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedSolution("rag")}
            className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
              selectedSolution === "rag"
                ? "border-brand-cyan/40 bg-brand-cyan/5 shadow-lg"
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${selectedSolution === "rag" ? "bg-brand-cyan text-white" : "bg-white/5 text-white/60"} shrink-0`}>
              <Binary className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-white">RAG Indexes</span>
              <span className="block text-[10px] text-white/40">Vector document search</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedSolution("finetuning")}
            className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
              selectedSolution === "finetuning"
                ? "border-brand-blue/40 bg-brand-blue/5 shadow-lg"
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${selectedSolution === "finetuning" ? "bg-brand-blue text-white" : "bg-white/5 text-white/60"} shrink-0`}>
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-white">Fine-Tuning</span>
              <span className="block text-[10px] text-white/40">Model customization</span>
            </div>
          </button>
        </div>

        {/* Display Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main textual card */}
          <GlowingCard className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan">
                {current.tagline}
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {current.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {current.desc}
              </p>

              {/* Technologies list */}
              <div className="mt-6 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-white/40 mr-2 uppercase tracking-wide">Core Stack:</span>
                {current.frameworks.map((f, idx) => (
                  <span key={idx} className="rounded bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-mono text-white/60">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto text-left">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-lg px-3 py-2 text-xs">
                    <span className="block font-bold text-white">{m.split(" ")[0]}</span>
                    <span className="text-[9px] text-white/40">{m.split(" ").slice(1).join(" ")}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="w-full sm:w-auto neon-btn inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shrink-0"
              >
                Integrate Solution
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </GlowingCard>

          {/* Interactive Flow visualizer card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 h-[200px] w-[200px] rounded-full bg-brand-purple/5 blur-[60px]" />
            
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/70 mb-6">// Integration Roadmap</h3>

            <div className="space-y-6 relative z-10">
              {current.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0 text-xs font-bold font-mono text-brand-cyan glow-text-cyan">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{step.label}</h4>
                    <p className="mt-1 text-xs text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI testing and evaluation system callout */}
        <div className="rounded-2xl border border-white/5 bg-gradient-to-tr from-bg-black via-bg-black to-brand-purple/10 p-6 sm:p-10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[250px] w-[250px] rounded-full bg-brand-cyan/5 blur-[80px]" />
          
          <div className="max-w-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple/10 border border-brand-purple/20 mb-4">
              <ShieldCheck className="h-5 w-5 text-brand-purple" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">AI Agent Observability & Red-Teaming</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              AI systems represent an operational liability if left unmonitored. We set up high-throughput evaluation scripts that automatically simulate hundreds of user paths, testing responses for factual consistency, prompt hacking, and private identity leaks.
            </p>
          </div>

          <Link
            href="/contact?scoping=eval"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 shrink-0"
          >
            Scoping Evaluation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
