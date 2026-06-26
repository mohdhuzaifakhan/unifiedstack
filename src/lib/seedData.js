"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_GLOBALS = exports.MOCK_SERVICES = exports.MOCK_TESTIMONIALS = exports.MOCK_BLOGS = exports.MOCK_PROJECTS = void 0;
exports.MOCK_PROJECTS = [
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
exports.MOCK_BLOGS = [
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
exports.MOCK_TESTIMONIALS = [
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
exports.MOCK_SERVICES = [
    {
        id: "ai-agents",
        category: "ai",
        iconName: "Bot",
        title: "AI Agent Development",
        description: "Stateful, autonomous multi-agent cognitive networks designed to execute complex business routines through cyclic loop workflows.",
        pricing: {
            in: "Starting at ₹55,000",
            intl: "Starting at $5,000"
        },
        delivery: "3-5 Weeks",
        tech: ["LangGraph", "Python", "FastAPI", "Redis"],
        benefits: [
            "Recursive self-backtracking execution model",
            "Reduction of human operational labor by up to 85%",
            "Direct integration with enterprise CRM and SQL schemas"
        ],
        useCase: "Self-healing customer service coordinators and autonomous billing reconcilers that execute complex loops.",
        order: 1
    },
    {
        id: "generative-ai",
        category: "ai",
        iconName: "Brain",
        title: "Generative AI Solutions",
        description: "Custom integrations of highly advanced LLMs tailored to commercial workflows, delivering high-speed structured text processing.",
        pricing: {
            in: "Starting at ₹50,000",
            intl: "Starting at $4,500"
        },
        delivery: "2-4 Weeks",
        tech: ["GPT-4o", "Claude 3.5 Sonnet", "Gemini Pro", "Pydantic"],
        benefits: [
            "Absolute output structure via typed JSON schemas",
            "Custom context instructions to reduce prompt drift",
            "Seamless API fallback failover pipelines"
        ],
        useCase: "Dynamic enterprise content generation, automated medical intake records parsing, and legal brief analysis engines.",
        order: 2
    },
    {
        id: "rag-pipelines",
        category: "ai",
        iconName: "Binary",
        title: "RAG Pipelines",
        description: "Optimized retrieval-augmented databases using custom semantic indexers to search massive internal folders securely.",
        pricing: {
            in: "Starting at ₹52,000",
            intl: "Starting at $4,800"
        },
        delivery: "3-4 Weeks",
        tech: ["Pinecone", "ChromaDB", "LlamaIndex", "Text Embedding Models"],
        benefits: [
            "Semantic matching beyond simple matching keywords",
            "Hierarchical chunk algorithms to preserve tables",
            "Complete enterprise local data container containment"
        ],
        useCase: "Internal HR search agents, legal document discovery swarms, and corporate financial report analyzers.",
        order: 3
    },
    {
        id: "llm-finetuning",
        category: "ai",
        iconName: "Layers",
        title: "LLM Fine-tuning",
        description: "Training open-source models on private hardware datasets to teach proprietary formatting styles and secure local hosting.",
        pricing: {
            in: "Starting at ₹60,000",
            intl: "Starting at $6,000"
        },
        delivery: "4-6 Weeks",
        tech: ["Llama 3", "Mistral 7B", "HuggingFace", "PyTorch"],
        benefits: [
            "Slash API per-token usage cost overhead by up to 70%",
            "100% locally deployable in internal secure private clouds",
            "Highly optimized performance speeds for specialized actions"
        ],
        useCase: "Medical terminology generators and customized legal draft compilers trained on local cases.",
        order: 4
    },
    {
        id: "ai-automation",
        category: "ai",
        iconName: "Zap",
        title: "AI Automation",
        description: "End-to-end background processes that chain models and database structures, triggering automated customer engagements.",
        pricing: {
            in: "Starting at ₹50,000",
            intl: "Starting at $4,000"
        },
        delivery: "2-3 Weeks",
        tech: ["n8n", "Make", "Custom Cron Node.js", "Webhooks"],
        benefits: [
            "Fully automated data sync across separate apps",
            "Instant text parsing from inbound customer tickets",
            "Elimination of manual entry and human transcription errors"
        ],
        useCase: "Email lead auto-reply triggers and internal Slack database updates fueled by vision model parsers.",
        order: 5
    },
    {
        id: "web-dev",
        category: "fullstack",
        iconName: "Code2",
        title: "SaaS Development",
        description: "Premium, responsive modular Next.js web applications, containing detailed client portals, Stripe billing, and secure API cores.",
        pricing: {
            in: "Starting at ₹58,000",
            intl: "Starting at $5,500"
        },
        delivery: "4-8 Weeks",
        tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        benefits: [
            "Optimized layout speeds with Server Component rendering",
            "Stripe integration with complex multi-tier billing",
            "Robust path permission security protection layers"
        ],
        useCase: "Enterprise business management cockpits, subscription-based customer platforms, and dynamic content sites.",
        order: 6
    },
    {
        id: "mobile-apps",
        category: "fullstack",
        iconName: "Smartphone",
        title: "Mobile App Development",
        description: "Sub-100ms real-time React Native mobile apps built for geolocated dispatch, community feeds, and offline caching systems.",
        pricing: {
            in: "Starting at ₹70,000",
            intl: "Starting at $6,500"
        },
        delivery: "5-9 Weeks",
        tech: ["React Native", "Expo", "WebSocket", "Redux Toolkit"],
        benefits: [
            "Simultaneous launch on Apple App Store & Google Play",
            "Instant geolocation mapping calculations",
            "Ultra-clean local sqlite caching for offline accessibility"
        ],
        useCase: "Hyperlocal parcel tracking, community networking hubs, and field inspection logger apps.",
        order: 7
    },
    {
        id: "api-dev",
        category: "fullstack",
        iconName: "Server",
        title: "API Development & Backend",
        description: "Ultra-fast RESTful and gRPC web routing layers built on NestJS and FastAPI, with robust validation and security layers.",
        pricing: {
            in: "Starting at ₹52,000",
            intl: "Starting at $4,000"
        },
        delivery: "3-5 Weeks",
        tech: ["NestJS", "FastAPI", "Prisma ORM", "Redis Cache"],
        benefits: [
            "Highly organized module codebase structure",
            "Strict automatic parameter schema typechecks",
            "Sub-30ms execution timings for simple reads"
        ],
        useCase: "External third-party API hooks, fast mobile app backends, and multi-tenant data orchestrations.",
        order: 8
    },
    {
        id: "devops",
        category: "fullstack",
        iconName: "CloudLightning",
        title: "DevOps & Cloud Systems",
        description: "Deploying secure Docker setups, CI/CD automated test integrations, and load balancers on AWS and GCP.",
        pricing: {
            in: "Starting at ₹50,000",
            intl: "Starting at $3,500"
        },
        delivery: "2-4 Weeks",
        tech: ["AWS", "Docker", "GitHub Actions", "Terraform"],
        benefits: [
            "Fully automated compilation verification testing on commit",
            "Self-scaling containers to handle user traffic spikes",
            "Secure VPC environments keeping databases closed"
        ],
        useCase: "Zero-downtime deployment pipelines and staging environment replicators.",
        order: 9
    },
    {
        id: "ai-testing",
        category: "ai",
        iconName: "Cpu",
        title: "AI Testing & Evaluation Systems",
        description: "Adversarial evaluation frameworks designed to test LLM swarms for factual consistency, drift, and toxic inputs.",
        pricing: {
            in: "Starting at ₹54,000",
            intl: "Starting at $5,000"
        },
        delivery: "3-5 Weeks",
        tech: ["LangSmith", "Phoenix", "DeepEval", "Python"],
        benefits: [
            "Discover conversation bypass risks before launch",
            "Validate answer accuracies against custom datasets",
            "Centralized logs monitoring operational drift"
        ],
        useCase: "Compliance auditing portals for chatbot solutions operating in financial or clinical setups.",
        order: 10
    }
];
exports.MOCK_GLOBALS = {
    hero: {
        badge: "Empowering Enterprise Workflows",
        title: "Building Intelligent Software & AI Systems",
        subtitle: "We engineer high-performance multi-agent cognitive platforms, deterministic RAG document systems, robust full stack SaaS, and premium mobile applications."
    },
    trustMetrics: [
        { value: "2+", label: "Years Professional Experience" },
        { value: "99.8%", label: "System Uptime Delivered" },
        { value: "100%", label: "Production-Grade AI Architecture" },
        { value: "12x", label: "Workflow Latency Reductions" },
        { value: "India", label: "Sole Proprietorship Certified" }
    ],
    specializations: [
        {
            iconName: "GitBranch",
            title: "LangGraph Orchestration",
            description: "Going beyond linear chains. We build robust, state-synchronized agent swarms with custom conditional edge routers."
        },
        {
            iconName: "Database",
            title: "Vector Database Setup",
            description: "Implementing semantic indices with Pinecone, ChromaDB, and Milvus. Custom chunking layouts preserve document hierarchies."
        },
        {
            iconName: "Activity",
            title: "Observability & Evaluation",
            description: "Adversarial red-teaming frameworks to verify chatbots for factual hallucinations, toxic leakage, and strict pedagogy compliance."
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
            { name: "NestJS", icon: "🦁" },
            { name: "FastAPI", icon: "⚡" },
            { name: "Python", icon: "🐍" },
            { name: "Express", icon: "🚂" },
            { name: "PostgreSQL", icon: "🐘" }
        ],
        ai: [
            { name: "LangChain", icon: "🦜" },
            { name: "LangGraph", icon: "🕸️" },
            { name: "LlamaIndex", icon: "🗂️" },
            { name: "OpenAI / Claude", icon: "🧠" },
            { name: "Gemini APIs", icon: "♊" },
            { name: "Pinecone / Chroma", icon: "🌲" }
        ],
        cloud: [
            { name: "AWS Services", icon: "☁️" },
            { name: "Docker", icon: "🐳" },
            { name: "CI/CD Pipelines", icon: "🔄" },
            { name: "Firebase", icon: "🔥" },
            { name: "Vercel Hosting", icon: "▲" },
            { name: "Redis Caching", icon: "🔴" }
        ]
    },
    processFlow: [
        { step: "01", name: "Discovery", desc: "Analyzing your structural data bottlenecks and mapping AI opportunities." },
        { step: "02", name: "Planning", desc: "Designing detailed cyclic agent architectures and system interfaces." },
        { step: "03", name: "Development", desc: "Implementing stateful codebases with Next.js, FastAPI, and robust libraries." },
        { step: "04", name: "AI Integration", desc: "Injecting LangGraph models, semantic RAG nodes, and security checkers." },
        { step: "05", name: "Testing", desc: "Red-teaming evaluation scripts to verify zero factual hallucinations." },
        { step: "06", name: "Deployment", desc: "Seamless launch to Vercel/AWS with Docker and instant CI/CD tracking." }
    ],
    about: {
        founderName: "Mohd Huzaifa",
        founderTitle: "Full Stack Software Engineer & AI Architect",
        founderSubtitle: "Full Stack Software Engineer & AI Architect",
        bio: [
            "I am an elite, full-stack engineer and AI developer specialized in building autonomous agentic systems and high-scale software infrastructures. Over the past several years, I have helped clients scale dynamic operations, replace slow processes with autonomous workflows, and design robust platforms.",
            "At Sofyrus Technologies, I worked on complex projects ranging from React Native geofenced transport dispatchers to LangGraph swarms that audit patient databases under tight regulatory requirements."
        ],
        philosophies: [
            {
                title: "Deterministic Execution",
                desc: "Generative LLMs are highly fluid. We build strict, graph-based deterministic barriers using LangGraph to guarantee zero toxic leaks or random hallucinations, making AI enterprise-safe."
            },
            {
                title: "Stateful Modular Codebases",
                desc: "Premature microservices split engineering focus. We design modular monolith structures with strict interface domains, giving early startups rapid velocity with clean architectural clarity."
            },
            {
                title: "Zero Operational Overhead",
                desc: "Every database connection, API call, and container deployment is engineered to minimize latency and token counts. Efficiency drives production-grade scalability."
            }
        ],
        skillCategories: [
            {
                title: "AI & Cognitive Core",
                skills: ["LangGraph & LangChain", "RAG Pipeline Orchestration", "Vector Databases (Pinecone, Chroma)", "Adversarial Red-Teaming", "Open-Source Models (Llama, Mistral)", "Structured Output Schemas"]
            },
            {
                title: "Full Stack & Web Core",
                skills: ["Next.js 15 & React 19", "TypeScript / ESNext", "React Native (Mobile)", "FastAPI / NestJS", "PostgreSQL / MongoDB", "RESTful / gRPC APIs"]
            },
            {
                title: "DevOps & Cloud Orchestration",
                skills: ["AWS Cloud Infra", "Docker Containerization", "Firebase Ecosystem", "GitHub Actions CI/CD", "Redis In-Memory Cache", "State persistence layers"]
            }
        ],
        journeyTimeline: [
            {
                date: "Aug 2024 - 2026",
                title: "Full Stack Software Engineer & AI Architect",
                company: "Sofyrus Technologies",
                desc: "Engineered autonomous multi-agent cognitive platforms, real-time React Native mobile applications, and secure modular SaaS engines for global enterprise clients."
            },
            {
                date: "2020 - 2024",
                title: "B.Tech in Computer Science",
                company: "Aligarh Muslim University",
                desc: "Acquired deep foundations in software development, algorithm design, system architecture, and modern full-stack web technologies."
            }
        ]
    },
    aiSolutions: {
        agents: {
            title: "Multi-Agent System Orchestration",
            tagline: "Stateful, Cyclic Business Swarms",
            desc: "We build advanced cognitive networks that split massive business workloads across specialized agent nodes. Unlike basic chains, our swarms back-track, self-evaluate, and cross-reconcile state variables securely.",
            frameworks: ["LangGraph", "LangChain", "Autogen", "Python stateful dicts"],
            steps: [
                { label: "Role Separation", desc: "Dividing workflows into specific agent nodes (Auditor, Searcher, Executioner) with dedicated tools." },
                { label: "Cyclic Memory State", desc: "Configuring state-sharing tables that persist variables across conversational feedback loops." },
                { label: "Observability Audits", desc: "Attaching LangSmith monitors to observe token velocities and trace tool calls dynamically." }
            ],
            metrics: ["88% Workflow Automation", "Zero drift loops", "99.8% Deterministic execution"]
        },
        rag: {
            title: "Enterprise RAG Pipeline Indexing",
            tagline: "Semantic Retrieval-Augmented Generation",
            desc: "Our search architectures bypass keyword limitations. We map documents to high-dimensional coordinate spaces, letting LLMs retrieve exact contextual paragraphs from millions of private files.",
            frameworks: ["Pinecone", "ChromaDB", "LlamaIndex", "SentenceTransformers"],
            steps: [
                { label: "Semantic Chunking", desc: "Dividing PDFs, tables, and spreadsheets intelligently to preserve document structural integrity." },
                { label: "Embeddings Mapping", desc: "Converting chunks into multi-dimensional vectors using modern embedding models." },
                { label: "Reranking Filters", desc: "Running retrieved chunks through Cohere/Cross-Encoder filters to eliminate irrelevant data." }
            ],
            metrics: ["Sub-1.2s search latency", "0.0% Hallucination rates", "99.9% Contextually grounded answers"]
        },
        finetuning: {
            title: "LLM Fine-Tuning & Local Hosting",
            tagline: "Proprietary Tone and Format Alignment",
            desc: "We adapt lightweight open-source base models on private hardware datasets, training them to mirror proprietary communication styles, write complex code formats, and keep data offline.",
            frameworks: ["HuggingFace", "PyTorch", "LoRA / QLoRA", "vLLM Inference Core"],
            steps: [
                { label: "Dataset Scoping", desc: "Synthesizing, filtering, and structuring private corporate data into instruction pairs." },
                { label: "LoRA Training", desc: "Adjusting a fractional set of weights to align behaviors while keeping base architecture untouched." },
                { label: "vLLM Hosting Core", desc: "Deploying the aligned model using high-throughput inference engines to minimize token cost." }
            ],
            metrics: ["72% Token price reductions", "100% On-prem secure hosting", "Up to 5x latency speedups"]
        }
    }
};
