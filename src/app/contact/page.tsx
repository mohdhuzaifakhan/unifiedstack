"use client";

import GlowingCard from "@/components/ui/glowing-card";
import { submitInquiry } from "@/lib/firebase";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  MessageSquare,
  Send,
  X
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [clientLocation, setClientLocation] = useState<"in" | "intl">("in");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Smart AI Chatbots (WhatsApp & Web)",
    budget: "₹25,000 - ₹50,000",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  // Pre-fill fields from URL params if present
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    const locationParam = searchParams.get("location");
    if (locationParam === "in" || locationParam === "intl") {
      setClientLocation(locationParam);
    }
    const calendlyParam = searchParams.get("calendly");
    if (calendlyParam === "true") {
      setShowCalendly(true);
    }
  }, [searchParams]);

  // Adjust budget default when location changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      budget: clientLocation === "in" ? "₹25,000 - ₹50,000" : "$1,000 - $3,000"
    }));
  }, [clientLocation]);

  const servicesList = [
    "Web Development (Next.js, React, Full Stack)",
    "Mobile App Development (React Native, iOS & Android)",
    "AI Development (RAG, Agentic AI, Fine-tuning, Automations)",
    "Backend Development (APIs, Python, Node.js, Databases)",
    "Other Custom Software"
  ];

  const budgetTiersIn = [
    "Under ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000+"
  ];

  const budgetTiersIntl = [
    "Under $1,000",
    "$1,000 - $3,000",
    "$3,000 - $5,000",
    "$5,000+"
  ];

  const budgetTiers = clientLocation === "in" ? budgetTiersIn : budgetTiersIntl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetSelect = (tier: string) => {
    setFormData((prev) => ({ ...prev, budget: tier }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitInquiry({
        ...formData,
        message: `[Client Location: ${clientLocation === "in" ? "India" : "International"}] ${formData.message}`
      });
      if (res.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "Smart AI Chatbots (WhatsApp & Web)",
          budget: clientLocation === "in" ? "₹25,000 - ₹50,000" : "$1,000 - $3,000",
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative py-12 md:py-20 px-4 bg-white text-slate-900">
      {/* Background soft ambient glows */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-blue-50/60 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-indigo-50/50 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Column 1: Info and scheduling links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Contact Us
              </span>
              <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
                Let's Discuss Your Project
              </h1>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Send us a message or connect directly with founder Mohd Huzaifa to discuss your requirements, timeline, and budget.
              </p>
            </div>

            {/* Quick action cards */}
            <div className="space-y-4">
              {/* Calendly intake selector */}
              <button
                onClick={() => setShowCalendly(true)}
                className="w-full flex items-center justify-between rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 p-5 text-left transition-all shadow-2xs cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900">Schedule a Free Call</span>
                    <span className="block text-xs text-slate-500">Pick a convenient time on Calendly</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>

              {/* WhatsApp direct chat link */}
              <a
                href="https://wa.me/918433043426?text=Hi%20Mohd%20Huzaifa,%20I'd%20like%20to%20discuss%20a%20software%20or%20AI%20project."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 p-5 text-left transition-all shadow-2xs"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900">Chat on WhatsApp</span>
                    <span className="block text-xs text-emerald-600 font-medium">+91 84330 43426 (Direct Founder)</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            {/* Social profiles and address info */}
            <div className="border-t border-slate-200 pt-8 text-xs text-slate-500">
              <span className="block font-bold text-slate-800">UnifiedStack</span>
              <span className="block mt-1">Registered Software & AI Studio in India.</span>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/mohd-huzaifa-1796b9234"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-slate-300 transition-colors shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/mohdhuzaifakhan"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Lead intake form */}
          <div className="lg:col-span-7">
            <GlowingCard className="p-6 sm:p-8 relative h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-6 shadow-2xs">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Message Received Successfully!</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-sm">
                    Thank you! We have received your project details. Mohd Huzaifa will review them and get back to you within a few hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Location Selector */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                      Your Location & Currency
                    </span>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 w-full sm:w-fit shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setClientLocation("in")}
                        className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                          clientLocation === "in"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white"
                        }`}
                      >
                        India (₹ INR)
                      </button>
                      <button
                        type="button"
                        onClick={() => setClientLocation("intl")}
                        className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                          clientLocation === "intl"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white"
                        }`}
                      >
                        International ($ USD)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Company or Project Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                        placeholder="e.g. My Business"
                        required
                      />
                    </div>
                    {/* Service Required */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        What Service Do You Need?
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                      >
                        {servicesList.map((service, idx) => (
                          <option key={idx} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Choice Tiers */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                      Your Estimated Budget Range
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => handleBudgetSelect(tier)}
                            className={`rounded-xl border py-2.5 sm:py-3 px-1 sm:px-2 text-center text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-2xs"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Details / Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs resize-none transition-all"
                      placeholder="Tell us a bit about what you want to build, any features you need, or your target launch date..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3.5 px-6 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                        <span className="whitespace-nowrap">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 shrink-0" />
                        <span className="whitespace-nowrap">Send Message & Project Details</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlowingCard>
          </div>
        </div>
      </div>

      {/* Calendly Booking Overlay Modal */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xl">
            {/* Top drawer controls */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Schedule Direct Call
                </span>
              </div>
              <button
                onClick={() => setShowCalendly(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Calendly Booking Card */}
            <div className="p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-4 shadow-2xs">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Direct Consultation with Mohd Huzaifa</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
                Schedule a 30-minute scoping video call to discuss your project requirements, tech stack recommendations, and timeline estimates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto neon-btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md"
                >
                  Open Live Calendar
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => setShowCalendly(false)}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Back to Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center text-slate-600 font-mono text-xs">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" /> Loading Contact Form...
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
