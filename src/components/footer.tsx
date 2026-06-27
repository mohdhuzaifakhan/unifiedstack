"use client";

import { CheckCircle2, Cpu, Github, Linkedin, Send } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/5 bg-bg-black py-12 md:py-16 overflow-hidden">
      {/* Subtle bottom glowing background gradient */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-brand-purple/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white/5 border border-white/10">
                <Cpu className="h-4 w-4 text-brand-purple" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Unified<span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Stack</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-sm">
              Building intelligent software architectures and cognitive autonomous agent systems that empower enterprises to orchestrate workflows with scale, speed, and safety.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/15 transition-all"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-huzaifa-1796b9234"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/15 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Service Links column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="text-white/50 hover:text-brand-cyan transition-colors">
                  AI Agent Dev
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Generative AI
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-brand-cyan transition-colors">
                  RAG Pipelines
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Custom SaaS
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Mobile Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-white/50 hover:text-brand-cyan transition-colors">
                  About Founder
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Case Showcase
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Insights Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/50 hover:text-brand-cyan transition-colors">
                  Founder Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Newsletter</h3>
            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              Subscribe to receive structural breakdowns of AI research and systems blueprints.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-lg">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-1 text-xs text-white placeholder-white/20 outline-none"
                required
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded bg-brand-purple hover:bg-brand-violet text-white transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
            {subscribed && (
              <span className="mt-2 block text-[10px] text-green-400 font-medium">
                Successfully subscribed!
              </span>
            )}
          </div>
        </div>

        {/* Sole proprietorship registry and copy section */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <div className="text-xs text-white/40">
            <span className="block font-medium">UnifiedStack</span>
            <span className="block mt-0.5 sm:inline">Sole Proprietorship, registered in India.</span>
          </div>
          <span className="text-xs text-white/30">
            © {currentYear} UnifiedStack. Designed with elite aesthetics.
          </span>
        </div>
      </div>
    </footer>
  );
}
