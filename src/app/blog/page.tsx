"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, Loader2 } from "lucide-react";
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
    <div className="relative py-12 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Background visual glows */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-blue-50/70 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[350px] w-[600px] rounded-full bg-indigo-50/60 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Insights & Guides
          </span>
          <h1 className="mt-2.5 sm:mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-tight break-words">
            Engineering Blog & Guides
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Articles, technical blueprints, and practical guides on building custom software, mobile apps, and smart AI systems.
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
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72 order-1 md:order-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Post Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-mono text-xs">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 mb-2" />
            Retrieving blog database...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm italic border border-slate-200 rounded-2xl bg-slate-50">
            No publications found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <GlowingCard key={blog.id} className="flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 font-bold uppercase tracking-wider text-blue-700 text-[10px]">
                        {blog.category}
                      </span>
                      <span>{blog.publishedAt}</span>
                    </div>

                    <h2 className="mt-3.5 text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {blog.readTime}
                  </div>
                  
                  <Link
                    href={`/blog/${blog.id}`}
                    className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5" />
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
