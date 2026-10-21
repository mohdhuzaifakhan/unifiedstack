"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  Binary, 
  Layers, 
  ArrowRight,
  ArrowUpRight, 
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
    <div className="relative py-12 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Background visual meshes */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-blue-50/70 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-indigo-50/60 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            AI Engineering
          </span>
          <h1 className="mt-2.5 sm:mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-tight break-words">
            Production AI: Agentic AI, RAG & Fine-Tuning
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore how we architect multi-step Agentic AI workflows, deterministic RAG retrieval pipelines, custom model fine-tuning, and automated business processes built for reliability, scale, and enterprise data privacy.
          </p>
        </div>

        {/* Tab Selection buttons */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 mb-10 sm:mb-12">
          <button
            onClick={() => setSelectedSolution("agents")}
            className={`flex items-center gap-3.5 sm:gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all cursor-pointer ${
              selectedSolution === "agents"
                ? "border-blue-600 bg-blue-50/70 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${
              selectedSolution === "agents" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900">AI Chatbots & Agents</span>
              <span className="block text-xs text-slate-500">Automate customer inquiries</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedSolution("rag")}
            className={`flex items-center gap-3.5 sm:gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all cursor-pointer ${
              selectedSolution === "rag"
                ? "border-blue-600 bg-blue-50/70 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${
              selectedSolution === "rag" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              <Binary className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900">Document Search (RAG)</span>
              <span className="block text-xs text-slate-500">Search PDFs & business files</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedSolution("finetuning")}
            className={`flex items-center gap-3.5 sm:gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all cursor-pointer ${
              selectedSolution === "finetuning"
                ? "border-blue-600 bg-blue-50/70 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${
              selectedSolution === "finetuning" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900">Workflow Automation</span>
              <span className="block text-xs text-slate-500">Custom business integrations</span>
            </div>
          </button>
        </div>

        {/* Display Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-16">
          {/* Main textual card */}
          <GlowingCard className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700">
                {current.tagline}
              </span>
              <h2 className="mt-2.5 sm:mt-3 text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {current.title}
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                {current.desc}
              </p>

              {/* Technologies list */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider">Tech Used:</span>
                {current.frameworks.map((f, idx) => (
                  <span key={idx} className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-slate-700">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:w-auto text-left">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 sm:px-3.5 py-2 text-center sm:text-left">
                    <span className="block font-bold text-slate-900 text-xs sm:text-sm">{m.split(" ")[0]}</span>
                    <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-medium leading-tight mt-0.5">{m.split(" ").slice(1).join(" ")}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="w-full sm:w-auto neon-btn inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shrink-0 shadow-xs transition-all hover:scale-[1.02]"
              >
                Start This Project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </GlowingCard>

          {/* Interactive Flow visualizer card */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-5 sm:mb-6 font-mono">
              // How We Build It
            </h3>

            <div className="space-y-5 sm:space-y-6 relative z-10">
              {current.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3.5 sm:gap-4 items-start">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shrink-0 text-xs font-bold text-blue-700 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{step.label}</h4>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Tested & Verified
              </span>
              <span>100% Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
