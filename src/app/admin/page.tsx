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
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  DollarSign
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
    pricingIn: "Starting at ₹50,000",
    pricingIntl: "Starting at $2,500",
    delivery: "2-4 Weeks",
    techRaw: "Python, FastAPI, LangGraph, OpenAI, Claude",
    benefitsRaw: "Custom Agent Workflows\nEnterprise Security\nContinuous Optimization",
    useCase: "Autonomous business workflows and intelligent data extraction...",
    order: 1
  });
  const [serviceSuccess, setServiceSuccess] = useState(false);

  // Edit / Add States for Blogs
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "AI Development",
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
    category: "AI Development",
    description: "",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    techStackRaw: "Next.js, TypeScript, LangGraph, FastAPI, PostgreSQL",
    metric1Label: "Performance Gain",
    metric1Value: "4x Faster",
    metric2Label: "Accuracy Rate",
    metric2Value: "99.2%",
    metric3Label: "Delivery Speed",
    metric3Value: "3 Weeks",
    problem: "",
    solution: "",
    resultsRaw: "Automated manual data processing\nReduced response time to under 2 seconds\nScaled reliably across client infrastructure",
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
          setError("Setup Required: Email/Password sign-in provider is disabled in your Firebase console. Please enable Email/Password under Authentication.");
        } else if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
          setError("Invalid credentials. Please verify your email and password.");
        } else {
          setError(err.message || "Invalid authentication credentials.");
        }
      } finally {
        setLoginSubmitting(false);
      }
    } else {
      if (password === adminPassword) {
        setIsAuthenticated(true);
        localStorage.setItem("unifiedstack_admin_auth", "true");
      } else {
        setError("Invalid administrator password.");
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

      loadAdminData();

      setBlogForm({
        title: "",
        category: "AI Development",
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
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteBlog(id);
      loadAdminData();
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  // Project Submits
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      loadAdminData();

      setProjectForm({
        id: "",
        title: "",
        category: "AI Development",
        description: "",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        techStackRaw: "Next.js, TypeScript, LangGraph, FastAPI, PostgreSQL",
        metric1Label: "Performance Gain",
        metric1Value: "4x Faster",
        metric2Label: "Accuracy Rate",
        metric2Value: "99.2%",
        metric3Label: "Delivery Speed",
        metric3Value: "3 Weeks",
        problem: "",
        solution: "",
        resultsRaw: "Automated manual data processing\nReduced response time to under 2 seconds\nScaled reliably across client infrastructure",
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
      metric1Label: project.metrics[0]?.label || "Performance Gain",
      metric1Value: project.metrics[0]?.value || "4x Faster",
      metric2Label: project.metrics[1]?.label || "Accuracy Rate",
      metric2Value: project.metrics[1]?.value || "99.2%",
      metric3Label: project.metrics[2]?.label || "Delivery Speed",
      metric3Value: project.metrics[2]?.value || "3 Weeks",
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
    if (!confirm("Are you sure you want to delete this project?")) return;
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
    if (!confirm("Are you sure you want to delete this service?")) return;
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
      if (inq.budget.includes("20,000 - ₹50,000")) return acc + 400;
      if (inq.budget.includes("50,000 - ₹60,000")) return acc + 650;
      if (inq.budget.includes("60,000+")) return acc + 1200;
      return acc + 150;
    }
    if (inq.budget.includes("$3,000 - $5,000")) return acc + 4000;
    if (inq.budget.includes("$5,000 - $10,000")) return acc + 7500;
    if (inq.budget.includes("$10,000+")) return acc + 15000;
    return acc + 1500;
  }, 0);

  const budgetBreakdown = inquiries.reduce((acc: Record<string, number>, inq) => {
    acc[inq.budget] = (acc[inq.budget] || 0) + 1;
    return acc;
  }, {});

  const serviceBreakdown = inquiries.reduce((acc: Record<string, number>, inq) => {
    acc[inq.service] = (acc[inq.service] || 0) + 1;
    return acc;
  }, {});

  // Loading Overlay
  if (authLoading) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center font-sans text-sm text-slate-500 bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
        Verifying administrator session...
      </div>
    );
  }

  // 1. Secure administrator login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50/60 text-slate-900 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xs leading-relaxed">
              Sign in to manage client leads, projects, articles, and agency services.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="mohdhuzaifa8126195456@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="passcode" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="passcode"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans transition-colors"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <span className="text-xs text-red-700 leading-relaxed font-sans">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loginSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="border-t border-slate-100 pt-4 text-center">
              <span className="block text-xs text-slate-500">
                Database Status: {isFirebaseConfigured ? <span className="text-emerald-600 font-semibold">Firebase Connected</span> : <span className="text-blue-600 font-semibold">Local Storage Mode</span>}
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard Layout
  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-slate-50/40 text-slate-900 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Agency Management</span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Briefcase className="h-7 w-7 text-blue-600" />
              UnifiedStack Admin Dashboard
            </h1>
            <span className="block text-xs text-slate-500 mt-1">
              Logged in as: <span className="text-slate-800 font-medium">mohdhuzaifa8126195456@gmail.com</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadAdminData}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Refresh dashboard data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
          <button
            onClick={() => { setActiveTab("leads"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "leads"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Client Leads ({inquiries.length})
          </button>

          <button
            onClick={() => { setActiveTab("projects"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Projects ({projects.length})
          </button>

          <button
            onClick={() => { setActiveTab("blogs"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "blogs"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Articles ({blogs.length})
          </button>

          <button
            onClick={() => { setActiveTab("services"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Services ({services.length})
          </button>

          <button
            onClick={() => { setActiveTab("site"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "site"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Website Settings
          </button>

          <button
            onClick={() => { setActiveTab("analytics"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Analytics
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setIsBlogFormOpen(false); setIsProjectFormOpen(false); setIsServiceFormOpen(false); }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Database & System
          </button>
        </div>

        {/* Global Loading State */}
        {loading && activeTab !== "settings" ? (
          <div className="flex flex-col items-center justify-center py-28 text-slate-500 font-sans text-sm">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 mb-2" />
            Loading dashboard data...
          </div>
        ) : (
          <div>
            {/* 1. LEADS INBOX */}
            {activeTab === "leads" && (
              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <div className="text-center py-20 border border-slate-200 rounded-2xl bg-white text-slate-500 text-sm">
                    No client inquiries received yet. When visitors submit contact forms, they will appear here.
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className="p-6 relative group rounded-2xl border border-slate-200 bg-white">
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteInquiry(inq.id || "")}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                          title="Delete Lead record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-4 mb-4 gap-3 pr-10">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 tracking-tight">{inq.name}</h3>
                          <span className="text-xs text-slate-500 font-sans block mt-0.5">{inq.company || "Independent client"}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className="rounded-md bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                            {inq.service}
                          </span>
                          <span className="rounded-md bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            {inq.budget}
                          </span>

                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id || "", e.target.value as any)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer ${
                              inq.status === "New" ? "border-amber-300 text-amber-800 bg-amber-50" :
                              inq.status === "In Discussion" ? "border-blue-300 text-blue-800 bg-blue-50" :
                              "border-emerald-300 text-emerald-800 bg-emerald-50"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap font-sans">
                        {inq.message}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 gap-2">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-blue-600" />
                          <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline font-medium">{inq.email}</a>
                        </span>
                        <span>Received: {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : "Recently"}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. MANAGE PROJECTS */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Projects Portfolio</h2>
                    <p className="text-xs text-slate-500">Showcase your agency's best work, case studies, and live deliverables.</p>
                  </div>
                  
                  {!isProjectFormOpen && (
                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          id: "",
                          title: "",
                          category: "AI Development",
                          description: "",
                          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                          techStackRaw: "Next.js, TypeScript, LangGraph, FastAPI, PostgreSQL",
                          metric1Label: "Performance Gain",
                          metric1Value: "4x Faster",
                          metric2Label: "Accuracy Rate",
                          metric2Value: "99.2%",
                          metric3Label: "Delivery Speed",
                          metric3Value: "3 Weeks",
                          problem: "",
                          solution: "",
                          resultsRaw: "Automated manual data processing\nReduced response time to under 2 seconds\nScaled reliably across client infrastructure",
                          architecturalOverview: "",
                          playStoreLink: "",
                          githubLink: ""
                        });
                        setIsProjectFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Project
                    </button>
                  )}
                </div>

                {isProjectFormOpen ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h3 className="text-base font-bold text-slate-900">
                        {editingProjectId ? `Edit Project: ${projectForm.title}` : "Add New Client Project"}
                      </h3>
                      <button
                        onClick={() => setIsProjectFormOpen(false)}
                        className="text-xs text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleProjectSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {!editingProjectId && (
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project ID (URL Slug)</label>
                            <input
                              type="text"
                              value={projectForm.id}
                              onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                              placeholder="e.g. enterprise-agentic-ai-platform"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans"
                              required
                            />
                          </div>
                        )}
                        <div className={editingProjectId ? "col-span-2" : ""}>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Title</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. Enterprise RAG Pipeline & Multi-Agent Assistant"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Core Discipline Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          >
                            <option value="AI Development">AI Development (Agentic AI, RAG, Fine-Tuning)</option>
                            <option value="Web Development">Web Development (Full-Stack & Next.js)</option>
                            <option value="Mobile App Development">Mobile App Development (React Native & Cross-Platform)</option>
                            <option value="Backend Development">Backend Development (APIs & Microservices)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cover Image URL</label>
                          <input
                            type="text"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Short Overview Summary</label>
                        <textarea
                          rows={2}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="A high-performance autonomous workflow assistant developed for client enterprise operations..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Technology Stack (Comma Separated)</label>
                        <input
                          type="text"
                          value={projectForm.techStackRaw}
                          onChange={(e) => setProjectForm({ ...projectForm, techStackRaw: e.target.value })}
                          placeholder="React, TypeScript, FastAPI, PostgreSQL, LangGraph"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      {/* Metrics Inputs */}
                      <div className="border-t border-slate-100 pt-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Key Results & Metrics (3 Highlights)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-2">
                            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">Metric #1</span>
                            <input
                              type="text"
                              value={projectForm.metric1Value}
                              onChange={(e) => setProjectForm({ ...projectForm, metric1Value: e.target.value })}
                              placeholder="e.g. 4x Faster"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium"
                              required
                            />
                            <input
                              type="text"
                              value={projectForm.metric1Label}
                              onChange={(e) => setProjectForm({ ...projectForm, metric1Label: e.target.value })}
                              placeholder="e.g. Processing Speed"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                              required
                            />
                          </div>
                          
                          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-2">
                            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">Metric #2</span>
                            <input
                              type="text"
                              value={projectForm.metric2Value}
                              onChange={(e) => setProjectForm({ ...projectForm, metric2Value: e.target.value })}
                              placeholder="e.g. 99.2%"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium"
                              required
                            />
                            <input
                              type="text"
                              value={projectForm.metric2Label}
                              onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                              placeholder="e.g. Match Accuracy"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                              required
                            />
                          </div>

                          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-2">
                            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">Metric #3</span>
                            <input
                              type="text"
                              value={projectForm.metric3Value}
                              onChange={(e) => setProjectForm({ ...projectForm, metric3Value: e.target.value })}
                              placeholder="e.g. 3 Weeks"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium"
                              required
                            />
                            <input
                              type="text"
                              value={projectForm.metric3Label}
                              onChange={(e) => setProjectForm({ ...projectForm, metric3Label: e.target.value })}
                              placeholder="e.g. Delivery Time"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Problem & Solution */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Client Problem & Challenge</label>
                          <textarea
                            rows={3}
                            value={projectForm.problem}
                            onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                            placeholder="The client was struggling with repetitive manual document classification..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Engineered Agency Solution</label>
                          <textarea
                            rows={3}
                            value={projectForm.solution}
                            onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                            placeholder="We designed and deployed an end-to-end RAG architecture with verification layers..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Delivered Results (One Result per Line)</label>
                        <textarea
                          rows={3}
                          value={projectForm.resultsRaw}
                          onChange={(e) => setProjectForm({ ...projectForm, resultsRaw: e.target.value })}
                          placeholder="Saved client team 30+ hours weekly&#10;Zero critical system failures&#10;Integrated seamless dashboard"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Optional Deliverable Links</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">Architecture Summary</label>
                            <input
                              type="text"
                              value={projectForm.architecturalOverview}
                              onChange={(e) => setProjectForm({ ...projectForm, architecturalOverview: e.target.value })}
                              placeholder="e.g. Next.js App Router + FastAPI Microservices"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">Play Store / App Store Link</label>
                            <input
                              type="text"
                              value={projectForm.playStoreLink}
                              onChange={(e) => setProjectForm({ ...projectForm, playStoreLink: e.target.value })}
                              placeholder="e.g. https://play.google.com/..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">GitHub Repository Link</label>
                            <input
                              type="text"
                              value={projectForm.githubLink}
                              onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                              placeholder="e.g. https://github.com/..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      {projectSuccess && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                          <span className="text-xs text-emerald-700 font-semibold">Project saved successfully!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {editingProjectId ? "Update Project" : "Publish Project"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0 hidden sm:block">
                            <img src={proj.image} alt={proj.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase text-blue-600 tracking-wider">{proj.category}</span>
                            <h3 className="text-base font-bold text-slate-900 tracking-tight">{proj.title}</h3>
                            <span className="block text-xs text-slate-500 font-sans mt-0.5">slug: /{proj.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-slate-100 md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="flex h-9 px-4 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer gap-1.5"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-blue-600" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. MANAGE BLOGS / ARTICLES */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Articles & Engineering Insights</h2>
                    <p className="text-xs text-slate-500">Publish guides, case stories, and technical breakdowns to demonstrate expertise.</p>
                  </div>
                  
                  {!isBlogFormOpen && (
                    <button
                      onClick={() => {
                        setEditingBlogId(null);
                        setBlogForm({
                          title: "",
                          category: "AI Development",
                          excerpt: "",
                          content: "",
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                          author: "Mohd Huzaifa",
                          readTime: "5 min read",
                        });
                        setIsBlogFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Write Article
                    </button>
                  )}
                </div>

                {isBlogFormOpen ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h3 className="text-base font-bold text-slate-900">
                        {editingBlogId ? `Edit Article: ${blogForm.title}` : "Write New Technical Article"}
                      </h3>
                      <button
                        onClick={() => setIsBlogFormOpen(false)}
                        className="text-xs text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="title" className="block text-xs font-semibold text-slate-700 mb-1.5">Article Title</label>
                        <input
                          type="text"
                          id="title"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          placeholder="e.g. Building Production-Ready Agentic AI Systems in 2025"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="category" className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                          <select
                            id="category"
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          >
                            <option value="AI Development">AI Development</option>
                            <option value="Agentic AI & RAG">Agentic AI & RAG</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Backend Engineering">Backend Engineering</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="readTime" className="block text-xs font-semibold text-slate-700 mb-1.5">Estimated Reading Time</label>
                          <input
                            type="text"
                            id="readTime"
                            value={blogForm.readTime}
                            onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                            placeholder="e.g. 5 min read"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="image" className="block text-xs font-semibold text-slate-700 mb-1.5">Cover Image URL</label>
                          <input
                            type="text"
                            id="image"
                            value={blogForm.image}
                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="excerpt" className="block text-xs font-semibold text-slate-700 mb-1.5">Summary Excerpt</label>
                        <input
                          type="text"
                          id="excerpt"
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          placeholder="Brief summary paragraph displayed on blog listing cards..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="content" className="block text-xs font-semibold text-slate-700 mb-1.5">Markdown Content Body</label>
                        <textarea
                          id="content"
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          rows={12}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans resize-none leading-relaxed"
                          placeholder="# Main Heading&#10;&#10;Write your article here in standard Markdown format..."
                          required
                        />
                      </div>

                      {blogSuccess && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                          <span className="text-xs text-emerald-700 font-semibold">Article published successfully!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {editingBlogId ? "Update Article" : "Publish Article"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0 hidden sm:block">
                            <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase text-blue-600 tracking-wider">{blog.category}</span>
                            <h3 className="text-base font-bold text-slate-900 tracking-tight">{blog.title}</h3>
                            <span className="block text-xs text-slate-500 font-sans mt-0.5">Published: {blog.publishedAt} | {blog.readTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-slate-100 md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="flex h-9 px-4 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer gap-1.5"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-blue-600" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. MANAGE SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Agency Services</h2>
                    <p className="text-xs text-slate-500">Manage the 4 core disciplines: Web, Mobile, AI, and Backend Development.</p>
                  </div>
                  
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
                          pricingIntl: "Starting at $2,500",
                          delivery: "2-4 Weeks",
                          techRaw: "Python, FastAPI, LangGraph, OpenAI, Claude",
                          benefitsRaw: "Custom Agent Workflows\nEnterprise Security\nContinuous Optimization",
                          useCase: "Autonomous business workflows and intelligent data extraction...",
                          order: services.length + 1
                        });
                        setIsServiceFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Service
                    </button>
                  )}
                </div>

                {isServiceFormOpen ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h3 className="text-base font-bold text-slate-900">
                        {editingServiceId ? `Edit Service: ${serviceForm.title}` : "Create Agency Service"}
                      </h3>
                      <button
                        onClick={() => setIsServiceFormOpen(false)}
                        className="text-xs text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleServiceSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {!editingServiceId && (
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service ID (URL Slug)</label>
                            <input
                              type="text"
                              value={serviceForm.id}
                              onChange={(e) => setServiceForm({ ...serviceForm, id: e.target.value })}
                              placeholder="e.g. ai-development"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                              required
                            />
                          </div>
                        )}
                        <div className={editingServiceId ? "col-span-2" : ""}>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Title</label>
                          <input
                            type="text"
                            value={serviceForm.title}
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            placeholder="e.g. AI Development"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Discipline Category</label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          >
                            <option value="ai">AI Development (Agentic AI, RAG, Fine-tuning)</option>
                            <option value="web">Web Development (Full-Stack Next.js)</option>
                            <option value="mobile">Mobile App Development (React Native & Mobile)</option>
                            <option value="backend">Backend Development (APIs & Microservices)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Icon Name (Bot, Globe, Smartphone, Server)</label>
                          <input
                            type="text"
                            value={serviceForm.iconName}
                            onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                            placeholder="e.g. Bot"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Display Order Position</label>
                          <input
                            type="number"
                            value={serviceForm.order}
                            onChange={(e) => setServiceForm({ ...serviceForm, order: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Indian Price Tier (₹)</label>
                          <input
                            type="text"
                            value={serviceForm.pricingIn}
                            onChange={(e) => setServiceForm({ ...serviceForm, pricingIn: e.target.value })}
                            placeholder="Starting at ₹50,000"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">International Price Tier ($)</label>
                          <input
                            type="text"
                            value={serviceForm.pricingIntl}
                            onChange={(e) => setServiceForm({ ...serviceForm, pricingIntl: e.target.value })}
                            placeholder="Starting at $2,500"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Delivery Timeframe</label>
                          <input
                            type="text"
                            value={serviceForm.delivery}
                            onChange={(e) => setServiceForm({ ...serviceForm, delivery: e.target.value })}
                            placeholder="e.g. 2-4 Weeks"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Summary Description</label>
                        <textarea
                          rows={2}
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                          placeholder="Autonomous agent workflows, enterprise RAG pipelines, model fine-tuning, and automated tool integrations..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Technologies Used (Comma Separated)</label>
                        <input
                          type="text"
                          value={serviceForm.techRaw}
                          onChange={(e) => setServiceForm({ ...serviceForm, techRaw: e.target.value })}
                          placeholder="Python, FastAPI, LangGraph, OpenAI, Claude, Vector DBs"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Key Deliverable Highlights (One per line)</label>
                        <textarea
                          rows={3}
                          value={serviceForm.benefitsRaw}
                          onChange={(e) => setServiceForm({ ...serviceForm, benefitsRaw: e.target.value })}
                          placeholder="Autonomous multi-step agent reasoning&#10;Private RAG vector database indexing&#10;Enterprise guardrails and hallucination checks"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Real-World Client Application</label>
                        <textarea
                          rows={2}
                          value={serviceForm.useCase}
                          onChange={(e) => setServiceForm({ ...serviceForm, useCase: e.target.value })}
                          placeholder="Custom customer support copilots, research document synthesizers, automated ticket resolution..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          required
                        />
                      </div>

                      {serviceSuccess && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                          <span className="text-xs text-emerald-700 font-semibold">Service saved successfully!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {editingServiceId ? "Update Service" : "Publish Service"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((service) => (
                      <div key={service.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase text-blue-600 tracking-wider">{service.category}</span>
                            <span className="text-[10px] font-semibold uppercase text-slate-400">Order: {service.order}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 font-medium">[{service.iconName}]</span>
                            {service.title}
                          </h3>
                          <span className="block text-xs text-slate-500 font-sans mt-0.5">
                            {service.pricing.in} / {service.pricing.intl} • Delivery: {service.delivery}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-slate-100 md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleEditService(service)}
                            className="flex h-9 px-4 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer gap-1.5"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-blue-600" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete service"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. HOMEPAGE & GLOBALS SITE EDITOR */}
            {activeTab === "site" && globalsForm && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Website Settings & Content</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Update homepage headlines, founder & leadership bios, trust metrics, and featured specializations.</p>
                </div>

                <form onSubmit={handleSaveGlobals} className="space-y-6">
                  {/* Hero Config */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Hero Section Settings</h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hero Pill Badge</label>
                      <input
                        type="text"
                        value={globalsForm.hero.badge}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          hero: { ...globalsForm.hero, badge: e.target.value }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hero Headline Title (HTML markup allowed)</label>
                      <input
                        type="text"
                        value={globalsForm.hero.title}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          hero: { ...globalsForm.hero, title: e.target.value }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hero Subtitle Paragraph</label>
                      <textarea
                        rows={3}
                        value={globalsForm.hero.subtitle}
                        onChange={(e) => setGlobalsForm({
                          ...globalsForm,
                          hero: { ...globalsForm.hero, subtitle: e.target.value }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans leading-relaxed"
                        required
                      />
                    </div>
                  </div>

                  {/* Leadership Profiles */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Agency Leadership Profiles</h3>
                    
                    {/* Founder Profile */}
                    <div className="space-y-4 border-b border-slate-100 pb-6">
                      <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">1. Founder Profile</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Founder Name</label>
                          <input
                            type="text"
                            value={globalsForm.about.founderName}
                            onChange={(e) => setGlobalsForm({
                              ...globalsForm,
                              about: { ...globalsForm.about, founderName: e.target.value }
                            })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Founder Title</label>
                          <input
                            type="text"
                            value={globalsForm.about.founderTitle}
                            onChange={(e) => setGlobalsForm({
                              ...globalsForm,
                              about: { ...globalsForm.about, founderTitle: e.target.value }
                            })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Founder Biography (Double line breaks separate paragraphs)</label>
                        <textarea
                          rows={4}
                          value={globalsForm.about.bio.join("\n\n")}
                          onChange={(e) => setGlobalsForm({
                            ...globalsForm,
                            about: {
                              ...globalsForm.about,
                              bio: e.target.value.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 0)
                            }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans leading-relaxed"
                          required
                        />
                      </div>
                    </div>

                    {/* Co-Founder Profile */}
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">2. Co-Founder Profile</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Co-Founder Name</label>
                          <input
                            type="text"
                            value={globalsForm.about.coFounderName || ""}
                            onChange={(e) => setGlobalsForm({
                              ...globalsForm,
                              about: { ...globalsForm.about, coFounderName: e.target.value }
                            })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Co-Founder Title</label>
                          <input
                            type="text"
                            value={globalsForm.about.coFounderTitle || ""}
                            onChange={(e) => setGlobalsForm({
                              ...globalsForm,
                              about: { ...globalsForm.about, coFounderTitle: e.target.value }
                            })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Co-Founder Biography (Double line breaks separate paragraphs)</label>
                        <textarea
                          rows={4}
                          value={(globalsForm.about.coFounderBio || []).join("\n\n")}
                          onChange={(e) => setGlobalsForm({
                            ...globalsForm,
                            about: {
                              ...globalsForm.about,
                              coFounderBio: e.target.value.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 0)
                            }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-sans leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trust Metrics */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Trust Metrics (Displayed on Homepage)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      {globalsForm.trustMetrics.map((metric, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2">
                          <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">Metric #{idx+1}</span>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) => {
                              const list = [...globalsForm.trustMetrics];
                              list[idx].value = e.target.value;
                              setGlobalsForm({ ...globalsForm, trustMetrics: list });
                            }}
                            placeholder="Value"
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-bold"
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
                            placeholder="Label"
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Core Specializations (Homepage Grid)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {globalsForm.specializations.map((spec, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                          <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">Feature #{idx+1}</span>
                          <div>
                            <label className="block text-[10px] font-semibold uppercase text-slate-600 mb-1">Icon Name</label>
                            <input
                              type="text"
                              value={spec.iconName}
                              onChange={(e) => {
                                const list = [...globalsForm.specializations];
                                list[idx].iconName = e.target.value;
                                setGlobalsForm({ ...globalsForm, specializations: list });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold uppercase text-slate-600 mb-1">Title</label>
                            <input
                              type="text"
                              value={spec.title}
                              onChange={(e) => {
                                const list = [...globalsForm.specializations];
                                list[idx].title = e.target.value;
                                setGlobalsForm({ ...globalsForm, specializations: list });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-semibold"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold uppercase text-slate-600 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={spec.description}
                              onChange={(e) => {
                                const list = [...globalsForm.specializations];
                                list[idx].description = e.target.value;
                                setGlobalsForm({ ...globalsForm, specializations: list });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 resize-none leading-relaxed"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {siteSuccess && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                      <span className="text-xs text-emerald-700 font-semibold">Website configurations saved successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={siteSaving}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {siteSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving Configurations...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save Website Settings
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* 6. ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pipeline Value</span>
                    <span className="block mt-2 text-3xl font-extrabold text-slate-900">${totalValue.toLocaleString()}</span>
                    <span className="block text-xs text-slate-400 mt-1">Estimated from selected client budgets</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inbound Leads</span>
                    <span className="block mt-2 text-3xl font-extrabold text-blue-600">{inquiries.length}</span>
                    <span className="block text-xs text-slate-400 mt-1">Total inquiries received</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Published Content</span>
                    <span className="block mt-2 text-3xl font-extrabold text-emerald-600">{blogs.length}</span>
                    <span className="block text-xs text-slate-400 mt-1">Active published articles</span>
                  </div>
                </div>

                {/* Distributions */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Inquiries by Requested Service
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(serviceBreakdown).length === 0 ? (
                        <span className="text-xs text-slate-400 italic">No inquiries received yet.</span>
                      ) : (
                        Object.entries(serviceBreakdown).map(([service, count]) => {
                          const percentage = Math.round((count / inquiries.length) * 100);
                          return (
                            <div key={service} className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs text-slate-700">
                                <span className="font-medium">{service}</span>
                                <span className="font-semibold text-slate-900">{count} ({percentage}%)</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div style={{ width: `${percentage}%` }} className="h-full rounded-full bg-blue-600" />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Inquiries by Budget Tier
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(budgetBreakdown).length === 0 ? (
                        <span className="text-xs text-slate-400 italic">No budget information available yet.</span>
                      ) : (
                        Object.entries(budgetBreakdown).map(([budget, count]) => {
                          const percentage = Math.round((count / inquiries.length) * 100);
                          return (
                            <div key={budget} className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs text-slate-700">
                                <span className="font-medium">{budget}</span>
                                <span className="font-semibold text-slate-900">{count} ({percentage}%)</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div style={{ width: `${percentage}%` }} className="h-full rounded-full bg-emerald-600" />
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

            {/* 7. DATABASE & SYSTEM SETTINGS */}
            {activeTab === "settings" && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    Firestore Database & System
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Manage your live cloud database connection. If your Firestore collections are empty or need default agency data, you can trigger database seeding from here.
                  </p>

                  <div className="border border-slate-200 rounded-xl bg-slate-50/60 p-4 mb-4 space-y-2.5 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Firebase Connection:</span>
                      <span>{isFirebaseConfigured ? <span className="text-emerald-600 font-semibold">Live Cloud Production</span> : <span className="text-blue-600 font-semibold">Local Fallback</span>}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/80 pt-2">
                      <span className="font-medium">Projects in Database:</span>
                      <span className="font-semibold text-slate-900">{projects.length} documents</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/80 pt-2">
                      <span className="font-medium">Articles in Database:</span>
                      <span className="font-semibold text-slate-900">{blogs.length} documents</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/80 pt-2">
                      <span className="font-medium">Services in Database:</span>
                      <span className="font-semibold text-slate-900">{services.length} documents</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/80 pt-2">
                      <span className="font-medium">Client Inquiries:</span>
                      <span className="font-semibold text-slate-900">{inquiries.length} inquiries</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-6 flex flex-col gap-4">
                    <button
                      onClick={handleSeedDatabase}
                      disabled={seedingLoading}
                      className="w-fit inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {seedingLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Seeding Database...
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4" />
                          Seed Firestore Database
                        </>
                      )}
                    </button>

                    {seedingMessage && (
                      <div className={`rounded-xl border p-3.5 text-xs leading-relaxed transition-all ${
                        seedingMessage.toLowerCase().includes("error") || seedingMessage.toLowerCase().includes("failed")
                          ? "border-red-200 bg-red-50 text-red-700"
                          : seedingMessage.toLowerCase().includes("success")
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}>
                        {seedingMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
