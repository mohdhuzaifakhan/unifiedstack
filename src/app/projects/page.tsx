"use client";

import GlowingCard from "@/components/ui/glowing-card";
import ImageLightbox from "@/components/ui/image-lightbox";
import { getProjects, Project } from "@/lib/firebase";
import {
  Activity,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
  Layers,
  ZoomIn,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedProject, setExpandedProject] = useState<string | null>("unified-ai-platform");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt?: string } | null>(null);

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "AI Agent Development", label: "AI Chatbots & Agents" },
    { key: "AI Testing & Evaluation Systems", label: "AI Testing Systems" },
    { key: "Mobile App Development", label: "Mobile Apps (Android & iOS)" },
    { key: "Generative AI Solutions", label: "Custom AI Tools" }
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProjects();
        setProjects(data);
        if (data.length > 0) {
          setExpandedProject(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const toggleExpand = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <div className="relative py-12 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Background soft ambient glows */}
      <div className="pointer-events-none absolute top-40 left-10 h-[350px] w-[500px] rounded-full bg-blue-50/70 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[300px] w-[500px] rounded-full bg-indigo-50/60 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Our Work
          </span>
          <h1 className="mt-2.5 sm:mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-tight break-words">
            Real Projects We Have Built & Shipped
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Take a look at some of the custom websites, mobile applications, and AI platforms we have engineered for clients.
          </p>
        </div>

        {/* Filter selection menu */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`rounded-full px-4 py-2 sm:px-5 sm:py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === cat.key
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Shipped cases list layout */}
        <div className="space-y-8">
          {loading ? (
            <div className="text-center py-20 text-xs font-mono text-slate-400">
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-xs text-slate-400 italic border border-slate-200 rounded-2xl bg-slate-50">
              No projects found in this category.
            </div>
          ) : (
            filteredProjects.map((project) => {
              const isExpanded = expandedProject === project.id;
              return (
                <GlowingCard
                  key={project.id}
                  id={project.id}
                  className="overflow-hidden border border-slate-200/90 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Visual mockup block */}
                    <div className="lg:col-span-4 relative min-h-[220px] bg-slate-100 overflow-hidden group/img border-b lg:border-b-0 lg:border-r border-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-all duration-500 group-hover/img:scale-[1.03]"
                      />
                      {/* Hover zoom overlay */}
                      <div 
                        onClick={() => setSelectedImage({ src: project.image, alt: project.title })}
                        className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-20"
                      >
                        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-3 py-1.5 text-slate-800 flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                          <ZoomIn className="h-4 w-4 text-blue-600" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Click to view</span>
                        </div>
                      </div>

                      {/* Floating badge */}
                      <span className="absolute top-4 left-4 rounded-full bg-white/95 border border-slate-200/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 z-10 pointer-events-none">
                        {project.category}
                      </span>
                    </div>

                    {/* Standard details block */}
                    <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                          {project.title}
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Chips */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-medium text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Dynamic Metrics */}
                        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                          {project.metrics.map((metric, idx) => (
                            <div key={idx} className="text-left">
                              <span className="block text-lg font-extrabold text-slate-900 sm:text-xl">
                                {metric.value}
                              </span>
                              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-5">
                        <button
                          onClick={() => toggleExpand(project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors self-start cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              Hide Details
                              <ChevronUp className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              View Project Details & Results
                              <ChevronDown className="h-4 w-4" />
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                          {project.playStoreLink && (
                            <a
                              href={project.playStoreLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-8 sm:h-9 px-3.5 sm:px-4 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-all gap-1.5"
                              aria-label="Download from Google Play"
                            >
                              <span>Play Store</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-8 sm:h-9 px-3.5 sm:px-4 items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-all gap-1.5"
                              aria-label="View Source on GitHub"
                            >
                              <span>GitHub</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/contact?project=${encodeURIComponent(project.title)}`}
                            className="inline-flex h-8 sm:h-9 px-3.5 sm:px-4 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors gap-1.5"
                            aria-label="Enquire about project"
                          >
                            <span>Start Similar Project</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible deep dive details panel */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-6 sm:p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
                        {/* Problem statement */}
                        <div>
                          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                            <Cpu className="h-4 w-4 text-blue-600" />
                            The Challenge
                          </h4>
                          <p className="leading-relaxed text-slate-600">
                            {project.problem}
                          </p>
                        </div>

                        {/* Engineered solution */}
                        <div>
                          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                            <Layers className="h-4 w-4 text-blue-600" />
                            What We Built & How We Solved It
                          </h4>
                          <p className="leading-relaxed text-slate-600">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Shipped outcomes */}
                      <div className="border-t border-slate-200/80 pt-6">
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                          <Activity className="h-4 w-4 text-emerald-600" />
                          Key Results & Impact
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {project.results.map((res, idx) => (
                            <li
                              key={idx}
                              className="rounded-xl bg-white border border-slate-200 p-4 text-xs leading-relaxed text-slate-700 relative"
                            >
                              <span className="absolute top-2 right-3 text-lg font-mono font-bold text-slate-200">
                                0{idx + 1}
                              </span>
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Architecture overview */}
                      {project.architecturalOverview && (
                        <div className="border-t border-slate-200/80 pt-6 rounded-xl bg-white border border-slate-200 p-5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                            Technical Architecture
                          </h4>
                          <p className="text-xs leading-relaxed text-slate-600 italic">
                            {project.architecturalOverview}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </GlowingCard>
              );
            })
          )}
        </div>
      </div>

      <ImageLightbox
        src={selectedImage?.src || null}
        alt={selectedImage?.alt}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
