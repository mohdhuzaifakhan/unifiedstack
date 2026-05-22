"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, User, Clock, ArrowRight, Loader2 } from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";
import { getBlogs, Blog } from "@/lib/firebase";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = [
    { key: "all", label: "All Insights" },
    { key: "AI Engineering", label: "AI Engineering" },
    { key: "Software Architecture", label: "Architecture" },
    { key: "Agentic AI", label: "Agentic AI" }
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Background visual glows */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Our Insights
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            UnifiedStack Publications
          </h1>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">
            In-depth analysis, system architectural guidelines, and structural breakdowns of cognitive AI research.
          </p>
        </div>

        {/* Search and Category block */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat.key
                    ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                    : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72 order-1 md:order-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
            />
          </div>
        </div>

        {/* Post Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/60 font-mono text-xs">
            <Loader2 className="h-6 w-6 animate-spin text-brand-purple mb-2" />
            Retrieving blog database...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-white/40 text-sm italic border border-white/5 rounded-2xl bg-white/[0.01]">
            No publications found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <GlowingCard key={blog.id} className="flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-white/5">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-black to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
                      <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2 py-0.5 font-bold uppercase text-brand-cyan">
                        {blog.category}
                      </span>
                      <span>{blog.publishedAt}</span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-white tracking-tight leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    <p className="mt-3 text-xs leading-relaxed text-white/50 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {blog.readTime}
                  </div>
                  
                  <Link
                    href={`/blog/${blog.id}`}
                    className="flex items-center gap-1 font-bold text-brand-cyan hover:text-brand-purple transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </GlowingCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
