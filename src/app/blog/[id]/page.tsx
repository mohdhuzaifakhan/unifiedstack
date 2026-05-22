"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Loader2 } from "lucide-react";
import { getBlogById, Blog } from "@/lib/firebase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const article = await getBlogById(resolvedParams.id);
        setBlog(article);
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
        Formatting dynamic publication...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Publication Not Found</h2>
        <p className="mt-2 text-xs text-white/40 max-w-sm">
          The requested article may have been archived or unpublished by the system editor.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-xs text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Publications
        </Link>
      </div>
    );
  }

  return (
    <article className="relative py-12 md:py-20 px-4">
      {/* Background visual elements */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navigation back anchor */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        {/* Heading information */}
        <header className="border-b border-white/5 pb-8 mb-10">
          <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
            {blog.category}
          </span>
          
          <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-brand-purple" />
              By {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-purple" />
              Published: {blog.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-purple" />
              {blog.readTime}
            </span>
          </div>
        </header>

        {/* Article image cover */}
        <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden aspect-video mb-12 shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover grayscale brightness-90 contrast-125"
          />
        </div>

        {/* Dynamic Rich Article Content */}
        <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-sm sm:text-base space-y-6">
          {blog.content.split("\n\n").map((para, idx) => {
            const cleanPara = para.trim();
            if (!cleanPara) return null;

            // Render Headings
            if (cleanPara.startsWith("# ")) {
              return (
                <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-10 mb-4">
                  {cleanPara.replace("# ", "")}
                </h1>
              );
            }
            if (cleanPara.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-4 border-l-2 border-brand-purple pl-3">
                  {cleanPara.replace("## ", "")}
                </h2>
              );
            }
            if (cleanPara.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg font-bold text-white tracking-tight mt-6 mb-3">
                  {cleanPara.replace("### ", "")}
                </h3>
              );
            }

            // Render Code Blocks
            if (cleanPara.startsWith("```")) {
              const lines = cleanPara.split("\n");
              const code = lines.slice(1, -1).join("\n");
              return (
                <pre key={idx} className="rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs sm:text-sm text-brand-cyan/80 overflow-x-auto shadow-inner my-6">
                  <code>{code}</code>
                </pre>
              );
            }

            // Render Bullet lists
            if (cleanPara.startsWith("* ") || cleanPara.startsWith("- ")) {
              const listItems = cleanPara.split("\n");
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2 my-4">
                  {listItems.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-xs sm:text-sm text-white/60">
                      {item.replace(/^[*-\s]+/, "")}
                    </li>
                  ))}
                </ul>
              );
            }

            // Standard paragraphs
            return (
              <p key={idx} className="leading-relaxed">
                {cleanPara}
              </p>
            );
          })}
        </div>

        {/* Scoping Intake Scroller */}
        <div className="mt-16 rounded-2xl border border-white/5 bg-gradient-to-tr from-bg-black to-brand-purple/10 p-8 text-center backdrop-blur-md">
          <h3 className="text-xl font-bold text-white">Have a similar project space in mind?</h3>
          <p className="mt-2 text-xs text-white/40 leading-relaxed max-w-sm mx-auto">
            Book an engineering consultation directly with founder Mohd Huzaifa to scope potential system builds.
          </p>
          <Link
            href="/contact"
            className="mt-6 neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Start project scoping
          </Link>
        </div>
      </div>
    </article>
  );
}
