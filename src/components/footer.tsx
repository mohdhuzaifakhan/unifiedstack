"use client";

import { CheckCircle2, Layers, Github, Linkedin, Send, Lock } from "lucide-react";
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
    <footer className="relative mt-auto border-t border-slate-200/80 bg-slate-50/70 py-12 md:py-16 overflow-hidden">
      {/* Subtle ambient light gradient at bottom */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-blue-100/50 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Unified<span className="text-blue-600">Stack</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-sm">
              We design and engineer bespoke software applications, intelligent AI agent workflows, and scalable cloud systems that help businesses operate with precision and speed.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/mohdhuzaifakhan"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-huzaifa-1796b9234"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-slate-300 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Service Links column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/services#web-development" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-app-development" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/services#ai-development" className="text-slate-600 hover:text-blue-600 transition-colors">
                  AI Development
                </Link>
              </li>
              <li>
                <Link href="/services#backend-development" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Backend Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">
                  About Founders
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Company Profile & Deck
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  <Lock className="h-3 w-3 text-slate-400" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Stay Connected</h3>
            <p className="mt-4 text-xs text-slate-600 leading-relaxed">
              Subscribe to receive occasional engineering breakdowns and systems blueprints from our team.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-1.5 bg-white border border-slate-200 p-1 rounded-xl">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full min-w-0 bg-transparent px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none"
                required
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0"
                aria-label="Subscribe"
              >
                {subscribed ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
            {subscribed && (
              <span className="mt-2 block text-[11px] text-emerald-600 font-medium">
                Thank you! You are subscribed.
              </span>
            )}
          </div>
        </div>

        {/* Legal registry and copy section */}
        <div className="mt-12 border-t border-slate-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">UnifiedStack</span>
            <span className="mx-1.5 hidden sm:inline">•</span>
            <span className="block mt-0.5 sm:inline">Sole Proprietorship, Registered in India.</span>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-3 text-xs text-slate-400">
            <span>© {currentYear} UnifiedStack. All rights reserved.</span>
            <span>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors font-medium"
              title="Agency Admin Login & CMS"
            >
              <Lock className="h-3 w-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
