"use client";

import React, { use, useState, useEffect, ElementType } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  BarChart3, 
  Database, 
  Layers, 
  Loader2,
  Sparkles, 
  Layout, 
  FolderKanban, 
  Radio, 
  Cpu, 
  Network, 
  Key, 
  LineChart, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle,
  ExternalLink,
  Milestone
} from "lucide-react";
import { getProjectById, Project } from "@/lib/firebase";
import GlowingCard from "@/components/ui/glowing-card";

interface Feature {
  num: string;
  title: string;
  desc: string;
  images: string[];
  tags: string[];
  icon: ElementType;
  labels?: string[];
}

const unifiedAiPlatformFeatures: Feature[] = [
  {
    num: "1",
    title: "Dashboard & Overview",
    desc: "The central hub of the platform, providing a high-level overview of your AI ecosystem. Monitor system health, recent activities, and key metrics at a glance.",
    images: ["/rag assets/dashboard.png"],
    tags: ["Health Metrics", "Recent Activity", "Active Tokens"],
    icon: Layout
  },
  {
    num: "2",
    title: "Project Management",
    desc: "Organize your work into distinct projects. Create, manage, and switch between multiple isolated environments, ensuring that data and configurations are kept separate for different use cases or clients.",
    images: ["/rag assets/project page with all projects.png", "/rag assets/projects page with empty project.png"],
    labels: ["All Active Projects", "Empty Workspace State"],
    tags: ["Environment Isolation", "Multi-tenant", "Workspace Setup"],
    icon: FolderKanban
  },
  {
    num: "3",
    title: "Data Sources & Connectivity",
    desc: "Seamlessly connect your data to the platform. We support a wide range of input methods including: File Uploads (Drag & drop support for PDF, DOCX, and TXT files), API Connectors (Configure custom API endpoints for dynamic data ingestion), and Cloud Storage (Google Drive and S3 integrations).",
    images: ["/rag assets/data source page.png"],
    tags: ["File Uploads", "REST Connectors", "S3 Integration"],
    icon: Radio
  },
  {
    num: "4",
    title: "Advanced Ingestion Pipeline",
    desc: "Take full control over how your data is processed. Configure chunk size and overlap, select embedding models (like all-MiniLM-L6-v2), choose vector stores (MongoDB, Milvus), and monitor ingestion logs in real-time.",
    images: ["/rag assets/ingestion pipeline page.png", "/rag assets/running pipeline modal.png"],
    labels: ["Ingestion Pipeline Console", "Running Task Logs"],
    tags: ["Custom Chunking", "Embedding Models", "Real-time logs"],
    icon: Network
  },
  {
    num: "5",
    title: "Model Configuration (LLMs)",
    desc: "Fine-tune application intelligence. Choose from top-tier models like Gemini 2.5 Pro, GPT-4o, and Claude 3.5 Sonnet. Adjust parameters like temperature and max tokens, and provide custom system prompts.",
    images: ["/rag assets/model configuration page.png", "/rag assets/embedding selection page.png"],
    labels: ["Model Parameter Settings", "Embedding Provider Selection"],
    tags: ["Gemini & GPT-4o", "Parameter Tuning", "API Key Security"],
    icon: Cpu
  },
  {
    num: "6",
    title: "Interactive Integration & Chat",
    desc: "Test your RAG pipelines immediately with the built-in chat interface. Interact with your agents, verify retrieval accuracy, and track citation sources in real-time.",
    images: ["/rag assets/integration page with chats.png"],
    tags: ["Playground Chat", "Prompt Testing", "Hallucination Audits"],
    icon: Sparkles
  },
  {
    num: "7",
    title: "Security & Access Control",
    desc: "Enterprise-grade security features to protect your data and endpoints. Generate and revoke API keys with granular permissions, restrict IP ranges, and automatically detect and redact sensitive PII information.",
    images: ["/rag assets/api key page.png"],
    tags: ["API Key Admin", "IP Whitelists", "PII Redaction"],
    icon: Key
  },
  {
    num: "8",
    title: "RAG Observability",
    desc: "Gain deep insights into your system's performance. Track retrieval quality, generation latency, and system resource usage with interactive charts and system logs.",
    images: ["/rag assets/rag observability page.png", "/rag assets/observability second page.png"],
    labels: ["RAG Latency Charts", "Observability Analytics Dashboard"],
    tags: ["Retrieval Quality", "Latency Logs", "Resource Usage"],
    icon: LineChart
  },
  {
    num: "9",
    title: "Documentation & Resources",
    desc: "Integrated documentation ensures you have all the guides and API references you need right within the platform.",
    images: ["/rag assets/docs page.png"],
    tags: ["SDK Documentation", "API References", "Getting Started"],
    icon: BookOpen
  },
  {
    num: "10",
    title: "Authentication",
    desc: "Secure and modern authentication flow including Login, Signup, and Password Recovery.",
    images: ["/rag assets/login page.png", "/rag assets/signup page.png"],
    labels: ["Secure Sign In", "Register Workspace Account"],
    tags: ["NextAuth / Firebase", "MFA Ready", "Password Reset"],
    icon: ShieldCheck
  },
  {
    num: "11",
    title: "Pricing Plans",
    desc: "Flexible pricing tiers to scale with your usage, from sandbox developer limits to enterprise production SLAs.",
    images: ["/rag assets/price page.png"],
    tags: ["SaaS Tiers", "Volume Discounts", "Custom Contracts"],
    icon: CheckCircle
  }
];

