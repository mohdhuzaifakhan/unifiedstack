"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bot, 
  Brain, 
  Binary, 
  Layers, 
  Zap, 
  Code2, 
  Smartphone, 
  Server, 
  CloudLightning, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown
} from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "fullstack">("all");

  const services = [
    {
      id: "ai-agents",
      category: "ai",
      icon: <Bot className="h-6 w-6 text-brand-purple" />,
      title: "AI Agent Development",
      description: "Stateful, autonomous multi-agent cognitive networks designed to execute complex business routines through cyclic loop workflows.",
      pricing: "Starting at $5,000",
      delivery: "3-5 Weeks",
      tech: ["LangGraph", "Python", "FastAPI", "Redis"],
      benefits: [
        "Recursive self-backtracking execution model",
        "Reduction of human operational labor by up to 85%",
        "Direct integration with enterprise CRM and SQL schemas"
      ],
      useCase: "Self-healing customer service coordinators and autonomous billing reconcilers that execute complex loops."
    },
    {
      id: "generative-ai",
      category: "ai",
      icon: <Brain className="h-6 w-6 text-brand-cyan" />,
      title: "Generative AI Solutions",
      description: "Custom integrations of highly advanced LLMs tailored to commercial workflows, delivering high-speed structured text processing.",
      pricing: "Starting at $4,000",
      delivery: "2-4 Weeks",
      tech: ["GPT-4o", "Claude 3.5 Sonnet", "Gemini Pro", "Pydantic"],
      benefits: [
        "Absolute output structure via typed JSON schemas",
        "Custom context instructions to reduce prompt drift",
        "Seamless API fallback failover pipelines"
      ],
      useCase: "Dynamic enterprise content generation, automated medical intake records parsing, and legal brief analysis engines."
    },
    {
      id: "rag-pipelines",
      category: "ai",
      icon: <Binary className="h-6 w-6 text-brand-blue" />,
      title: "RAG Pipelines",
      description: "Optimized retrieval-augmented databases using custom semantic indexers to search massive internal folders securely.",
      pricing: "Starting at $4,500",
      delivery: "3-4 Weeks",
      tech: ["Pinecone", "ChromaDB", "LlamaIndex", "Text Embedding Models"],
      benefits: [
        "Semantic matching beyond simple matching keywords",
        "Hierarchical chunk algorithms to preserve tables",
        "Complete enterprise local data container containment"
      ],
      useCase: "Internal HR search agents, legal document discovery swarms, and corporate financial report analyzers."
    },
    {
      id: "llm-finetuning",
      category: "ai",
      icon: <Layers className="h-6 w-6 text-brand-purple" />,
      title: "LLM Fine-tuning",
      description: "Training open-source models on private hardware datasets to teach proprietary formatting styles and secure local hosting.",
      pricing: "Starting at $7,500",
      delivery: "4-6 Weeks",
      tech: ["Llama 3", "Mistral 7B", "HuggingFace", "PyTorch"],
      benefits: [
        "Slash API per-token usage cost overhead by up to 70%",
        "100% locally deployable in internal secure private clouds",
        "Highly optimized performance speeds for specialized actions"
      ],
      useCase: "Medical terminology generators and customized legal draft compilers trained on local cases."
    },
    {
      id: "ai-automation",
      category: "ai",
      icon: <Zap className="h-6 w-6 text-brand-cyan" />,
      title: "AI Automation",
      description: "End-to-end background processes that chain models and database structures, triggering automated customer engagements.",
      pricing: "Starting at $3,500",
      delivery: "2-3 Weeks",
      tech: ["n8n", "Make", "Custom Cron Node.js", "Webhooks"],
      benefits: [
        "Fully automated data sync across separate apps",
        "Instant text parsing from inbound customer tickets",
        "Elimination of manual entry and human transcription errors"
      ],
      useCase: "Email lead auto-reply triggers and internal Slack database updates fueled by vision model parsers."
    },
    {
      id: "web-dev",
      category: "fullstack",
      icon: <Code2 className="h-6 w-6 text-brand-blue" />,
      title: "SaaS Development",
      description: "Premium, responsive modular Next.js web applications, containing detailed client portals, Stripe billing, and secure API cores.",
      pricing: "Starting at $6,000",
      delivery: "4-8 Weeks",
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      benefits: [
        "Optimized layout speeds with Server Component rendering",
        "Stripe integration with complex multi-tier billing",
        "Robust path permission security protection layers"
      ],
      useCase: "Enterprise business management cockpits, subscription-based customer platforms, and dynamic content sites."
    },
    {
      id: "mobile-apps",
      category: "fullstack",
      icon: <Smartphone className="h-6 w-6 text-brand-purple" />,
      title: "Mobile App Development",
      description: "Sub-100ms real-time React Native mobile apps built for geolocated dispatch, community feeds, and offline caching systems.",
      pricing: "Starting at $6,500",
      delivery: "5-9 Weeks",
      tech: ["React Native", "Expo", "WebSocket", "Redux Toolkit"],
      benefits: [
        "Simultaneous launch on Apple App Store & Google Play",
        "Instant geolocation mapping calculations",
        "Ultra-clean local sqlite caching for offline accessibility"
      ],
      useCase: "Hyperlocal parcel tracking, community networking hubs, and field inspection logger apps."
    },
    {
      id: "api-dev",
      category: "fullstack",
      icon: <Server className="h-6 w-6 text-brand-cyan" />,
      title: "API Development & Backend",
      description: "Ultra-fast RESTful and gRPC web routing layers built on NestJS and FastAPI, with robust validation and security layers.",
      pricing: "Starting at $4,000",
      delivery: "3-5 Weeks",
      tech: ["NestJS", "FastAPI", "Prisma ORM", "Redis Cache"],
      benefits: [
        "Highly organized module codebase structure",
        "Strict automatic parameter schema typechecks",
        "Sub-30ms execution timings for simple reads"
      ],
      useCase: "External third-party API hooks, fast mobile app backends, and multi-tenant data orchestrations."
    },
    {
      id: "devops",
      category: "fullstack",
      icon: <CloudLightning className="h-6 w-6 text-brand-blue" />,
      title: "DevOps & Cloud Systems",
      description: "Deploying secure Docker setups, CI/CD automated test integrations, and load balancers on AWS and GCP.",
      pricing: "Starting at $3,500",
      delivery: "2-4 Weeks",
      tech: ["AWS", "Docker", "GitHub Actions", "Terraform"],
      benefits: [
        "Fully automated compilation verification testing on commit",
        "Self-scaling containers to handle user traffic spikes",
        "Secure VPC environments keeping databases closed"
      ],
      useCase: "Zero-downtime deployment pipelines and staging environment replicators."
    },
    {
      id: "ai-testing",
      category: "ai",
      icon: <Cpu className="h-6 w-6 text-brand-purple" />,
      title: "AI Testing & Evaluation Systems",
      description: "Adversarial evaluation frameworks designed to test LLM swarms for factual consistency, drift, and toxic inputs.",
      pricing: "Starting at $5,000",
      delivery: "3-5 Weeks",
      tech: ["LangSmith", "Phoenix", "DeepEval", "Python"],
      benefits: [
        "Discover conversation bypass risks before launch",
        "Validate answer accuracies against custom datasets",
        "Centralized logs monitoring operational drift"
      ],
      useCase: "Compliance auditing portals for chatbot solutions operating in financial or clinical setups."
    }
  ];

  const filteredServices = services.filter((s) => {
    if (activeFilter === "all") return true;
    return s.category === activeFilter;
  });

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Dynamic Background Mesh */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Filter Selection Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {(["all", "ai", "fullstack"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === filter
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
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">{service.title}</h2>
                      <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-brand-cyan">
                        {service.category === "ai" ? "AI Specialty" : "Engineering Core"}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-sm font-extrabold text-white">{service.pricing}</span>
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
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
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
