import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc
} from "firebase/firestore";

// Environment variables configuration fallback
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase credentials are fully configured
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain
);

// Initialize Firebase
const app = isFirebaseConfigured
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

// ==========================================
// STATIC/MOCK DATABASE FOR STANDALONE RUNS
// ==========================================

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  results: string[];
  architecturalOverview?: string;
  playStoreLink?: string;
  githubLink?: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  readTime: string;
  publishedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: "New" | "In Discussion" | "Closed";
  createdAt: string;
}

export interface Service {
  id: string;
  category: string;
  iconName: string;
  title: string;
  description: string;
  pricing: {
    in: string;
    intl: string;
  };
  delivery: string;
  tech: string[];
  benefits: string[];
  useCase: string;
  order: number;
}

export interface Globals {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  trustMetrics: { value: string; label: string }[];
  specializations: { iconName: string; title: string; description: string }[];
  techStack: {
    frontend: { name: string; icon: string }[];
    backend: { name: string; icon: string }[];
    ai: { name: string; icon: string }[];
    cloud: { name: string; icon: string }[];
  };
  processFlow: { step: string; name: string; desc: string }[];
  about: {
    founderName: string;
    founderTitle: string;
    founderSubtitle: string;
    bio: string[];
    philosophies: { title: string; desc: string }[];
    skillCategories: { title: string; skills: string[] }[];
    journeyTimeline: { date: string; title: string; company: string; desc: string }[];
  };
  aiSolutions: {
    agents: { title: string; tagline: string; desc: string; frameworks: string[]; steps: { label: string; desc: string }[]; metrics: string[] };
    rag: { title: string; tagline: string; desc: string; frameworks: string[]; steps: { label: string; desc: string }[]; metrics: string[] };
    finetuning: { title: string; tagline: string; desc: string; frameworks: string[]; steps: { label: string; desc: string }[]; metrics: string[] };
  };
}

// Static mockup data removed from codebase to run purely dynamically on Cloud Firestore.

// ==========================================
// HYBRID DATABASE INTERACTION API
// ==========================================

export async function submitInquiry(data: Omit<Inquiry, "status" | "createdAt">): Promise<{ success: boolean; id: string }> {
  const inquiryData: Inquiry = {
    ...data,
    status: "New",
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, "inquiries"), inquiryData);
      return { success: true, id: docRef.id };
    } catch (e) {
      console.error("Firebase submit error, falling back: ", e);
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_inquiries");
  const inquiries = existing ? JSON.parse(existing) : [];
  const id = `inq_${Math.random().toString(36).substr(2, 9)}`;
  inquiries.push({ ...inquiryData, id });
  localStorage.setItem("unifiedstack_inquiries", JSON.stringify(inquiries));
  return { success: true, id };
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const inquiries: Inquiry[] = [];
      querySnapshot.forEach((doc) => {
        inquiries.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      return inquiries;
    } catch (e) {
      console.error("Firebase read error, falling back: ", e);
    }
  }

  const existing = localStorage.getItem("unifiedstack_inquiries");
  return existing ? JSON.parse(existing) : [];
}

export async function updateInquiryStatus(id: string, status: "New" | "In Discussion" | "Closed"): Promise<{ success: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "inquiries", id);
      await updateDoc(docRef, { status });
      return { success: true };
    } catch (e) {
      console.error("Firebase update inquiry status error, falling back: ", e);
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_inquiries");
  if (existing) {
    const inquiries = JSON.parse(existing);
    const idx = inquiries.findIndex((inq: any) => inq.id === id);
    if (idx > -1) {
      inquiries[idx].status = status;
      localStorage.setItem("unifiedstack_inquiries", JSON.stringify(inquiries));
    }
  }
  return { success: true };
}

