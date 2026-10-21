"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bot,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Mail,
  Moon,
  Phone,
  Printer,
  Server,
  Smartphone,
  Sun
} from "lucide-react";
import { useEffect, useState } from "react";

// Helper hook for copying text
function useCopyText() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return { copied, copy };
}

export default function ProfileHub() {
  const [activeTab, setActiveTab] = useState<"profile" | "deck" | "capability" | "templates" | "brand">("profile");
  const [isInkSaver, setIsInkSaver] = useState(false);
  const [deckSlide, setDeckSlide] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState<"proposal" | "onboarding" | "pricing">("proposal");
  const { copied, copy } = useCopyText();

  // Sync isInkSaver class to document.body for printing styling
  useEffect(() => {
    if (isInkSaver) {
      document.body.classList.add("ink-saver");
    } else {
      document.body.classList.remove("ink-saver");
    }
    return () => {
      document.body.classList.remove("ink-saver");
    };
  }, [isInkSaver]);

  const handlePrint = () => {
    window.print();
  };

  const companyInfo = {
    name: "UnifiedStack",
    website: "www.unifiedstack.com",
    email: "contact@unifiedstack.com",
    phone: "+91 84330 43426",
    linkedin: "linkedin.com/in/mohd-huzaifa-1796b9234",
    address: "Registered Software & AI Agency",
    tagline: "Building High-Performance Software & AI Systems",
    founder: "Mohd Huzaifa",
    cofounder: "Mohd Suhail",
  };

  // 4 Core Agency Disciplines
  const coreServices = [
    {
      id: "ai",
      name: "AI Development",
      icon: Bot,
      desc: "We design and deploy production AI systems: autonomous multi-step Agentic AI workflows, deterministic RAG retrieval pipelines, custom model fine-tuning, intelligent workflow automations, and 24/7 conversational assistants built with verifiable accuracy and strict enterprise guardrails."
    },
    {
      id: "web",
      name: "Web Development",
      icon: Globe,
      desc: "We build responsive, modern web applications, client portals, and scalable SaaS platforms using Next.js, React, and TypeScript. We emphasize clean code architectures, fast load times, and intuitive interfaces that support core business operations."
    },
    {
      id: "mobile",
      name: "Mobile App Development",
      icon: Smartphone,
      desc: "We engineer cross-platform Android and iOS applications using React Native. We deliver native-grade fluid performance, responsive touch interactions, reliable offline data caching, and background push notification systems from a single maintainable codebase."
    },
    {
      id: "backend",
      name: "Backend Development",
      icon: Server,
      desc: "We architect and build scalable server-side systems, high-throughput REST and asynchronous APIs, and relational or document database infrastructures using Python, FastAPI, Node.js, and PostgreSQL. Engineered for high concurrency, low latency, and robust data integrity."
    }
  ];

  // Grouped Tech Stack
  const techStack = [
    {
      category: "Frontend & Web",
      skills: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend & APIs",
      skills: ["Python", "FastAPI", "Node.js", "Express.js", "NestJS", "REST & gRPC"]
    },
    {
      category: "AI Solutions",
      skills: ["LangGraph", "LangChain", "OpenAI & Claude", "LlamaIndex", "Pinecone", "ChromaDB", "Fine-Tuning"]
    },
    {
      category: "Databases & Caching",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Vector Databases", "Firebase Firestore"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["Docker", "AWS", "Vercel", "GitHub Actions CI/CD", "Cloudflare"]
    }
  ];

  // 6-Step Development Process
  const devSteps = [
    { step: "01", name: "Requirements & Discovery", desc: "We analyze your business processes, identify technical bottlenecks, and map out the software and AI automation opportunities." },
    { step: "02", name: "System Architecture", desc: "We design the system architecture, select the tech stack, define API schemas, and map database relationships before writing code." },
    { step: "03", name: "UI/UX & Prototyping", desc: "We design modern, responsive interfaces and intuitive user flows, ensuring an exceptional client experience across desktop and mobile." },
    { step: "04", name: "Core Development", desc: "Our team writes clean, type-safe code in structured sprints, keeping you updated with regular progress demos and staging links." },
    { step: "05", name: "Testing & Quality Assurance", desc: "We run automated tests, perform security reviews, and verify AI agent reliability to guarantee safe and accurate operations." },
    { step: "06", name: "Production Launch & Support", desc: "We deploy the application to secure cloud hosting with automated CI/CD and provide dedicated maintenance and monitoring." }
  ];

  // Core Values
  const coreValues = [
    { name: "Clean Architecture", desc: "We build maintainable, type-safe software that scales without technical debt." },
    { name: "Reliable Execution", desc: "We enforce strict guardrails around AI systems to guarantee factual outputs." },
    { name: "Direct Communication", desc: "Clients collaborate directly with founding engineers, ensuring zero miscommunication." },
    { name: "On-Time Delivery", desc: "We set clear, realistic milestones and deliver production code on schedule." },
    { name: "Transparent Pricing", desc: "Fixed scopes, honest estimates, and complete clarity on all deliverables." },
    { name: "Long-Term Quality", desc: "We build systems designed to run smoothly for years with minimal maintenance." }
  ];

  // Target Industries
  const industries = [
    { name: "Healthcare & Life Sciences", desc: "Compliance audits, clinical records parsing, and medical workflow assistants." },
    { name: "Logistics & Transport", desc: "Geofenced route optimization, live vehicle coordinates, and dispatcher dashboards." },
    { name: "Finance & Advisory", desc: "Reporting portals, audit compliance checkers, and automated financial calculations." },
    { name: "Education & EdTech", desc: "Student learning portals, assessment grading helpers, and curriculum tools." },
    { name: "Retail & Commerce", desc: "Order management portals, inventory sync, and customer communication bots." },
    { name: "Startups & SMEs", desc: "Rapid MVP builds, production SaaS platforms, and enterprise API backends." }
  ];

  // Past Performance Highlights
  const pastHighlights = [
    {
      title: "Town Beat: Hyperlocal Social Network",
      category: "Mobile App Development",
      metric: "Sub-50ms Sync",
      desc: "Developed a cross-platform React Native community platform connecting citizens within specific city districts in real-time."
    },
    {
      title: "Salah Times: Masjid Directory & Timetables",
      category: "Mobile App Development",
      metric: "10-Min Pre-Alerts",
      desc: "Engineered a React Native mobile application providing synchronized prayer schedules, offline caching, and dynamic notifications."
    },
    {
      title: "Helpora: Service Marketplace Platform",
      category: "Full-Stack Development",
      metric: "100% Provider Verification",
      desc: "Built a complete service discovery and booking platform with real-time customer messaging, scheduling tools, and escrow payments."
    },
    {
      title: "Enterprise RAG Document Intelligence",
      category: "AI Development",
      metric: "Sub-1.2s Retrieval",
      desc: "Implemented a deterministic semantic document indexing engine using Pinecone, LlamaIndex, and Claude APIs with source citations."
    }
  ];

  // Business Proposal Markdown
  const proposalTemplateText = `# BUSINESS PROPOSAL FOR SOFTWARE & AI DEVELOPMENT

**Client Name:** [Client Corporation]  
**Project Name:** Customer Portal & AI-Driven Agent Workflows  
**Date:** ${new Date().toLocaleDateString()}  
**Provider:** UnifiedStack  

---

## 1. Project Goal & Overview
UnifiedStack is pleased to submit this proposal to engineer and deploy a custom web/mobile platform and stateful AI pipeline for [Client Corporation]. We build production-ready digital products that drive growth. Our work focuses on resolving your operational bottlenecks, ensuring that database structures run with minimal latency and AI agents perform with absolute reliability.

## 2. Project Scope & Deliverables
We propose a structured, phased timeline to deliver the full system:
* **Phase 1: Discovery & Architecture (Weeks 1-2)**: Analyze technical requirements, design API schemas, and build high-fidelity interface layouts.
* **Phase 2: Core Platform Development (Weeks 3-5)**: Implement the frontend portal (Next.js / React Native), build backend API endpoints (FastAPI / Node.js), and set up the database.
* **Phase 3: AI Agents & Pipeline Integration (Weeks 6-7)**: Build Agentic AI workflows, vector databases, and semantic RAG search indexing.
* **Phase 4: Verification, Launch & Handoff (Weeks 8-9)**: Run security checks, deploy to secure cloud hosting with Docker, and configure automated GitHub Actions CI/CD.

## 3. Financial Agreement
This project will be delivered for a fixed fee of **[Budget Amount]**, invoiced in structured milestones:
* **Milestone 1: Project kickoff and architecture sign-off** - 25% of total budget
* **Milestone 2: Completion of Frontend and Core Database APIs** - 35% of total budget
* **Milestone 3: Completion of AI Agents and Integrations** - 25% of total budget
* **Milestone 4: Staging sign-off, production launch, and code handoff** - 15% of total budget

---
**Submitted By:** Mohd Huzaifa, Technical Lead (UnifiedStack)`;

  // Client Onboarding Markdown
  const onboardingTemplateText = `# CLIENT ONBOARDING GUIDE & KICKOFF CHECKLIST

Welcome to **UnifiedStack**! We look forward to partnering with your team. To initiate development smoothly, please review the onboarding steps below.

---

## 1. Communication & Regular Updates
We value transparent communication. Throughout the project, we will share updates in a dedicated communication space:
* **Primary Channel:** Slack / Discord / WhatsApp (Select your preference)
* **Weekly Review:** A 30-minute sync to walk through progress on the staging link.
* **Team Leads:**
  - Technical Lead: Mohd Huzaifa (Full-Stack & AI Architect)
  - Operations Lead: Mohd Suhail (Business Operations)

## 2. Technical Access Requirements
To begin engineering, please grant access to the following accounts where applicable:
- [ ] **GitHub Repository**: Admin access to the project repository.
- [ ] **Cloud Platform (AWS / Vercel)**: IAM role permissions for deployments.
- [ ] **API Keys & Credentials**: OpenAI, Pinecone, or database connection strings.

## 3. Kickoff Sync Agenda (45 Minutes)
* **00:00 - 00:15**: Project Goal Alignment (Reviewing timelines and expectations)
* **00:15 - 00:30**: Technical Walkthrough (Looking at current database models and workflows)
* **00:30 - 00:40**: Architecture Map (Confirming technology choices, databases, and UI layouts)
* **00:40 - 00:45**: Next Steps, Access Handshakes, and Scheduling our first review sync`;

  // Pricing brochure copy (Zero mentions of India in price tags)
  const pricingBrochureText = `# SERVICES & PRICING PLANS

UnifiedStack delivers engineering excellence under transparent, fixed-scope pricing tiers mapped to your company's growth stage.

---

## 1. Web Application & Portal Development
* **Target Audience:** Startups and businesses looking for modern, high-performance web platforms and SaaS portals.
* **Deliverables:** Next.js full-stack web application, responsive desktop & mobile UI, relational database backend, authentication, and cloud launch.
* **Timeline:** 2-4 Weeks
* **Pricing:** Starting at ₹40,000

## 2. Mobile App Development (iOS & Android)
* **Target Audience:** Businesses seeking fluid, native-grade mobile experiences from a single maintainable codebase.
* **Deliverables:** React Native cross-platform mobile app, offline data sync, push notification systems, secure APIs, and app store preparation.
* **Timeline:** 3-6 Weeks
* **Pricing:** Starting at ₹50,000

## 3. AI Development (RAG, Agents & Automation)
* **Target Audience:** Businesses looking to automate complex workflows, synthesize private documents, or deploy intelligent copilots.
* **Deliverables:** Autonomous Agentic AI workflows, private RAG vector database indexing, custom model fine-tuning, and automated API integrations.
* **Timeline:** 2-5 Weeks
* **Pricing:** Starting at ₹50,000

## 4. Backend Development & API Architecture
* **Target Audience:** Companies requiring high-throughput server backends, microservices, and robust database architectures.
* **Deliverables:** FastAPI/Python or Node.js server endpoints, PostgreSQL/MongoDB schemas, sub-50ms query optimization, and Docker deployment.
* **Timeline:** 2-4 Weeks
* **Pricing:** Starting at ₹35,000`;

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden bg-slate-50/40 text-slate-900 font-sans">
      {/* FLOATING ACTION TOOLBAR (Web page only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-white/95 px-4 sm:px-6 py-2.5 sm:py-3 no-print max-w-[94vw]">
        <span className="text-xs font-semibold text-slate-500 border-r border-slate-200 pr-3 hidden xs:inline">
          Document Tools
        </span>

        {/* Ink Saver Toggle */}
        <button
          onClick={() => setIsInkSaver(!isInkSaver)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors cursor-pointer ${isInkSaver
            ? "border-amber-400 bg-amber-50 text-amber-700"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          title={isInkSaver ? "Disable Ink-Saver Mode" : "Enable Ink-Saver Mode (Eco-Friendly Print)"}
        >
          {isInkSaver ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-5 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
        >
          <Printer className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">Print / Save PDF</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">

        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 no-print">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            UnifiedStack | <span className="text-blue-600">Business Profile</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We engineer high-performance web applications, fluid mobile platforms, Agentic AI workflows, and resilient backend systems. Review our credentials, capability deck, and standard engagement templates below.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
            {[
              { id: "profile", label: "Executive Profile", icon: FileText },
              { id: "deck", label: "Capabilities Deck", icon: Layers },
              { id: "capability", label: "Capability Statement", icon: Award },
              // { id: "templates", label: "Pricing & Templates", icon: Briefcase },
              // { id: "brand", label: "Branding Standards", icon: Compass }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === "deck") setDeckSlide(0);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${active
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <AnimatePresence mode="wait">

            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="flex flex-col gap-10 w-full max-w-[210mm]">
                  <div className="print-page relative flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] overflow-hidden text-slate-900">
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Executive Profile & Credentials
                    </div>

                    <div className="my-auto text-left py-6">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-6">
                        <Cpu className="h-7 w-7" />
                      </div>
                      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Unified<span className="text-blue-600">Stack</span>
                      </h1>
                      <div className="h-1 w-20 bg-blue-600 my-5 rounded-full" />
                      <p className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                        {companyInfo.tagline}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                        We engineer custom web applications, cross-platform mobile apps, Agentic AI systems, and resilient backend architectures designed to solve business bottlenecks and scale.
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-100 pt-6 text-xs text-slate-500">
                      <div>
                        <span className="block font-medium text-slate-700">Founder: {companyInfo.founder}</span>
                        <span className="block">Co-Founder: {companyInfo.cofounder}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-semibold text-slate-900">Corporate Profile 2026</span>
                        <span className="block text-blue-600 font-medium">12-Page Booklet</span>
                      </div>
                    </div>
                  </div>

                  {/* PAGE 2: TABLE OF CONTENTS & EXEC SUMMARY */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">02 // Index</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-8">Table of Contents</h2>
                      <div className="space-y-3.5">
                        {[
                          { num: "01", title: "Cover Page & Core Identity", p: "1" },
                          { num: "02", title: "Table of Contents & Executive Summary", p: "2" },
                          { num: "03", title: "Company Overview & Leadership", p: "3" },
                          { num: "04", title: "Corporate Vision, Mission & Values", p: "4" },
                          { num: "05", title: "Services: Web & Mobile Engineering", p: "5" },
                          { num: "06", title: "Services: AI & Backend Architecture", p: "6" },
                          { num: "07", title: "Industries Served & Target Sectors", p: "7" },
                          { num: "08", title: "Technology Stack & Core Expertise", p: "8" },
                          { num: "09", title: "Development Methodology & Sprints", p: "9" },
                          { num: "10", title: "Portfolio Showcases & Case Studies", p: "10" },
                          { num: "11", title: "Client Testimonials & Performance Metrics", p: "11" },
                          { num: "12", title: "Engagement Paths & Contact Information", p: "12" }
                        ].map((item) => (
                          <div key={item.num} className="flex justify-between items-baseline border-b border-slate-100 pb-2 text-xs">
                            <span className="text-slate-400 font-semibold mr-2">{item.num}</span>
                            <span className="text-slate-800 font-medium">{item.title}</span>
                            <span className="flex-grow border-b border-dashed border-slate-200 mx-2" />
                            <span className="text-blue-600 font-bold">Page {item.p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Executive Summary</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        At UnifiedStack, we build high-performance software application layers and deterministic AI structures.
                        We help companies scale by automating slow, manual operations and designing robust platforms.
                        By avoiding typical AI hallucinations and engineering reliable modular codebases, we ensure your technology drives business growth.
                      </p>
                    </div>
                  </div>

                  {/* PAGE 3: COMPANY OVERVIEW */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">03 // Profile</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Company Overview</h2>

                      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                        <p>
                          <strong className="text-slate-900">UnifiedStack</strong> is a custom software development and AI engineering agency. We partner with ambitious founders, growing businesses, and enterprises to build reliable digital products. We specialize in full-stack web development, cross-platform mobile apps, Agentic AI workflows, and resilient backend systems.
                        </p>
                        <p>
                          Our core operational model focuses on engineering client-facing solutions. We replace slow, error-prone manual pipelines with robust, automated systems. Whether it is parsing complex documents, mapping real-time driver coordinates, or automating business workflows, we align our software architecture with your operational goals.
                        </p>
                        <p>
                          Founded by <strong className="text-slate-900">Mohd Huzaifa</strong> (Computer Science Graduate from Aligarh Muslim University, ex-systems engineer at Sofyrus Technologies) and co-founded by <strong className="text-slate-900">Mohd Suhail</strong> (Head of Operations), we guarantee direct communication, structured milestones, and dependable project delivery.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                        <span className="text-2xl font-bold text-blue-600">100%</span>
                        <span className="block text-xs font-medium text-slate-600 mt-1">Direct Developer Access</span>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                        <span className="text-2xl font-bold text-emerald-600">Sub-Second</span>
                        <span className="block text-xs font-medium text-slate-600 mt-1">Production Response Speed</span>
                      </div>
                    </div>
                  </div>

                  {/* PAGE 4: VISION, MISSION, VALUES */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">04 // Philosophy</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Vision, Mission & Core Values</h2>

                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">Our Vision</span>
                          <p className="text-xs text-slate-700 italic leading-relaxed">
                            &ldquo;To become a trusted global technology partner, empowering businesses with innovative software and artificial intelligence solutions that create lasting impact.&rdquo;
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Our Mission</span>
                          <p className="text-xs text-slate-700 italic leading-relaxed">
                            &ldquo;To deliver high-quality, scalable, and cost-effective software solutions by combining modern technologies, skilled engineering, and customer-focused development practices.&rdquo;
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">Our Core Principles</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {coreValues.map((val) => (
                          <div key={val.name} className="border border-slate-200 bg-slate-50/50 rounded-xl p-3">
                            <span className="text-xs font-semibold text-slate-900 block">{val.name}</span>
                            <span className="text-[11px] text-slate-600 leading-snug block mt-0.5">{val.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 text-center border-t border-slate-100 pt-4">
                      UnifiedStack &bull; Driven by Engineering Excellence
                    </div>
                  </div>

                  {/* PAGE 5: SERVICES I */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">05 // Services Part I</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Web & Mobile Application Engineering</h2>

                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-600 pl-4 py-1.5">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Web Application Development</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            We design and build fast web applications and SaaS portals using Next.js and Tailwind CSS. We ensure your platform looks premium, loads instantly, and runs smoothly across all screens with type-safe TypeScript architectures.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4 py-1.5">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Mobile App Development (iOS & Android)</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            We build cross-platform mobile apps for Android & iOS using React Native and Expo. From real-time tracking to offline data sync, we deliver responsive, native-grade mobile experiences from a single maintainable codebase.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4 py-1.5">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Custom Admin Portals & Dashboards</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            We build tailored internal tools, administrative dashboards, role-based access management, and business telemetry interfaces that give you full operational control.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Service Catalogue: Web & Mobile</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 6: SERVICES II */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">06 // Services Part II</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">AI Engineering & Backend Systems</h2>

                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-600 pl-4 py-1.5">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Agentic AI & Workflow Automation</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            We build autonomous multi-step AI agents using LangGraph. Our agents reason, call specialized tools, handle operational exceptions, and automate complex workflows with verifiable accuracy.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4 py-1.5">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Semantic RAG Document Search</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            We build deterministic document retrieval systems. We index your company files into vector databases, allowing LLMs to search thousands of private pages with sub-second response times and source citations.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4 py-1.5">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Backend APIs & Cloud Microservices</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            We engineer fast, secure, and documented RESTful and asynchronous APIs using Python, FastAPI, and Node.js. Optimized database schemas (PostgreSQL, Redis) deliver low latency and high concurrency.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Service Catalogue: AI & Backend</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 7: INDUSTRIES SERVED */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">07 // Target Sectors</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Industries We Serve</h2>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        We configure our software architectures to meet the exact regulatory requirements, database models, and operational needs of your specific industry.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {industries.map((ind, index) => (
                          <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                            <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">{ind.name}</span>
                            <span className="text-xs text-slate-600 leading-relaxed block mt-1">{ind.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Target Sectors</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 8: TECH STACK */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">08 // Tech Core</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Technology Stack & Technical Core</h2>

                      <div className="space-y-4">
                        {techStack.map((group) => (
                          <div key={group.category} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">{group.category}</h3>
                            <div className="flex flex-wrap gap-1.5">
                              {group.skills.map((skill) => (
                                <span key={skill} className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs text-slate-700 font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Technology Core</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 9: METHODOLOGY */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">09 // Methodology</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Our 6-Step Agile Roadmap</h2>

                      <div className="space-y-3">
                        {devSteps.map((step) => (
                          <div key={step.step} className="flex gap-4 items-start border-b border-slate-100 pb-2.5">
                            <span className="text-xs font-bold text-blue-600 shrink-0 mt-0.5">{step.step}</span>
                            <div>
                              <h3 className="text-xs font-bold text-slate-900">{step.name}</h3>
                              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Agile Roadmap</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 10: PORTFOLIO */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">10 // Track Record</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Selected Project Portfolio</h2>

                      <div className="space-y-4">
                        {pastHighlights.map((proj, idx) => (
                          <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                              <span className="rounded bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 text-[10px] font-semibold uppercase shrink-0">
                                {proj.metric}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-slate-500 block mb-1.5">{proj.category}</span>
                            <p className="text-xs text-slate-600 leading-relaxed">{proj.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Portfolio Highlights</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 11: METRICS & TESTIMONIALS */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">11 // Results</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Performance & Client Feedback</h2>

                      <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <span className="text-2xl font-bold text-blue-600">99.8%</span>
                          <span className="block text-[10px] uppercase font-semibold text-slate-500 mt-1">Uptime Delivered</span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <span className="text-2xl font-bold text-emerald-600">&lt; 1s</span>
                          <span className="block text-[10px] uppercase font-semibold text-slate-500 mt-1">API Execution</span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <span className="text-2xl font-bold text-slate-900">100%</span>
                          <span className="block text-[10px] uppercase font-semibold text-slate-500 mt-1">Code Ownership</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                          <p className="text-xs text-slate-700 italic leading-relaxed">
                            &ldquo;Mohd Huzaifa is an exceptional software engineer. He designed and deployed our automated workflow engine under a tight deadline. The system has run without a single outage and delivered massive speed improvements.&rdquo;
                          </p>
                          <span className="block text-xs font-bold text-slate-900 mt-2">&bull; Director of Engineering, Technology Client</span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                          <p className="text-xs text-slate-700 italic leading-relaxed">
                            &ldquo;UnifiedStack built a clean, reliable platform for our operations. Their direct communication and quick turnaround made the entire process seamless.&rdquo;
                          </p>
                          <span className="block text-xs font-bold text-slate-900 mt-2">&bull; Founder & CTO, SaaS Platform</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
                      <span>Performance & Feedback</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 12: ENGAGEMENT & CONTACT */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">12 // Next Steps</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Engagement & Contact Directory</h2>

                      <div className="space-y-3 mb-8">
                        {[
                          { label: "Agency Name", value: companyInfo.name, icon: Cpu },
                          { label: "Website", value: companyInfo.website, icon: Globe },
                          { label: "Email", value: companyInfo.email, icon: Mail },
                          { label: "WhatsApp & Phone", value: companyInfo.phone, icon: Phone },
                          { label: "LinkedIn", value: companyInfo.linkedin, icon: ExternalLink }
                        ].map((c, i) => {
                          const Icon = c.icon;
                          return (
                            <div key={i} className="flex items-center gap-3 border-b border-slate-100 pb-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-semibold text-slate-500 block">{c.label}</span>
                                <span className="text-xs font-bold text-slate-900">{c.value}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 text-center">
                      <div className="text-xs uppercase text-blue-600 font-bold tracking-wider">
                        Let's build reliable software systems together.
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        UnifiedStack &copy; {new Date().getFullYear()} &bull; All Rights Reserved
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 2. PITCH DECK TAB */}
            {activeTab === "deck" && (
              <motion.div
                key="deck"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {/* Deck slide viewer frame (no-print) */}
                <div className="w-full max-w-4xl border border-slate-200 bg-white rounded-2xl p-6 sm:p-10 no-print mb-8">

                  {/* Slide controls top bar */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-600">
                        Slide {deckSlide + 1} of 10
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeckSlide(prev => Math.max(0, prev - 1))}
                        disabled={deckSlide === 0}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeckSlide(prev => Math.min(9, prev + 1))}
                        disabled={deckSlide === 9}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE SLIDE DISPLAY AREA */}
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-6 sm:p-12 relative flex flex-col justify-between overflow-hidden select-none aspect-auto min-h-[340px] md:aspect-[16/9] text-slate-900">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-slate-200/80 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <span>UnifiedStack Capabilities</span>
                      <span>Slide 0{deckSlide + 1}</span>
                    </div>

                    {/* Content Switcher */}
                    <div className="my-auto py-6">
                      {deckSlide === 0 && (
                        <div>
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Introduction
                          </span>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
                            Building High-Performance Software & <span className="text-blue-600">AI Systems</span>
                          </h2>
                          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                            We build modern web applications, fluid mobile platforms, and autonomous AI agents for ambitious founders and growing businesses.
                          </p>
                        </div>
                      )}

                      {deckSlide === 1 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">The Challenge</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Common Bottlenecks in Modern Software</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                              <span className="font-bold text-red-700 text-xs block">AI Hallucinations</span>
                              <p className="text-xs text-red-600 leading-relaxed mt-1">Generic AI prompts produce unreliable outputs and compliance errors.</p>
                            </div>
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                              <span className="font-bold text-red-700 text-xs block">Manual Bottlenecks</span>
                              <p className="text-xs text-red-600 leading-relaxed mt-1">Repetitive manual processing slows growth and increases operational costs.</p>
                            </div>
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                              <span className="font-bold text-red-700 text-xs block">Over-Complex Stacks</span>
                              <p className="text-xs text-red-600 leading-relaxed mt-1">Premature microservices fragment teams and delay product delivery.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 2 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Our Solution</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Engineered for Reliability & Scale</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                              <span className="font-bold text-emerald-800 text-xs block">Deterministic Guardrails</span>
                              <p className="text-xs text-emerald-700 leading-relaxed mt-1">LangGraph cycles and schema validations enforce strict, reliable AI outputs.</p>
                            </div>
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                              <span className="font-bold text-emerald-800 text-xs block">Clean Code Architecture</span>
                              <p className="text-xs text-emerald-700 leading-relaxed mt-1">Type-safe TypeScript and modular codebases ensure rapid delivery and low maintenance.</p>
                            </div>
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                              <span className="font-bold text-emerald-800 text-xs block">Cloud-Ready Infrastructure</span>
                              <p className="text-xs text-emerald-700 leading-relaxed mt-1">Optimized Docker containers deployed with automated CI/CD for high availability.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 3 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Core Capabilities</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Our 4 Core Disciplines</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                            {coreServices.map((serv) => (
                              <div key={serv.id} className="p-3 bg-white border border-slate-200 rounded-xl">
                                <span className="font-bold text-slate-900 block">{serv.name}</span>
                                <p className="text-slate-600 mt-0.5 line-clamp-2">{serv.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {deckSlide === 4 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Target Sectors</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Industries We Serve</h2>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {["Healthcare", "Logistics & Fleet", "Finance & Fintech", "Retail & Commerce", "Education", "SaaS Startups"].map((ind) => (
                              <span key={ind} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-800">
                                {ind}
                              </span>
                            ))}
                          </div>
                          <p className="mt-4 text-xs text-slate-600 leading-relaxed max-w-md">
                            We configure our software to match regulatory standards, integrate with existing databases, and support real-world workflows.
                          </p>
                        </div>
                      )}

                      {deckSlide === 5 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Technology Core</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Battle-Tested Technologies</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                            {["Next.js", "TypeScript", "React Native", "FastAPI", "Python", "Docker", "PostgreSQL", "LangGraph"].map((t) => (
                              <div key={t} className="rounded-xl border border-slate-200 bg-white p-3 text-center text-xs text-slate-800 font-semibold">
                                {t}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {deckSlide === 6 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Methodology</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Our 6-Step Delivery Roadmap</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                            {devSteps.map((s) => (
                              <div key={s.step} className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                <span className="text-xs font-bold text-blue-600 block">{s.step}</span>
                                <span className="text-xs font-semibold text-slate-900 block mt-0.5">{s.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {deckSlide === 7 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Results</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Verified Performance</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-center">
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <span className="text-3xl font-extrabold text-blue-600">99.8%</span>
                              <span className="block text-xs font-medium text-slate-500 mt-1">Production Uptime</span>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <span className="text-3xl font-extrabold text-emerald-600">&lt; 1s</span>
                              <span className="block text-xs font-medium text-slate-500 mt-1">API Latency</span>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <span className="text-3xl font-extrabold text-slate-900">100%</span>
                              <span className="block text-xs font-medium text-slate-500 mt-1">Code Ownership</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 8 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Leadership</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Direct Technical Leadership</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <span className="font-bold text-slate-900 text-sm block">{companyInfo.founder}</span>
                              <span className="text-xs text-blue-600 font-semibold">Founder & Technical Lead</span>
                              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">AMU CS Graduate, former systems developer at Sofyrus Technologies. Full-stack & AI architect.</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <span className="font-bold text-slate-900 text-sm block">{companyInfo.cofounder}</span>
                              <span className="text-xs text-blue-600 font-semibold">Co-Founder & Operations</span>
                              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">Head of Operations, project coordination, and client milestone delivery.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 9 && (
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Get In Touch</span>
                          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">Let's Build Your System</h2>
                          <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-sm leading-relaxed">
                            Reach out today to discuss your technical requirements and get a clear project estimate within 24 hours.
                          </p>
                          <div className="space-y-1.5 text-xs text-slate-700">
                            <div><strong className="text-slate-900">Email:</strong> {companyInfo.email}</div>
                            <div><strong className="text-slate-900">WhatsApp:</strong> {companyInfo.phone}</div>
                            <div><strong className="text-slate-900">Website:</strong> {companyInfo.website}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t border-slate-200/80 pt-2 text-xs text-slate-400">
                      <span>UnifiedStack</span>
                      <span>&copy; {new Date().getFullYear()}</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. CAPABILITY STATEMENT TAB (2 PAGES) */}
            {activeTab === "capability" && (
              <motion.div
                key="capability"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >

                {/* 2-PAGE CAPABILITY STATEMENT DOCUMENT */}
                <div className="flex flex-col gap-10 w-full max-w-[210mm]">

                  {/* PAGE 1: CORE CAPABILITIES & DATA */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h1 className="text-3xl font-extrabold text-slate-900">UNIFIEDSTACK</h1>
                          <p className="text-xs text-blue-600 tracking-wider uppercase font-semibold mt-1">CAPABILITY STATEMENT</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-slate-700 block">Software & AI Agency</span>
                          <span className="text-xs text-slate-500">Established 2024</span>
                        </div>
                      </div>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">1. Corporate Summary</h2>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        UnifiedStack is a custom software development and AI engineering agency. Founded by systems engineer Mohd Huzaifa, we design and deploy custom web platforms, mobile applications, and deterministic AI agent workflows. Our engineering focuses on optimizing database performance and executing autonomous tasks with absolute reliability.
                      </p>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">2. Core Competencies</h2>
                      <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-slate-700">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                          <strong className="text-slate-900 block font-semibold">AI Engineering</strong>
                          <span className="text-xs leading-relaxed block mt-1 text-slate-600">LangGraph multi-step workflows, tool call integrations, RAG vector lookup databases, and custom fine-tuning.</span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                          <strong className="text-slate-900 block font-semibold">Full-Stack Web</strong>
                          <span className="text-xs leading-relaxed block mt-1 text-slate-600">Responsive Next.js portals, FastAPI and Node.js backend servers, optimized SQL schemas, and administrative dashboards.</span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                          <strong className="text-slate-900 block font-semibold">Mobile Apps</strong>
                          <span className="text-xs leading-relaxed block mt-1 text-slate-600">React Native cross-platform apps, real-time geofenced driver tracking, background workers, and offline data sync.</span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                          <strong className="text-slate-900 block font-semibold">DevOps & Cloud</strong>
                          <span className="text-xs leading-relaxed block mt-1 text-slate-600">Docker containerization, AWS hosting, Firebase architectures, and automated GitHub Actions CI/CD pipelines.</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 flex justify-between">
                      <span>UnifiedStack Capabilities</span>
                      <span>Page 1 of 2</span>
                    </div>
                  </div>

                  {/* PAGE 2: DIFFERENTIATORS, METRICS & CONTACT */}
                  <div className="print-page flex flex-col justify-between border border-slate-200 bg-white p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full min-h-[420px] md:min-h-[auto] text-slate-900">
                    <div>
                      <div className="border-b border-slate-100 pb-4 mb-6">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">CAPABILITY STATEMENT // SECTION 2</span>
                      </div>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">3. Key Differentiators</h2>
                      <div className="space-y-3 mb-6 text-xs text-slate-700">
                        <div>
                          <strong className="text-slate-900 font-semibold">Deterministic AI Control:</strong>
                          <span className="text-xs text-slate-600 block mt-0.5 leading-relaxed">We build strict guardrails around LLMs, guaranteeing zero formatting failures or hallucinations.</span>
                        </div>
                        <div>
                          <strong className="text-slate-900 font-semibold">Direct Technical Leadership:</strong>
                          <span className="text-xs text-slate-600 block mt-0.5 leading-relaxed">Led by Mohd Huzaifa (AMU Computer Science Graduate and ex-Sofyrus systems developer), applying rigorous systems architecture to all client builds.</span>
                        </div>
                        <div>
                          <strong className="text-slate-900 font-semibold">Direct Developer Communication:</strong>
                          <span className="text-xs text-slate-600 block mt-0.5 leading-relaxed">Clients work directly with engineers building their systems—preventing project delays or miscommunicated requirements.</span>
                        </div>
                      </div>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">4. Past Performance Highlights</h2>
                      <div className="space-y-2 mb-6 text-xs text-slate-600">
                        <div>&bull; <strong className="text-slate-800">Hyperlocal Social Network (Town Beat)</strong> — React Native app with real-time city feed updates.</div>
                        <div>&bull; <strong className="text-slate-800">Masjid Directory & Timetables (Salah Times)</strong> — Offline-first prayer synchronization with sub-10ms caches.</div>
                        <div>&bull; <strong className="text-slate-800">Service Marketplace (Helpora)</strong> — Full marketplace platform with verified bookings and escrow payments.</div>
                      </div>
                    </div>

                    <div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs mb-4">
                        <span className="font-bold text-slate-900 block mb-1.5">Direct Agency Contact</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          <div>Entity: UnifiedStack</div>
                          <div>Email: {companyInfo.email}</div>
                          <div>Phone: {companyInfo.phone}</div>
                          <div>Web: {companyInfo.website}</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 flex justify-between">
                        <span>UnifiedStack Capability Statement</span>
                        <span>Page 2 of 2</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 4. TEMPLATES HUB TAB */}
            {activeTab === "templates" && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl"
              >
                {/* Template selectors (no-print) */}
                <div className="flex justify-center gap-2 mb-8 no-print">
                  {[
                    { id: "proposal", label: "Business Proposal" },
                    { id: "onboarding", label: "Client Onboarding" },
                    { id: "pricing", label: "Pricing Brochure" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTemplate(t.id as any)}
                      className={`rounded-xl border px-4 py-2.5 text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 cursor-pointer ${activeTemplate === t.id
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Display Frame */}
                <div className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-10 relative overflow-hidden text-slate-900">

                  {/* Action top row (no-print) */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6 no-print">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Active Template: {activeTemplate.toUpperCase()}
                    </span>
                    <button
                      onClick={() => {
                        const txt = activeTemplate === "proposal" ? proposalTemplateText : activeTemplate === "onboarding" ? onboardingTemplateText : pricingBrochureText;
                        copy(txt, activeTemplate);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5 text-blue-600" />
                      {copied === activeTemplate ? "Copied!" : "Copy Markdown"}
                    </button>
                  </div>

                  {/* Document layout view */}
                  <div className="text-left font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap select-text bg-slate-50/50 p-4 sm:p-6 rounded-xl border border-slate-100">
                    {activeTemplate === "proposal" && proposalTemplateText}
                    {activeTemplate === "onboarding" && onboardingTemplateText}
                    {activeTemplate === "pricing" && pricingBrochureText}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. BRAND GUIDELINES TAB */}
            {activeTab === "brand" && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl"
              >
                <div className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-10 text-slate-900">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">Corporate Identity</span>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Brand Identity & Standards</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-xs">

                    {/* Typography & Tone */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Typography & Design System</h3>
                      <div className="space-y-4 text-xs text-slate-600">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Primary Typography</span>
                          <span className="text-sm font-semibold text-slate-900 block mt-0.5">Poppins / Modern Sans-Serif</span>
                          <span className="text-xs text-slate-500 block mt-0.5">Geometric, balanced letter-forms with warm human appeal.</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Monospace Typography</span>
                          <span className="text-sm font-mono text-slate-900 block mt-0.5">Geist Mono / Fira Code</span>
                          <span className="text-xs text-slate-500 block mt-0.5">Used for code snippets, database schemas, and API documentation.</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Agency Voice & Tone</span>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            Direct, technical, and human. We communicate directly as experienced software engineers, avoiding vague buzzwords and focusing on tangible deliverables and performance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Colors & Logo */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Color Palette & Brand Marks</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase mb-2">Primary Color Palette</span>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                            <div className="rounded-xl bg-blue-600 p-3 text-white">
                              <span>Brand Blue</span>
                              <span className="block text-[10px] text-blue-100 font-mono mt-1">#2563EB</span>
                            </div>
                            <div className="rounded-xl bg-slate-900 p-3 text-white">
                              <span>Slate Dark</span>
                              <span className="block text-[10px] text-slate-400 font-mono mt-1">#0F172A</span>
                            </div>
                            <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 text-slate-800">
                              <span>Slate Light</span>
                              <span className="block text-[10px] text-slate-500 font-mono mt-1">#F8FAFC</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Brand Mark Guidelines</span>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            The UnifiedStack identity combines a stylized <strong className="text-slate-900">Cpu icon</strong> with the wordmark &ldquo;UnifiedStack&rdquo;, with &ldquo;Unified&rdquo; set in bold slate and &ldquo;Stack&rdquo; in vibrant brand blue.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
