import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

export const MOCK_PROJECTS: Project[] = [
  {
    id: "unified-ai-platform",
    title: "Unified AI Platform",
    category: "AI Agent Development",
    description: "A comprehensive, enterprise-grade platform for building, managing, and observing AI applications. It offers a unified interface for data ingestion, model configuration, pipeline orchestration, and real-time observability, enabling developers and enterprises to design, deploy, and scale robust AI solutions efficiently.",
    image: "/rag assets/landing page.png",
    techStack: ["Next.js 15", "TypeScript", "LangGraph", "FastAPI", "PostgreSQL", "Pinecone", "Gemini 2.5", "RAG"],
    metrics: [
      { label: "Enterprise Scale", value: "Production" },
      { label: "Core Modules", value: "11 Features" },
      { label: "Lifecycle Stage", value: "End-to-End" }
    ],
    problem: "Developing enterprise AI applications traditionally required stitch-assembling fragmented tools for vector search, LLM configuration, data ingestion pipelines, and observability tracking, creating high operational friction and security overhead.",
    solution: "Designed and engineered Unified AI Platform as a cohesive, production-ready environment that covers data preparation, ingestion routing, model orchestration, dynamic integration playgrounds, and comprehensive observation panels under one elite glassmorphic console.",
    results: [
      "Provides complete agent workflow builder, fine-tuning, and MLaaS.",
      "Ensures zero operational overhead with strict security, IP filtering, and PII redaction.",
      "Delivers fully observed query pipelines with instant semantic caching."
    ],
    architecturalOverview: "Beyond RAG as a service, the platform provides an agent workflow builder, fine-tuning services, and Machine Learning as a Service (MLaaS). It delivers an end-to-end AI lifecycle—from data preparation and training to deployment and monitoring—covering all essential steps required to operate production-ready AI systems."
  },
  {
    id: "ai-qa-automation",
    title: "AI QA Automation Platform",
    category: "AI Testing & Evaluation Systems",
    description: "An automated web-agent platform capable of self-healing E2E test execution, UI regression tracking, and conversational report generation.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    techStack: ["React", "FastAPI", "Playwright", "Llama 3", "MongoDB", "Docker"],
    metrics: [
      { label: "Test Coverage", value: "98.4%" },
      { label: "QA Pipeline Velocity", value: "12x" },
      { label: "Self-Healing Accuracy", value: "94.6%" }
    ],
    problem: "Standard testing suites like Cypress or Playwright broke frequently during minor UI changes, resulting in hours of manual maintenance from the development team.",
    solution: "Designed an AI testing system using Vision-Language LLMs that understands the visual layout of screens, automatically updates selectors when they change, and dynamically executes test objectives in high-isolated Docker containers.",
    results: [
      "Reduced engineering time spent on testing scripts maintenance by 90%.",
      "Identified and reported critical edge-case UI regressions with detailed visual diffing.",
      "Allowed product managers to write tests in plain English via a natural-language-to-code translator."
    ]
  },
  {
    id: "town-beat",
    title: "Town Beat: Hyperlocal Social Network",
    category: "Mobile App Development",
    description: "A hyper-local social networking platform designed to connect citizens based on their city and region. It empowers communities to share local news, organize events, participate in civic discussions, and stay informed about what's happening in their immediate surroundings.",
    image: "/town beat assets/WhatsApp Image 2026-05-22 at 8.38.50 PM (1).jpeg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase"],
    metrics: [
      { label: "Community Reach", value: "City-Centric" },
      { label: "Platform Modules", value: "7 Features" },
      { label: "User Control", value: "Secure Panel" }
    ],
    problem: "Citizens frequently lacked a secure, dedicated digital space to interact directly with their immediate neighborhood and city context, resulting in fragmented communication, unverified news, and low civic engagement.",
    solution: "Engineered Town Beat, a highly responsive localized platform offering city-centric feeds, interactive community polling booths, initiative support campaigns, and verified user profiles under strict administrative moderation.",
    results: [
      "Links local residents directly to verified city feeds and interest-based groups.",
      "Supports organic initiative drives via targeted local civic campaigns.",
      "Guarantees community safety and content integrity through moderator dashboards."
    ],
    architecturalOverview: "Built with a modern tech stack, Town Beat offers a seamless and responsive experience for users to engage with their local community."
  },
  {
    id: "resume-shortlister",
    title: "AI Resume Shortlisting Engine",
    category: "Generative AI Solutions",
    description: "A multi-modal resume intelligence system doing batch parse analysis, capability matrix matching, and deterministic fit evaluation.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
    techStack: ["Next.js", "Python", "LlamaIndex", "ChromaDB", "Claude 3.5 Sonnet", "Tailwind CSS"],
    metrics: [
      { label: "Processing Speed", value: "1500 Resumes/Min" },
      { label: "Relevancy Score Align", value: "97.1%" },
      { label: "Manual Screen Reduction", value: "85%" }
    ],
    problem: "HR departments faced massive backlogs during hiring drives, with thousands of resumes of varying formatting that standard ATS search engines failed to capture correctly.",
    solution: "Developed an advanced parsing system utilizing multi-modal parsing to understand layouts, mapping qualifications against standardized skill-graphs, and evaluating candidates contextually based on historical project complexities.",
    results: [
      "Saved recruitment teams an average of 42 hours per vacancy listing.",
      "Eliminated structural resume bias by anonymizing identifiers during the analytical phase.",
      "Accurately predicted matching candidate fit scores matching internal hires with high precision."
    ]
  },
  {
    id: "ai-tutor-evaluation",
    title: "AI Tutor Evaluation Framework",
    category: "AI Testing & Evaluation Systems",
    description: "A framework assessing educational chatbots for conversational compliance, teaching methodology, safety guidelines, and factual consistency.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    techStack: ["Python", "FastAPI", "LangSmith", "Gemini Pro", "Weaviate", "Streamlit"],
    metrics: [
      { label: "Compliance Score", value: "99.9%" },
      { label: "Factual Hallucinations", value: "0.0%" },
      { label: "Automated Evaluation", value: "100%" }
    ],
    problem: "Integrating AI chatbot assistants in virtual learning required complete guarantees that the AI would not hallucinate, exhibit toxicity, or bypass pedagogical teaching boundaries.",
    solution: "Created an adversarial red-teaming evaluator framework that conducts simulated conversations, checks outputs against dynamic safety guidelines, and checks educational content accuracy in real time.",
    results: [
      "Discovered and corrected 24 latent conversational safety bypasses prior to production launch.",
      "Guaranteed absolute alignment with student curriculum frameworks.",
      "Provided rich conversational analytics and visual observability dashboards for pedagogical stakeholders."
    ]
  }
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: "agentic-ai-next-generation",
    title: "Designing Multi-Agent Systems with LangGraph: A Developer's Perspective",
    category: "Agentic AI",
    excerpt: "Discover how to go beyond linear chains and build cyclic, state-sharing multi-agent workflows that can handle complex enterprise problem spaces deterministically.",
    content: `
# Designing Multi-Agent Systems with LangGraph: A Developer's Perspective

As AI agents move from simple demo scripts to production systems, developers are discovering a major challenge: **maintaining control over autonomous behavior**. 

While single LLM calls or linear chains (like standard LangChain setups) work for simple question-and-answering, they break down in complex, multi-step business procedures. Real-world tasks are highly cyclic: a task is drafted, reviewed, fails a check, goes back to modification, and is checked again. 

To solve this, we must build **stateful, cyclic multi-agent systems**. This is where **LangGraph** enters.

---

## Why standard chains fail in production
Standard sequential chains lack memory pathways that allow backtracking. Once an action is taken, it cannot be easily corrected or iterated upon without starting the entire execution over. Furthermore, giving a single agent access to all tools (e.g., database writing, email sending, web search) increases token cost, risks prompt injection, and severely degrades accuracy.

A much better design is **separation of concerns**: dividing a massive task into a collective swarm of small, highly focused agents, each with a narrow scope, specialized system instructions, and exclusive tools.

## The LangGraph paradigm
LangGraph represents agent actions as a **State Graph**. The three core building blocks are:
1. **State**: A shared memory structure (represented as a TypedDict or Pydantic model) that is updated over time by agent operations.
2. **Nodes**: Independent Python functions or computational steps that read the state, perform an operation (like querying an LLM or database), and return an updated state.
3. **Edges**: Logic pathways that connect nodes. They can be **conditional** (e.g., if the evaluator node returns "approved", route to the "publish" node; otherwise, route to the "refactor" node).

\`\`\`python
# Example LangGraph workflow skeleton
from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class AgentState(TypedDict):
    task: str
    draft: str
    feedback: str
    approved: bool

# Initialize graph
workflow = StateGraph(AgentState)

# Define nodes
workflow.add_node("generator", generate_draft_node)
workflow.add_node("evaluator", evaluate_draft_node)

# Set up edges
workflow.set_entry_point("generator")
workflow.add_edge("generator", "evaluator")
workflow.add_conditional_edges(
    "evaluator",
    should_continue_router,
    {
        "continue": "generator",
        "end": END
    }
)
\`\`\`

## Practical Architectural Best Practices
To ensure enterprise safety, we apply the following guidelines at **UnifiedStack**:
- **Human-in-the-Loop Interventions**: For high-risk actions (e.g., executing transactions or broadcasting emails), we configure LangGraph to pause execution, saving the state, and waiting for manual admin approval.
- **Strict Schema Enforcement**: We use structured outputs (via Pydantic) to force agents to return clean, typed data structures, ensuring downstream APIs never fail due to parsing formatting issues.
- **Deep Observability**: We tie all runs into centralized tracing frameworks like LangSmith or Phoenix, tracking token counts, latency spikes, and tool-invocation details instantly.

Multi-agent architectures are the next frontier of software. By engineering robust state machines around generative LLMs, we transform unpredictable chat boxes into deterministic, hyper-reliable business assets.
    `,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    author: "Mohd Huzaifa",
    readTime: "6 min read",
    publishedAt: "2026-05-18"
  },
  {
    id: "rag-vs-finetuning",
    title: "RAG vs. Fine-tuning: Architecting the Right Knowledge Strategy",
    category: "AI Engineering",
    excerpt: "An architectural guide analyzing when to inject dynamic context via RAG pipelines vs. when to encode domain behaviors through model fine-tuning.",
    content: `
# RAG vs. Fine-tuning: Architecting the Right Knowledge Strategy

One of the most frequent architectural questions we receive at **UnifiedStack** is: *"Should we fine-tune an LLM on our corporate data, or should we build a RAG pipeline?"*

The short answer is: **RAG is for knowledge; Fine-tuning is for form, style, and structure.** 

Let's break down the differences, cost profiles, and engineering trade-offs of both strategies.

---

## 1. Retrieval-Augmented Generation (RAG)
RAG works by querying external databases (like vector stores) to find relevant document passages matching a user's question, feeding those passages directly into the prompt context, and letting the LLM generate a grounded answer.

### When to use RAG:
* **Dynamic, changing information**: If your data changes hourly or daily (e.g., inventory levels, stock prices, chat histories), RAG is mandatory.
* **Source attribution**: When it's critical that the model cites exactly where it got an answer (e.g., legal search, financial audits).
* **Minimizing Hallucinations**: Because the model is strictly ordered to answer *only* based on the provided context, hallucinations drop to near-zero.

### The RAG Stack:
We typically build enterprise RAG pipelines using **LangChain/LlamaIndex**, **Pinecone/Weaviate** for high-dimensional vector search, and custom semantic chunking algorithms to parse complex PDFs, spreadsheets, and databases.

---

## 2. Model Fine-Tuning
Fine-tuning modifies the actual weights of an LLM by training it on a specific dataset. It does *not* inject dynamic data; instead, it teaches the model how to act, format, and structure its responses.

### When to use Fine-Tuning:
* **Niche Formatting / Syntax**: Teaching a model to output custom DSL code, highly complex SQL structures, or strict JSON files.
* **Tone & Persona**: Restructuring the model's communication style to perfectly mirror your brand guidelines.
* **Latency & Cost Reductions**: Instead of injecting 10,000 tokens of context/examples into every single prompt, you build the behavior into the model weights, reducing prompt token sizes and accelerating latency.
* **Adapting Small Models**: Training an open-source 7B parameter model (like Mistral or Llama) to perform a single task as well as GPT-4, allowing you to self-host and keep data fully private.

---

## The Hybrid Approach: The Ultimate Pattern
In production-grade AI platforms, we rarely use just one. We often deploy a **Hybrid Architecture**:

\`\`\`
[User Query] ──> [RAG Pipeline (retrieves private docs)]
                     │
                     ▼
             [Injected Context]
                     │
                     ▼
          [Fine-Tuned Small Model] ──> [Deterministic Output]
\`\`\`

Here, a lightweight, fine-tuned model (fast, highly optimized for formatting) processes retrieved context fetched from a robust RAG vector index. This delivers the lowest latency, maximum security, absolute accuracy, and highly cost-efficient operations.
    `,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop",
    author: "Mohd Huzaifa",
    readTime: "8 min read",
    publishedAt: "2026-05-10"
  },
  {
    id: "microservices-vs-modular-monolith",
    title: "The Case for Stateful Modular Monoliths in Early-Stage SaaS",
    category: "Software Architecture",
    excerpt: "Why microservices might be killing your startup productivity, and how modular monolith designs provide speed without sacrificing structural sanity.",
    content: `
# The Case for Stateful Modular Monoliths in Early-Stage SaaS

In the modern cloud era, developers are often told that the only way to build a scalable application is through **microservices**. We are encouraged to spin up isolated Docker containers, manage complex Kubernetes networks, and use Kafka message brokers for simple entity communications.

But for early-stage SaaS platforms and MVPs, **premature microservice adoption is a leading cause of project death**. 

Here is how we design robust **Modular Monoliths** at **UnifiedStack** to maximize development velocity while maintaining perfect architectural boundaries.

---

## The Hidden Cost of Microservices
1. **Network Overhead & Latency**: Communicating over HTTP/gRPC between internal features adds significant network overhead.
2. **Distributed Transaction Nightmares**: Implementing transactions across independent databases requires complex sagas or two-phase commits.
3. **Operational Drag**: Managing infrastructure, CI/CD pipelines, and secret files for 10 microservices drains startup resources.

## What is a Modular Monolith?
A Modular Monolith is a single deployable application that is internally structured as highly isolated, independent domain modules. 

Each module:
* Has its own business logic, schemas, and directories.
* Communicates with other modules strictly via clean public interfaces/APIs (not direct internal function imports).
* Shares the same global database but accesses specific tables/collections strictly owned by that module.

\`\`\`
   [Next.js App Core Router]
               │
    ┌──────────┼──────────┐
    ▼          ▼          ▼
[Billing]  [Users]    [Projects]   <── Strict Domain Modules
    │          │          │
    └──────────┼──────────┘
               ▼
       [Shared Database]
\`\`/
\`\`\`

## Transitioning to Microservices When Ready
Because the module boundaries are strictly enforced inside the codebase, transitioning a feature into a microservice is simple:
1. Copy the module's directory into a separate repo.
2. Replace the internal module interface calls with standard HTTP/gRPC client requests.
3. Deploy the module as a separate server.

By starting with a Modular Monolith, you ship features 5x faster, enjoy zero distributed transaction issues, and preserve a clean architectural pathway to scale when customer traction warrants it.
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    author: "Mohd Huzaifa",
    readTime: "5 min read",
    publishedAt: "2026-05-02"
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Siddharth Mehta",
    role: "VP of Product",
    company: "AuraHealth Technologies",
    content: "Mohd Huzaifa and UnifiedStack delivered a state-of-the-art multi-agent customer support engine that reduced our operational response times by 75%. His understanding of LangGraph and structured output generation is unparalleled.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Elena Rostova",
    role: "Founder & CEO",
    company: "VeloSaaS Platform",
    content: "Building an enterprise application on Next.js 15 can be challenging, but UnifiedStack built a modular, fully tested dashboard panel in record time. Excellent communication, elite engineering capability, and absolute professionalism.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Vikram Malhotra",
    role: "Engineering Director",
    company: "Logix Logistics",
    content: "We engaged UnifiedStack to build a hyperlocal tracking system for our transport dispatchers. The React Native mobile app was highly performant, holding sub-80ms mapping locks under heavy active loads. Mohd is a true full stack engineer.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

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

export async function getBlogs(): Promise<Blog[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "blogs"), orderBy("publishedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const blogs: Blog[] = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() } as Blog);
      });
      if (blogs.length > 0) return blogs;
    } catch (e) {
      console.error("Firebase read error for blogs, falling back: ", e);
    }
  }
  return MOCK_BLOGS;
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
  return MOCK_BLOGS.find((b) => b.id === id) || null;
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
      if (projects.length > 0) return projects;
    } catch (e) {
      console.error("Firebase projects read error, falling back: ", e);
    }
  }
  return MOCK_PROJECTS;
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
  return MOCK_PROJECTS.find((p) => p.id === id) || null;
}
