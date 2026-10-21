"use client";

import GlowingCard from "@/components/ui/glowing-card";
import { getGlobals, Globals } from "@/lib/firebase";
import { MOCK_GLOBALS } from "@/lib/seedData";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Clock,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [globals, setGlobals] = useState<Globals | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"founder" | "cofounder">("founder");

  useEffect(() => {
    async function loadData() {
      try {
        const globData = await getGlobals();
        setGlobals(globData);
      } catch (err) {
        console.error("Failed to load about page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeGlobals = globals || MOCK_GLOBALS;
  const philosophies = activeGlobals.about?.philosophies || MOCK_GLOBALS.about.philosophies;
  const skillCategories = activeGlobals.about?.skillCategories || MOCK_GLOBALS.about.skillCategories;
  const journeyTimeline = activeGlobals.about?.journeyTimeline || MOCK_GLOBALS.about.journeyTimeline;
  const bioParagraphs = activeGlobals.about?.bio || MOCK_GLOBALS.about.bio;
  const founderName = activeGlobals.about?.founderName || MOCK_GLOBALS.about.founderName;
  const founderTitle = activeGlobals.about?.founderTitle || MOCK_GLOBALS.about.founderTitle;

  const coFounderName = activeGlobals.about?.coFounderName || MOCK_GLOBALS.about.coFounderName;
  const coFounderTitle = activeGlobals.about?.coFounderTitle || MOCK_GLOBALS.about.coFounderTitle;
  const coFounderBio = activeGlobals.about?.coFounderBio || MOCK_GLOBALS.about.coFounderBio || [];
  const coFounderJourneyTimeline = activeGlobals.about?.coFounderJourneyTimeline || MOCK_GLOBALS.about.coFounderJourneyTimeline || [];

  return (
    <div className="relative py-12 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-blue-50/70 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-indigo-50/60 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            About UnifiedStack
          </span>
          <h1 className="mt-2.5 sm:mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-tight break-words">
            Meet the Founders
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Passionate engineers and builders delivering clean software, mobile apps, and practical AI systems from India.
          </p>
        </div>

        {/* Toggle Selector */}
        <div className="flex justify-center mb-12 sm:mb-16 w-full max-w-md mx-auto">
          <div className="grid grid-cols-2 w-full rounded-2xl sm:rounded-full border border-slate-200 bg-slate-50 p-1 sm:p-1.5 shadow-2xs">
            <button
              onClick={() => setActiveTab("founder")}
              className={`rounded-xl sm:rounded-full px-3 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 text-center cursor-pointer ${
                activeTab === "founder"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Mohd Huzaifa
            </button>
            <button
              onClick={() => setActiveTab("cofounder")}
              className={`rounded-xl sm:rounded-full px-3 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 text-center cursor-pointer ${
                activeTab === "cofounder"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Mohd Suhail
            </button>
          </div>
        </div>

        {/* Profile Details */}
        {activeTab === "founder" ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mb-20">
            {/* Avatar Area */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm w-full max-w-[280px]">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group">
                  <img
                    src="/profile.jpg"
                    alt={founderName}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Terminal className="h-3.5 w-3.5 text-blue-600" />
                    Full Stack & AI Engineer
                  </span>
                  <span className="text-blue-700 font-semibold">India</span>
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Founder & Principal Engineer
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{founderName}</h2>
                <p className="text-xs text-slate-500 tracking-wider font-semibold uppercase">{founderTitle}</p>
              </div>

              {bioParagraphs.map((para, pIdx) => (
                <p key={pIdx}>
                  {para}
                </p>
              ))}

              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
                <span className="block text-xs uppercase font-bold tracking-widest text-blue-700 mb-2">
                  Our Mission
                </span>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "Our mission is simple: replace slow, buggy, or confusing software with fast, reliable, and beautifully designed web apps, mobile apps, and smart AI automation that help businesses grow."
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mb-20">
            {/* Avatar Area */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm w-full max-w-[280px]">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group">
                  <img
                    src="/suhail.png"
                    alt={coFounderName}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Terminal className="h-3.5 w-3.5 text-blue-600" />
                    Business Operations
                  </span>
                  <span className="text-blue-700 font-semibold">India</span>
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Co-Founder & Head of Operations
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{coFounderName}</h2>
                <p className="text-xs text-slate-500 tracking-wider font-semibold uppercase">{coFounderTitle}</p>
              </div>

              {coFounderBio.map((para, pIdx) => (
                <p key={pIdx}>
                  {para}
                </p>
              ))}

              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
                <span className="block text-xs uppercase font-bold tracking-widest text-blue-700 mb-2">
                  Our Focus
                </span>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "Our focus is to ensure every client gets clear communication, honest timelines, and complete peace of mind while we build and manage their technology."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Engineering Philosophy */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Principles
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              How We Build & What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {philosophies.map((phil, idx) => (
              <GlowingCard key={idx} className="p-6">
                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                  {phil.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {phil.desc}
                </p>
              </GlowingCard>
            ))}
          </div>
        </div>

        {/* Technical Competencies Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Core Skills
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              Our Skills & Technologies
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 mb-5 pb-2 border-b border-slate-100">
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex gap-2.5 items-center">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Timeline Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Experience
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              Professional Journey ({activeTab === "founder" ? founderName : coFounderName})
            </h2>
          </div>
          <div className="relative border-l border-slate-200 pl-6 sm:pl-10 space-y-10 max-w-3xl mx-auto">
            {(activeTab === "founder" ? journeyTimeline : coFounderJourneyTimeline).map((item, idx) => (
              <div key={idx} className="relative">
                {/* Node pointer */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-blue-600 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>

                <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {item.date}
                </span>

                <h3 className="mt-2.5 text-lg font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <span className="block text-xs font-medium text-slate-500 mt-0.5">
                  {item.company}
                </span>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Conversion Block */}
        <div className="mt-16 text-center border-t border-slate-200 pt-12">
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:scale-[1.02]"
          >
            Talk Directly With Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
