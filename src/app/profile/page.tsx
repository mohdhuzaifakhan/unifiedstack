"use client";

import ParticleBackground from "@/components/ui/particle-background";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
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
  ShieldCheck,
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
    address: "Sole Proprietorship, Registered in India",
    tagline: "Building Intelligent Software & AI Systems",
    founder: "Mohd Huzaifa",
    cofounder: "Mohd Suhail",
  };

  // Human-presented services
  const services = [
    { name: "Custom Software Development", desc: "We build custom enterprise software, backend engines, and business utility tools from scratch. We focus on clean, maintainable, and type-safe code that aligns with your workflows." },
    { name: "Mobile App Development", desc: "We build cross-platform mobile apps for Android & iOS using React Native and Expo. From real-time tracking to offline data sync, we deliver fast, responsive mobile experiences." },
    { name: "Web Application Development", desc: "We design and build fast web applications and SaaS portals. Using Next.js and Tailwind CSS, we ensure your site looks premium, loads instantly, and runs smoothly on all screens." },
    { name: "AI & Generative AI Solutions", desc: "We integrate advanced AI features into your existing products. From custom GPT models to semantic search tools, we help you leverage generative AI to automate decisions and save time." },
    { name: "AI Agents & Automation", desc: "We build autonomous AI agents using LangGraph that execute complex, multi-step workflows. Our agents connect to your database, handle exceptions, and automate repetitive tasks reliably." },
    { name: "Machine Learning Solutions", desc: "We design custom predictive models, text classifiers, and classification pipelines. We help you transform your raw database tables into actionable business forecasts." },
    { name: "Cloud Deployment & DevOps", desc: "We containerize applications with Docker and deploy them to cloud platforms like AWS or Vercel. We set up automated CI/CD pipelines to ensure safe, zero-downtime updates." },
    { name: "UI/UX Design", desc: "We design clean, intuitive, and modern user interfaces. We map complete user journeys, build interactive Figma prototypes, and implement matching frontend layouts." },
    { name: "API Development & Integration", desc: "We engineer fast, secure, and fully documented RESTful and gRPC APIs. We connect your frontend with databases, stripe billing, and third-party software tools." },
    { name: "SaaS Product Development", desc: "We build complete SaaS products, from database design and multi-tenant architectures to subscription payments, secure authentication, admin panels, and user accounts." },
    { name: "Database Design & Optimization", desc: "We design robust relational databases (PostgreSQL) and vector databases (Pinecone, ChromaDB) for AI lookup, writing optimized queries to handle high-frequency data." },
    { name: "Software Support & Maintenance", desc: "We provide ongoing maintenance, security updates, and performance monitoring. We audit logs, prevent downtime, and keep your software secure, modern, and up-to-date." }
  ];

  // Grouped Tech Stack
  const techStack = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "NestJS", "Python", "FastAPI", "Express.js", "gRPC APIs"]
    },
    {
      category: "AI & Machine Learning",
      skills: ["OpenAI & Claude", "LangChain", "LangGraph", "TensorFlow", "PyTorch", "RAG Systems", "Hugging Face"]
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Vector Databases (Pinecone, ChromaDB)"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS Services", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Firebase Ecosystem"]
    }
  ];

  // Human-presented Development Process
  const devSteps = [
    { step: "01", name: "Discovery & Strategy", desc: "We analyze your business processes, identify technical bottlenecks, and map out the software and AI automation opportunities." },
    { step: "02", name: "Planning & Architecture", desc: "We design the system architecture, select the tech stack, define API schemas, and map database relationships before writing code." },
    { step: "03", name: "UI/UX Prototyping", desc: "We build interactive Figma mockups of your portals and mobile screens, aligning on a modern, user-friendly layout." },
    { step: "04", name: "Core Development", desc: "Our team writes clean, type-safe code using Next.js, FastAPI, or NestJS in bi-weekly sprints, keeping you updated with live staging links." },
    { step: "05", name: "Testing & Red-Teaming", desc: "We run unit tests, security audits, and red-team our AI agents to guarantee they perform reliably and never hallucinate." },
    { step: "06", name: "Production Deployment", desc: "We containerize the app using Docker, deploy it to secure AWS or Vercel hosting, and configure automated GitHub Actions CI/CD." },
    { step: "07", name: "Maintenance & Support", desc: "We monitor system metrics, optimize database queries, update libraries, and provide long-term technical support to ensure 99.8% uptime." }
  ];

  // Values
  const coreValues = [
    { name: "Innovation", desc: "We build deterministic AI systems and high-velocity software architectures." },
    { name: "Integrity", desc: "We guarantee complete transparency, corporate honesty, and data privacy." },
    { name: "Quality", desc: "We write clean, modular, and type-safe codebases with strict TypeScript compilation." },
    { name: "Customer Success", desc: "We prioritize actual business KPIs, conversion growth, and operational efficiency." },
    { name: "Transparency", desc: "We share real-time project logs, timeline tracking, and explicit budgeting." },
    { name: "Continuous Learning", desc: "We constantly integrate the latest agentic frameworks and software paradigms." }
  ];

  // Industries
  const industries = ["Healthcare", "Education", "Logistics", "Real Estate", "Retail", "Finance", "Hospitality", "E-commerce", "Government", "Startups"];

  // Why Choose Us
  const whyChooseUs = [
    "Full-stack developers and AI architects with a track record of deploying production systems.",
    "Modern, high-performance technology stack (Next.js, TypeScript, FastAPI, Docker).",
    "Agile, rapid-iteration development cycles with regular staging builds.",
    "Scalable, modular architectures designed to handle traffic surges and data growth.",
    "Secure-first code and strict data privacy boundaries implemented by default.",
    "Direct contact with the engineering team via Slack, WhatsApp, and GitHub updates.",
    "Realistic timelines, structured phases, and reliable on-time deployments.",
    "Ongoing support contract to keep your software updated, secure, and running smoothly.",
    "Resource-optimized API calls and queries to minimize your running costs.",
    "AI-first engineering structure for seamless cognitive automation."
  ];

  // Portfolios
  const portfolios = [
    {
      title: "Agentic Medical Compliance Auditor",
      type: "AI Agent System",
      client: "Healthcare SaaS Startup",
      desc: "Built a LangGraph stateful multi-agent system that scans patient clinical records, compares them against regional compliance rules, and generates audits. Reduced auditing durations by 94% with 0.0% hallucination guarantees."
    },
    {
      title: "Geofenced Transport & Logistics System",
      type: "Mobile & Cloud Architecture",
      client: "Transit Enterprise Group",
      desc: "Developed a React Native real-time dispatcher app integrated with FastAPI. Features automated geofenced route matching, database optimization, and high-frequency location trackers, securing 99.9% uptime."
    },
    {
      title: "Secure Enterprise RAG Document Pipeline",
      type: "Vector Database Search",
      client: "Financial Advisory Monolith",
      desc: "Implemented a semantic document indexing engine using Pinecone, LlamaIndex, and OpenAI APIs. Allows researchers to extract data from millions of private PDFs with sub-1.2s response latency and metadata checks."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Mohd Huzaifa is an exceptional software architect. He designed and deployed our automated workflow engine under a very tight deadline. The system has run without a single outage, delivering a 12x latency improvement.",
      author: "Director of Product Engineering",
      org: "Sofyrus Technologies Client"
    },
    {
      quote: "UnifiedStack has transformed our business operations. Their AI-first approach has automated 88% of our database verification processes, saving thousands of developer hours and ensuring absolute database integrity.",
      author: "CTO & Founder",
      org: "Logistics SaaS Platform"
    }
  ];

  // Business Proposal Markdown
  const proposalTemplateText = `# BUSINESS PROPOSAL FOR SOFTWARE & AI DEVELOPMENT

**Client Name:** [Client Corporation]  
**Project Name:** Customer Portal & AI-Driven Agent Workflows  
**Date:** ${new Date().toLocaleDateString()}  
**Provider:** UnifiedStack (Registered Sole Proprietorship, India)  

---

## 1. Project Goal & Overview
UnifiedStack is pleased to submit this proposal to engineer and deploy a custom customer portal and stateful AI pipeline for [Client Corporation]. We build production-ready digital products that drive growth. Our work focuses on resolving your operational bottlenecks, ensuring that database structures run with minimal latency and AI agents perform with absolute reliability.

## 2. Project Scope & Deliverables
We propose a phased timeline to deliver the full system:
* **Phase 1: Discovery & Architecture (Weeks 1-2)**: We analyze your database requirements, design API schemas, and build high-fidelity Figma layouts of the web screens.
* **Phase 2: Core Platform Development (Weeks 3-6)**: We implement the Next.js frontend portal, build the FastAPI/Node.js backend endpoints, and set up the relational database.
* **Phase 3: AI Agents & Search Pipelines (Weeks 7-8)**: We build the LangGraph agent swarms, vector databases, and semantic RAG search index.
* **Phase 4: Verification, Launch & Support (Weeks 9-10)**: We run red-team security checks, launch the platform on secure AWS/Vercel hosting using Docker, and configure automated GitHub Actions CI/CD pipelines.

## 3. Financial Agreement
This project will be delivered for a fixed fee of **[Budget Amount]**, invoiced in structured milestones:
* **Milestone 1: Project kickoff and architecture sign-off** - 25% of total budget
* **Milestone 2: Completion of Frontend and Core Database APIs** - 35% of total budget
* **Milestone 3: Completion of AI Agents and Integrations** - 25% of total budget
* **Milestone 4: Staging sign-off, production launch, and code handoff** - 15% of total budget

---
**Submitted By:** Mohd Huzaifa, CEO & Founder (UnifiedStack)`;

  // Client Onboarding Markdown
  const onboardingTemplateText = `# CLIENT ONBOARDING GUIDE & KICKOFF CHECKLIST

Welcome to **UnifiedStack**! We look forward to partnering with your team. To initiate development as efficiently as possible, please complete the onboarding steps below.

---

## 1. Communication & Updates
We value transparent communication. Throughout the project, we will share updates in a dedicated communication space:
* **Primary Channel:** Slack / Discord / WhatsApp (Select your preference)
* **Weekly Review:** A 30-minute sync to walk through progress on the staging link.
* **Team Leads:**
  - Technical Lead: Mohd Huzaifa (Founder & AI Architect)
  - Operations Lead: Mohd Suhail (Co-Founder & Business Operations)

## 2. Technical Access Requirements
To begin engineering, please grant access to the following accounts for: \`mohdhuzaifakhan@gmail.com\` / GitHub: \`mohdhuzaifakhan\`
- [ ] **GitHub Repository**: Write/Admin access to the project repository.
- [ ] **Cloud Platform (AWS / Vercel)**: IAM role permissions for deployments.
- [ ] **API Keys & Credentials**: OpenAI, Pinecone, or database connection strings.

## 3. Kickoff Sync Agenda (60 Minutes)
* **00:00 - 00:15**: Project Goal Alignment (Reviewing timelines and expectations)
* **00:15 - 00:40**: Technical Walkthrough (Looking at current database models and workflows)
* **00:40 - 00:55**: Architecture Map (Confirming technology choices, databases, and UI layouts)
* **00:55 - 01:00**: Next Steps, Access Handshakes, and Scheduling our first review sync`;

  // Pricing brochure copy
  const pricingBrochureText = `# SERVICES & PRICING PLANS

UnifiedStack delivers elite engineering capabilities under flexible pricing schemes mapped to your company's growth stage.

---

## 1. MVP Starter Plan
* **Target Audience:** Startups looking to validate ideas with production-grade MVPs rapidly.
* **Deliverables:** Next.js single-page web portal, database backend, standard APIs, authentication, and Vercel launch.
* **Timeline:** 3-4 Weeks
* **Pricing:** Starting at ₹50,000 / $3,000

## 2. Enterprise Full-Stack SaaS
* **Target Audience:** Established SMEs and corporate entities looking for robust multi-tenant portals.
* **Deliverables:** Complex responsive app UI, NestJS/FastAPI state engines, optimized databases, payment gateways, and Docker setup.
* **Timeline:** 6-8 Weeks
* **Pricing:** Starting at ₹1,500,000 / $12,000

## 3. Cognitive AI & Agentic Automation
* **Target Audience:** Businesses seeking to automate customer service, billing workflows, or data parsing using LLMs.
* **Deliverables:** LangGraph multi-agent cognitive networks, Vector database semantic search, RAG pipelines, and verification scripts.
* **Timeline:** 6-10 Weeks
* **Pricing:** Starting at ₹2,500,000 / $18,000`;

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      {/* Dynamic particles background - hidden during print */}
      <div className="no-print">
        <ParticleBackground />
      </div>

      {/* Branded Glowing backdrops - hidden during print */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[350px] w-[350px] rounded-full bg-brand-cyan/5 blur-[120px] no-print" />
      <div className="pointer-events-none absolute bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-brand-purple/5 blur-[130px] no-print" />

      {/* FLOATING ACTION TOOLBAR (Web page only) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-bg-black/80 px-6 py-3 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.8)] backdrop-blur-md no-print">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-r border-white/10 pr-3">
          Document Controls
        </span>

        {/* Ink Saver Toggle */}
        <button
          onClick={() => setIsInkSaver(!isInkSaver)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-white transition-all ${isInkSaver
              ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
              : "border-white/5 bg-white/[0.02] hover:bg-white/5"
            }`}
          title={isInkSaver ? "Disable Ink-Saver Mode (Print Branded Dark)" : "Enable Ink-Saver Mode (Print Eco-Friendly Light)"}
        >
          {isInkSaver ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-purple/20 transition-all hover:scale-105"
        >
          <Printer className="h-3.5 w-3.5" />
          Print / Save PDF
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 relative z-10">

        {/* HEADER SECTION (no-print) */}
        <div className="text-center max-w-4xl mx-auto mb-12 no-print">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3.5 py-1 text-[11px] font-bold tracking-widest uppercase text-brand-cyan">
            <Cpu className="h-3 w-3 text-brand-purple" />
            Core Services & Capabilities
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl leading-tight">
            UnifiedStack | <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Capabilities & Portfolio Hub</span>
          </h1>
          <p className="mt-4 text-sm text-white/50 max-w-3xl mx-auto leading-relaxed">
            We build high-performance web applications, mobile platforms, and autonomous AI agents designed to automate operations and scale. Explore our core services, view our capabilities presentation, and access our standard pricing and onboarding resources below.
          </p>

          {/* TABS CONTAINER */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-white/5 pb-2">
            {[
              { id: "profile", label: "Services Profile", icon: FileText },
              { id: "deck", label: "Capabilities Deck", icon: Layers },
              { id: "capability", label: "Capability Summary", icon: Award },
              { id: "templates", label: "Pricing & Resources", icon: Briefcase },
              { id: "brand", label: "Branding Standards", icon: Compass }
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
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${active
                      ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-brand-purple/15"
                      : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE CONTENT RENDER AREA */}
        <div>
          <AnimatePresence mode="wait">

            {/* 1. COMPANY PROFILE TAB (12 PRINT PAGES) */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {/* Print Notice (No Print) */}
                <div className="w-full max-w-[210mm] rounded-xl border border-blue-500/20 bg-blue-500/5 px-6 py-4 mb-8 text-xs text-blue-300 leading-relaxed no-print flex gap-3 items-center">
                  <ShieldCheck className="h-6 w-6 text-brand-cyan shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Interactive Company Profile (12 Pages)</span>
                    Below is the paginated view. Clicking <strong className="text-white">Print / Save PDF</strong> will compile all 12 pages sequentially. Ensure background graphics are checked in print settings.
                  </div>
                </div>

                {/* 12 SEQUENTIAL PAGES CONTAINER */}
                <div className="flex flex-col gap-10 w-full max-w-[210mm]">

                  {/* PAGE 1: COVER PAGE */}
                  <div className="print-page relative flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto] overflow-hidden">
                    <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-purple/10 blur-[60px]" />
                    <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-brand-cyan/10 blur-[60px]" />

                    <div className="text-xs font-mono uppercase tracking-widest text-brand-purple font-semibold">
                      Enterprise Document Core
                    </div>

                    <div className="my-auto text-left">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-6">
                        <Cpu className="h-7 w-7 text-brand-purple" />
                      </div>
                      <h1 className="text-5xl font-extrabold tracking-tight text-white leading-none">
                        Unified<span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Stack</span>
                      </h1>
                      <div className="h-[2px] w-20 bg-gradient-to-r from-brand-purple to-brand-cyan my-5" />
                      <p className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">
                        {companyInfo.tagline}
                      </p>
                      <p className="mt-4 text-xs text-white/50 max-w-sm leading-relaxed">
                        We build custom web platforms, mobile applications, and stateful AI agent workflows designed to solve operational bottlenecks and scale.
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/5 pt-6 text-[10px] font-mono text-white/30 uppercase">
                      <div>
                        <span>Founder: {companyInfo.founder}</span>
                        <span className="block">Co-Founder: {companyInfo.cofounder}</span>
                      </div>
                      <div className="text-right">
                        <span>Corporate Profile 2026</span>
                        <span className="block text-brand-purple font-semibold">12-Page Booklet</span>
                      </div>
                    </div>
                  </div>

                  {/* PAGE 2: TABLE OF CONTENTS & EXEC SUMMARY */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">02 // Index</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-8">Table of Contents</h2>
                      <div className="space-y-4">
                        {[
                          { num: "01", title: "Cover Page & Tagline", p: "1" },
                          { num: "02", title: "Table of Contents & Executive Summary", p: "2" },
                          { num: "03", title: "Company Overview & Leadership", p: "3" },
                          { num: "04", title: "Corporate Vision, Mission & Values", p: "4" },
                          { num: "05", title: "Services Catalogue: Software Engineering", p: "5" },
                          { num: "06", title: "Services Catalogue: Cognitive AI Systems", p: "6" },
                          { num: "07", title: "Industries Served & Target Sectors", p: "7" },
                          { num: "08", title: "Technology Stack & Core Expertise", p: "8" },
                          { num: "09", title: "Development Methodology & Agile Sprints", p: "9" },
                          { num: "10", title: "Portfolio Showcases & Case Studies", p: "10" },
                          { num: "11", title: "Client Testimonials & Performance Metrics", p: "11" },
                          { num: "12", title: "Engagement Paths & Contact Information", p: "12" }
                        ].map((item) => (
                          <div key={item.num} className="flex justify-between items-baseline border-b border-white/5 pb-2 text-xs">
                            <span className="text-white/40 font-mono mr-2">{item.num}</span>
                            <span className="text-white/80 font-medium">{item.title}</span>
                            <span className="flex-grow border-b border-dashed border-white/10 mx-2" />
                            <span className="text-brand-purple font-mono font-bold">Page {item.p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2">Executive Summary</h3>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        At UnifiedStack, we build high-performance software application layers and deterministic AI structures.
                        We help companies scale by automating slow, manual operations and designing robust platforms.
                        By avoiding typical AI hallucinations and engineering reliable modular codebases, we ensure your technology drives business growth.
                      </p>
                    </div>
                  </div>

                  {/* PAGE 3: COMPANY OVERVIEW */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">03 // Profile</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Company Overview</h2>

                      <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                        <p>
                          <strong>UnifiedStack</strong> is a software development and AI solutions agency that helps startups, SMEs, and enterprises build scalable digital products. We specialize in custom software development, mobile applications, web platforms, AI-powered automation, and cloud-based solutions. Our mission is to transform business ideas into secure, high-performance, and user-friendly products that drive growth and efficiency.
                        </p>
                        <p>
                          Our core operational model focuses on engineering client-facing solutions. We replace slow, error-prone manual pipelines with robust, automated systems. Whether it is auditing medical compliance logs or mapping live delivery vehicle routing, we align our software architecture with your operational goals.
                        </p>
                        <p>
                          Founded by <strong>Mohd Huzaifa</strong> (AMU CS Graduate and former systems developer at Sofyrus Technologies) and co-founded by <strong>Mohd Suhail</strong> (Head of Operations), we guarantee clear communication, structured milestones, and dependable project delivery. We are based in India and deliver software services to clients worldwide.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                      <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3 text-center">
                        <span className="text-2xl font-bold text-brand-purple">2+</span>
                        <span className="block text-[10px] uppercase text-white/40 mt-1">Years Active Experience</span>
                      </div>
                      <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3 text-center">
                        <span className="text-2xl font-bold text-brand-cyan">100%</span>
                        <span className="block text-[10px] uppercase text-white/40 mt-1">Production AI Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* PAGE 4: VISION, MISSION, VALUES */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">04 // Core Philosophy</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Vision, Mission & Core Values</h2>

                      {/* Vision & Mission boxes */}
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="rounded-lg border border-brand-purple/20 bg-brand-purple/5 p-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan block mb-1">Our Vision</span>
                          <p className="text-xs text-white/70 italic leading-relaxed">
                            &ldquo;To become a trusted global technology partner, empowering businesses with innovative software and artificial intelligence solutions that create lasting impact.&rdquo;
                          </p>
                        </div>
                        <div className="rounded-lg border border-brand-blue/20 bg-brand-blue/5 p-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan block mb-1">Our Mission</span>
                          <p className="text-xs text-white/70 italic leading-relaxed">
                            &ldquo;To deliver high-quality, scalable, and cost-effective software solutions by combining modern technologies, skilled engineering, and customer-focused development practices.&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Values list */}
                      <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-3">Our Core Values</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {coreValues.map((val) => (
                          <div key={val.name} className="border border-white/5 bg-white/[0.01] rounded p-2">
                            <span className="text-xs font-semibold text-white block">{val.name}</span>
                            <span className="text-[9px] text-white/40 leading-snug block mt-0.5">{val.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-white/30 text-center border-t border-white/5 pt-4">
                      UnifiedStack &bull; Driven by Deterministic Innovation
                    </div>
                  </div>

                  {/* PAGE 5: SERVICES I */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">05 // Services Part I</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Software Engineering Solutions</h2>

                      <div className="space-y-4">
                        {[
                          { name: "Custom Software Development", desc: "We build custom enterprise software, backend engines, and business utilities. We write clean, maintainable, and type-safe code that aligns with your core operations." },
                          { name: "Web Application & SaaS Development", desc: "Using Next.js 15, React 19, and Tailwind CSS, we build fast, responsive web portals and SaaS platforms featuring secure dashboards." },
                          { name: "Mobile App Development (iOS & Android)", desc: "We build cross-platform mobile apps using React Native. We integrate real-time tracking, background processes, and offline data caching." },
                          { name: "API Development & System Integrations", desc: "We design and build secure, fast, and fully documented RESTful and gRPC APIs to connect your services and databases." },
                          { name: "Database Design & Optimization", desc: "We set up relational schemas, vector databases, and caching layers (PostgreSQL, Redis) optimized to reduce data latency." }
                        ].map((serv, index) => (
                          <div key={index} className="border-l-2 border-brand-purple pl-4 py-1.5">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{serv.name}</h3>
                            <p className="text-[10px] text-white/50 leading-relaxed mt-1">{serv.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-white/40 border-t border-white/5 pt-4 flex justify-between">
                      <span>Service Catalogue: Core Development</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 6: SERVICES II */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">06 // Services Part II</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Cognitive AI & Intelligent Systems</h2>

                      <div className="space-y-4">
                        {[
                          { name: "AI Agent Swarms & Business Automation", desc: "We build autonomous multi-agent networks using LangGraph. Our agents work in cycles to execute complex workflows with absolute reliability." },
                          { name: "Semantic RAG Document Pipelines", desc: "We build advanced document search systems. We map your private files to vector databases, letting LLMs search millions of pages in sub-1.2 seconds." },
                          { name: "Generative AI Solutions", desc: "We integrate custom GPT models, prompt engineering structures, and structured API outputs directly into your software." },
                          { name: "Machine Learning Solutions", desc: "We train custom predictive models, classifiers, and analytics tools to turn your database logs into business forecasts." },
                          { name: "AI Observability & Red-Teaming", desc: "We monitor agent runs using LangSmith, trace token costs, and red-team models against compliance gaps or hallucinations." }
                        ].map((serv, index) => (
                          <div key={index} className="border-l-2 border-brand-cyan pl-4 py-1.5">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{serv.name}</h3>
                            <p className="text-[10px] text-white/50 leading-relaxed mt-1">{serv.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-white/40 border-t border-white/5 pt-4 flex justify-between">
                      <span>Service Catalogue: Intelligent Systems</span>
                      <span>UnifiedStack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 7: INDUSTRIES SERVED */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">07 // Target Sectors</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Industries We Serve</h2>
                      <p className="text-xs text-white/50 leading-relaxed mb-6">
                        We configure our software architectures to meet the exact regulatory requirements, database models, and operational needs of your specific industry.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { name: "Healthcare", desc: "HIPAA compliance audits, patient records parsing, and medical agent systems." },
                          { name: "Logistics & Transport", desc: "Geofenced route optimization, live vehicle coordinates, and dispatcher dashboards." },
                          { name: "Finance & Fintech", desc: "Taxation reporting portals, audit compliance checkers, and budget analytics." },
                          { name: "Education & EdTech", desc: "Custom pedagogical agents, grading helpers, and student portals." },
                          { name: "Retail & E-commerce", desc: "Automated billing systems, inventory trackers, and client recommenders." },
                          { name: "Startups & SMEs", desc: "Rapid MVP validation, containerized SaaS platforms, and secure APIs." }
                        ].map((ind, index) => (
                          <div key={index} className="rounded-lg border border-white/5 bg-white/[0.01] p-3">
                            <span className="text-xs font-bold text-white block uppercase tracking-wider">{ind.name}</span>
                            <span className="text-[10px] text-white/40 leading-relaxed block mt-1">{ind.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-center text-[10px] text-white/30">
                      UnifiedStack &bull; Cross-Industry Architecture Deployment
                    </div>
                  </div>

                  {/* PAGE 8: TECHNOLOGY STACK */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">08 // Tech Core</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Our Technology Stack</h2>
                      <p className="text-xs text-white/50 leading-relaxed mb-6">
                        We use a modern, high-performance technology stack to guarantee speed, safety, typing contracts, and scaling.
                      </p>

                      <div className="space-y-4">
                        {techStack.map((cat, index) => (
                          <div key={index} className="border-b border-white/5 pb-3 last:border-b-0">
                            <span className="text-xs font-bold text-brand-cyan uppercase block mb-1.5">{cat.category}</span>
                            <div className="flex flex-wrap gap-2">
                              {cat.skills.map((skill) => (
                                <span key={skill} className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-white/80">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-[10px] text-white/40 flex justify-between font-mono">
                      <span>Engineered With: TS/Python/Go</span>
                      <span>Verified Stack 2026</span>
                    </div>
                  </div>

                  {/* PAGE 9: DEVELOPMENT PROCESS */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">09 // Workflow</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Development Methodology</h2>
                      <p className="text-xs text-white/50 leading-relaxed mb-6">
                        We work in disciplined, bi-weekly sprints. We provide complete code tracking, regular progress reviews, and access to staging environments.
                      </p>

                      <div className="space-y-4">
                        {devSteps.slice(0, 6).map((step) => (
                          <div key={step.step} className="flex gap-4">
                            <div className="text-xs font-mono font-bold text-brand-purple border-r border-brand-purple/20 pr-3 pt-0.5">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.name}</h4>
                              <p className="text-[10px] text-white/40 leading-relaxed mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-[10px] text-white/40 text-center uppercase tracking-widest font-mono">
                      agile sprint architecture &bull; 2-week loops
                    </div>
                  </div>

                  {/* PAGE 10: CASE STUDIES & PORTFOLIO */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">10 // Execution Case</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Portfolio & Case Studies</h2>

                      <div className="space-y-6">
                        {portfolios.map((item, index) => (
                          <div key={index} className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h3>
                              <span className="rounded bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.5 text-[9px] font-mono uppercase text-brand-cyan whitespace-nowrap">
                                {item.type}
                              </span>
                            </div>
                            <span className="text-[9px] font-semibold text-brand-cyan/70 block mt-1">Client: {item.client}</span>
                            <p className="text-[10px] text-white/40 leading-relaxed mt-2">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-center text-[10px] text-white/30 font-mono">
                      Detailed architectural logs at: www.unifiedstack.com/case-studies
                    </div>
                  </div>

                  {/* PAGE 11: TESTIMONIALS & TRUST METRICS */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">11 // Performance</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Trust & Operational Metrics</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        {[
                          { value: "99.8%", label: "System Uptime" },
                          { value: "12x", label: "Latency Drop" },
                          { value: "88%", label: "Automation" }
                        ].map((m, i) => (
                          <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
                            <span className="text-xl font-extrabold text-brand-cyan block">{m.value}</span>
                            <span className="text-[8px] uppercase tracking-wider text-white/30 block mt-0.5">{m.label}</span>
                          </div>
                        ))}
                      </div>

                      <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-3">Client Feedback</span>
                      <div className="space-y-4">
                        {testimonials.map((t, idx) => (
                          <div key={idx} className="rounded-lg border border-white/5 bg-white/[0.01] p-4 relative">
                            <p className="text-[10.5px] text-white/60 leading-relaxed italic">
                              &ldquo;{t.quote}&rdquo;
                            </p>
                            <span className="text-[9px] font-bold text-white block mt-2 text-right">
                              &mdash; {t.author}, <span className="text-brand-purple">{t.org}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-center text-[10px] text-white/30 font-mono">
                      Uptime stats backed by real production cloud logs.
                    </div>
                  </div>

                  {/* PAGE 12: CONTACT & ENGAGEMENT */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto] relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-cyan/10 blur-[60px]" />

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">12 // Engagement</span>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-6">Contact & Engagement Guide</h2>
                      <p className="text-xs text-white/50 leading-relaxed mb-6">
                        Ready to automate your engineering bottlenecks? Book a call or check out our project workspaces.
                      </p>

                      <div className="space-y-4">
                        {[
                          { label: "Corporate Entity", value: companyInfo.name, icon: Cpu },
                          { label: "Portal URL", value: companyInfo.website, icon: Globe },
                          { label: "General Inquiry", value: companyInfo.email, icon: Mail },
                          { label: "WhatsApp & Call", value: companyInfo.phone, icon: Phone },
                          { label: "LinkedIn Connection", value: companyInfo.linkedin, icon: ExternalLink },
                          { label: "Office & Location", value: companyInfo.address, icon: ShieldCheck }
                        ].map((c, i) => {
                          const Icon = c.icon || Cpu;
                          return (
                            <div key={i} className="flex items-center gap-3 border-b border-white/5 pb-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded bg-white/5 border border-white/10 shrink-0">
                                <Icon className="h-3.5 w-3.5 text-brand-purple" />
                              </div>
                              <div>
                                <span className="text-[8px] uppercase tracking-wider text-white/30 block">{c.label}</span>
                                <span className="text-xs font-semibold text-white/90">{c.value}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 text-center">
                      <div className="text-[10px] font-mono uppercase text-brand-cyan font-bold tracking-widest">
                        Let&apos;s build intelligent software systems.
                      </div>
                      <div className="text-[8px] text-white/30 mt-1 uppercase font-mono">
                        unifiedstack &copy; {new Date().getFullYear()} &bull; sole proprietorship registry
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
                <div className="w-full max-w-4xl border border-white/5 bg-bg-dark/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md no-print mb-8">

                  {/* Slide controls top bar */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-brand-purple" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                        Slide {deckSlide + 1} of 10
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeckSlide(prev => Math.max(0, prev - 1))}
                        disabled={deckSlide === 0}
                        className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 text-white/60 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeckSlide(prev => Math.min(9, prev + 1))}
                        disabled={deckSlide === 9}
                        className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 text-white/60 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE SLIDE DISPLAY AREA */}
                  <div className="w-full rounded-xl border border-white/5 bg-gradient-to-br from-bg-black to-bg-dark p-6 sm:p-12 relative flex flex-col justify-between overflow-hidden shadow-inner select-none aspect-auto min-h-[320px] md:aspect-[16/9]">

                    {/* Background decorations */}
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      <span>UnifiedStack Pitch Deck</span>
                      <span>0{deckSlide + 1} // Slide</span>
                    </div>

                    {/* Content Switcher */}
                    <div className="my-auto py-4">
                      {deckSlide === 0 && (
                        <div>
                          <span className="rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
                            Who We Are
                          </span>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
                            Building Intelligent Software & <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">AI Systems</span>
                          </h2>
                          <p className="mt-3 text-xs sm:text-sm text-white/50 max-w-lg leading-relaxed">
                            We build high-performance web applications, mobile platforms, and autonomous AI agents for startups and enterprises.
                          </p>
                        </div>
                      )}

                      {deckSlide === 1 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">The Challenge</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Legacy Bloat & AI Hallucinations</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded">
                              <span className="font-bold text-red-400 text-xs block">AI Hallucinations</span>
                              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Generative LLMs hallucinate structured data, making automated tasks unreliable.</p>
                            </div>
                            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded">
                              <span className="font-bold text-red-400 text-xs block">Manual Bottlenecks</span>
                              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Slow manual operations and paper pipelines throttle corporate efficiency and growth.</p>
                            </div>
                            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded">
                              <span className="font-bold text-red-400 text-xs block">Complex Architecture</span>
                              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Startups fragment engineers into complex microservices prematurely, slowing velocity.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 2 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Our Solution</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Deterministic Cognitive Systems</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded">
                              <span className="font-bold text-green-400 text-xs block">LangGraph Agents</span>
                              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Strict, cyclic node state guardrails execute agent tasks with absolute reliability.</p>
                            </div>
                            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded">
                              <span className="font-bold text-green-400 text-xs block">Modular Monoliths</span>
                              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Robust single-repo architectures optimize local queries and maximize development speed.</p>
                            </div>
                            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded">
                              <span className="font-bold text-green-400 text-xs block">Uptime Assured</span>
                              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Secure, cloud-container host setups deploy on AWS/Vercel with 99.8% uptime.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 3 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Core Capabilities</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">What We Provide</h2>
                          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-xs text-white/70">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-purple shrink-0" />
                              Custom Software & SaaS Development
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-purple shrink-0" />
                              LangGraph Stateful Autonomous Agents
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-purple shrink-0" />
                              Semantic RAG Document Search Indexing
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-purple shrink-0" />
                              React Native Mobile Apps (iOS/Android)
                            </li>
                          </ul>
                        </div>
                      )}

                      {deckSlide === 4 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Target Sectors</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Industries We Optimize</h2>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {["Healthcare", "Logistics", "Finance", "Retail", "Education", "SaaS Startups"].map((ind) => (
                              <span key={ind} className="rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1 text-xs font-semibold text-white/80">
                                {ind}
                              </span>
                            ))}
                          </div>
                          <p className="mt-4 text-[10px] text-white/40 leading-relaxed max-w-md">
                            We configure our software to match strict compliance laws (HIPAA, GDPR) and connect securely to your legacy databases.
                          </p>
                        </div>
                      )}

                      {deckSlide === 5 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Technology Stack</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Our Core Engineering Tools</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                            {["Next.js", "TypeScript", "FastAPI", "NestJS", "Python", "Docker", "PostgreSQL", "LangGraph"].map((t) => (
                              <div key={t} className="rounded border border-white/5 bg-white/[0.01] p-2 text-center text-xs text-white/70 font-mono">
                                {t}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {deckSlide === 6 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Development Process</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Our 7-Step Agile Roadmap</h2>
                          <div className="flex justify-between items-center gap-1 mt-4 overflow-hidden">
                            {["Strategy", "Planning", "UX Design", "Code", "Red-Team", "Deploy", "Maintain"].map((s, idx) => (
                              <div key={s} className="text-center shrink-0 w-[13%]">
                                <span className="block text-[10px] font-mono text-brand-cyan font-bold">0{idx + 1}</span>
                                <span className="block text-[8px] uppercase tracking-wider text-white/60 mt-1 font-semibold">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {deckSlide === 7 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Uptime & Latency</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Verified Performance Metrics</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-center">
                            <div className="rounded border border-white/5 bg-white/[0.02] p-4">
                              <span className="text-2xl font-bold text-brand-purple">99.8%</span>
                              <span className="block text-[8px] uppercase text-white/40 mt-1">Uptime Delivered</span>
                            </div>
                            <div className="rounded border border-white/5 bg-white/[0.02] p-4">
                              <span className="text-2xl font-bold text-brand-cyan">12x</span>
                              <span className="block text-[8px] uppercase text-white/40 mt-1">Latency Reduction</span>
                            </div>
                            <div className="rounded border border-white/5 bg-white/[0.02] p-4">
                              <span className="text-2xl font-bold text-white">88%</span>
                              <span className="block text-[8px] uppercase text-white/40 mt-1">Task Automation</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 8 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Leadership Team</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Experienced Founders</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="rounded border border-white/5 bg-white/[0.01] p-3">
                              <span className="font-bold text-white text-xs block">{companyInfo.founder}</span>
                              <span className="text-[9px] text-brand-cyan uppercase font-semibold">Founder & CEO</span>
                              <p className="text-[9px] text-white/40 leading-relaxed mt-1">AMU CS graduate, ex-Sofyrus systems developer. Full stack & AI architect.</p>
                            </div>
                            <div className="rounded border border-white/5 bg-white/[0.01] p-3">
                              <span className="font-bold text-white text-xs block">{companyInfo.cofounder}</span>
                              <span className="text-[9px] text-brand-cyan uppercase font-semibold">Co-Founder & Operations</span>
                              <p className="text-[9px] text-white/40 leading-relaxed mt-1">Business Operations lead. Taxation and compliance specialist.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deckSlide === 9 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">Contact Us</span>
                          <h2 className="text-2xl font-bold text-white mt-2 mb-3">Let&apos;s Build Your System</h2>
                          <p className="text-xs text-white/60 mb-4 max-w-sm">
                            Contact UnifiedStack today to review your software requirements and deploy cognitive automation nodes.
                          </p>
                          <div className="flex gap-4 text-[10px] text-white/40 font-mono">
                            <span>Email: {companyInfo.email}</span>
                            <span>WhatsApp: {companyInfo.phone}</span>
                            <span>Website: {companyInfo.website}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[9px] font-mono text-white/30 uppercase">
                      <span>UnifiedStack Corp</span>
                      <span>&copy; 2026</span>
                    </div>

                  </div>
                </div>

                {/* Print Version of the Deck (Visible only during Print) */}
                <div className="hidden print:flex print:flex-col print:gap-10 w-full max-w-[210mm]">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((slideNum) => (
                    <div key={slideNum} className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-12 rounded-2xl aspect-[210/297] w-full">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                        <span>UnifiedStack Pitch Deck</span>
                        <span>0{slideNum + 1} // Slide</span>
                      </div>

                      <div className="my-auto py-6">
                        {slideNum === 0 && (
                          <div>
                            <span className="rounded bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.5 text-[9px] font-mono text-brand-cyan uppercase">
                              Who We Are
                            </span>
                            <h2 className="text-3xl font-extrabold text-white mt-4">
                              Building Intelligent Software & AI Systems
                            </h2>
                            <p className="mt-3 text-xs text-white/50 max-w-md leading-relaxed">
                              We build high-performance web applications, mobile platforms, and autonomous AI agents for startups and enterprises.
                            </p>
                          </div>
                        )}

                        {slideNum === 1 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">The Challenge</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Legacy Bloat & AI Hallucinations</h2>
                            <div className="space-y-3">
                              <div className="p-3 bg-white/[0.01] border border-white/5 rounded">
                                <strong className="text-white text-xs block">AI Hallucinations</strong>
                                <span className="text-[10px] text-white/40 block mt-0.5">Generative models fail constraints, yielding database errors and compliance flags.</span>
                              </div>
                              <div className="p-3 bg-white/[0.01] border border-white/5 rounded">
                                <strong className="text-white text-xs block">Manual Bottlenecks</strong>
                                <span className="text-[10px] text-white/40 block mt-0.5">Sloppy data parsing and manual checklist verifications block developer scaling velocity.</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {slideNum === 2 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Our Solution</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Deterministic Cognitive Systems</h2>
                            <div className="space-y-3">
                              <div className="p-3 bg-white/[0.01] border border-white/5 rounded">
                                <strong className="text-white text-xs block">LangGraph Constraint Guardrails</strong>
                                <span className="text-[10px] text-white/40 block mt-0.5">Enforces precise node transitions to control LLM outputs and preserve formats.</span>
                              </div>
                              <div className="p-3 bg-white/[0.01] border border-white/5 rounded">
                                <strong className="text-white text-xs block">High-Scale Monolithic Modules</strong>
                                <span className="text-[10px] text-white/40 block mt-0.5">Keeps database lookups and routing local, scaling rapidly without microservice fragmentation.</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {slideNum === 3 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Core Capabilities</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">What We Provide</h2>
                            <div className="space-y-3 text-xs text-white/60">
                              <div className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" /> <span>Custom Software & SaaS Architectures</span></div>
                              <div className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" /> <span>LangGraph Multi-Agent Workflows</span></div>
                              <div className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" /> <span>Semantic Vector Database RAG Indexing</span></div>
                              <div className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" /> <span>Real-time Mobile Apps via React Native</span></div>
                            </div>
                          </div>
                        )}

                        {slideNum === 4 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Target Sectors</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Industries We Optimize</h2>
                            <div className="space-y-2">
                              {["Healthcare Compliance Systems", "Logistics & Real-Time Tracking Dispatchers", "FinTech Audit & Taxation Portals", "Education pedagogical grading nodes", "SaaS platforms & APIs"].map((sector, i) => (
                                <div key={i} className="flex gap-2 text-xs text-white/80">
                                  <span className="text-brand-purple font-mono">0{i + 1}</span>
                                  <span>{sector}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {slideNum === 5 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Tech Stack</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Our Technology Core</h2>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="font-bold text-brand-purple block uppercase">Frontend</span>
                                <span className="text-white/40 block mt-0.5">React, Next.js, React Native, TypeScript, Tailwind</span>
                              </div>
                              <div>
                                <span className="font-bold text-brand-purple block uppercase">Backend</span>
                                <span className="text-white/40 block mt-0.5">Python, FastAPI, Node.js, NestJS, gRPC</span>
                              </div>
                              <div>
                                <span className="font-bold text-brand-purple block uppercase">AI Core</span>
                                <span className="text-white/40 block mt-0.5">LangGraph, LangChain, Pinecone, PyTorch, OpenAI</span>
                              </div>
                              <div>
                                <span className="font-bold text-brand-purple block uppercase">DevOps</span>
                                <span className="text-white/40 block mt-0.5">Docker, Kubernetes, AWS Services, CI/CD Actions</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {slideNum === 6 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Methodology</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Development Cycles</h2>
                            <div className="grid grid-cols-2 gap-3 text-[10px] text-white/60">
                              <div><strong>01 / Strategy Analysis:</strong> Mapping bottlenecks</div>
                              <div><strong>02 / Topography Plan:</strong> Structuring databases</div>
                              <div><strong>03 / Wireframes:</strong> Interactive Figma design</div>
                              <div><strong>04 / Implementation:</strong> Stateful TS/Python build</div>
                              <div><strong>05 / Verification:</strong> Adversarial LLM red-teaming</div>
                              <div><strong>06 / Cloud Launch:</strong> Docker AWS CI/CD pipelines</div>
                            </div>
                          </div>
                        )}

                        {slideNum === 7 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Uptime & Latency</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Verified Trust Metrics</h2>
                            <div className="space-y-3">
                              <div className="flex justify-between border-b border-white/5 pb-2 text-xs">
                                <span className="text-white/60">Delivered Production System Uptime</span>
                                <strong className="text-brand-cyan">99.8%</strong>
                              </div>
                              <div className="flex justify-between border-b border-white/5 pb-2 text-xs">
                                <span className="text-white/60">Average Pipeline Latency Reductions</span>
                                <strong className="text-brand-cyan">12x</strong>
                              </div>
                              <div className="flex justify-between border-b border-white/5 pb-2 text-xs">
                                <span className="text-white/60">Workflow Task Automation Rates</span>
                                <strong className="text-brand-cyan">88%</strong>
                              </div>
                            </div>
                          </div>
                        )}

                        {slideNum === 8 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Leadership</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Founders</h2>
                            <div className="space-y-4">
                              <div>
                                <strong className="text-xs text-white">{companyInfo.founder}</strong> &bull; <span className="text-[10px] text-brand-cyan uppercase font-semibold">Founder & CEO</span>
                                <p className="text-[10px] text-white/40 leading-relaxed mt-0.5">AMU CS Graduate. ex-Sofyrus systems developer. AI engineer.</p>
                              </div>
                              <div>
                                <strong className="text-xs text-white">{companyInfo.cofounder}</strong> &bull; <span className="text-[10px] text-brand-cyan uppercase font-semibold">Co-Founder & Operations</span>
                                <p className="text-[10px] text-white/40 leading-relaxed mt-0.5">Business Operations Lead. Financial compliance specialist.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {slideNum === 9 && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-cyan uppercase">Contact Us</span>
                            <h2 className="text-xl font-bold text-white mt-2 mb-4">Let&apos;s Build Your System</h2>
                            <p className="text-xs text-white/50 leading-relaxed max-w-sm mb-4">
                              Contact UnifiedStack today to review your software requirements and deploy cognitive automation nodes.
                            </p>
                            <div className="text-[10px] text-brand-cyan font-mono leading-relaxed">
                              <div>Email: {companyInfo.email}</div>
                              <div>WhatsApp: {companyInfo.phone}</div>
                              <div>Website: {companyInfo.website}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[9px] font-mono text-white/30 uppercase">
                        <span>UnifiedStack Corp</span>
                        <span>&copy; 2026</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. CAPABILITY STATEMENT TAB (1-2 PAGES CONCISE SUMMARY) */}
            {activeTab === "capability" && (
              <motion.div
                key="capability"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {/* Print Notice (No Print) */}
                <div className="w-full max-w-[210mm] rounded-xl border border-blue-500/20 bg-blue-500/5 px-6 py-4 mb-8 text-xs text-blue-300 leading-relaxed no-print flex gap-3 items-center">
                  <Award className="h-6 w-6 text-brand-cyan shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Capability Statement (2 Pages)</span>
                    Designed for governmental audits, vendor intake systems, and procurement managers. Prints exactly as 2 pages.
                  </div>
                </div>

                {/* 2-PAGE CAPABILITY STATEMENT DOCUMENT */}
                <div className="flex flex-col gap-10 w-full max-w-[210mm]">

                  {/* PAGE 1: CORE CAPABILITIES & DATA */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-6">
                        <div>
                          <h1 className="text-3xl font-extrabold text-white">UNIFIEDSTACK</h1>
                          <p className="text-xs text-brand-cyan tracking-wider uppercase font-semibold mt-1">CAPABILITY STATEMENT</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-white/40 block">Sole Proprietorship</span>
                          <span className="text-xs font-bold text-white">Registry: India</span>
                        </div>
                      </div>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2">1. Corporate Summary</h2>
                      <p className="text-xs text-white/50 leading-relaxed mb-6">
                        UnifiedStack is a software development and AI solutions agency.
                        Founded by veteran system engineer Mohd Huzaifa, we design and deploy custom web portals, mobile platforms, and deterministic AI agent workflows.
                        Our engineering focuses on optimizing database performance and executing autonomous tasks with absolute reliability.
                      </p>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2">2. Core Competencies</h2>
                      <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-white/60">
                        <div>
                          <strong className="text-white block font-medium">Cognitive Automation</strong>
                          <span className="text-[10px] leading-relaxed block mt-0.5 text-white/40">LangGraph cycle workflows, custom tool call routers, RAG vector lookup databases, and semantic search pipelines.</span>
                        </div>
                        <div>
                          <strong className="text-white block font-medium">SaaS & Web Applications</strong>
                          <span className="text-[10px] leading-relaxed block mt-0.5 text-white/40">Responsive Next.js portals, NestJS and FastAPI backend servers, optimized SQL schemas, and interactive admin dashboards.</span>
                        </div>
                        <div>
                          <strong className="text-white block font-medium">Mobile Product Engineering</strong>
                          <span className="text-[10px] leading-relaxed block mt-0.5 text-white/40">React Native mobile apps, geofenced driver routing dispatchers, background processes, and offline data sync.</span>
                        </div>
                        <div>
                          <strong className="text-white block font-medium">DevOps & Cloud Systems</strong>
                          <span className="text-[10px] leading-relaxed block mt-0.5 text-white/40">AWS secure cloud hosting, Docker containerization, Firebase backend, and automated GitHub Actions CI/CD.</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-white/30 flex justify-between uppercase">
                      <span>UnifiedStack Corp</span>
                      <span>Page 1 of 2</span>
                    </div>
                  </div>

                  {/* PAGE 2: DIFFERENTIATORS, METRICS & CONTACT */}
                  <div className="print-page flex flex-col justify-between border border-white/5 bg-bg-dark p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]">
                    <div>
                      <div className="border-b border-white/10 pb-4 mb-6">
                        <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">CAPABILITY STATEMENT // SECTION 2</span>
                      </div>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2">3. Key Differentiators</h2>
                      <div className="space-y-3 mb-6 text-xs">
                        <div>
                          <strong className="text-white font-semibold">Deterministic AI Workflow Control:</strong>
                          <span className="text-[10px] text-white/50 block mt-0.5 leading-relaxed">We build guardrails around generative AI, guaranteeing zero formatting failures or hallucinations.</span>
                        </div>
                        <div>
                          <strong className="text-white font-semibold">AMU & Sofyrus Systems Engineering:</strong>
                          <span className="text-[10px] text-white/50 block mt-0.5 leading-relaxed">Led by Mohd Huzaifa, B.Tech in Computer Science from Aligarh Muslim University, applying enterprise systems architecture to web and mobile apps.</span>
                        </div>
                        <div>
                          <strong className="text-white font-semibold">Direct Developer Communication:</strong>
                          <span className="text-[10px] text-white/50 block mt-0.5 leading-relaxed">Clients work directly with engineers building their systems—preventing project delays or miscommunicated requirements.</span>
                        </div>
                      </div>

                      <h2 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2">4. Past Performance Highlights</h2>
                      <div className="space-y-2 mb-6 text-[10px] text-white/50">
                        <div>&bull; **Medical compliance verification agent** (reduced patient audit cycles by 94% with 0.0% hallucinations).</div>
                        <div>&bull; **Real-time geofenced dispatcher platform** (custom React Native + FastAPI dispatcher tracks truck coordinates).</div>
                        <div>&bull; **Vector document retrieval system** (semantic search parsing of private PDFs, sub-1.2s response time).</div>
                      </div>
                    </div>

                    <div>
                      <div className="rounded-lg border border-white/5 bg-white/[0.01] p-3 text-xs mb-4">
                        <span className="font-bold text-white block mb-1">Corporate Registries & Contact</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-white/40 font-mono">
                          <div>Entity: UnifiedStack</div>
                          <div>Email: {companyInfo.email}</div>
                          <div>Phone: {companyInfo.phone}</div>
                          <div>Web: {companyInfo.website}</div>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-white/30 flex justify-between uppercase">
                        <span>Sole Proprietorship Registry: India</span>
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
                      className={`rounded-lg border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all ${activeTemplate === t.id
                          ? "border-brand-purple bg-brand-purple/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Display Frame */}
                <div className="border border-white/5 bg-bg-dark/50 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">

                  {/* Action top row (no-print) */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 no-print">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">
                      Active Document: {activeTemplate.toUpperCase()} TEMPLATE
                    </span>
                    <button
                      onClick={() => {
                        const txt = activeTemplate === "proposal" ? proposalTemplateText : activeTemplate === "onboarding" ? onboardingTemplateText : pricingBrochureText;
                        copy(txt, activeTemplate);
                      }}
                      className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:text-white transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === activeTemplate ? "Copied Raw Text!" : "Copy Raw Markdown"}
                    </button>
                  </div>

                  {/* Document layout view */}
                  <div className="text-left font-mono text-xs text-white/80 leading-relaxed whitespace-pre-wrap select-text selection:bg-brand-purple/40">
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
                <div className="border border-white/5 bg-bg-dark/50 rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan block mb-2">Corporate Identity</span>
                  <h2 className="text-2xl font-bold text-white mb-6">Brand Identity & Guidelines</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-xs">

                    {/* Typography & Tone */}
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4">Typography & Design System</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-mono text-white/40 block uppercase">Primary Font</span>
                          <span className="text-sm font-semibold text-white block mt-1">Geist Sans / System Sans-Serif</span>
                          <span className="text-[10px] text-white/50 block mt-0.5">Clean, wide tracking, modern typography layout.</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-white/40 block uppercase">Monospace Font</span>
                          <span className="text-sm font-mono text-white block mt-1">Geist Mono / Font-mono</span>
                          <span className="text-[10px] text-white/50 block mt-0.5">Used for data variables, code snippets, indexes, and numbering tags.</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-white/40 block uppercase">Writing & Pitch Tone</span>
                          <p className="text-[10.5px] text-white/60 leading-relaxed mt-1">
                            Technical, precise, and metric-focused. We avoid generic business fluff (e.g. &ldquo;world-class paradigms&rdquo;)
                            and prioritize explicit software vocabulary (e.g. &ldquo;stateful LangGraph cycles&rdquo;, &ldquo;database optimizations&rdquo;).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Colors & Logo */}
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4">Color Palette & Logo Codes</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-mono text-white/40 block uppercase mb-2">Corporate Color Swatches</span>
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold text-white">
                            <div className="rounded bg-[#8B5CF6] p-3 shadow-md shadow-purple-500/10">
                              <span>Brand Purple</span>
                              <span className="block text-[8px] text-white/70 mt-1">#8B5CF6</span>
                            </div>
                            <div className="rounded bg-[#06B6D4] p-3 shadow-md shadow-cyan-500/10">
                              <span>Brand Cyan</span>
                              <span className="block text-[8px] text-white/70 mt-1">#06B6D4</span>
                            </div>
                            <div className="rounded bg-[#030303] border border-white/10 p-3">
                              <span>Background</span>
                              <span className="block text-[8px] text-white/50 mt-1">#030303</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-white/40 block uppercase">Logo Mark Rules</span>
                          <p className="text-[10.5px] text-white/60 leading-relaxed mt-1">
                            The UnifiedStack logo mark consists of a stylized **Cpu icon** within a rounded square glass container.
                            The branding name &ldquo;UnifiedStack&rdquo; is written in Geist Sans bold, with &ldquo;Unified&rdquo; in solid white
                            and &ldquo;Stack&rdquo; styled with a gradient shifting from Brand Purple to Brand Cyan.
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