export async function deleteInquiry(id: string): Promise<{ success: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "inquiries", id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (e) {
      console.error("Firebase delete inquiry error, falling back: ", e);
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_inquiries");
  if (existing) {
    const inquiries = JSON.parse(existing);
    const filtered = inquiries.filter((inq: any) => inq.id !== id);
    localStorage.setItem("unifiedstack_inquiries", JSON.stringify(filtered));
  }
  return { success: true };
}

export async function getBlogs(): Promise<Blog[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "blogs"), orderBy("publishedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const blogs: Blog[] = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() } as Blog);
      });
      return blogs;
    } catch (e) {
      console.error("Firebase read error for blogs, falling back: ", e);
    }
  }

  const local = localStorage.getItem("unifiedstack_blogs");
  return local ? JSON.parse(local) : [];
}

export async function getBlogById(id: string): Promise<Blog | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Blog;
      }
    } catch (e) {
      console.error("Firebase read error by id for blogs, falling back: ", e);
    }
  }

  const blogs = await getBlogs();
  return blogs.find((b) => b.id === id) || null;
}

export async function saveBlog(blog: Blog): Promise<{ success: boolean; id: string }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "blogs", blog.id);
      await setDoc(docRef, blog);
      return { success: true, id: blog.id };
    } catch (e) {
      console.error("Firebase save blog error: ", e);
      throw e;
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_blogs");
  const blogs = existing ? JSON.parse(existing) : [];
  const idx = blogs.findIndex((b: any) => b.id === blog.id);
  if (idx > -1) {
    blogs[idx] = blog;
  } else {
    blogs.unshift(blog);
  }
  localStorage.setItem("unifiedstack_blogs", JSON.stringify(blogs));
  return { success: true, id: blog.id };
}

export async function deleteBlog(id: string): Promise<{ success: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (e) {
      console.error("Firebase delete blog error: ", e);
      throw e;
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_blogs");
  const blogs = existing ? JSON.parse(existing) : [];
  const filtered = blogs.filter((b: any) => b.id !== id);
  localStorage.setItem("unifiedstack_blogs", JSON.stringify(filtered));
  return { success: true };
}

export async function getProjects(): Promise<Project[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "projects"));
      const querySnapshot = await getDocs(q);
      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
      });
      return projects;
    } catch (e) {
      console.error("Firebase projects read error, falling back: ", e);
    }
  }

  const local = localStorage.getItem("unifiedstack_projects");
  return local ? JSON.parse(local) : [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Project;
      }
    } catch (e) {
      console.error("Firebase project details error, falling back: ", e);
    }
  }

  const projects = await getProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function saveProject(project: Project): Promise<{ success: boolean; id: string }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "projects", project.id);
      await setDoc(docRef, project);
      return { success: true, id: project.id };
    } catch (e) {
      console.error("Firebase save project error: ", e);
      throw e;
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_projects");
  const projects = existing ? JSON.parse(existing) : [];
  const idx = projects.findIndex((p: any) => p.id === project.id);
  if (idx > -1) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem("unifiedstack_projects", JSON.stringify(projects));
  return { success: true, id: project.id };
}

export async function deleteProject(id: string): Promise<{ success: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "projects", id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (e) {
      console.error("Firebase delete project error: ", e);
      throw e;
    }
  }

  // Fallback to localStorage
  const existing = localStorage.getItem("unifiedstack_projects");
  const projects = existing ? JSON.parse(existing) : [];
  const filtered = projects.filter((p: any) => p.id !== id);
  localStorage.setItem("unifiedstack_projects", JSON.stringify(filtered));
  return { success: true };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "testimonials"));
      const querySnapshot = await getDocs(q);
      const testimonials: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        testimonials.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      return testimonials;
    } catch (e) {
      console.error("Firebase testimonials read error, falling back: ", e);
    }
  }

  const local = localStorage.getItem("unifiedstack_testimonials");
  return local ? JSON.parse(local) : [];
}

import { MOCK_PROJECTS, MOCK_BLOGS, MOCK_TESTIMONIALS, MOCK_SERVICES, MOCK_GLOBALS } from "./seedData";

export async function getServices(): Promise<Service[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "services"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const services: Service[] = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() } as Service);
      });
      return services;
    } catch (e) {
      console.error("Firebase services read error, falling back: ", e);
    }
  }

  const local = localStorage.getItem("unifiedstack_services");
  return local ? JSON.parse(local) : MOCK_SERVICES;
}

