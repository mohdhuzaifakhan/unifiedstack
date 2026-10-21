"use client";

import GlowingCard from "@/components/ui/glowing-card";
import DynamicIcon from "@/components/dynamic-icon";
import { getServices, Service } from "@/lib/firebase";
import { MOCK_SERVICES } from "@/lib/seedData";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "fullstack">("all");
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getServices();
        setServicesList(data);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeServices = servicesList.length > 0 ? servicesList : MOCK_SERVICES;

  const filteredServices = activeServices.filter((s) => {
    if (activeFilter === "all") return true;
    return s.category === activeFilter;
  });

  return (
    <div className="relative py-12 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white text-slate-900 font-sans">
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Redesigned Service Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="whitespace-nowrap">Core Engineering Disciplines</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Full-Stack Software & <span className="text-blue-600">AI Engineering</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We engineer high-performance web applications, fluid mobile platforms, Agentic AI workflows, and resilient backend systems. Fixed-scope delivery with direct founder communication.
          </p>

          {/* Value Highlights Strip */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 whitespace-nowrap shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              Direct Founder Access
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 whitespace-nowrap shrink-0">
              <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              2–4 Week Turnarounds
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              Production-Ready Code
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 whitespace-nowrap shrink-0">
              <Zap className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              Fixed Scope & Pricing
            </span>
          </div>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {(["all", "ai", "fullstack"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 sm:px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="whitespace-nowrap">
                {filter === "all" ? "All 4 Services" : filter === "ai" ? "AI Development" : "Web, Mobile & Backend"}
              </span>
            </button>
          ))}
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {filteredServices.map((service) => (
            <GlowingCard key={service.id} id={service.id} className="p-5 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Header (Title & Price) */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-4 sm:pb-5 gap-3.5">
                  <div className="flex gap-3.5 sm:gap-4 items-start min-w-0">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                      <DynamicIcon name={service.iconName} className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{service.title}</h2>
                      <span className="mt-1 inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 whitespace-nowrap">
                        {service.category === "ai" ? "AI Development" : "Software Engineering"}
                      </span>
                    </div>
                  </div>

                  {/* Single Clean Pricing (No country/currency labels) */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0 whitespace-nowrap">
                    <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                      {service.pricing?.in || "Starting at ₹50,000"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5">
                      {service.delivery} delivery
                    </span>
                  </div>
                </div>

                <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-slate-600 font-sans">
                  {service.description}
                </p>

                {/* Benefits checklist */}
                <div className="mt-5 sm:mt-6 space-y-2.5">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">What You Get:</h4>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-normal">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Real-world Use Case */}
                <div className="mt-5 sm:mt-6 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4">
                  <span className="block text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-blue-700 mb-1">
                    Primary Application:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{service.useCase}"
                  </p>
                </div>
              </div>

              {/* Bottom Row: Technologies + CTA Button (immune to wrapping & layout breaking) */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex gap-1.5 flex-wrap min-w-0">
                  {service.tech.map((t, idx) => (
                    <span key={idx} className="rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-xs font-medium text-slate-700 whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    <span className="whitespace-nowrap">Discuss Project</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>

        {/* Bottom Agency Banner */}
        <div className="mt-14 sm:mt-16 rounded-2xl border border-slate-200 bg-slate-50/70 p-7 sm:p-10 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Have a project in mind?
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Tell us about your requirements or operational challenge. We will review your project and get back to you with a clear roadmap and fixed timeline.
          </p>
          <div className="mt-5 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              <span className="whitespace-nowrap">Start a Discussion</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
