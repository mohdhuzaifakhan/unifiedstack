"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Mail, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Linkedin, 
  Github, 
  Calendar,
  Send,
  Loader2
} from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";
import { submitInquiry } from "@/lib/firebase";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "AI Agent Development",
    budget: "$5,000 - $15,000",
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
    const calendlyParam = searchParams.get("calendly");
    if (calendlyParam === "true") {
      setShowCalendly(true);
    }
  }, [searchParams]);

  const servicesList = [
    "AI Agent Development",
    "Generative AI Applications",
    "RAG Vector Databases",
    "LLM Fine-Tuning",
    "SaaS Platform Development",
    "Mobile App Development",
    "API & Backend Engineering",
    "Observability & Evaluation"
  ];

  const budgetTiers = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $50,000",
    "$50,000+"
  ];

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
      const res = await submitInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "AI Agent Development",
          budget: "$5,000 - $15,000",
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
    <div className="relative py-12 md:py-20 px-4">
      {/* Background gradients */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Column 1: Info and scheduling links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
                Contact Scoping
              </span>
              <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                Let's scope your next product
              </h1>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                Submit an inquiry or schedule a direct consultation with founder Mohd Huzaifa to evaluate timeline complexities.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-4">
              {/* Calendly intake selector */}
              <button
                onClick={() => setShowCalendly(true)}
                className="w-full flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] hover:border-brand-purple/40 hover:bg-white/[0.02] p-5 text-left transition-all"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Book Scoping Call</span>
                    <span className="block text-[10px] text-white/40">Embedded Calendly booking</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/40" />
              </button>

              {/* WhatsApp direct chat link */}
              <a
                href="https://wa.me/918433043426?text=Hi%20Mohd%20Huzaifa,%20I'd%20like%20to%20discuss%20an%20AI%20project."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] hover:border-green-500/40 hover:bg-white/[0.02] p-5 text-left transition-all"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Chat on WhatsApp</span>
                    <span className="block text-[10px] text-green-400 font-medium">Average reply: 15 mins</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/40" />
              </a>
            </div>

            {/* Social profiles and address info */}
            <div className="border-t border-white/5 pt-8 text-xs text-white/40">
              <span className="block font-bold text-white">UnifiedStack India</span>
              <span className="block mt-1">Sole Proprietorship Registry, India.</span>
              <div className="mt-4 flex items-center gap-4">
                <a href="https://www.linkedin.com/in/mohd-huzaifa-1796b9234" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin className="h-4.5 w-4.5" /></a>
                <a href="https://github.com" className="hover:text-white transition-colors"><Github className="h-4.5 w-4.5" /></a>
              </div>
            </div>
          </div>

          {/* Column 2: Lead intake form */}
          <div className="lg:col-span-7">
            <GlowingCard className="p-6 sm:p-8 relative h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Inquiry Shipped Successfully</h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/50 max-w-sm">
                    Thank you. Your scoping request was securely registered. Mohd Huzaifa will evaluate the details and reply within 12 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                        placeholder="Mohd Huzaifa"
                        required
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                        placeholder="mohdhuzaifa8126195456@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                        placeholder="UnifiedStack Labs"
                        required
                      />
                    </div>
                    {/* Service Required */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Service Needed</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 [&>option]:bg-bg-black"
                      >
                        {servicesList.map((service, idx) => (
                          <option key={idx} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Choice Tiers */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">Project Budget Tier</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => handleBudgetSelect(tier)}
                            className={`rounded-lg border py-3 text-center text-xs font-semibold transition-all ${
                              isSelected
                                ? "border-brand-purple bg-brand-purple/10 text-white"
                                : "border-white/5 bg-white/[0.02] text-white/50 hover:bg-white/5"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message requirements */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Project Brief & Details</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40 resize-none"
                      placeholder="Outline your database complexity, target LLM context size, or React interfaces needed..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full neon-btn inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-4 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Scoping lead...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Submit Scoping Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlowingCard>
          </div>
        </div>
      </div>

      {/* Calendly Booking Overlay Drawer */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/5 bg-bg-black overflow-hidden shadow-2xl">
            {/* Top drawer controls */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-purple" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Consultation Scoping Scheduler</span>
              </div>
              <button
                onClick={() => setShowCalendly(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            
            {/* Calendly Inline Widget Mockup */}
            <div className="p-4 sm:p-8 flex flex-col items-center justify-center min-h-[450px]">
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 text-center max-w-md">
                <Calendar className="h-10 w-10 text-brand-purple mx-auto mb-4 animate-bounce" />
                <h3 className="text-base font-bold text-white">Direct Calendly Scoping call</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  We hook directly to Calendly booking schedules here. In production, this embeds your active scheduling page dynamically.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3 text-xs font-bold uppercase text-white"
                  >
                    Open Live Calendly Schedule
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => setShowCalendly(false)}
                    className="rounded-lg border border-white/5 bg-white/[0.02] py-3 text-xs font-semibold text-white/60 hover:bg-white/5"
                  >
                    Back to Form
                  </button>
                </div>
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
      <div className="flex h-screen items-center justify-center text-white font-mono text-xs">
        <Loader2 className="h-6 w-6 animate-spin text-brand-purple mr-2" /> Loading Scoping Dashboard...
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
