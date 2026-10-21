import { Project, Blog, Testimonial, Service, Globals } from "./firebase";

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
    architecturalOverview: "Beyond RAG as a service, the platform provides an agent workflow builder, fine-tuning services, and Machine Learning as a Service (MLaaS). It delivers an end-to-end AI lifecycle—from data preparation and training to deployment and monitoring—covering all essential steps required to operate production-ready AI systems.",
    githubLink: "https://github.com/mohdhuzaifakhan/unified-ai-frontend"
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
    image: "/townbeat_assets/tb_admin.jpeg",
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
    architecturalOverview: "Built with a modern tech stack, Town Beat offers a seamless and responsive experience for users to engage with their local community.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.townbeat.app"
  },
  {
    id: "salah-times",
    title: "Salah Times: Hyperlocal Masjid Directory",
    category: "Mobile App Development",
    description: "A React Native & Firebase mobile application listing all city masjids, providing correct synchronized prayer timetables, admin and event management dashboards, Quran reader, and dynamic notifications.",
    image: "/salahtimes/salah_ss2.png",
    techStack: ["React Native", "Firebase", "Cloud Firestore", "Cloud Messaging", "Tailwind CSS", "Expo"],
    metrics: [
      { label: "Pre-Prayer Alerts", value: "10 Mins" },
      { label: "Offline Cache", value: "Sub-10ms" },
      { label: "Replication", value: "Real-time" }
    ],
    problem: "Local masjid prayer schedules fluctuate frequently depending on seasonal changes and local committee alignments, causing citizens to miss congregational prayer (jama'at) times due to outdated online databases and lack of timely reminders.",
    solution: "Developed a high-performance React Native mobile app utilizing Firebase Firestore for real-time schedule replication. Implemented a dedicated Moazzin interface for editing tables, an admin console for event management, a Quran module, Hijri calendar, and offline-first background workers triggering notifications 10 minutes prior to namaaz.",
    results: [
      "Synchronizes timetables across dozens of regional masjids instantly.",
      "Triggers local notifications exactly 10 minutes before prayer times even offline.",
      "Enables masjid committees to self-publish event notifications and adjustments without dev intervention."
    ],
    architecturalOverview: "Built using React Native/Expo and Firestore collections. Uses local AsyncStorage caches to deliver sub-10ms offline timetables, and Firebase Cloud Functions to schedule pre-prayer alerts.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.huzaifa.salahtimes"
  },
  {
    id: "helpora",
    title: "Helpora: Service Marketplace Platform",
    category: "Mobile App Development",
    description: "A smart, user-friendly platform designed to seamlessly bridge service consumers with trusted, verified service providers, featuring easy service discovery, real-time messaging, flexible booking management, and secure payments.",
    image: "/helpora/helpora_ss1.png",
    techStack: ["React Native", "Node.js", "Express", "MongoDB", "Firebase Cloud Messaging", "Stripe API"],
    metrics: [
      { label: "Provider Verification", value: "100%" },
      { label: "Booking Matches", value: "98.7%" },
      { label: "Real-time Sync", value: "Instant" }
    ],
    problem: "Consumers struggle with the hassle of manually searching, comparing reviews, and coordinating service schedules across fragmented channels, while skilled local professionals find it difficult to showcase their credentials, reach a wider client base, and manage bookings efficiently.",
    solution: "Engineered Helpora as a unified service marketplace. Implemented a dual-user mobile interface, secure payment gateway integrations, a real-time provider-customer messaging system, granular provider profiles with verified reviews, and booking-tracking maps.",
    results: [
      "Connects service seekers with verified local experts in under 5 minutes.",
      "Reduces coordinate overhead by 70% using automatic scheduling tools.",
      "Enables local service providers to scale operations and track booking histories seamlessly."
    ],
    architecturalOverview: "Leverages React Native for mobile client experience. Uses Node.js/Express REST APIs with MongoDB for scalable booking data storage, Stripe for escrow payments, and Firebase for push notification tracking.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.mohdhuzaifa.Helpora"
  },
  {
    id: "vibe-wave",
    title: "VibeWave: Proximity-Based Social Discovery",
    category: "Mobile App Development",
    description: "A professional, interest-based social discovery mobile application designed to connect users with like-minded individuals physically nearby in real-time, matching shared vibes, goals, and professional profiles.",
    image: "/vibewave/vibewave_ss1.png",
    techStack: ["React Native", "Firebase Auth", "GeoFirestore", "Cloud Firestore", "Tailwind CSS", "Expo"],
    metrics: [
      { label: "Matching Speed", value: "Real-time" },
      { label: "Distance Lock", value: "Sub-100m" },
      { label: "Active Connections", value: "Sub-50ms" }
    ],
    problem: "People often struggle to locate and connect with like-minded professionals or social peers within their immediate vicinity, missing organic opportunities to network, collaborate, or socialize due to the lack of real-time proximity-based directories.",
    solution: "Developed VibeWave as a proximity-based React Native client app. Utilizes GeoFirestore queries to match nearby users based on dynamic proximity circles, interest-matching weights (business, study, coffee, gaming), and secure local messaging pipelines.",
    results: [
      "Triggers real-time matches with nearby like-minded peers within 100 meters.",
      "Facilitates immediate chat routing to establish quick real-world connections.",
      "Allows fine-grained privacy controls to enable/disable visible wave signals dynamically."
    ],
    architecturalOverview: "Engineered using React Native and Expo with Firebase Firestore for real-time state synchronizations, utilizing GeoFirestore for low-latency query loops on coordinate positions.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.huzaifakhan.vibewave"
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
    ],
    githubLink: "https://github.com/Khanshakir14/Measuring-How-Tutors-Think"
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

