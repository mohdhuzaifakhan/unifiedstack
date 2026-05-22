# UnifiedStack: Premium Modern AI-Powered Software Agency Portal

UnifiedStack is an enterprise-grade, ultra-premium web portal built using **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**, backed by a robust **Firebase** dynamic data interaction engine. 

Designed for **Mohd Huzaifa's** software engineering agency, the application features complete dark-theme visual components (Stripe/OpenAI style), dynamic HTML5 mouse-tracking particle connection meshes, glowing radial card borders, filterable portfolio matrices, dynamic blogs, case study logs, and a fully protected administrative lead cockpit.

---

## 🛠️ Tech Stack & Engineering Core

- **Framework**: Next.js 15 (App Router, Server Components optimized)
- **Styling**: Tailwind CSS v4 (inline theme tokens, custom glowing filters)
- **Animations**: Framer Motion & CSS keyframe floats (interactive responsive scaling)
- **Icons**: Lucide Icons
- **Database / Auth**: Firebase Web SDK client integration (dynamic Firestore writing)
- **Hybrid Data Layer**: LocalMockDb fallback system (auto-activates localStorage & JSON scopes if keys are absent)
- **Responsive Layout**: Designed strictly **Mobile-First** with full fluid breakpoints

---

## 📂 Architecture & Folder Layout

```
├── public/                 # Static asset definitions
├── src/
│   ├── app/                # Next.js App Router Page Layouts
│   │   ├── admin/          # /admin secure leads dashboard & blog publisher
│   │   ├── about/          # /about biography of founder Mohd Huzaifa
│   │   ├── services/       # /services deep-dives for the 10 core offerings
│   │   ├── projects/       # /projects filterable case studies grid
│   │   ├── ai-solutions/   # /ai-solutions interactive pipeline visualizer
│   │   ├── blog/           # /blog dynamic articles list & readers
│   │   ├── case-studies/   # /case-studies professional architectural logs
│   │   ├── contact/        # /contact budget-tiered intake form & Calendly modal
│   │   ├── globals.css     # Tailwind v4 globals, custom keyframes & glassmorphism
│   │   ├── layout.tsx      # Root template wrapping custom cursors and SEO metrics
│   │   └── page.tsx        # High-impact Home Page client template
│   ├── components/         # Shared Visual Components
│   │   ├── navbar.tsx      # Sticky floating glassmorphism and mobile burger menu
│   │   ├── footer.tsx      # Glowing border links columns and proprietorship labels
│   │   ├── whatsapp-cta.tsx# Pulsing floating quick chat conversion widget
│   │   └── ui/             # Design Primitive Elements
│   │       ├── glowing-card.tsx    # Radial mouse-glow coordinate tracking panel
│   │       ├── particle-background.tsx # Canvas connection mesh tracking pointer gravity
│   │       ├── floating-code.tsx   # Floating code visual blocks (Python/TS/Rust)
│   │       └── cursor-effect.tsx   # Responsive desktop custom neon cursor trail
│   └── lib/
│       └── firebase.ts     # Dynamic dynamic-mock database orchestrator
├── package.json            # Manifest file declaring dependencies
└── tsconfig.json           # Path mappings compiler parameters
```

---

## 🧬 Hybrid Storage Engine (Zero Configuration Run)

UnifiedStack implements a smart database manager in `src/lib/firebase.ts`. 

- **Live Mode**: If active Firebase Environment variables are present, the contact form submits inquiries directly to Firestore, and the admin panel, blogs, and portfolio fetch directly from cloud collections.
- **Mock Fallback Mode**: If environment keys are missing, the system **automatically and gracefully falls back** to a memory and `localStorage` mock engine. The site remains fully interactive, allowing visitors to submit inquiries, search default articles, read cases, and view testimonials immediately with **zero compile errors**.

### Environment Configurations (`.env.local`)

To activate dynamic Firestore database features, create a `.env.local` file inside the root workspace folder:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_apiKey_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_authDomain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_projectId_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storageBucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_appId_here
```

---

## 🛡️ Admin Dashboard Console (`/admin`)

UnifiedStack includes an integrated admin platform enabling Mohd Huzaifa to audit inbound client pipelines and write articles:
- **Security Lock**: Protected by an interactive passcode screen. Use the default passcode **`unifiedstack2026`** to unlock the cockpit.
- **Leads Inbox**: View submitted requirements, budges, companies, and change lead statuses dynamically (New, In Discussion, Closed).
- **Publication Writer**: Add new blog entries directly via forms, populating the dynamic catalog index instantly.
- **Analytics Board**: Visualizes total pipeline currency values, requested service distributions, and budget frequency breakdowns.

---

## 🚀 Scoping and Deployment to Vercel

The portal is completely pre-configured for instant deployment on Vercel:

1. Push the project repository to GitHub or GitLab.
2. Visit [Vercel](https://vercel.com) and click **Import Project**.
3. Point to your repository.
4. (Optional) Under **Environment Variables**, paste the Firebase parameters detailed above.
5. Click **Deploy**. Vercel will build and launch your premium portal in under 60 seconds.

---

## ⚡ Development Workflow

To boot the developer server locally:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the premium interface.