const townBeatFeatures: Feature[] = [
  {
    num: "1",
    title: "City-Centric Feed",
    desc: "A personalized feed showcasing the latest posts, news, and updates from your specific city. Stay informed about local happenings in real-time.",
    images: ["/town beat assets/WhatsApp Image 2026-05-22 at 8.38.50 PM (1).jpeg"],
    tags: ["Real-time Feed", "City Filter", "Localized News"],
    icon: Layout
  },
  {
    num: "2",
    title: "Community Groups",
    desc: "Create and join groups tailored to local interests, hobbies, or civic causes. Build meaningful connections with neighbors who share your passions.",
    images: ["/town beat assets/WhatsApp Image 2026-05-22 at 8.38.51 PM.jpeg"],
    tags: ["Interest Groups", "Civic Causes", "Neighbor Chats"],
    icon: FolderKanban
  },
  {
    num: "3",
    title: "Interactive Polls",
    desc: "Participate in local polls to voice your opinion on community matters. Cast your vote, check real-time results, and drive democratic community decisions.",
    images: ["/town beat assets/WhatsApp Image 2026-05-22 at 8.38.51 PM (1).jpeg"],
    tags: ["Community Voting", "Real-time Polls", "Local Opinions"],
    icon: BarChart3
  },
  {
    num: "4",
    title: "Campaigns",
    desc: "Organize and manage local campaigns to drive initiatives, raise awareness, collect community support, and bring about positive change in your neighborhood.",
    images: ["/town beat assets/WhatsApp Image 2026-05-22 at 8.38.51 PM (2).jpeg"],
    tags: ["Local Initiatives", "Civic Campaigns", "Support Drives"],
    icon: Milestone
  },
  {
    num: "5",
    title: "Secure Authentication",
    desc: "Robust user registration and login system ensuring data privacy and security. Standard sign-in and account registration flows protect community integrity.",
    images: [
      "/town beat assets/WhatsApp Image 2026-05-22 at 8.38.49 PM.jpeg", 
      "/town beat assets/WhatsApp Image 2026-05-22 at 8.38.49 PM (1).jpeg"
    ],
    labels: ["Sign In Panel", "Account Registration"],
    tags: ["Secure Auth", "Data Privacy", "User Verification"],
    icon: ShieldCheck
  },
  {
    num: "6",
    title: "User Profiles",
    desc: "Manage your digital identity, track your contributions and activities on the platform, and connect directly with other verified local residents.",
    images: ["/town beat assets/WhatsApp Image 2026-05-22 at 8.38.52 PM.jpeg"],
    tags: ["Identity Setup", "Activity Tracker", "Resident Connect"],
    icon: Cpu
  },
  {
    num: "7",
    title: "Admin Dashboard",
    desc: "Specialized administrative controls to oversee platform content, review user flag reports, manage local sponsorships and community ad placements.",
    images: ["/town beat assets/WhatsApp Image 2026-05-22 at 8.38.50 PM.jpeg"],
    tags: ["Platform Moderation", "Ad Placements", "Content Safety"],
    icon: Key
  }
];