export async function saveService(service: Service): Promise<{ success: boolean; id: string }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "services", service.id);
      await setDoc(docRef, service);
      return { success: true, id: service.id };
    } catch (e) {
      console.error("Firebase save service error: ", e);
      throw e;
    }
  }

  const existing = localStorage.getItem("unifiedstack_services");
  const services = existing ? JSON.parse(existing) : [...MOCK_SERVICES];
  const idx = services.findIndex((s: any) => s.id === service.id);
  if (idx > -1) {
    services[idx] = service;
  } else {
    services.push(service);
  }
  localStorage.setItem("unifiedstack_services", JSON.stringify(services));
  return { success: true, id: service.id };
}

export async function deleteService(id: string): Promise<{ success: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "services", id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (e) {
      console.error("Firebase delete service error: ", e);
      throw e;
    }
  }

  const existing = localStorage.getItem("unifiedstack_services");
  const services = existing ? JSON.parse(existing) : [...MOCK_SERVICES];
  const filtered = services.filter((s: any) => s.id !== id);
  localStorage.setItem("unifiedstack_services", JSON.stringify(filtered));
  return { success: true };
}

export async function getGlobals(): Promise<Globals> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "settings", "globals");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Globals;
      }
    } catch (e) {
      console.error("Firebase read globals error, falling back: ", e);
    }
  }

  const local = localStorage.getItem("unifiedstack_globals");
  return local ? JSON.parse(local) : MOCK_GLOBALS;
}

export async function saveGlobals(data: Globals): Promise<{ success: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "settings", "globals");
      await setDoc(docRef, data);
      return { success: true };
    } catch (e) {
      console.error("Firebase save globals error: ", e);
      throw e;
    }
  }

  localStorage.setItem("unifiedstack_globals", JSON.stringify(data));
  return { success: true };
}

export async function seedDatabase(onProgress?: (msg: string) => void): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured || !db) {
    try {
      localStorage.setItem("unifiedstack_projects", JSON.stringify(MOCK_PROJECTS));
      localStorage.setItem("unifiedstack_blogs", JSON.stringify(MOCK_BLOGS));
      localStorage.setItem("unifiedstack_testimonials", JSON.stringify(MOCK_TESTIMONIALS));
      localStorage.setItem("unifiedstack_services", JSON.stringify(MOCK_SERVICES));
      localStorage.setItem("unifiedstack_globals", JSON.stringify(MOCK_GLOBALS));
      if (onProgress) onProgress("Seeded local storage successfully!");
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  try {
    if (onProgress) onProgress("Seeding projects...");
    for (const proj of MOCK_PROJECTS) {
      await setDoc(doc(db, "projects", proj.id), proj);
      if (onProgress) onProgress(`Seeded project: ${proj.id}`);
    }

    if (onProgress) onProgress("Seeding blogs...");
    for (const blog of MOCK_BLOGS) {
      await setDoc(doc(db, "blogs", blog.id), blog);
      if (onProgress) onProgress(`Seeded blog: ${blog.id}`);
    }

    if (onProgress) onProgress("Seeding testimonials...");
    for (const test of MOCK_TESTIMONIALS) {
      await setDoc(doc(db, "testimonials", test.id), test);
      if (onProgress) onProgress(`Seeded testimonial: ${test.id}`);
    }

    if (onProgress) onProgress("Seeding services...");
    for (const service of MOCK_SERVICES) {
      await setDoc(doc(db, "services", service.id), service);
      if (onProgress) onProgress(`Seeded service: ${service.id}`);
    }

    if (onProgress) onProgress("Seeding global configurations...");
    await setDoc(doc(db, "settings", "globals"), MOCK_GLOBALS);
    if (onProgress) onProgress("Seeded globals successfully!");

    if (onProgress) onProgress("Database seeded successfully!");
    return { success: true };
  } catch (e: any) {
    console.error("Error seeding Firestore database: ", e);
    if (onProgress) onProgress(`Error: ${e.message}`);
    return { success: false, error: e.message };
  }
}


