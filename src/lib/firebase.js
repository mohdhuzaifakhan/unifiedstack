"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = exports.isFirebaseConfigured = void 0;
exports.submitInquiry = submitInquiry;
exports.getInquiries = getInquiries;
exports.updateInquiryStatus = updateInquiryStatus;
exports.deleteInquiry = deleteInquiry;
exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.saveBlog = saveBlog;
exports.deleteBlog = deleteBlog;
exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.saveProject = saveProject;
exports.deleteProject = deleteProject;
exports.getTestimonials = getTestimonials;
exports.getServices = getServices;
exports.saveService = saveService;
exports.deleteService = deleteService;
exports.getGlobals = getGlobals;
exports.saveGlobals = saveGlobals;
exports.seedDatabase = seedDatabase;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
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
exports.isFirebaseConfigured = !!(firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.authDomain);
// Initialize Firebase
const app = exports.isFirebaseConfigured
    ? ((0, app_1.getApps)().length > 0 ? (0, app_1.getApp)() : (0, app_1.initializeApp)(firebaseConfig))
    : null;
exports.db = app ? (0, firestore_1.getFirestore)(app) : null;
exports.auth = app ? (0, auth_1.getAuth)(app) : null;
// Static mockup data removed from codebase to run purely dynamically on Cloud Firestore.
// ==========================================
// HYBRID DATABASE INTERACTION API
// ==========================================
async function submitInquiry(data) {
    const inquiryData = {
        ...data,
        status: "New",
        createdAt: new Date().toISOString()
    };
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(exports.db, "inquiries"), inquiryData);
            return { success: true, id: docRef.id };
        }
        catch (e) {
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
async function getInquiries() {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(exports.db, "inquiries"), (0, firestore_1.orderBy)("createdAt", "desc"));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const inquiries = [];
            querySnapshot.forEach((doc) => {
                inquiries.push({ id: doc.id, ...doc.data() });
            });
            return inquiries;
        }
        catch (e) {
            console.error("Firebase read error, falling back: ", e);
        }
    }
    const existing = localStorage.getItem("unifiedstack_inquiries");
    return existing ? JSON.parse(existing) : [];
}
async function updateInquiryStatus(id, status) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "inquiries", id);
            await (0, firestore_1.updateDoc)(docRef, { status });
            return { success: true };
        }
        catch (e) {
            console.error("Firebase update inquiry status error, falling back: ", e);
        }
    }
    // Fallback to localStorage
    const existing = localStorage.getItem("unifiedstack_inquiries");
    if (existing) {
        const inquiries = JSON.parse(existing);
        const idx = inquiries.findIndex((inq) => inq.id === id);
        if (idx > -1) {
            inquiries[idx].status = status;
            localStorage.setItem("unifiedstack_inquiries", JSON.stringify(inquiries));
        }
    }
    return { success: true };
}
async function deleteInquiry(id) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "inquiries", id);
            await (0, firestore_1.deleteDoc)(docRef);
            return { success: true };
        }
        catch (e) {
            console.error("Firebase delete inquiry error, falling back: ", e);
        }
    }
    // Fallback to localStorage
    const existing = localStorage.getItem("unifiedstack_inquiries");
    if (existing) {
        const inquiries = JSON.parse(existing);
        const filtered = inquiries.filter((inq) => inq.id !== id);
        localStorage.setItem("unifiedstack_inquiries", JSON.stringify(filtered));
    }
    return { success: true };
}
async function getBlogs() {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(exports.db, "blogs"), (0, firestore_1.orderBy)("publishedAt", "desc"));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const blogs = [];
            querySnapshot.forEach((doc) => {
                blogs.push({ id: doc.id, ...doc.data() });
            });
            return blogs;
        }
        catch (e) {
            console.error("Firebase read error for blogs, falling back: ", e);
        }
    }
    const local = localStorage.getItem("unifiedstack_blogs");
    return local ? JSON.parse(local) : [];
}
async function getBlogById(id) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "blogs", id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
        }
        catch (e) {
            console.error("Firebase read error by id for blogs, falling back: ", e);
        }
    }
    const blogs = await getBlogs();
    return blogs.find((b) => b.id === id) || null;
}
async function saveBlog(blog) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "blogs", blog.id);
            await (0, firestore_1.setDoc)(docRef, blog);
            return { success: true, id: blog.id };
        }
        catch (e) {
            console.error("Firebase save blog error: ", e);
            throw e;
        }
    }
    // Fallback to localStorage
    const existing = localStorage.getItem("unifiedstack_blogs");
    const blogs = existing ? JSON.parse(existing) : [];
    const idx = blogs.findIndex((b) => b.id === blog.id);
    if (idx > -1) {
        blogs[idx] = blog;
    }
    else {
        blogs.unshift(blog);
    }
    localStorage.setItem("unifiedstack_blogs", JSON.stringify(blogs));
    return { success: true, id: blog.id };
}
async function deleteBlog(id) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "blogs", id);
            await (0, firestore_1.deleteDoc)(docRef);
            return { success: true };
        }
        catch (e) {
            console.error("Firebase delete blog error: ", e);
            throw e;
        }
    }
    // Fallback to localStorage
    const existing = localStorage.getItem("unifiedstack_blogs");
    const blogs = existing ? JSON.parse(existing) : [];
    const filtered = blogs.filter((b) => b.id !== id);
    localStorage.setItem("unifiedstack_blogs", JSON.stringify(filtered));
    return { success: true };
}
async function getProjects() {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(exports.db, "projects"));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const projects = [];
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
            return projects;
        }
        catch (e) {
            console.error("Firebase projects read error, falling back: ", e);
        }
    }
    const local = localStorage.getItem("unifiedstack_projects");
    return local ? JSON.parse(local) : [];
}
async function getProjectById(id) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "projects", id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
        }
        catch (e) {
            console.error("Firebase project details error, falling back: ", e);
        }
    }
    const projects = await getProjects();
    return projects.find((p) => p.id === id) || null;
}
async function saveProject(project) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "projects", project.id);
            await (0, firestore_1.setDoc)(docRef, project);
            return { success: true, id: project.id };
        }
        catch (e) {
            console.error("Firebase save project error: ", e);
            throw e;
        }
    }
    // Fallback to localStorage
    const existing = localStorage.getItem("unifiedstack_projects");
    const projects = existing ? JSON.parse(existing) : [];
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx > -1) {
        projects[idx] = project;
    }
    else {
        projects.push(project);
    }
    localStorage.setItem("unifiedstack_projects", JSON.stringify(projects));
    return { success: true, id: project.id };
}
async function deleteProject(id) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "projects", id);
            await (0, firestore_1.deleteDoc)(docRef);
            return { success: true };
        }
        catch (e) {
            console.error("Firebase delete project error: ", e);
            throw e;
        }
    }
    // Fallback to localStorage
    const existing = localStorage.getItem("unifiedstack_projects");
    const projects = existing ? JSON.parse(existing) : [];
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem("unifiedstack_projects", JSON.stringify(filtered));
    return { success: true };
}
async function getTestimonials() {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(exports.db, "testimonials"));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const testimonials = [];
            querySnapshot.forEach((doc) => {
                testimonials.push({ id: doc.id, ...doc.data() });
            });
            return testimonials;
        }
        catch (e) {
            console.error("Firebase testimonials read error, falling back: ", e);
        }
    }
    const local = localStorage.getItem("unifiedstack_testimonials");
    return local ? JSON.parse(local) : [];
}
const seedData_1 = require("./seedData");
async function getServices() {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(exports.db, "services"), (0, firestore_1.orderBy)("order", "asc"));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const services = [];
            querySnapshot.forEach((doc) => {
                services.push({ id: doc.id, ...doc.data() });
            });
            return services;
        }
        catch (e) {
            console.error("Firebase services read error, falling back: ", e);
        }
    }
    const local = localStorage.getItem("unifiedstack_services");
    return local ? JSON.parse(local) : seedData_1.MOCK_SERVICES;
}
async function saveService(service) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "services", service.id);
            await (0, firestore_1.setDoc)(docRef, service);
            return { success: true, id: service.id };
        }
        catch (e) {
            console.error("Firebase save service error: ", e);
            throw e;
        }
    }
    const existing = localStorage.getItem("unifiedstack_services");
    const services = existing ? JSON.parse(existing) : [...seedData_1.MOCK_SERVICES];
    const idx = services.findIndex((s) => s.id === service.id);
    if (idx > -1) {
        services[idx] = service;
    }
    else {
        services.push(service);
    }
    localStorage.setItem("unifiedstack_services", JSON.stringify(services));
    return { success: true, id: service.id };
}
async function deleteService(id) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "services", id);
            await (0, firestore_1.deleteDoc)(docRef);
            return { success: true };
        }
        catch (e) {
            console.error("Firebase delete service error: ", e);
            throw e;
        }
    }
    const existing = localStorage.getItem("unifiedstack_services");
    const services = existing ? JSON.parse(existing) : [...seedData_1.MOCK_SERVICES];
    const filtered = services.filter((s) => s.id !== id);
    localStorage.setItem("unifiedstack_services", JSON.stringify(filtered));
    return { success: true };
}
async function getGlobals() {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "settings", "globals");
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
        }
        catch (e) {
            console.error("Firebase read globals error, falling back: ", e);
        }
    }
    const local = localStorage.getItem("unifiedstack_globals");
    return local ? JSON.parse(local) : seedData_1.MOCK_GLOBALS;
}
async function saveGlobals(data) {
    if (exports.isFirebaseConfigured && exports.db) {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "settings", "globals");
            await (0, firestore_1.setDoc)(docRef, data);
            return { success: true };
        }
        catch (e) {
            console.error("Firebase save globals error: ", e);
            throw e;
        }
    }
    localStorage.setItem("unifiedstack_globals", JSON.stringify(data));
    return { success: true };
}
async function seedDatabase(onProgress) {
    if (!exports.isFirebaseConfigured || !exports.db) {
        try {
            localStorage.setItem("unifiedstack_projects", JSON.stringify(seedData_1.MOCK_PROJECTS));
            localStorage.setItem("unifiedstack_blogs", JSON.stringify(seedData_1.MOCK_BLOGS));
            localStorage.setItem("unifiedstack_testimonials", JSON.stringify(seedData_1.MOCK_TESTIMONIALS));
            localStorage.setItem("unifiedstack_services", JSON.stringify(seedData_1.MOCK_SERVICES));
            localStorage.setItem("unifiedstack_globals", JSON.stringify(seedData_1.MOCK_GLOBALS));
            if (onProgress)
                onProgress("Seeded local storage successfully!");
            return { success: true };
        }
        catch (e) {
            return { success: false, error: e.message };
        }
    }
    try {
        if (onProgress)
            onProgress("Seeding projects...");
        for (const proj of seedData_1.MOCK_PROJECTS) {
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(exports.db, "projects", proj.id), proj);
            if (onProgress)
                onProgress(`Seeded project: ${proj.id}`);
        }
        if (onProgress)
            onProgress("Seeding blogs...");
        for (const blog of seedData_1.MOCK_BLOGS) {
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(exports.db, "blogs", blog.id), blog);
            if (onProgress)
                onProgress(`Seeded blog: ${blog.id}`);
        }
        if (onProgress)
            onProgress("Seeding testimonials...");
        for (const test of seedData_1.MOCK_TESTIMONIALS) {
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(exports.db, "testimonials", test.id), test);
            if (onProgress)
                onProgress(`Seeded testimonial: ${test.id}`);
        }
        if (onProgress)
            onProgress("Seeding services...");
        for (const service of seedData_1.MOCK_SERVICES) {
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(exports.db, "services", service.id), service);
            if (onProgress)
                onProgress(`Seeded service: ${service.id}`);
        }
        if (onProgress)
            onProgress("Seeding global configurations...");
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(exports.db, "settings", "globals"), seedData_1.MOCK_GLOBALS);
        if (onProgress)
            onProgress("Seeded globals successfully!");
        if (onProgress)
            onProgress("Database seeded successfully!");
        return { success: true };
    }
    catch (e) {
        console.error("Error seeding Firestore database: ", e);
        if (onProgress)
            onProgress(`Error: ${e.message}`);
        return { success: false, error: e.message };
    }
}