function UnifiedAiPlatformDetails({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<string>("1");

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-brand-cyan/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Navigation back anchor */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        {/* Header Block */}
        <header className="border-b border-white/5 pb-10 mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
              {project.category}
            </span>
            <span className="rounded bg-brand-blue/20 border border-brand-blue/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
              Enterprise Grade
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight tracking-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-4xl">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="rounded bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Quantifiable Stats Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-white/5 bg-white/[0.01] p-8 rounded-2xl text-center mb-16 backdrop-blur-md">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white">{m.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/40 mt-2">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Hero Landing Page Mockup */}
        <div className="relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-2xl mb-16 group">
          <img
            src="/rag assets/landing page.png"
            alt="Unified AI Platform landing cockpit"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/45 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white/70 border border-white/10">
            Primary Landing Page & System Entry Dashboard
          </div>
        </div>

        {/* Platform Lifecycle Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Layers className="h-5 w-5 text-brand-purple shrink-0" />
                Operational Mission & Core Problem
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.problem}
              </p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Database className="h-5 w-5 text-brand-cyan shrink-0" />
                Cohesive Architecture Strategy
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Milestone className="h-5 w-5 text-brand-blue shrink-0" />
                Integrated Lifecycle & Capabilities
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.architecturalOverview}
              </p>
            </div>
            
            <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-5">
              <h4 className="text-xs uppercase font-bold tracking-widest text-brand-cyan mb-2">
                Production Auditing Guarantee
              </h4>
              <p className="text-xs text-white/50 leading-relaxed italic">
                "Our platform delivers a complete end-to-end lifecycle coverage—from data preparation and training to model orchestration and real-time observability pipelines."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Deep Dive Features Navigation */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              11 Core Modular Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Explore the Feature Catalog
            </h2>
            <p className="text-xs text-white/40 mt-2 leading-relaxed">
              Select a module from the list below to review its architectural specifications, ingestion parameters, and console screenshots.
            </p>
          </div>

          {/* Feature Tabs Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {unifiedAiPlatformFeatures.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.num;
              return (
                <button
                  key={feat.num}
                  onClick={() => setActiveTab(feat.num)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/10"
                      : "border border-white/5 bg-white/[0.01] text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {feat.num}. {feat.title}
                </button>
              );
            })}
          </div>

          {/* Active Feature Detail Sheet */}
          {unifiedAiPlatformFeatures.map((feat) => {
            if (activeTab !== feat.num) return null;
            const Icon = feat.icon;
            return (
              <div key={feat.num} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
                {/* Visual Screenshot display */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                  {feat.images.length === 1 ? (
                    <div className="relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden aspect-video shadow-xl group">
                      <img
                        src={feat.images[0]}
                        alt={feat.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] text-white/70 border border-white/10 font-mono">
                        Active Console Screen
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {feat.images.map((img, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden border border-white/5 bg-white/5 aspect-video shadow-lg group">
                          <img
                            src={img}
                            alt={`${feat.title} - View ${i + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 rounded bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] text-white/70 border border-white/10 font-mono">
                            {feat.labels ? feat.labels[i] : `View ${i + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Feature Description card */}
                <div className="lg:col-span-5">
                  <GlowingCard className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-cyan">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono tracking-widest text-brand-purple font-bold">MODULE PILLAR {feat.num}</span>
                          <h3 className="text-xl font-bold text-white tracking-tight">{feat.title}</h3>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-white/60">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-white/5 pt-6">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-3">Architectural Directives</span>
                      <div className="flex flex-wrap gap-1.5">
                        {feat.tags.map((tag, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-brand-cyan/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowingCard>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Matrix Showcase */}
        <div className="mb-20 rounded-2xl border border-white/5 bg-white/[0.01] p-8 sm:p-12 backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
              Commercial Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Dynamic Pricing Architecture
            </h2>
            <p className="text-xs text-white/40 mt-2 leading-relaxed">
              A breakdown of pricing tiers designed to scale seamlessly with consumption, from early prototyping to multi-region cloud infrastructures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/5 bg-white/5 aspect-video shadow-xl group">
              <img
                src="/rag assets/price page.png"
                alt="Unified AI Platform pricing tiers"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.01]"
              />
            </div>
            <div className="lg:col-span-5 space-y-6 text-sm text-white/60 leading-relaxed">
              <h4 className="text-lg font-bold text-white tracking-tight">Flexible Scaling Strategy</h4>
              <p>
                Our commercial architecture separates base subscription features from model token consumption, ensuring predictable baseline operations and high utilization.
              </p>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-purple shrink-0" />
                  Developer Sandbox: 100% Free prototype environments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-purple shrink-0" />
                  Growth / Team Plan: Advanced ingestion routes & logs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-purple shrink-0" />
                  Enterprise Dedicated: Full private VPC deployment & custom SLA
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipped outcomes section */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 sm:p-10 backdrop-blur-md mb-20">
          <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-6">
            <BarChart3 className="h-5 w-5 text-brand-blue shrink-0" />
            Quantifiable Results & Shipped Value
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.results.map((res, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-xs sm:text-sm relative hover:border-brand-purple/30 transition-all duration-300"
              >
                <span className="absolute top-2 right-4 text-2xl font-mono font-bold text-brand-purple/20">
                  {idx + 1}
                </span>
                <p className="leading-relaxed text-white/70 font-medium">{res}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 border-t border-white/5 pt-12 text-center">
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">Want to schedule a custom system scoping?</h3>
          <p className="text-xs text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Partner with UnifiedStack. Schedule a structured technical scoping call directly with founder Mohd Huzaifa to evaluate integration speeds.
          </p>
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}

function TownBeatDetails({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<string>("1");

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-brand-purple/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Navigation back anchor */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        {/* Header Block */}
        <header className="border-b border-white/5 pb-10 mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
              {project.category}
            </span>
            <span className="rounded bg-brand-blue/20 border border-brand-blue/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
              Hyperlocal Network
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight tracking-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-4xl">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="rounded bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Quantifiable Stats Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-white/5 bg-white/[0.01] p-8 rounded-2xl text-center mb-16 backdrop-blur-md">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white">{m.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/40 mt-2">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Hero Feed Mockup */}
        <div className="relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-2xl mb-16 max-w-lg mx-auto aspect-[9/16] h-[650px] group">
          <img
            src="/town beat assets/WhatsApp Image 2026-05-22 at 8.38.50 PM (1).jpeg"
            alt="Town Beat primary interface feed"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/45 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white/70 border border-white/10 text-center font-mono">
            Active Community Feed & Local Bulletin Space
          </div>
        </div>

        {/* Platform Lifecycle Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Layers className="h-5 w-5 text-brand-purple shrink-0" />
                The Hyperlocal Connection Challenge
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.problem}
              </p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Database className="h-5 w-5 text-brand-cyan shrink-0" />
                The Town Beat Solution Suite
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Milestone className="h-5 w-5 text-brand-blue shrink-0" />
                Modern & Responsive Experience
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.architecturalOverview}
              </p>
            </div>
            
            <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-5">
              <h4 className="text-xs uppercase font-bold tracking-widest text-brand-cyan mb-2">
                Civic Verification Promise
              </h4>
              <p className="text-xs text-white/50 leading-relaxed italic">
                "Town Beat connects you with verified neighbors, allowing you to organize community cleanups, cast local advisory polls, and read direct city announcements safely."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Deep Dive Features Navigation */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              7 Core Modular Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Explore the Feature Catalog
            </h2>
            <p className="text-xs text-white/40 mt-2 leading-relaxed">
              Select a module from the list below to review its screenshots, localized parameters, and interface configurations.
            </p>
          </div>

          {/* Feature Tabs Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {townBeatFeatures.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.num;
              return (
                <button
                  key={feat.num}
                  onClick={() => setActiveTab(feat.num)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/10"
                      : "border border-white/5 bg-white/[0.01] text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {feat.num}. {feat.title}
                </button>
              );
            })}
          </div>

          {/* Active Feature Detail Sheet */}
          {townBeatFeatures.map((feat) => {
            if (activeTab !== feat.num) return null;
            const Icon = feat.icon;
            return (
              <div key={feat.num} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
                {/* Visual Screenshot display */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                  {feat.images.length === 1 ? (
                    <div className="relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden aspect-[9/16] h-[550px] shadow-xl group max-w-xs mx-auto w-full">
                      <img
                        src={feat.images[0]}
                        alt={feat.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] text-white/70 border border-white/10 font-mono">
                        Active Mobile Screen
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {feat.images.map((img, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden border border-white/5 bg-white/5 aspect-[9/16] h-[450px] max-w-xs mx-auto w-full shadow-lg group">
                          <img
                            src={img}
                            alt={`${feat.title} - View ${i + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 rounded bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] text-white/70 border border-white/10 font-mono">
                            {feat.labels ? feat.labels[i] : `View ${i + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Feature Description card */}
                <div className="lg:col-span-5">
                  <GlowingCard className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-cyan">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono tracking-widest text-brand-purple font-bold">PILLAR {feat.num}</span>
                          <h3 className="text-xl font-bold text-white tracking-tight">{feat.title}</h3>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-white/60">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-white/5 pt-6">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-3">Architectural Directives</span>
                      <div className="flex flex-wrap gap-1.5">
                        {feat.tags.map((tag, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-brand-cyan/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowingCard>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shipped outcomes section */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 sm:p-10 backdrop-blur-md mb-20">
          <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-6">
            <BarChart3 className="h-5 w-5 text-brand-blue shrink-0" />
            Quantifiable Shipped Value
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.results.map((res, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-xs sm:text-sm relative hover:border-brand-purple/30 transition-all duration-300"
              >
                <span className="absolute top-2 right-4 text-2xl font-mono font-bold text-brand-purple/20">
                  {idx + 1}
                </span>
                <p className="leading-relaxed text-white/70 font-medium">{res}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 border-t border-white/5 pt-12 text-center">
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">Interested in expanding Town Beat?</h3>
          <p className="text-xs text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Partner with UnifiedStack. Schedule a structured technical scoping call directly with founder Mohd Huzaifa to evaluate hyperlocal scaling structures.
          </p>
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const item = await getProjectById(resolvedParams.id);
        setProject(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white/60 font-mono text-xs">
        <Loader2 className="h-6 w-6 animate-spin text-brand-purple mr-2" />
        Compiling architectural logs...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Case Study Not Found</h2>
        <p className="mt-2 text-xs text-white/40 max-w-sm">
          The requested engineering file may have been archived or restrictively classified by the systems administrator.
        </p>
        <Link
          href="/case-studies"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-xs text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Catalog
        </Link>
      </div>
    );
  }

  if (project.id === "unified-ai-platform") {
    return <UnifiedAiPlatformDetails project={project} />;
  }

  if (project.id === "town-beat") {
    return <TownBeatDetails project={project} />;
  }

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background visual elements */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Navigation back anchor */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        {/* Header block */}
        <header className="border-b border-white/5 pb-8 mb-10">
          <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
            {project.category}
          </span>
          
          <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight">
            Case Study: {project.title}
          </h1>

          <p className="mt-4 text-base text-white/60 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {/* Quantifiable Stats Summary Grid */}
        <div className="grid grid-cols-3 gap-4 border border-white/5 bg-white/[0.01] p-6 rounded-2xl text-center mb-12 backdrop-blur-md">
          {project.metrics.map((m, idx) => (
            <div key={idx}>
              <span className="block text-2xl font-extrabold text-white sm:text-3xl">{m.value}</span>
              <span className="block text-[10px] uppercase tracking-widest text-white/40 mt-1">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Image / Architecture Layout Mockup */}
        <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden aspect-video mb-12 shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-90 contrast-125"
          />
        </div>

        {/* Detailed Breakdown Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-white/70">
          {/* Problem */}
          <section className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight mb-4">
              <Layers className="h-5 w-5 text-brand-purple shrink-0" />
              1. Challenge Definition & Operational Bottlenecks
            </h3>
            <p className="leading-relaxed text-white/60">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight mb-4">
              <Database className="h-5 w-5 text-brand-cyan shrink-0" />
              2. Core Architectural Engineering Strategy
            </h3>
            <p className="leading-relaxed text-white/60">
              {project.solution}
            </p>
            {project.architecturalOverview && (
              <div className="mt-5 rounded bg-black/40 border border-white/5 p-4 text-xs font-mono text-white/40 leading-relaxed">
                <span className="block font-bold text-brand-cyan mb-1">// System Inter-connectivity Node State:</span>
                {project.architecturalOverview}
              </div>
            )}
          </section>

          {/* Shipped outcomes */}
          <section className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight mb-4">
              <BarChart3 className="h-5 w-5 text-brand-blue shrink-0" />
              3. Quantifiable Results & Production Benchmarks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.results.map((res, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/5 bg-white/[0.01] p-4 text-xs relative"
                >
                  <span className="absolute top-2 right-4 text-lg font-mono font-bold text-brand-purple/20">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed text-white/55">{res}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 border-t border-white/5 pt-10 text-center">
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}
