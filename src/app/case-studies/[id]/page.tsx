"use client";

import GlowingCard from "@/components/ui/glowing-card";
import ImageLightbox from "@/components/ui/image-lightbox";
import { getProjectById, Project } from "@/lib/firebase";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Cpu,
  Database,
  ExternalLink,
  FolderKanban,
  Github,
  Key,
  Layers,
  Layout,
  LineChart,
  Loader2,
  Milestone,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  ZoomIn
} from "lucide-react";
import Link from "next/link";
import { ElementType, use, useEffect, useState } from "react";

function ZoomableImage({ src, alt, className = "" }: { src: string; alt?: string; className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("view-image", { detail: { src, alt } })
    );
  };

  return (
    <div className="relative w-full h-full group/zoom overflow-hidden cursor-pointer" onClick={handleClick}>
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-500 group-hover/zoom:scale-[1.015]`}
      />
      {/* Zoom overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
        <div className="bg-black/75 backdrop-blur-md border border-white/20 rounded-full p-2.5 text-brand-cyan flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover/zoom:translate-y-0 transition-all duration-300 pointer-events-none">
          <ZoomIn className="h-4 w-4" />
          <span className="text-[9px] font-bold uppercase tracking-widest pr-1">Click to expand</span>
        </div>
      </div>
    </div>
  );
}

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
    images: ["/townbeat_assets/tb_feed.jpeg"],
    tags: ["Real-time Feed", "City Filter", "Localized News"],
    icon: Layout
  },
  {
    num: "2",
    title: "Community Groups",
    desc: "Create and join groups tailored to local interests, hobbies, or civic causes. Build meaningful connections with neighbors who share your passions.",
    images: ["/townbeat_assets/tb_groups.jpeg"],
    tags: ["Interest Groups", "Civic Causes", "Neighbor Chats"],
    icon: FolderKanban
  },
  {
    num: "3",
    title: "Interactive Polls",
    desc: "Participate in local polls to voice your opinion on community matters. Cast your vote, check real-time results, and drive democratic community decisions.",
    images: ["/townbeat_assets/tb_polls.jpeg"],
    tags: ["Community Voting", "Real-time Polls", "Local Opinions"],
    icon: BarChart3
  },
  {
    num: "4",
    title: "Campaigns",
    desc: "Organize and manage local campaigns to drive initiatives, raise awareness, collect community support, and bring about positive change in your neighborhood.",
    images: ["/townbeat_assets/tb_campaigns.jpeg"],
    tags: ["Local Initiatives", "Civic Campaigns", "Support Drives"],
    icon: Milestone
  },
  {
    num: "5",
    title: "Secure Authentication",
    desc: "Robust user registration and login system ensuring data privacy and security. Standard sign-in and account registration flows protect community integrity.",
    images: [
      "/townbeat_assets/tb_auth_1.jpeg",
      "/townbeat_assets/tb_auth_2.jpeg"
    ],
    labels: ["Sign In Panel", "Account Registration"],
    tags: ["Secure Auth", "Data Privacy", "User Verification"],
    icon: ShieldCheck
  },
  {
    num: "6",
    title: "User Profiles",
    desc: "Manage your digital identity, track your contributions and activities on the platform, and connect directly with other verified local residents.",
    images: ["/townbeat_assets/tb_profile.jpeg"],
    tags: ["Identity Setup", "Activity Tracker", "Resident Connect"],
    icon: Cpu
  },
  {
    num: "7",
    title: "Admin Dashboard",
    desc: "Specialized administrative controls to oversee platform content, review user flag reports, manage local sponsorships and community ad placements.",
    images: ["/townbeat_assets/tb_admin.jpeg"],
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
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
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

          {project.githubLink && (
            <div className="mt-8">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-purple/15 border border-brand-purple/35 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple hover:bg-brand-purple/25 hover:text-white transition-all shadow-lg animate-pulse"
              >
                View Source on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
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
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${isActive
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
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
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
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
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

          {project.playStoreLink && (
            <div className="mt-8">
              <a
                href={project.playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:bg-brand-cyan/25 hover:text-white transition-all shadow-lg animate-pulse"
              >
                Get it on Google Play
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
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
            src="/townbeat_assets/tb_feed.jpeg"
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
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${isActive
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
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}

const salahTimesFeatures: Feature[] = [
  {
    num: "1",
    title: "Masjid Directory & Correct Salah Times",
    desc: "Lists all masjids in the city with their correct namaaz timetables. It provides real-time prayer schedule synchronizations to ensure high contextual accuracy for local worshippers.",
    images: ["/salahtimes/salah_ss1.png"],
    tags: ["Prayer Timetable", "Masjid Locator", "Time Synchronization"],
    icon: Layout
  },
  {
    num: "2",
    title: "Moazzin Timetable Editor",
    desc: "Allows authorized Moazzens to update prayer tables and adhan settings directly. Ensures immediate replication of prayer adjustments across all connected client applications.",
    images: ["/salahtimes/salah_ss2.png"],
    tags: ["Adhan Setup", "Time Adjuster", "Instant Replication"],
    icon: FolderKanban
  },
  {
    num: "3",
    title: "Quran Module",
    desc: "Features a clean reading panel with translations, search, and audio recitations to support daily devotionals and reflection.",
    images: ["/salahtimes/salah_ss1.png"],
    tags: ["Surah Indexing", "Offline Reader", "Audio Recitations"],
    icon: BookOpen
  },
  {
    num: "4",
    title: "Islamic Calendar",
    desc: "Provides Hijri dates, holidays, and moon-phase trackers integrated with the local timezone controls.",
    images: ["/salahtimes/salah_ss2.png"],
    tags: ["Hijri Tracker", "Islamic Holidays", "Moon-Phase Alignment"],
    icon: Calendar
  },
  {
    num: "5",
    title: "Admin Panel & Event Management",
    desc: "Enables masjid administrators to manage notifications, organize events, broadcast notices, and moderate community requests.",
    images: ["/salahtimes/salah_ss1.png"],
    tags: ["Masjid Control", "Event Scheduler", "Broadcaster Admin"],
    icon: Key
  },
  {
    num: "6",
    title: "Smart Notifications Engine",
    desc: "Automatically triggers local push notifications exactly 10 minutes before each namaaz time using background synchronization workers.",
    images: ["/salahtimes/salah_ss2.png"],
    tags: ["Push Workers", "Pre-Prayer Alerts", "Offline Scheduling"],
    icon: Radio
  }
];

function SalahTimesDetails({ project }: { project: Project }) {
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
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
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
              Mobile Application
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

          {project.playStoreLink && (
            <div className="mt-8">
              <a
                href={project.playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:bg-brand-cyan/25 hover:text-white transition-all shadow-lg animate-pulse"
              >
                Get it on Google Play
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
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
            src="/salahtimes/salah_ss2.png"
            alt="Salah Times primary interface"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/45 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white/70 border border-white/10 text-center font-mono">
            Active Salah Times & Quran Application Dashboard
          </div>
        </div>

        {/* Platform Lifecycle Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Layers className="h-5 w-5 text-brand-purple shrink-0" />
                The Congregational Prayer Timing Problem
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.problem}
              </p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Database className="h-5 w-5 text-brand-cyan shrink-0" />
                The Salah Times Solution Suite
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
                Offline-First Real-time Sync
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.architecturalOverview}
              </p>
            </div>

            <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-5">
              <h4 className="text-xs uppercase font-bold tracking-widest text-brand-cyan mb-2">
                Prayer Devotional Promise
              </h4>
              <p className="text-xs text-white/50 leading-relaxed italic">
                "Salah Times synchronizes you with local masjids in your city, delivering microsecond-accurate timetables, event alerts, and Quranic readings right to your mobile device."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Deep Dive Features Navigation */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              6 Core Modular Pillars
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
            {salahTimesFeatures.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.num;
              return (
                <button
                  key={feat.num}
                  onClick={() => setActiveTab(feat.num)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${isActive
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
          {salahTimesFeatures.map((feat) => {
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
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">Interested in expanding Salah Times?</h3>
          <p className="text-xs text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Partner with UnifiedStack. Schedule a structured technical scoping call directly with founder Mohd Huzaifa to evaluate hyperlocal scaling structures.
          </p>
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}

const helporaFeatures: Feature[] = [
  {
    num: "1",
    title: "Easy Service Discovery & Booking",
    desc: "Seamlessly search and browse available services, view profiles, compare ratings, and book the right provider for your budget and schedule requirements.",
    images: ["/helpora/helpora_ss1.png"],
    tags: ["Marketplace Discovery", "Instant Booking", "Dynamic Scheduling"],
    icon: Layout
  },
  {
    num: "2",
    title: "Verified and Rated Service Providers",
    desc: "Built-in credentials validation, ID verification checks, and customer ratings/reviews engine to guarantee trusted provider credibility.",
    images: ["/helpora/helpora_ss2.png"],
    tags: ["Provider Verification", "Ratings & Reviews", "Trust Validation"],
    icon: ShieldCheck
  },
  {
    num: "3",
    title: "Real-time Communication Channel",
    desc: "Integrated chat messenger enabling customers and service providers to negotiate prices, discuss service requirements, and coordinate times instantly.",
    images: ["/helpora/helpora_ss1.png"],
    tags: ["Instant Messaging", "Customer Chat", "Provider Channels"],
    icon: Radio
  },
  {
    num: "4",
    title: "Secure Payment Options",
    desc: "Granular payment escrow pathways supporting flexible credit card billing, stripe checkouts, and automatic invoicing mechanisms.",
    images: ["/helpora/helpora_ss2.png"],
    tags: ["Secure Escrow", "Stripe Checkout", "Invoice Generation"],
    icon: Key
  },
  {
    num: "5",
    title: "Booking Tracking & Service Flow",
    desc: "Track the step-by-step progress of your service requests from pending, accepted, in-progress, to completed milestones.",
    images: ["/helpora/helpora_ss1.png"],
    tags: ["Milestone Tracker", "Service Mapping", "Status Real-time"],
    icon: FolderKanban
  }
];

function HelporaDetails({ project }: { project: Project }) {
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
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
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
              On-Demand Marketplace
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

          {project.playStoreLink && (
            <div className="mt-8">
              <a
                href={project.playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:bg-brand-cyan/25 hover:text-white transition-all shadow-lg animate-pulse"
              >
                Get it on Google Play
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
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

        {/* Hero Mockup */}
        <div className="relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-2xl mb-16 max-w-lg mx-auto aspect-[9/16] h-[650px] group">
          <img
            src="/helpora/helpora_ss1.png"
            alt="Helpora primary interface"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/45 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white/70 border border-white/10 text-center font-mono">
            Active Helpora Customer & Provider Hub
          </div>
        </div>

        {/* Platform Lifecycle Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Layers className="h-5 w-5 text-brand-purple shrink-0" />
                The Service Coordination Hassle
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.problem}
              </p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Database className="h-5 w-5 text-brand-cyan shrink-0" />
                The Helpora Marketplace Solution
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
                Escrow Billing & Real-time Messaging
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.architecturalOverview}
              </p>
            </div>

            <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-5">
              <h4 className="text-xs uppercase font-bold tracking-widest text-brand-cyan mb-2">
                Verified Provider Commitment
              </h4>
              <p className="text-xs text-white/50 leading-relaxed italic">
                "Helpora acts as a robust transactional bridge, bringing customers and certified local providers together with escrow checks, real-time message routes, and automated timelines."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Deep Dive Features Navigation */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              5 Core Modular Pillars
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
            {helporaFeatures.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.num;
              return (
                <button
                  key={feat.num}
                  onClick={() => setActiveTab(feat.num)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${isActive
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
          {helporaFeatures.map((feat) => {
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
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">Interested in expanding Helpora?</h3>
          <p className="text-xs text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Partner with UnifiedStack. Schedule a structured technical scoping call directly with founder Mohd Huzaifa to evaluate hyperlocal scaling structures.
          </p>
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
          >
            Schedule structural technical scope call
          </Link>
        </div>
      </div>
    </div>
  );
}

const vibeWaveFeatures: Feature[] = [
  {
    num: "1",
    title: "Real-time Proximity Engine",
    desc: "Uses coordinate-tracking queries to locate and signal active users in your immediate physical vicinity within a 100-meter range.",
    images: ["/vibewave/vibewave_ss1.png"],
    tags: ["GeoFirestore", "Proximity Range", "Live Signals"],
    icon: Radio
  },
  {
    num: "2",
    title: "Interest-Based Matching Weights",
    desc: "Categorizes matching cards by specific filters: professional collaboration, study sessions, coffee catch-ups, or gaming sessions.",
    images: ["/vibewave/vibewave_ss2.png"],
    tags: ["Interest Vectors", "Proximity Hub", "Matching Metrics"],
    icon: Layout
  },
  {
    num: "3",
    title: "Proximity Chat Routing",
    desc: "Facilitates low-latency messaging rooms enabling nearby matched users to establish quick offline coordinates.",
    images: ["/vibewave/vibewave_ss3.png"],
    tags: ["P2P Chat", "Instant Sync", "Firebase Auth"],
    icon: Radio
  },
  {
    num: "4",
    title: "Privacy & Visibility Control",
    desc: "Granular configuration toggles to enable or disable active proximity waves, allowing users to browse incognito.",
    images: ["/vibewave/vibewave_ss2.png"],
    tags: ["Privacy Guard", "Incognito Signals", "Profile Control"],
    icon: Key
  },
  {
    num: "5",
    title: "Vibe Match Audits",
    desc: "Interactive metrics page analyzing matching history and visual connection maps to customize discovery parameters.",
    images: ["/vibewave/vibewave_ss1.png"],
    tags: ["Match History", "Analytics Dashboard", "Directory Maps"],
    icon: FolderKanban
  }
];

function VibeWaveDetails({ project }: { project: Project }) {
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
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
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
              Proximity Social Network
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

          {project.playStoreLink && (
            <div className="mt-8">
              <a
                href={project.playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:bg-brand-cyan/25 hover:text-white transition-all shadow-lg animate-pulse"
              >
                Get it on Google Play
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
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

        {/* Hero Mockup */}
        <div className="relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-2xl mb-16 max-w-lg mx-auto aspect-[9/16] h-[650px] group">
          <img
            src="/vibewave/vibewave_ss1.png"
            alt="VibeWave primary interface"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-black/45 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white/70 border border-white/10 text-center font-mono">
            Active VibeWave Active Matching Feed
          </div>
        </div>

        {/* Platform Lifecycle Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Layers className="h-5 w-5 text-brand-purple shrink-0" />
                The Proximity Connection Gap
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.problem}
              </p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight mb-4">
                <Database className="h-5 w-5 text-brand-cyan shrink-0" />
                The VibeWave Discovery Suite
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
                Low-Latency Coordinate Loops
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                {project.architecturalOverview}
              </p>
            </div>

            <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-5">
              <h4 className="text-xs uppercase font-bold tracking-widest text-brand-cyan mb-2">
                Discovery Signal Auditing
              </h4>
              <p className="text-xs text-white/50 leading-relaxed italic">
                "VibeWave leverages high-precision coordinate indexes to map your immediate surroundings, linking you contextually to peers with identical goal alignments."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Deep Dive Features Navigation */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              5 Core Modular Pillars
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
            {vibeWaveFeatures.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.num;
              return (
                <button
                  key={feat.num}
                  onClick={() => setActiveTab(feat.num)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${isActive
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
          {vibeWaveFeatures.map((feat) => {
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
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">Interested in expanding VibeWave?</h3>
          <p className="text-xs text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Partner with UnifiedStack. Schedule a structured technical scoping call directly with founder Mohd Huzaifa to evaluate hyperlocal scaling structures.
          </p>
          <Link
            href="/contact"
            className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
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
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt?: string } | null>(null);

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

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG" && !target.classList.contains("no-lightbox")) {
        const img = target as HTMLImageElement;
        setSelectedImage({
          src: img.getAttribute("src") || img.src,
          alt: img.alt || img.title || "Case Study Screenshot"
        });
      }
    };

    const container = document.querySelector<HTMLElement>(".lightbox-enabled");
    if (container) {
      container.addEventListener("click", handleGlobalClick);
    }
    return () => {
      if (container) {
        container.removeEventListener("click", handleGlobalClick);
      }
    };
  }, [loading, project]);

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
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Catalog
        </Link>
      </div>
    );
  }

  let content;
  if (project.id === "unified-ai-platform") {
    content = <UnifiedAiPlatformDetails project={project} />;
  } else if (project.id === "town-beat") {
    content = <TownBeatDetails project={project} />;
  } else if (project.id === "salah-times") {
    content = <SalahTimesDetails project={project} />;
  } else if (project.id === "helpora") {
    content = <HelporaDetails project={project} />;
  } else if (project.id === "vibe-wave") {
    content = <VibeWaveDetails project={project} />;
  } else {
    content = (
      <div className="relative py-12 md:py-20 px-4">
        {/* Background visual elements */}
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

        <div className="mx-auto max-w-4xl relative z-10">
          {/* Navigation back anchor */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
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

            {project.githubLink && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold text-white transition-all cursor-pointer"
                >
                  <Github className="h-4 w-4 text-brand-purple" />
                  View Source on GitHub
                </a>
              </div>
            )}
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
              className="w-full h-full object-cover"
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
              className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
            >
              Schedule structural technical scope call
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lightbox-enabled relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .lightbox-enabled img {
          cursor: zoom-in !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          filter: none !important;
        }
        .lightbox-enabled img:hover {
          transform: scale(1.015) !important;
          filter: brightness(1.08) !important;
        }
      `}} />
      {content}
      <ImageLightbox
        src={selectedImage?.src || null}
        alt={selectedImage?.alt}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
