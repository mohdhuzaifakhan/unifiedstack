"use client";

import GlowingCard from "@/components/ui/glowing-card";
import * as Lucide from "lucide-react";
import {
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getServices, Service } from "@/lib/firebase";
import { MOCK_SERVICES } from "@/lib/seedData";

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Lucide as any)[name];
  if (!IconComponent) return <Lucide.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "fullstack">("all");
  const [clientLocation, setClientLocation] = useState<"in" | "intl">("in");
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
    <div className="relative py-12 md:py-20 px-4">
      {/* Dynamic Background Mesh */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Our Offerings
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            Enterprise AI & Full Stack Engineering
          </h1>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">
            We deliver stateful, production-grade AI agent systems, modular web/mobile backends, and full-cloud system orchestrations designed to eliminate operational waste.
          </p>
        </div>

        {/* Dynamic Location / Currency Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Select Client Location & Pricing:</span>
          <div className="flex rounded-full border border-white/5 bg-white/[0.02] p-1 backdrop-blur-sm">
            <button
              onClick={() => setClientLocation("in")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                clientLocation === "in"
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>🇮🇳</span> Indian Client (₹)
            </button>
            <button
              onClick={() => setClientLocation("intl")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                clientLocation === "intl"
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>🌐</span> International Client ($)
            </button>
          </div>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {(["all", "ai", "fullstack"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${activeFilter === filter
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                  : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
                }`}
            >
              {filter === "all" ? "All Services" : filter === "ai" ? "AI Engineering" : "Full Stack & DevOps"}
            </button>
          ))}
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredServices.map((service) => (
            <GlowingCard key={service.id} id={service.id} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between border-b border-white/5 pb-5">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <DynamicIcon name={service.iconName} className={`h-6 w-6 ${service.category === 'ai' ? 'text-brand-purple' : 'text-brand-cyan'}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">{service.title}</h2>
                      <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-brand-cyan">
                        {service.category === "ai" ? "AI Specialty" : "Engineering Core"}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-sm font-extrabold text-white">
                      {clientLocation === "in" ? service.pricing.in : service.pricing.intl}
                    </span>
                    <span className="block text-[9px] uppercase tracking-wider text-white/40">{service.delivery}</span>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>

                {/* Benefits checklist */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Core Benefits:</h4>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                      <span className="text-xs text-white/60 leading-normal">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Real-world Use Case */}
                <div className="mt-6 rounded-lg bg-white/[0.02] border border-white/5 p-4">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-brand-purple mb-1">
                    Ideal Use Case
                  </span>
                  <p className="text-xs text-white/40 leading-relaxed italic">
                    "{service.useCase}"
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-1.5 flex-wrap w-full sm:w-auto">
                  {service.tech.map((t, idx) => (
                    <span key={idx} className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-white/60">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}&location=${clientLocation}`}
                  className="w-full sm:w-auto neon-btn inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Book consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </div>
  );
}
