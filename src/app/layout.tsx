import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppCta from "@/components/whatsapp-cta";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UnifiedStack | Enterprise Custom Software & AI Agent Engineering",
  description:
    "Expert AI Agent Development, Generative AI applications, RAG pipelines, LLM fine-tuning, and robust full stack SaaS platforms. Founded by Mohd Huzaifa, helping enterprises orchestrate automated workflow systems.",
  keywords: [
    "AI Development Company India",
    "AI Agent Development Services",
    "Full Stack Developer India",
    "Mobile App Development",
    "Generative AI Solutions",
    "RAG Development Services",
    "LLM Fine-tuning Services",
    "SaaS Development Company",
    "Mohd Huzaifa",
  ],
  authors: [{ name: "Mohd Huzaifa", url: "https://unifiedstack.com" }],
  creator: "Mohd Huzaifa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unifiedstack.com",
    title: "UnifiedStack - Building Intelligent Software & AI Systems",
    description:
      "Enterprise-grade custom software architectures, LangGraph multi-agent orchestration, scalable SaaS development, and RAG search indexing solutions.",
    siteName: "UnifiedStack",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "UnifiedStack Enterprise Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnifiedStack | Enterprise Custom Software & AI Engineering",
    description:
      "Scaling businesses through stateful modular systems, dynamic agents, and production-grade LLM pipelines.",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-white text-slate-900 min-h-full flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
        {/* Global Clean Sticky Glass Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow pt-20">{children}</main>

        {/* Professional Light Footer */}
        <Footer />

        {/* Floating WhatsApp contact helper */}
        <WhatsAppCta />
      </body>
    </html>
  );
}
