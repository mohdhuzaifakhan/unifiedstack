"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Mail, 
  Layers, 
  Clock, 
  CheckCircle, 
  Trash2, 
  PlusCircle, 
  LineChart, 
  LogOut,
  FolderDot,
  Bot,
  Brain,
  Binary,
  ArrowRight,
  Database
} from "lucide-react";
import GlowingCard from "@/components/ui/glowing-card";
import { getInquiries, getBlogs, getProjects, Inquiry, Blog, Project } from "@/lib/firebase";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"leads" | "blogs" | "analytics">("leads");
  
  // Data lists state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "Agentic AI",
    excerpt: "",
    content: "",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    author: "Mohd Huzaifa",
    readTime: "5 min read",
  });
  const [blogSuccess, setBlogSuccess] = useState(false);

  // Load dynamic data on successful login
  useEffect(() => {
    // Check local storage memory session
    const isAuth = localStorage.getItem("unifiedstack_admin_auth") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    async function loadAdminData() {
      setLoading(true);
      try {
        const inqData = await getInquiries();
        const blogData = await getBlogs();
        const projData = await getProjects();
        setInquiries(inqData);
        setBlogs(blogData);
        setProjects(projData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "unifiedstack2026") {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("unifiedstack_admin_auth", "true");
    } else {
      setError("Unauthorized credentials passcode.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    localStorage.removeItem("unifiedstack_admin_auth");
  };

  const handleStatusChange = (idx: number, status: "New" | "In Discussion" | "Closed") => {
    const updated = [...inquiries];
    updated[idx].status = status;
    setInquiries(updated);

    // Save back to localStorage fallback
    const localLeads = localStorage.getItem("unifiedstack_inquiries");
    if (localLeads) {
      const parsed = JSON.parse(localLeads);
      if (parsed[idx]) {
        parsed[idx].status = status;
        localStorage.setItem("unifiedstack_inquiries", JSON.stringify(parsed));
      }
    }
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog: Blog = {
      ...blogForm,
      id: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      publishedAt: new Date().toISOString().split("T")[0]
    };

    // Reconcile list
    setBlogs([newBlog, ...blogs]);
    setBlogSuccess(true);
    
    // Save to LocalMock Fallback
    const existingBlogs = localStorage.getItem("unifiedstack_blogs") || "[]";
    const parsed = JSON.parse(existingBlogs);
    parsed.unshift(newBlog);
    localStorage.setItem("unifiedstack_blogs", JSON.stringify(parsed));

    setBlogForm({
      title: "",
      category: "Agentic AI",
      excerpt: "",
      content: "",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      author: "Mohd Huzaifa",
      readTime: "5 min read",
    });

    setTimeout(() => setBlogSuccess(false), 3000);
  };

  // Analytics helper calculations
  const totalValue = inquiries.reduce((acc, inq) => {
    if (inq.budget.includes("$5,000 - $15,000")) return acc + 10000;
    if (inq.budget.includes("$15,000 - $50,000")) return acc + 32500;
    if (inq.budget.includes("$50,000+")) return acc + 75000;
    return acc + 3500; // under 5k default average
  }, 0);

  const budgetBreakdown = inquiries.reduce((acc: Record<string, number>, inq) => {
    acc[inq.budget] = (acc[inq.budget] || 0) + 1;
    return acc;
  }, {});

  const serviceBreakdown = inquiries.reduce((acc: Record<string, number>, inq) => {
    acc[inq.service] = (acc[inq.service] || 0) + 1;
    return acc;
  }, {});

  // 1. Secure passcode login overlay
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-white/5 bg-white/[0.01] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Console Gate</h2>
            <p className="mt-2 text-xs text-white/40 max-w-xs leading-relaxed">
              Verify administrative access credentials for founder Mohd Huzaifa to access inquiries scoping files.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
                Administrator Passcode
              </label>
              <input
                type="password"
                id="passcode"
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40 text-center tracking-widest font-mono"
                required
              />
            </div>
            
            {error && <span className="block text-[10px] text-red-400 font-medium text-center">{error}</span>}

            <button
              type="submit"
              className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Verify Credentials
              <ArrowRight className="h-4 w-4" />
            </button>

            <span className="block mt-4 text-[10px] text-white/20 leading-relaxed text-center font-mono">
              Hint: use passkey <span className="text-brand-cyan">unifiedstack2026</span> for local scopes
            </span>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-20 px-4">
      {/* Visual background elements */}
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header console */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-8 mb-10 gap-4">
          <div>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">// Agency Cockpit</span>
            <h1 className="mt-1 text-3xl font-extrabold text-white tracking-tight">Admin Console</h1>
            <span className="block text-xs text-white/40 mt-0.5">Welcome back, Mohd Huzaifa</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Lock Console
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab("leads")}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "leads"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Leads Inbox ({inquiries.length})
          </button>
          
          <button
            onClick={() => setActiveTab("blogs")}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "blogs"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Publish Article
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Pipeline Analytics
          </button>
        </div>

        {/* Dynamic Panels */}
        {loading ? (
          <div className="text-center py-20 text-white/40 font-mono text-xs">
            Retrieving scoping database record sets...
          </div>
        ) : activeTab === "leads" ? (
          /* leads inbox list */
          <div className="space-y-6">
            {inquiries.length === 0 ? (
              <div className="text-center py-20 border border-white/5 rounded-2xl bg-white/[0.01] text-white/40 italic text-sm">
                No active project scoping inquiries currently registered.
              </div>
            ) : (
              inquiries.map((inq, idx) => (
                <GlowingCard key={idx} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-white/5 pb-4 mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{inq.name}</h3>
                      <span className="text-xs text-white/40 font-mono mt-0.5 block">{inq.company}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2 py-0.5 text-[9px] font-mono text-brand-cyan">
                        {inq.service}
                      </span>
                      <span className="rounded bg-brand-cyan/15 border border-brand-cyan/20 px-2 py-0.5 text-[9px] font-mono text-white/80">
                        {inq.budget}
                      </span>
                      
                      {/* Status selectors */}
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(idx, e.target.value as any)}
                        className={`rounded border px-2 py-0.5 text-[10px] font-mono outline-none cursor-pointer bg-bg-black ${
                          inq.status === "New" ? "border-red-500 text-red-400 bg-red-500/5" :
                          inq.status === "In Discussion" ? "border-yellow-500 text-yellow-400 bg-yellow-500/5" :
                          "border-green-500 text-green-400 bg-green-500/5"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-sm leading-relaxed text-white/60">
                    <p className="whitespace-pre-wrap">{inq.message}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-brand-purple" />
                      {inq.email}
                    </span>
                    <span>Received: {new Date(inq.createdAt).toLocaleString()}</span>
                  </div>
                </GlowingCard>
              ))
            )}
          </div>
        ) : activeTab === "blogs" ? (
          /* blog form publisher */
          <div className="max-w-3xl mx-auto">
            <GlowingCard className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-brand-purple" />
                Publish Insight Publication
              </h2>

              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Article Title</label>
                  <input
                    type="text"
                    id="title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                    placeholder="E.g. Optimizing Pinecone Retrieval Performance"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Category</label>
                    <select
                      id="category"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 [&>option]:bg-bg-black"
                    >
                      <option value="Agentic AI">Agentic AI</option>
                      <option value="AI Engineering">AI Engineering</option>
                      <option value="Software Architecture">Software Architecture</option>
                      <option value="SaaS Development">SaaS Development</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="readTime" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Reading Time</label>
                    <input
                      type="text"
                      id="readTime"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Excerpt</label>
                  <input
                    type="text"
                    id="excerpt"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                    placeholder="Short description snippet of the article content..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Markdown Content Body</label>
                  <textarea
                    id="content"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                    rows={8}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40 font-mono resize-none"
                    placeholder="# Article Header\n\nWrite article paragraphs. Use ## for sections."
                    required
                  />
                </div>

                {blogSuccess && (
                  <span className="block text-xs text-green-400 font-semibold text-center">
                    Insight published successfully!
                  </span>
                )}

                <button
                  type="submit"
                  className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                  Publish To Insights
                </button>
              </form>
            </GlowingCard>
          </div>
        ) : (
          /* analytics statistics charts */
          <div className="space-y-8">
            {/* KPI metric items */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <GlowingCard className="p-6 text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-white/40">Inbound Pipeline Value</span>
                <span className="block mt-2 text-3xl font-extrabold text-white sm:text-4xl">${totalValue.toLocaleString()}</span>
                <span className="block text-[10px] text-white/30 font-mono mt-1">* Estimated based on budget tiers</span>
              </GlowingCard>

              <GlowingCard className="p-6 text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-white/40">Scoping Lead Volume</span>
                <span className="block mt-2 text-3xl font-extrabold text-brand-purple sm:text-4xl">{inquiries.length} leads</span>
                <span className="block text-[10px] text-white/30 font-mono mt-1">Total inquiries received</span>
              </GlowingCard>

              <GlowingCard className="p-6 text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-white/40">Article Velocity</span>
                <span className="block mt-2 text-3xl font-extrabold text-brand-cyan sm:text-4xl">{blogs.length} Insights</span>
                <span className="block text-[10px] text-white/30 font-mono mt-1">Live articles published</span>
              </GlowingCard>
            </div>

            {/* Breakdown charts mockups */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Service requested breakdown */}
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-cyan mb-5 pb-2 border-b border-white/5">
                  Requested Operations distribution
                </h3>
                <div className="space-y-4">
                  {Object.entries(serviceBreakdown).length === 0 ? (
                    <span className="text-xs text-white/40 italic">No inquiry distributions computed yet.</span>
                  ) : (
                    Object.entries(serviceBreakdown).map(([service, count]) => {
                      const percentage = Math.round((count / inquiries.length) * 100);
                      return (
                        <div key={service} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-white/70">
                            <span>{service}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div className="h-1.5 w-full rounded bg-white/5 overflow-hidden">
                            <div
                              style={{ width: `${percentage}%` }}
                              className="h-full rounded bg-brand-purple"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Budget tier breakdown */}
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple mb-5 pb-2 border-b border-white/5">
                  Budget allocations distribution
                </h3>
                <div className="space-y-4">
                  {Object.entries(budgetBreakdown).length === 0 ? (
                    <span className="text-xs text-white/40 italic">No budget distributions computed yet.</span>
                  ) : (
                    Object.entries(budgetBreakdown).map(([budget, count]) => {
                      const percentage = Math.round((count / inquiries.length) * 100);
                      return (
                        <div key={budget} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-white/70">
                            <span>{budget}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div className="h-1.5 w-full rounded bg-white/5 overflow-hidden">
                            <div
                              style={{ width: `${percentage}%` }}
                              className="h-full rounded bg-brand-cyan"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