export const MOCK_SERVICES: Service[] = [
  {
    id: "web-development",
    category: "fullstack",
    iconName: "Globe",
    title: "Web Development",
    description: "We design and engineer bespoke web applications and digital platforms using Next.js, React, and TypeScript. We focus on high responsiveness, intuitive user journeys, and clean component architectures built to support your core business operations.",
    pricing: {
      in: "Starting at ₹40,000",
      intl: "Starting at $1,200"
    },
    delivery: "2-4 Weeks",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    benefits: [
      "Fast, responsive interfaces optimized across desktop, tablet, and mobile devices",
      "Custom administrative portals, role-based workflows, and intuitive dashboards",
      "Modular, well-documented TypeScript codebase designed for long-term scalability"
    ],
    useCase: "Custom operational portals, SaaS platforms, client management tools, and corporate digital applications.",
    order: 1
  },
  {
    id: "mobile-app-development",
    category: "fullstack",
    iconName: "Smartphone",
    title: "Mobile App Development",
    description: "We engineer cross-platform Android and iOS applications using React Native. We deliver native-grade fluid performance, responsive touch interactions, reliable offline data caching, and background push notification systems from a single maintainable codebase.",
    pricing: {
      in: "Starting at ₹50,000",
      intl: "Starting at $1,600"
    },
    delivery: "3-6 Weeks",
    tech: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Node.js"],
    benefits: [
      "Single codebase deployed and published to both Google Play Store and Apple App Store",
      "Smooth 60fps animations, optimized battery usage, and offline data synchronization",
      "Deep mobile OS integration including push notifications, camera, and geolocation"
    ],
    useCase: "Enterprise mobile tools, field operations applications, customer engagement platforms, and workflow utilities.",
    order: 2
  },
  {
    id: "ai-development",
    category: "ai",
    iconName: "Bot",
    title: "AI Development",
    description: "We design and deploy production-grade artificial intelligence systems including Agentic AI workflows, deterministic RAG retrieval pipelines, custom model fine-tuning, intelligent workflow automations, and 24/7 conversational assistants. Every system is built with rigorous evaluation guardrails to ensure reliable, factual, and secure operational performance.",
    pricing: {
      in: "Starting at ₹50,000",
      intl: "Starting at $1,500"
    },
    delivery: "2-5 Weeks",
    tech: ["LangGraph", "LlamaIndex", "OpenAI & Claude", "FastAPI", "Pinecone", "Python"],
    benefits: [
      "Autonomous Agentic AI workflows that plan, reason, and execute multi-step business objectives",
      "Deterministic RAG pipelines delivering accurate, grounded search across your company files with source citations",
      "Domain-specific model fine-tuning and intelligent process automations with complete data privacy"
    ],
    useCase: "Agentic task orchestration, enterprise document search, fine-tuned domain models, process automation, and intelligent conversational assistants.",
    order: 3
  },
  {
    id: "backend-development",
    category: "fullstack",
    iconName: "Server",
    title: "Backend Development",
    description: "We architect and build scalable server-side systems, high-throughput REST and asynchronous APIs, and relational or document database infrastructures using Python, FastAPI, Node.js, and PostgreSQL. Engineered for high concurrency, low latency, and robust data integrity.",
    pricing: {
      in: "Starting at ₹35,000",
      intl: "Starting at $1,000"
    },
    delivery: "2-4 Weeks",
    tech: ["FastAPI", "Python", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
    benefits: [
      "High-throughput API endpoints with sub-50ms query execution times",
      "Role-based access control, secure authentication, and encrypted communications",
      "Reliable relational and vector database schemas with automated migration and backup pipelines"
    ],
    useCase: "Scalable application backends, internal business logic engines, distributed data processing, and platform APIs.",
    order: 4
  }
];

export const MOCK_GLOBALS: Globals = {
  hero: {
    badge: "Custom Software & AI Agency • India & Global",
    title: "We Build Web, Mobile & AI Apps That Grow Your Business",
    subtitle: "Got a software idea or a manual workflow slowing your business down? We design, engineer, and deploy high-converting web platforms, mobile apps, and production AI systems tailored to your exact business goals. Fast delivery, clean code, zero technical stress."
  },
  trustMetrics: [
    { value: "15+ Apps", label: "Shipped Successfully" },
    { value: "100%", label: "On-Time Milestone Delivery" },
    { value: "< 1s", label: "Sub-Second App Speed" },
    { value: "Direct", label: "Work Directly With Founders" },
    { value: "100%", label: "Source Code & IP Ownership" }
  ],
  specializations: [
    {
      iconName: "Globe",
      title: "Web Development",
      description: "Custom web applications and digital platforms built with Next.js, React, and TypeScript with clean architectures and fast load times."
    },
    {
      iconName: "Smartphone",
      title: "Mobile App Development",
      description: "Cross-platform Android and iOS applications built with React Native for fluid performance, offline support, and native device capabilities."
    },
    {
      iconName: "Bot",
      title: "AI Development",
      description: "Agentic AI workflows, deterministic RAG document pipelines, custom model fine-tuning, process automations, and intelligent assistants."
    },
    {
      iconName: "Server",
      title: "Backend Development",
      description: "Scalable server architectures, high-throughput APIs, and secure database infrastructures built with Python, FastAPI, and Node.js."
    }
  ],
  techStack: {
    frontend: [
      { name: "React", icon: "🌐" },
      { name: "Next.js 15", icon: "⚛️" },
      { name: "TypeScript", icon: "📘" },
      { name: "React Native", icon: "📱" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "✨" }
    ],
    backend: [
      { name: "Node.js", icon: "🟢" },
      { name: "FastAPI", icon: "⚡" },
      { name: "Python", icon: "🐍" },
      { name: "NestJS", icon: "🦁" },
      { name: "Express", icon: "🚂" },
      { name: "PostgreSQL", icon: "🐘" }
    ],
    ai: [
      { name: "OpenAI & Claude", icon: "🧠" },
      { name: "LangChain", icon: "🦜" },
      { name: "LangGraph", icon: "🕸️" },
      { name: "Gemini AI", icon: "♊" },
      { name: "Pinecone Vector DB", icon: "🌲" },
      { name: "LlamaIndex", icon: "🗂️" }
    ],
    cloud: [
      { name: "AWS Cloud", icon: "☁️" },
      { name: "Docker", icon: "🐳" },
      { name: "GitHub Actions", icon: "🔄" },
      { name: "Firebase", icon: "🔥" },
      { name: "Vercel", icon: "▲" },
      { name: "Redis Cache", icon: "🔴" }
    ]
  },
  processFlow: [
    { step: "01", name: "Free Scoping Call", desc: "We discuss your project vision, business goals, and budget to understand exactly what you need." },
    { step: "02", name: "Clear Proposal & Roadmap", desc: "You receive a fixed-price proposal with transparent milestones, deliverables, and timelines—no surprise fees." },
    { step: "03", name: "Interactive Figma Designs", desc: "We design and share clean UI screens so you see and approve every detail before we write code." },
    { step: "04", name: "Fast Weekly Sprints", desc: "We build in agile 1-2 week sprints, providing live staging links so you can test progress as we build." },
    { step: "05", name: "Rigorous Testing & QA", desc: "We test every checkout, button, and mobile screen to guarantee a rock-solid, bug-free launch." },
    { step: "06", name: "Production Launch & 30-Day Warranty", desc: "We deploy your app to live cloud servers and stay by your side with 30 days of free bug-fix warranty." }
  ],
  about: {
    founderName: "Mohd Huzaifa",
    founderTitle: "Founder & Full Stack AI Engineer",
    founderSubtitle: "Full Stack Software Engineer & AI Specialist",
    bio: [
      "I am Mohd Huzaifa, a full stack software engineer and AI developer based in India. I specialize in building custom web applications, Android & iOS mobile apps, and practical AI automation tools that help businesses grow.",
      "Over the past several years, I have built and shipped production systems for startups and enterprises, including real-time mobile apps, smart AI chatbots, and high-speed web platforms. My goal is simple: deliver clean, reliable code on time, without complicated technical headaches."
    ],
    coFounderName: "Mohd Suhail",
    coFounderTitle: "Co-Founder & Head of Operations",
    coFounderSubtitle: "Business Operations, Finance & Client Coordination",
    coFounderBio: [
      "Mohd Suhail is the Co-Founder of UnifiedStack, where he manages business operations, client coordination, and financial planning.",
      "With hands-on background in business management, GST compliance, and corporate communication, he ensures that projects stay on schedule, client communication is transparent, and every partnership is handled with complete professionalism.",
      "Together at UnifiedStack, our focus is to bring top-tier software and AI engineering to growing businesses with friendly, honest, and reliable service."
    ],
    philosophies: [
      {
        title: "Clean, Reliable Code",
        desc: "We write clean, well-tested code that works properly from day one, so you don't face random bugs, crashes, or maintenance nightmares."
      },
      {
        title: "Clear & Honest Communication",
        desc: "No confusing technical jargon. We talk in simple English, give you realistic timelines, and keep you updated every step of the way."
      },
      {
        title: "Focus on Business Value",
        desc: "We don't build software just for the sake of it. Everything we create is focused on saving your team time, attracting customers, and growing your revenue."
      }
    ],
    skillCategories: [
      {
        title: "AI & Smart Automation",
        skills: ["AI Chatbots & Virtual Assistants", "Document Search (RAG)", "OpenAI, Claude & Gemini APIs", "Workflow Automation (n8n/Make)", "WhatsApp Business Automation", "Prompt Engineering"]
      },
      {
        title: "Full Stack Web & Mobile",
        skills: ["Next.js 15 & React 19", "React Native (Android & iOS)", "TypeScript & Node.js", "Python & FastAPI", "PostgreSQL & MongoDB", "Payment Gateway (Razorpay/Stripe)"]
      },
      {
        title: "Cloud & DevOps",
        skills: ["AWS Cloud Hosting", "Docker Containers", "Firebase Database", "GitHub CI/CD Automation", "SSL & Domain Setup", "24/7 Server Monitoring"]
      }
    ],
    journeyTimeline: [
      {
        date: "2026 - Present",
        title: "Founder & Lead Engineer",
        company: "UnifiedStack",
        desc: "Building custom software, mobile apps, and AI solutions for startups, businesses, and global clients."
      },
      {
        date: "2024 - 2026",
        title: "Full Stack Software Engineer & AI Architect",
        company: "Sofyrus Technologies",
        desc: "Engineered multi-agent AI systems, real-time React Native mobile applications, and high-performance SaaS backends."
      },
      {
        date: "2020 - 2024",
        title: "B.Tech in Computer Science",
        company: "Aligarh Muslim University (AMU)",
        desc: "Completed Bachelor of Technology in Computer Science, building deep foundations in algorithms, software engineering, and modern web architectures."
      }
    ],
    coFounderJourneyTimeline: [
      {
        date: "2026 - Present",
        title: "Co-Founder & Head of Operations",
        company: "UnifiedStack",
        desc: "Oversees business operations, client partnerships, project delivery schedules, and financial planning."
      },
      {
        date: "2024 - 2026",
        title: "Business & Financial Compliance Consultant",
        company: "Independent Practice",
        desc: "Assisted Indian businesses with GST compliance, taxation, client agreements, and operational management."
      },
      {
        date: "2023 - 2026",
        title: "Bachelor's Degree",
        company: "MJP Rohilkhand University",
        desc: "Focused on professional communication, business writing, and client management."
      }
    ]
  },
  aiSolutions: {
    agents: {
      title: "AI Chatbots & Intelligent Assistants",
      tagline: "Automate Customer Support & Sales",
      desc: "We build smart AI assistants that handle customer questions on WhatsApp and your website, qualify new leads, and schedule appointments around the clock without human delay.",
      frameworks: ["OpenAI", "Claude", "LangGraph", "Python", "WhatsApp Business API"],
      steps: [
        { label: "1. Define Workflow", desc: "We map out exactly how your assistant should answer questions, qualify leads, and handle bookings." },
        { label: "2. Connect Your Data", desc: "We connect your product catalog, FAQs, and business rules so the AI gives accurate answers every time." },
        { label: "3. Launch & Test", desc: "We test the bot thoroughly and launch it on your website and WhatsApp with full analytics." }
      ],
      metrics: ["24/7 Instant Responses", "Cuts Support Work by 80%", "Zero Missed Leads"]
    },
    rag: {
      title: "Document Search & Knowledge AI (RAG)",
      tagline: "Search Company Files in Seconds",
      desc: "Stop wasting hours searching through heavy PDF manuals, policy files, or product catalogs. Our system lets your team and customers ask questions and receive instant, exact answers with citations.",
      frameworks: ["Pinecone", "ChromaDB", "LlamaIndex", "Python"],
      steps: [
        { label: "1. Upload Documents", desc: "Upload your PDFs, Word documents, policy handbooks, or product spreadsheets." },
        { label: "2. Smart Indexing", desc: "Our system indexes all text, tables, and sections for instant semantic retrieval." },
        { label: "3. Instant Accurate Answers", desc: "Ask any question in plain English and get an exact, grounded answer with page numbers." }
      ],
      metrics: ["Instant Answers under 1s", "100% Accurate with Source Citations", "Complete Data Privacy"]
    },
    finetuning: {
      title: "Custom AI Models & Workflow Automation",
      tagline: "Tailored to Your Specific Business",
      desc: "We adapt AI models to understand your company's unique vocabulary, tone, and formatting requirements, automating complex reports and documentation effortlessly.",
      frameworks: ["HuggingFace", "Python", "Llama 3", "PyTorch"],
      steps: [
        { label: "1. Review Your Data", desc: "We collect your past reports, contracts, or customer interactions to train the model." },
        { label: "2. Custom Training", desc: "We tune the model so it writes exactly in your company's preferred style and format." },
        { label: "3. Secure Private Hosting", desc: "We deploy the model securely on private servers so your data never leaves your control." }
      ],
      metrics: ["Matches Your Brand Voice", "Reduces Manual Drafting Time by 75%", "Runs Privately & Securely"]
    }
  }
};
