"use client";

import GlowingCard from "@/components/ui/glowing-card";
import {
  Blog,
  Inquiry,
  Project,
  Service,
  Globals,
  auth,
  isFirebaseConfigured,
  getBlogs,
  getInquiries,
  getProjects,
  getServices,
  getGlobals,
  saveBlog,
  deleteBlog,
  saveProject,
  deleteProject,
  saveService,
  deleteService,
  saveGlobals,
  updateInquiryStatus,
  deleteInquiry,
  seedDatabase
} from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  ArrowRight,
  Lock,
  LogOut,
  Mail,
  PlusCircle,
  Trash2,
  Edit3,
  Settings,
  Database,
  LineChart,
  FileText,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  Check,
  Eye,
  Plus,
  Briefcase
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<"leads" | "projects" | "blogs" | "services" | "site" | "analytics" | "settings">("leads");

  // Data lists state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [globalsForm, setGlobalsForm] = useState<Globals | null>(null);
  const [loading, setLoading] = useState(true);

  // Database Seeding State
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [seedingMessage, setSeedingMessage] = useState("");

  // Site Editor State
  const [siteSuccess, setSiteSuccess] = useState(false);
  const [siteSaving, setSiteSaving] = useState(false);

  // Edit / Add States for Services
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    id: "",
    category: "ai",
    iconName: "Bot",
    title: "",
    description: "",
    pricingIn: "",
    pricingIntl: "",
    delivery: "",
    techRaw: "",
    benefitsRaw: "",
    useCase: "",
    order: 1
  });
  const [serviceSuccess, setServiceSuccess] = useState(false);

  // Edit / Add States for Blogs
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
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

  // Edit / Add States for Projects
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    category: "AI Agent Development",
    description: "",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    techStackRaw: "Next.js, TypeScript, LangGraph, FastAPI, PostgreSQL",
    metric1Label: "Enterprise Scale",
    metric1Value: "Production",
    metric2Label: "Core Modules",
    metric2Value: "11 Features",
    metric3Label: "Lifecycle Stage",
    metric3Value: "End-to-End",
    problem: "",
    solution: "",
    resultsRaw: "Completed agent workflow builder\nEnsures zero operational overhead\nDelivers observed query pipelines",
    architecturalOverview: "",
    playStoreLink: "",
    githubLink: ""
  });
  const [projectSuccess, setProjectSuccess] = useState(false);

  // Load Auth State
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.email === "mohdhuzaifa8126195456@gmail.com") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          if (user && auth) {
            // Sign out non-admins immediately
            fbSignOut(auth);
          }
        }
        setAuthLoading(false);
      });
      return () => unsubscribe();
    } else {
      const isAuth = localStorage.getItem("unifiedstack_admin_auth") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
      }
      setAuthLoading(false);
    }
  }, []);

  // Fetch dashboard data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const inqData = await getInquiries();
      const blogData = await getBlogs();
      const projData = await getProjects();
      const servData = await getServices();
      const globData = await getGlobals();
      setInquiries(inqData);
      setBlogs(blogData);
      setProjects(projData);
      setServices(servData);
      setGlobalsForm(globData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    loadAdminData();
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitting(true);
    setError("");

    const adminEmail = "mohdhuzaifa8126195456@gmail.com";
    const adminPassword = "Unifiedstack@04022002";

    if (email !== adminEmail) {
      setError("Unauthorized administrative email address.");
      setLoginSubmitting(false);
      return;
    }

    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setIsAuthenticated(true);
      } catch (err: any) {
        console.error("Firebase Login Error: ", err);
        if (err.code === "auth/configuration-not-found" || (err.message && err.message.includes("configuration-not-found"))) {
          setError("Setup Action Required: Email/Password sign-in provider is disabled in your Firebase project. Please open your Firebase Console, navigate to 'Authentication' > 'Sign-in method', and enable 'Email/Password'.");
        } else if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
          setError("Credentials not found in Firebase. Please ensure you have enabled the 'Email/Password' provider AND added the user 'mohdhuzaifa8126195456@gmail.com' in the 'Users' tab of your Firebase Authentication Console.");
        } else {
          setError(err.message || "Invalid authentication credentials.");
        }
      } finally {
        setLoginSubmitting(false);
      }
    } else {
      // Mock Fallback Auth Checks
      if (password === adminPassword) {
        setIsAuthenticated(true);
        localStorage.setItem("unifiedstack_admin_auth", "true");
      } else {
        setError("Invalid mock administrator password.");
      }
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    } else {
      localStorage.removeItem("unifiedstack_admin_auth");
    }
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  // Inquiry/Leads Actions
  const handleStatusChange = async (id: string, status: "New" | "In Discussion" | "Closed") => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client inquiry?")) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  // Blog Submits
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogId = editingBlogId || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newBlog: Blog = {
      ...blogForm,
      id: blogId,
      publishedAt: editingBlogId
        ? (blogs.find((b) => b.id === editingBlogId)?.publishedAt || new Date().toISOString().split("T")[0])
        : new Date().toISOString().split("T")[0]
    };

    try {
      await saveBlog(newBlog);
      setBlogSuccess(true);
      setTimeout(() => {
        setBlogSuccess(false);
        setIsBlogFormOpen(false);
        setEditingBlogId(null);
      }, 1500);

      // Re-fetch
      loadAdminData();

      // Reset
      setBlogForm({
        title: "",
        category: "Agentic AI",
        excerpt: "",
        content: "",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        author: "Mohd Huzaifa",
        readTime: "5 min read",
      });
    } catch (err) {
      console.error("Failed to save blog post:", err);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      readTime: blog.readTime,
    });
    setIsBlogFormOpen(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;
    try {
      await deleteBlog(id);
      loadAdminData();
    } catch (err) {
      console.error("Failed to delete blog post:", err);
    }
  };

  // Project Submits
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check project ID validation
    const projId = editingProjectId || projectForm.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!projId) {
      alert("Invalid unique identifier.");
      return;
    }

    const techStack = projectForm.techStackRaw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const results = projectForm.resultsRaw
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const newProject: Project = {
      id: projId,
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      image: projectForm.image,
      techStack,
      metrics: [
        { label: projectForm.metric1Label, value: projectForm.metric1Value },
        { label: projectForm.metric2Label, value: projectForm.metric2Value },
        { label: projectForm.metric3Label, value: projectForm.metric3Value }
      ],
      problem: projectForm.problem,
      solution: projectForm.solution,
      results,
      architecturalOverview: projectForm.architecturalOverview || undefined,
      playStoreLink: projectForm.playStoreLink || undefined,
      githubLink: projectForm.githubLink || undefined
    };

    try {
      await saveProject(newProject);
      setProjectSuccess(true);
      setTimeout(() => {
        setProjectSuccess(false);
        setIsProjectFormOpen(false);
        setEditingProjectId(null);
      }, 1500);

      // Re-fetch
      loadAdminData();

      // Reset
      setProjectForm({
        id: "",
        title: "",
        category: "AI Agent Development",
        description: "",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        techStackRaw: "Next.js, TypeScript, LangGraph, FastAPI, PostgreSQL",
        metric1Label: "Enterprise Scale",
        metric1Value: "Production",
        metric2Label: "Core Modules",
        metric2Value: "11 Features",
        metric3Label: "Lifecycle Stage",
        metric3Value: "End-to-End",
        problem: "",
        solution: "",
        resultsRaw: "Completed agent workflow builder\nEnsures zero operational overhead\nDelivers observed query pipelines",
        architecturalOverview: "",
        playStoreLink: "",
        githubLink: ""
      });
    } catch (err) {
      console.error("Failed to save project study:", err);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      techStackRaw: project.techStack.join(", "),
      metric1Label: project.metrics[0]?.label || "Enterprise Scale",
      metric1Value: project.metrics[0]?.value || "Production",
      metric2Label: project.metrics[1]?.label || "Core Modules",
      metric2Value: project.metrics[1]?.value || "11 Features",
      metric3Label: project.metrics[2]?.label || "Lifecycle Stage",
      metric3Value: project.metrics[2]?.value || "End-to-End",
      problem: project.problem,
      solution: project.solution,
      resultsRaw: project.results.join("\n"),
      architecturalOverview: project.architecturalOverview || "",
      playStoreLink: project.playStoreLink || "",
      githubLink: project.githubLink || ""
    });
    setIsProjectFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project study?")) return;
    try {
      await deleteProject(id);
      loadAdminData();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serviceId = editingServiceId || serviceForm.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!serviceId) {
      alert("Invalid unique identifier.");
      return;
    }

    const tech = serviceForm.techRaw.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    const benefits = serviceForm.benefitsRaw.split("\n").map((b) => b.trim()).filter((b) => b.length > 0);

    const serviceData: Service = {
      id: serviceId,
      category: serviceForm.category,
      iconName: serviceForm.iconName,
      title: serviceForm.title,
      description: serviceForm.description,
      pricing: {
        in: serviceForm.pricingIn,
        intl: serviceForm.pricingIntl
      },
      delivery: serviceForm.delivery,
      tech,
      benefits,
      useCase: serviceForm.useCase,
      order: Number(serviceForm.order) || 1
    };

    try {
      await saveService(serviceData);
      setServiceSuccess(true);
      setTimeout(() => {
        setServiceSuccess(false);
        setIsServiceFormOpen(false);
        setEditingServiceId(null);
      }, 1500);

      loadAdminData();
    } catch (err) {
      console.error("Failed to save service:", err);
    }
  };

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      id: service.id,
      category: service.category,
      iconName: service.iconName,
      title: service.title,
      description: service.description,
      pricingIn: service.pricing.in,
      pricingIntl: service.pricing.intl,
      delivery: service.delivery,
      techRaw: service.tech.join(", "),
      benefitsRaw: service.benefits.join("\n"),
      useCase: service.useCase,
      order: service.order
    });
    setIsServiceFormOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service record?")) return;
    try {
      await deleteService(id);
      loadAdminData();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleSaveGlobals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalsForm) return;
    setSiteSaving(true);
    try {
      await saveGlobals(globalsForm);
      setSiteSuccess(true);
      setTimeout(() => setSiteSuccess(false), 2000);
      loadAdminData();
    } catch (err) {
      console.error("Failed to save site settings:", err);
      alert("Failed to save site configurations.");
    } finally {
      setSiteSaving(false);
    }
  };

  const handleSeedDatabase = async () => {
    setSeedingLoading(true);
    setSeedingMessage("Initializing seeding process...");
    try {
      const res = await seedDatabase((msg) => {
        setSeedingMessage(msg);
      });
      if (res.success) {
        // Re-load the list counters
        await loadAdminData();
      } else {
        setSeedingMessage(`Error: ${res.error || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error(err);
      setSeedingMessage(`Execution failed: ${err.message || err}`);
    } finally {
      setSeedingLoading(false);
    }
  };

  // Analytics Helpers
  const totalValue = inquiries.reduce((acc, inq) => {
    if (inq.budget.includes("₹")) {
      // Convert INR budget approx to USD for visual uniformity
      if (inq.budget.includes("20,000 - ₹50,000")) return acc + 400;
      if (inq.budget.includes("50,000 - ₹60,000")) return acc + 650;
      if (inq.budget.includes("60,000+")) return acc + 1200;
      return acc + 150; // under 20k
    }
    if (inq.budget.includes("$3,000 - $5,000")) return acc + 4000;
    if (inq.budget.includes("$5,000 - $10,000")) return acc + 7500;
    if (inq.budget.includes("$10,000+")) return acc + 15000;
    return acc + 1500; // under 3k
  }, 0);

  const budgetBreakdown = inquiries.reduce((acc: Record<string, number>, inq) => {
    acc[inq.budget] = (acc[inq.budget] || 0) + 1;
    return acc;
  }, {});

  const serviceBreakdown = inquiries.reduce((acc: Record<string, number>, inq) => {
    acc[inq.service] = (acc[inq.service] || 0) + 1;
    return acc;
  }, {});

  // Auth Loading Overlay Spinner
  if (authLoading) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center font-mono text-xs text-white/50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-purple mb-4" />
        Synchronizing founder admin security session...
      </div>
    );
  }

  // 1. Secure administrator email/pass login panel
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 relative">
        <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-brand-purple/10 blur-[80px]" />
        
        <div className="w-full max-w-md rounded-2xl border border-white/5 bg-white/[0.01] p-8 shadow-2xl backdrop-blur-md relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mb-5">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Console Gate</h2>
            <p className="mt-2 text-xs text-white/40 max-w-xs leading-relaxed">
              Verify credentials to access founder database management console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="founder@unifiedstack.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                required
              />
            </div>

            <div>
              <label htmlFor="passcode" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
                Verification Password
              </label>
              <input
                type="password"
                id="passcode"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                required
              />
            </div>

            {error && (
              <div className="rounded border border-red-500/10 bg-red-500/5 p-3 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-[10px] text-red-400 font-medium leading-relaxed">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50"
            >
              {loginSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Credentials
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="border-t border-white/5 pt-4 text-center">
              <span className="block text-[9px] text-white/30 leading-relaxed font-mono">
                Running in {isFirebaseConfigured ? <span className="text-green-400 font-bold">Cloud Production</span> : <span className="text-brand-cyan font-bold">Local Mock Mode</span>}
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated administrative board layout
  return (
    <div className="relative py-12 px-4 md:px-8">
      {/* Background neon coordinates */}
      <div className="pointer-events-none absolute top-40 right-10 h-[400px] w-[600px] rounded-full bg-brand-purple/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 h-[300px] w-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Cockpit dashboard controls header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">// Administration Portal</span>
            <h1 className="mt-1 text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Briefcase className="h-7 w-7 text-brand-purple" />
              UnifiedStack Cockpit
            </h1>
            <span className="block text-xs text-white/40 mt-1">
              Logged in as founder: <span className="text-white/70 font-mono">mohdhuzaifa8126195456@gmail.com</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAdminData}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-white/60 hover:text-white transition-colors"
              title="Reload dynamic data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all hover:scale-105"
            >
              <LogOut className="h-4 w-4" />
              Lock Console
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/5 pb-4">
          <button
            onClick={() => { setActiveTab("leads"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "leads"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Leads Inbox ({inquiries.length})
          </button>

          <button
            onClick={() => { setActiveTab("projects"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Manage Case Studies ({projects.length})
          </button>

          <button
            onClick={() => { setActiveTab("blogs"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "blogs"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Manage Insights ({blogs.length})
          </button>

          <button
            onClick={() => { setActiveTab("services"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "services"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Manage Services ({services.length})
          </button>

          <button
            onClick={() => { setActiveTab("site"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "site"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Homepage Editor
          </button>

          <button
            onClick={() => { setActiveTab("analytics"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            Pipeline Analytics
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/20"
                : "border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5"
            }`}
          >
            System Settings
          </button>
        </div>

        {/* Global Loading Dashboard State */}
        {loading && activeTab !== "settings" ? (
          <div className="flex flex-col items-center justify-center py-32 text-white/40 font-mono text-xs">
            <Loader2 className="h-6 w-6 animate-spin text-brand-cyan mb-2" />
            Loading dynamic console catalog arrays...
          </div>
        ) : (
          <div>
            {/* 1. LEADS INBOX */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                {inquiries.length === 0 ? (
                  <div className="text-center py-24 border border-white/5 rounded-2xl bg-white/[0.01] text-white/45 italic text-xs">
                    No active scoping inquiries registered currently.
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <GlowingCard key={inq.id} className="p-6 relative group/inq">
                      <div className="absolute right-4 top-4 opacity-0 group-hover/inq:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteInquiry(inq.id || "")}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                          title="Delete Lead record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-white/5 pb-4 mb-4 gap-4 pr-10">
                        <div>
                          <h3 className="text-base font-bold text-white tracking-tight">{inq.name}</h3>
                          <span className="text-[11px] text-white/40 font-mono block mt-0.5">{inq.company || "Independent developer"}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-0.5 text-[9px] font-mono text-brand-cyan">
                            {inq.service}
                          </span>
                          <span className="rounded bg-brand-cyan/15 border border-brand-cyan/20 px-2.5 py-0.5 text-[9px] font-mono text-white/80">
                            {inq.budget}
                          </span>

                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id || "", e.target.value as any)}
                            className={`rounded border px-2 py-0.5 text-[10px] font-mono outline-none cursor-pointer bg-bg-black ${
                              inq.status === "New" ? "border-red-500/50 text-red-400 bg-red-500/5" :
                              inq.status === "In Discussion" ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/5" :
                              "border-green-500/50 text-green-400 bg-green-500/5"
                            }`}
                          >
                            <option value="New" className="bg-bg-black text-red-400">New</option>
                            <option value="In Discussion" className="bg-bg-black text-yellow-400">In Discussion</option>
                            <option value="Closed" className="bg-bg-black text-green-400">Closed</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm leading-relaxed text-white/60 whitespace-pre-wrap">
                        {inq.message}
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] text-white/35 font-mono gap-2">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-brand-purple" />
                          <a href={`mailto:${inq.email}`} className="hover:text-brand-cyan hover:underline">{inq.email}</a>
                        </span>
                        <span>Inbound: {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : "Unknown"}</span>
                      </div>
                    </GlowingCard>
                  ))
                )}
              </div>
            )}

            {/* 2. MANAGE CASE STUDIES */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-bold text-white tracking-wider font-mono">Case Studies Index</h2>
                  
                  {!isProjectFormOpen && (
                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          id: "",
                          title: "",
                          category: "AI Agent Development",
                          description: "",
                          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                          techStackRaw: "Next.js, TypeScript, LangGraph, FastAPI, PostgreSQL",
                          metric1Label: "Enterprise Scale",
                          metric1Value: "Production",
                          metric2Label: "Core Modules",
                          metric2Value: "11 Features",
                          metric3Label: "Lifecycle Stage",
                          metric3Value: "End-to-End",
                          problem: "",
                          solution: "",
                          resultsRaw: "Completed agent workflow builder\nEnsures zero operational overhead\nDelivers observed query pipelines",
                          architecturalOverview: "",
                          playStoreLink: "",
                          githubLink: ""
                        });
                        setIsProjectFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-brand-purple hover:bg-brand-violet text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                      Add Case Study
                    </button>
                  )}
                </div>

                {isProjectFormOpen ? (
                  <GlowingCard className="p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                      <h3 className="text-base font-extrabold text-white">
                        {editingProjectId ? `Edit Case Study: ${projectForm.title}` : "New Software Case Study"}
                      </h3>
                      <button
                        onClick={() => setIsProjectFormOpen(false)}
                        className="text-xs text-white/50 hover:text-white font-mono hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleProjectSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {!editingProjectId && (
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Unique ID (URL Slug)</label>
                            <input
                              type="text"
                              value={projectForm.id}
                              onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                              placeholder="e.g. conversational-chat-agent"
                              className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40 font-mono"
                              required
                            />
                          </div>
                        )}
                        <div className={editingProjectId ? "col-span-2" : ""}>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Project Title</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. Town Beat: Hyperlocal Social Network"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Category Tag</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 [&>option]:bg-bg-black"
                          >
                            <option value="AI Agent Development">AI Agent Development</option>
                            <option value="AI Testing & Evaluation Systems">AI Testing & Evaluation Systems</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Generative AI Solutions">Generative AI Solutions</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Image URL Cover</label>
                          <input
                            type="text"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono text-white/80"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Short Description Summary</label>
                        <textarea
                          rows={2}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="A hyper-local social networking platform connecting citizens in their specific city..."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Technology Stack (Comma Separated)</label>
                        <input
                          type="text"
                          value={projectForm.techStackRaw}
                          onChange={(e) => setProjectForm({ ...projectForm, techStackRaw: e.target.value })}
                          placeholder="React Native, Node.js, Express, MongoDB, Firebase"
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                          required
                        />
                      </div>

                      {/* Metrics Inputs */}
                      <div className="border-t border-white/5 pt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-3">Key Quantifiable Metrics (Provide exactly 3)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-lg border border-white/5 bg-white/[0.01] p-3 space-y-3">
                            <span className="text-[8px] font-bold font-mono tracking-widest text-brand-purple uppercase">Metric Unit #1</span>
                            <input
                              type="text"
                              value={projectForm.metric1Value}
                              onChange={(e) => setProjectForm({ ...projectForm, metric1Value: e.target.value })}
                              placeholder="e.g. 10 Mins / 98.4%"
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                              required
                            />
                            <input
                              type="text"
                              value={projectForm.metric1Label}
                              onChange={(e) => setProjectForm({ ...projectForm, metric1Label: e.target.value })}
                              placeholder="e.g. Pre-Prayer Alerts"
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white"
                              required
                            />
                          </div>
                          
                          <div className="rounded-lg border border-white/5 bg-white/[0.01] p-3 space-y-3">
                            <span className="text-[8px] font-bold font-mono tracking-widest text-brand-purple uppercase">Metric Unit #2</span>
                            <input
                              type="text"
                              value={projectForm.metric2Value}
                              onChange={(e) => setProjectForm({ ...projectForm, metric2Value: e.target.value })}
                              placeholder="e.g. Sub-10ms"
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                              required
                            />
                            <input
                              type="text"
                              value={projectForm.metric2Label}
                              onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                              placeholder="e.g. Offline Cache"
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white"
                              required
                            />
                          </div>

                          <div className="rounded-lg border border-white/5 bg-white/[0.01] p-3 space-y-3">
                            <span className="text-[8px] font-bold font-mono tracking-widest text-brand-purple uppercase">Metric Unit #3</span>
                            <input
                              type="text"
                              value={projectForm.metric3Value}
                              onChange={(e) => setProjectForm({ ...projectForm, metric3Value: e.target.value })}
                              placeholder="e.g. Real-time"
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                              required
                            />
                            <input
                              type="text"
                              value={projectForm.metric3Label}
                              onChange={(e) => setProjectForm({ ...projectForm, metric3Label: e.target.value })}
                              placeholder="e.g. Data Replication"
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Collapsible deep dive blocks */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Problem Statement</label>
                          <textarea
                            rows={3}
                            value={projectForm.problem}
                            onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                            placeholder="HR departments faced massive bottlenecks..."
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 resize-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Engineered Solution</label>
                          <textarea
                            rows={3}
                            value={projectForm.solution}
                            onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                            placeholder="Developed an advanced parsing engine using Claude 3.5..."
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 resize-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Quantifiable Results (One Result per Line)</label>
                        <textarea
                          rows={3}
                          value={projectForm.resultsRaw}
                          onChange={(e) => setProjectForm({ ...projectForm, resultsRaw: e.target.value })}
                          placeholder="Saved recruitment teams 42 hours per vacancy.&#10;Anonymized candidate profiles.&#10;High-precision match rate."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                          required
                        />
                      </div>

                      <div className="border-t border-white/5 pt-4 space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/60">Optional Metadata Link integrations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[8px] font-bold uppercase tracking-wider text-white/40 mb-2">Architectural Summary</label>
                            <input
                              type="text"
                              value={projectForm.architecturalOverview}
                              onChange={(e) => setProjectForm({ ...projectForm, architecturalOverview: e.target.value })}
                              placeholder="e.g. Built using React Native/Expo and Firestore..."
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[8px] font-bold uppercase tracking-wider text-white/40 mb-2">Play Store Link</label>
                            <input
                              type="text"
                              value={projectForm.playStoreLink}
                              onChange={(e) => setProjectForm({ ...projectForm, playStoreLink: e.target.value })}
                              placeholder="e.g. https://play.google.com/..."
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[8px] font-bold uppercase tracking-wider text-white/40 mb-2">GitHub Repository</label>
                            <input
                              type="text"
                              value={projectForm.githubLink}
                              onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                              placeholder="e.g. https://github.com/..."
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {projectSuccess && (
                        <div className="rounded border border-green-500/15 bg-green-500/5 p-3 text-center">
                          <span className="text-xs text-green-400 font-semibold">Case study saved successfully!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {editingProjectId ? "Update Case Study" : "Publish Case Study"}
                      </button>
                    </form>
                  </GlowingCard>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {projects.map((proj) => (
                      <GlowingCard key={proj.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 rounded border border-white/5 overflow-hidden bg-white/5 shrink-0 hidden sm:block">
                            <img src={proj.image} alt={proj.title} className="h-full w-full object-cover grayscale" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold font-mono uppercase text-brand-cyan tracking-wide">{proj.category}</span>
                            <h3 className="text-base font-bold text-white tracking-tight">{proj.title}</h3>
                            <span className="block text-[10px] text-white/40 font-mono mt-0.5">slug: /{proj.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="flex h-9 px-4 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-xs font-bold text-white/70 hover:text-white transition-colors cursor-pointer gap-1.5"
                          >
                            <Edit3 className="h-4 w-4 text-brand-purple" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. MANAGE INSIGHTS / BLOGS */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-bold text-white tracking-wider font-mono">Insight Publications Index</h2>
                  
                  {!isBlogFormOpen && (
                    <button
                      onClick={() => {
                        setEditingBlogId(null);
                        setBlogForm({
                          title: "",
                          category: "Agentic AI",
                          excerpt: "",
                          content: "",
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                          author: "Mohd Huzaifa",
                          readTime: "5 min read",
                        });
                        setIsBlogFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-brand-purple hover:bg-brand-violet text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                      Add Insight Article
                    </button>
                  )}
                </div>

                {isBlogFormOpen ? (
                  <GlowingCard className="p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                      <h3 className="text-base font-extrabold text-white">
                        {editingBlogId ? `Edit Publication: ${blogForm.title}` : "Publish Insight Publication"}
                      </h3>
                      <button
                        onClick={() => setIsBlogFormOpen(false)}
                        className="text-xs text-white/50 hover:text-white font-mono hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="title" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Article Title</label>
                        <input
                          type="text"
                          id="title"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          placeholder="e.g. Designing Multi-Agent Systems with LangGraph"
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="category" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Category</label>
                          <select
                            id="category"
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 [&>option]:bg-bg-black"
                          >
                            <option value="Agentic AI">Agentic AI</option>
                            <option value="AI Engineering">AI Engineering</option>
                            <option value="Software Architecture">Software Architecture</option>
                            <option value="SaaS Development">SaaS Development</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="readTime" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Reading Time</label>
                          <input
                            type="text"
                            id="readTime"
                            value={blogForm.readTime}
                            onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="image" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Image cover URL</label>
                          <input
                            type="text"
                            id="image"
                            value={blogForm.image}
                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="excerpt" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Excerpt Snippet</label>
                        <input
                          type="text"
                          id="excerpt"
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          placeholder="Short description snippet of the article content shown in grid catalog lists..."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="content" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Markdown Content Body</label>
                        <textarea
                          id="content"
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          rows={12}
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40 font-mono resize-none leading-relaxed"
                          placeholder="# Main Header&#10;&#10;Article description paragraph. Use ## for headers, * for italics, ** for bold, and ```python for codes."
                          required
                        />
                      </div>

                      {blogSuccess && (
                        <div className="rounded border border-green-500/15 bg-green-500/5 p-3 text-center">
                          <span className="text-xs text-green-400 font-semibold">Insight article saved successfully!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {editingBlogId ? "Update Insight Article" : "Publish Insight Article"}
                      </button>
                    </form>
                  </GlowingCard>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {blogs.map((blog) => (
                      <GlowingCard key={blog.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 rounded border border-white/5 overflow-hidden bg-white/5 shrink-0 hidden sm:block">
                            <img src={blog.image} alt={blog.title} className="h-full w-full object-cover grayscale" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold font-mono uppercase text-brand-purple tracking-wide">{blog.category}</span>
                            <h3 className="text-base font-bold text-white tracking-tight">{blog.title}</h3>
                            <span className="block text-[10px] text-white/40 font-mono mt-0.5">Published: {blog.publishedAt} | slug: /{blog.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="flex h-9 px-4 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-xs font-bold text-white/70 hover:text-white transition-colors cursor-pointer gap-1.5"
                          >
                            <Edit3 className="h-4 w-4 text-brand-purple" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. PIPELINE ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                {/* KPI Metrics */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <GlowingCard className="p-6 text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-white/40">Inbound Pipeline Value</span>
                    <span className="block mt-2 text-3xl font-extrabold text-white sm:text-4xl">${totalValue.toLocaleString()}</span>
                    <span className="block text-[9px] text-white/30 font-mono mt-1">* Approx based on selected currency tiers</span>
                  </GlowingCard>

                  <GlowingCard className="p-6 text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-white/40">Scoping Lead Volume</span>
                    <span className="block mt-2 text-3xl font-extrabold text-brand-purple sm:text-4xl">{inquiries.length} leads</span>
                    <span className="block text-[9px] text-white/30 font-mono mt-1">Total scoping enquiries</span>
                  </GlowingCard>

                  <GlowingCard className="p-6 text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-white/40">Article Velocity</span>
                    <span className="block mt-2 text-3xl font-extrabold text-brand-cyan sm:text-4xl">{blogs.length} Insights</span>
                    <span className="block text-[9px] text-white/30 font-mono mt-1">Active published documents</span>
                  </GlowingCard>
                </div>

                {/* Distributions */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-5 pb-2 border-b border-white/5 font-mono">
                      Requested service distribution
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(serviceBreakdown).length === 0 ? (
                        <span className="text-xs text-white/40 italic">No inquiry allocations processed yet.</span>
                      ) : (
                        Object.entries(serviceBreakdown).map(([service, count]) => {
                          const percentage = Math.round((count / inquiries.length) * 100);
                          return (
                            <div key={service} className="space-y-1">
                              <div className="flex items-center justify-between text-xs text-white/70">
                                <span>{service}</span>
                                <span className="font-mono">{count} ({percentage}%)</span>
                              </div>
                              <div className="h-1.5 w-full rounded bg-white/5 overflow-hidden">
                                <div style={{ width: `${percentage}%` }} className="h-full rounded bg-brand-purple" />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-purple mb-5 pb-2 border-b border-white/5 font-mono">
                      Budget Allocations distribution
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(budgetBreakdown).length === 0 ? (
                        <span className="text-xs text-white/40 italic">No budget distribution arrays calculated.</span>
                      ) : (
                        Object.entries(budgetBreakdown).map(([budget, count]) => {
                          const percentage = Math.round((count / inquiries.length) * 100);
                          return (
                            <div key={budget} className="space-y-1">
                              <div className="flex items-center justify-between text-xs text-white/70">
                                <span>{budget}</span>
                                <span className="font-mono">{count} ({percentage}%)</span>
                              </div>
                              <div className="h-1.5 w-full rounded bg-white/5 overflow-hidden">
                                <div style={{ width: `${percentage}%` }} className="h-full rounded bg-brand-cyan" />
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

            {/* 6. MANAGE SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-bold text-white tracking-wider font-mono">Services Portfolio Index</h2>
                  
                  {!isServiceFormOpen && (
                    <button
                      onClick={() => {
                        setEditingServiceId(null);
                        setServiceForm({
                          id: "",
                          category: "ai",
                          iconName: "Bot",
                          title: "",
                          description: "",
                          pricingIn: "Starting at ₹50,000",
                          pricingIntl: "Starting at $4,500",
                          delivery: "3-4 Weeks",
                          techRaw: "React, TypeScript, Tailwind",
                          benefitsRaw: "Benefit 1\nBenefit 2\nBenefit 3",
                          useCase: "Describe target use case...",
                          order: services.length + 1
                        });
                        setIsServiceFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-brand-purple hover:bg-brand-violet text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                      Add Service
                    </button>
                  )}
                </div>

                {isServiceFormOpen ? (
                  <GlowingCard className="p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                      <h3 className="text-base font-extrabold text-white">
                        {editingServiceId ? `Edit Service: ${serviceForm.title}` : "Create Service Record"}
                      </h3>
                      <button
                        onClick={() => setIsServiceFormOpen(false)}
                        className="text-xs text-white/50 hover:text-white font-mono hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleServiceSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {!editingServiceId && (
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Unique ID (Slug)</label>
                            <input
                              type="text"
                              value={serviceForm.id}
                              onChange={(e) => setServiceForm({ ...serviceForm, id: e.target.value })}
                              placeholder="e.g. multi-agent-systems"
                              className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40 font-mono"
                              required
                            />
                          </div>
                        )}
                        <div className={editingServiceId ? "col-span-2" : ""}>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Service Title</label>
                          <input
                            type="text"
                            value={serviceForm.title}
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            placeholder="e.g. AI Agent Development"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/40"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Category</label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 [&>option]:bg-bg-black"
                          >
                            <option value="ai">AI Specialty (ai)</option>
                            <option value="fullstack">Full Stack Engineering (fullstack)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Lucide Icon Name</label>
                          <input
                            type="text"
                            value={serviceForm.iconName}
                            onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                            placeholder="e.g. Bot, Brain, Server, Zap"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Display Order Weight</label>
                          <input
                            type="number"
                            value={serviceForm.order}
                            onChange={(e) => setServiceForm({ ...serviceForm, order: Number(e.target.value) })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Indian Price (₹)</label>
                          <input
                            type="text"
                            value={serviceForm.pricingIn}
                            onChange={(e) => setServiceForm({ ...serviceForm, pricingIn: e.target.value })}
                            placeholder="Starting at ₹50,000"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">International Price ($)</label>
                          <input
                            type="text"
                            value={serviceForm.pricingIntl}
                            onChange={(e) => setServiceForm({ ...serviceForm, pricingIntl: e.target.value })}
                            placeholder="Starting at $4,500"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Delivery Timeframe</label>
                          <input
                            type="text"
                            value={serviceForm.delivery}
                            onChange={(e) => setServiceForm({ ...serviceForm, delivery: e.target.value })}
                            placeholder="e.g. 3-4 Weeks"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Brief Summary Description</label>
                        <textarea
                          rows={2}
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                          placeholder="Brief tagline description for mapping blocks..."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Technology Keywords (Comma Separated)</label>
                        <input
                          type="text"
                          value={serviceForm.techRaw}
                          onChange={(e) => setServiceForm({ ...serviceForm, techRaw: e.target.value })}
                          placeholder="LangGraph, FastApi, Python, Redis"
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Benefits List Checklist (One benefit per line)</label>
                        <textarea
                          rows={3}
                          value={serviceForm.benefitsRaw}
                          onChange={(e) => setServiceForm({ ...serviceForm, benefitsRaw: e.target.value })}
                          placeholder="Benefit item #1&#10;Benefit item #2&#10;Benefit item #3"
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Primary target Use Case example</label>
                        <textarea
                          rows={2}
                          value={serviceForm.useCase}
                          onChange={(e) => setServiceForm({ ...serviceForm, useCase: e.target.value })}
                          placeholder="e.g. Self-healing reconcilers that audit pipelines..."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>

                      {serviceSuccess && (
                        <div className="rounded border border-green-500/15 bg-green-500/5 p-3 text-center">
                          <span className="text-xs text-green-400 font-semibold">Service portfolio record saved!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {editingServiceId ? "Update Service Card" : "Publish Service Card"}
                      </button>
                    </form>
                  </GlowingCard>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                      <GlowingCard key={service.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold font-mono uppercase text-brand-purple tracking-wide">{service.category}</span>
                            <span className="text-[9px] font-bold font-mono uppercase text-brand-cyan tracking-wide">order: {service.order}</span>
                          </div>
                          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 mt-1">
                            <span className="font-mono text-xs text-white/40">[{service.iconName}]</span>
                            {service.title}
                          </h3>
                          <span className="block text-[10px] text-white/40 font-mono mt-0.5">slug: /{service.id}</span>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleEditService(service)}
                            className="flex h-9 px-4 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-xs font-bold text-white/70 hover:text-white transition-colors cursor-pointer gap-1.5"
                          >
                            <Edit3 className="h-4 w-4 text-brand-purple" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. HOMEPAGE & GLOBALS SITE EDITOR */}
            {activeTab === "site" && globalsForm && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wider font-mono">Dynamic Portal Content Editor</h2>
                    <p className="text-xs text-white/40 mt-1">Manage global texts, founder bios, and specializations stored in Firestore globals.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveGlobals} className="space-y-8">
                  {/* Hero Config */}
                  <GlowingCard className="p-6 space-y-4">
                    <h3 className="text-sm font-bold text-brand-cyan uppercase tracking-wider font-mono border-b border-white/5 pb-2">// Hero Config</h3>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Hero Badge Tagline</label>
                      <input
                        type="text"
                        value={globalsForm.hero.badge}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          hero: { ...globalsForm.hero, badge: e.target.value }
                        })}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Hero Headline Title (HTML tag support)</label>
                      <input
                        type="text"
                        value={globalsForm.hero.title}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          hero: { ...globalsForm.hero, title: e.target.value }
                        })}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono text-brand-cyan"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Hero Subtitle Paragraph</label>
                      <textarea
                        rows={3}
                        value={globalsForm.hero.subtitle}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          hero: { ...globalsForm.hero, subtitle: e.target.value }
                        })}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                        required
                      />
                    </div>
                  </GlowingCard>

                  {/* Founder Config */}
                  <GlowingCard className="p-6 space-y-4">
                    <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider font-mono border-b border-white/5 pb-2">// Founder Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Founder Name</label>
                        <input
                          type="text"
                          value={globalsForm.about.founderName}
                          onChange={(e) => setGlobalsForm({
                            ...globalsForm,
                            about: { ...globalsForm.about, founderName: e.target.value }
                          })}
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Founder Title Role</label>
                        <input
                          type="text"
                          value={globalsForm.about.founderTitle}
                          onChange={(e) => setGlobalsForm({
                            ...globalsForm,
                            about: { ...globalsForm.about, founderTitle: e.target.value }
                          })}
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Biography Paragraphs (Double New-lines separate paragraphs)</label>
                      <textarea
                        rows={6}
                        value={globalsForm.about.bio.join("\n\n")}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          about: {
                            ...globalsForm.about,
                            bio: e.target.value.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 0)
                          }
                        })}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-purple/40 font-mono leading-relaxed"
                        required
                      />
                    </div>
                  </GlowingCard>

                  {/* Trust Metrics */}
                  <GlowingCard className="p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/5 pb-2">// Trust KPI Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {globalsForm.trustMetrics.map((metric, idx) => (
                        <div key={idx} className="rounded-lg border border-white/5 bg-white/[0.01] p-3 space-y-2">
                          <span className="text-[8px] font-bold font-mono tracking-widest text-brand-cyan uppercase">Metric #{idx+1}</span>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) => {
                              const list = [...globalsForm.trustMetrics];
                              list[idx].value = e.target.value;
                              setGlobalsForm({ ...globalsForm, trustMetrics: list });
                            }}
                            placeholder="Value"
                            className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                            required
                          />
                          <input
                            type="text"
                            value={metric.label}
                            onChange={(e) => {
                              const list = [...globalsForm.trustMetrics];
                              list[idx].label = e.target.value;
                              setGlobalsForm({ ...globalsForm, trustMetrics: list });
                            }}
                            placeholder="Label text"
                            className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </GlowingCard>

                  {/* Specializations */}
                  <GlowingCard className="p-6 space-y-4">
                    <h3 className="text-sm font-bold text-brand-cyan uppercase tracking-wider font-mono border-b border-white/5 pb-2">// Specializations (Homepage)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {globalsForm.specializations.map((spec, idx) => (
                        <div key={idx} className="rounded-lg border border-white/5 bg-white/[0.01] p-4 space-y-3">
                          <span className="text-[8px] font-bold font-mono tracking-widest text-brand-purple uppercase">Spec #{idx+1}</span>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-white/40 mb-1">Lucide Icon Name</label>
                            <input
                              type="text"
                              value={spec.iconName}
                              onChange={(e) => {
                                const list = [...globalsForm.specializations];
                                list[idx].iconName = e.target.value;
                                setGlobalsForm({ ...globalsForm, specializations: list });
                              }}
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-white/40 mb-1">Title</label>
                            <input
                              type="text"
                              value={spec.title}
                              onChange={(e) => {
                                const list = [...globalsForm.specializations];
                                list[idx].title = e.target.value;
                                setGlobalsForm({ ...globalsForm, specializations: list });
                              }}
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-white/40 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={spec.description}
                              onChange={(e) => {
                                const list = [...globalsForm.specializations];
                                list[idx].description = e.target.value;
                                setGlobalsForm({ ...globalsForm, specializations: list });
                              }}
                              className="w-full bg-white/[0.02] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white resize-none"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlowingCard>

                  {siteSuccess && (
                    <div className="rounded border border-green-500/15 bg-green-500/5 p-3.5 text-center">
                      <span className="text-xs text-green-400 font-semibold">Global portal site configurations saved successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={siteSaving}
                    className="w-full neon-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50 cursor-pointer"
                  >
                    {siteSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving configurations...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Publish Site Configurations
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* 5. SYSTEM SETTINGS / SEEDING */}
            {activeTab === "settings" && (
              <div className="max-w-2xl mx-auto space-y-6">
                <GlowingCard className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 flex items-center gap-2">
                    <Database className="h-5 w-5 text-brand-purple" />
                    Firestore Seeding & Setup
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">
                    Connects a freshly configured Firestore database to seed default agency templates. If your Firestore database is empty, clicking the seeding trigger will insert the default mock data, preventing empty page displays.
                  </p>

                  <div className="border border-white/5 rounded-xl bg-white/[0.01] p-4 mb-2 space-y-3 font-mono text-[11px] text-white/60">
                    <div className="flex justify-between">
                      <span>Firebase Mode:</span>
                      <span>{isFirebaseConfigured ? <span className="text-green-400 font-bold">Cloud Production</span> : <span className="text-brand-cyan font-bold">Mock Local Fallback</span>}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2">
                      <span>Firestore Collection (projects):</span>
                      <span>{projects.length} docs loaded</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2">
                      <span>Firestore Collection (blogs):</span>
                      <span>{blogs.length} docs loaded</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2">
                      <span>Firestore Collection (inquiries):</span>
                      <span>{inquiries.length} docs loaded</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-6 flex flex-col gap-4">
                    <button
                      onClick={handleSeedDatabase}
                      disabled={seedingLoading}
                      className="neon-btn w-fit inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      {seedingLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Seeding...
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4" />
                          Seed Firestore Database
                        </>
                      )}
                    </button>

                    {seedingMessage && (
                      <div className={`rounded-lg border p-3.5 text-[11px] font-mono leading-relaxed transition-all ${
                        seedingMessage.toLowerCase().includes("error") || seedingMessage.toLowerCase().includes("failed")
                          ? "border-red-500/15 bg-red-500/5 text-red-400"
                          : seedingMessage.toLowerCase().includes("success")
                          ? "border-green-500/15 bg-green-500/5 text-green-400"
                          : "border-white/5 bg-white/[0.01] text-white/50"
                      }`}>
                        {seedingMessage}
                      </div>
                    )}
                  </div>
                </GlowingCard>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
