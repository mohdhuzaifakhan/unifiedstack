"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Loader2, Share2, Check, Copy } from "lucide-react";
import { getBlogById, Blog } from "@/lib/firebase";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Block {
  type: "heading" | "code" | "list" | "blockquote" | "hr" | "paragraph";
  level?: number;
  content: string[];
  ordered?: boolean;
}

// Inline Markdown Parser supporting bold, italics, inline code, and links
function parseInline(text: string): React.ReactNode[] {
  let parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf("**");
    const italicIdx = remaining.indexOf("*");
    const codeIdx = remaining.indexOf("`");
    const linkIdx = remaining.indexOf("[");

    let minIdx = Infinity;
    let markerType: "bold" | "italic" | "code" | "link" | null = null;
    let markerLength = 0;

    if (boldIdx !== -1 && boldIdx < minIdx) {
      minIdx = boldIdx;
      markerType = "bold";
      markerLength = 2;
    }
    if (italicIdx !== -1 && italicIdx < minIdx && (boldIdx === -1 || italicIdx !== boldIdx)) {
      minIdx = italicIdx;
      markerType = "italic";
      markerLength = 1;
    }
    if (codeIdx !== -1 && codeIdx < minIdx) {
      minIdx = codeIdx;
      markerType = "code";
      markerLength = 1;
    }
    if (linkIdx !== -1 && linkIdx < minIdx) {
      minIdx = linkIdx;
      markerType = "link";
      markerLength = 1;
    }

    if (markerType === null) {
      parts.push(remaining);
      break;
    }

    if (minIdx > 0) {
      parts.push(remaining.substring(0, minIdx));
    }

    remaining = remaining.substring(minIdx + markerLength);

    if (markerType === "bold") {
      const endIdx = remaining.indexOf("**");
      if (endIdx !== -1) {
        parts.push(
          <strong key={key++} className="font-bold text-white">
            {remaining.substring(0, endIdx)}
          </strong>
        );
        remaining = remaining.substring(endIdx + 2);
      } else {
        parts.push("**" + remaining);
        break;
      }
    } else if (markerType === "italic") {
      const endIdx = remaining.indexOf("*");
      if (endIdx !== -1) {
        parts.push(
          <em key={key++} className="italic text-white/95">
            {remaining.substring(0, endIdx)}
          </em>
        );
        remaining = remaining.substring(endIdx + 1);
      } else {
        parts.push("*" + remaining);
        break;
      }
    } else if (markerType === "code") {
      const endIdx = remaining.indexOf("`");
      if (endIdx !== -1) {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-xs font-mono font-bold">
            {remaining.substring(0, endIdx)}
          </code>
        );
        remaining = remaining.substring(endIdx + 1);
      } else {
        parts.push("`" + remaining);
        break;
      }
    } else if (markerType === "link") {
      const closingBracket = remaining.indexOf("]");
      if (closingBracket !== -1) {
        const linkText = remaining.substring(0, closingBracket);
        const nextPart = remaining.substring(closingBracket + 1);
        if (nextPart.startsWith("(")) {
          const closingParenthesis = nextPart.indexOf(")");
          if (closingParenthesis !== -1) {
            const url = nextPart.substring(1, closingParenthesis);
            parts.push(
              <a
                key={key++}
                href={url}
                className="text-brand-cyan hover:text-brand-purple hover:underline transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
            );
            remaining = nextPart.substring(closingParenthesis + 1);
            continue;
          }
        }
      }
      parts.push("[");
    }
  }

  return parts;
}

// Line-by-line Block Parser
function parseBlocks(content: string): Block[] {
  const lines = content.split(/\r?\n/);
  const blocks: Block[] = [];
  let currentBlock: Block | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (currentBlock && currentBlock.type === "code") {
        blocks.push(currentBlock);
        currentBlock = null;
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "code",
          content: [trimmed],
        };
      }
      continue;
    }

    if (currentBlock && currentBlock.type === "code") {
      currentBlock.content.push(line);
      continue;
    }

    if (trimmed === "---" || trimmed === "***") {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        type: "hr",
        content: [],
      });
      continue;
    }

    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        blocks.push({
          type: "heading",
          level: match[1].length,
          content: [match[2]],
        });
        continue;
      }
    }

    if (trimmed.startsWith(">")) {
      const text = trimmed.replace(/^>\s*/, "");
      if (currentBlock && currentBlock.type === "blockquote") {
        currentBlock.content.push(text);
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "blockquote",
          content: [text],
        };
      }
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const text = trimmed.substring(2);
      if (currentBlock && currentBlock.type === "list" && !currentBlock.ordered) {
        currentBlock.content.push(text);
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "list",
          ordered: false,
          content: [text],
        };
      }
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s+/, "");
      if (currentBlock && currentBlock.type === "list" && currentBlock.ordered) {
        currentBlock.content.push(text);
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "list",
          ordered: true,
          content: [text],
        };
      }
      continue;
    }

    if (trimmed === "") {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    if (currentBlock && currentBlock.type === "paragraph") {
      currentBlock.content.push(line);
    } else {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = {
        type: "paragraph",
        content: [line],
      };
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

// Stateful CodeBlock Subcomponent with click-to-copy
function CodeBlock({ codeText }: { codeText: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative group my-8">
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10">
        <button
          onClick={handleCopy}
          className="rounded-lg bg-white/5 border border-white/10 p-2 text-[10px] sm:text-xs text-white/60 hover:text-white hover:bg-white/10 flex items-center gap-1.5 backdrop-blur-sm transition-all cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              <span className="text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="rounded-xl border border-white/5 bg-black/60 p-5 font-mono text-xs sm:text-sm text-brand-cyan/85 overflow-x-auto shadow-inner leading-relaxed">
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const article = await getBlogById(resolvedParams.id);
        setBlog(article);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white/60 font-mono text-xs">
        <Loader2 className="h-6 w-6 animate-spin text-brand-purple mr-2" />
        Formatting dynamic publication...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Publication Not Found</h2>
        <p className="mt-2 text-xs text-white/40 max-w-sm">
          The requested article may have been archived or unpublished by the system editor.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-xs text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Publications
        </Link>
      </div>
    );
  }

  const blocks = parseBlocks(blog.content);

  return (
    <article className="relative py-12 md:py-20 px-4 min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-blue transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background visual elements */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navigation back anchor */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-brand-purple transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        {/* Heading information */}
        <header className="border-b border-white/5 pb-8 mb-10">
          <span className="rounded bg-brand-purple/20 border border-brand-purple/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
            {blog.category}
          </span>
          
          <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-brand-purple" />
              By {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-purple" />
              Published: {blog.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-purple" />
              {blog.readTime}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 cursor-pointer hover:text-white text-white/45 transition-colors font-medium border border-white/5 rounded px-2 py-0.5 bg-white/[0.01]"
            >
              {shareCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-green-400 font-medium">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-brand-purple" />
                  Share
                </>
              )}
            </button>
          </div>
        </header>

        {/* Article image cover */}
        <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden aspect-video mb-12 shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover grayscale brightness-90 contrast-125 hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Dynamic Rich Article Content */}
        <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-sm sm:text-base space-y-6">
          {blocks.map((block, idx) => {
            switch (block.type) {
              case "heading": {
                const text = block.content.join(" ");
                const children = parseInline(text);
                if (block.level === 1) {
                  return (
                    <h1 key={idx} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-12 mb-6 leading-tight">
                      {children}
                    </h1>
                  );
                } else if (block.level === 2) {
                  return (
                    <h2 key={idx} className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mt-10 mb-5 border-l-3 border-brand-purple pl-4 leading-tight">
                      {children}
                    </h2>
                  );
                } else {
                  return (
                    <h3 key={idx} className="text-lg sm:text-xl font-bold text-white tracking-tight mt-8 mb-4">
                      {children}
                    </h3>
                  );
                }
              }
              case "code": {
                const codeLines = block.content.slice(1);
                // Remove trailing backticks line if it exists
                if (codeLines.length > 0 && codeLines[codeLines.length - 1].trim() === "```") {
                  codeLines.pop();
                }
                const codeText = codeLines.join("\n");
                return <CodeBlock key={idx} codeText={codeText} />;
              }
              case "blockquote": {
                const text = block.content.join(" ");
                return (
                  <blockquote key={idx} className="border-l-4 border-brand-cyan bg-white/[0.02] p-5 my-8 rounded-r-xl italic text-white/80 text-sm sm:text-base leading-relaxed">
                    {parseInline(text)}
                  </blockquote>
                );
              }
              case "list": {
                const items = block.content.map((itemText, itemIdx) => (
                  <li key={itemIdx} className="text-sm sm:text-base text-white/70 leading-relaxed pl-1">
                    {parseInline(itemText)}
                  </li>
                ));
                if (block.ordered) {
                  return (
                    <ol key={idx} className="list-decimal pl-6 space-y-3 my-6">
                      {items}
                    </ol>
                  );
                } else {
                  return (
                    <ul key={idx} className="list-disc pl-6 space-y-3 my-6 text-brand-purple">
                      {items}
                    </ul>
                  );
                }
              }
              case "hr": {
                return <hr key={idx} className="my-10 border-white/10" />;
              }
              case "paragraph": {
                const text = block.content.join(" ");
                return (
                  <p key={idx} className="leading-relaxed text-sm sm:text-base text-white/80 my-5">
                    {parseInline(text)}
                  </p>
                );
              }
              default:
                return null;
            }
          })}
        </div>

        {/* Scoping Intake Scroller */}
        <div className="mt-16 rounded-2xl border border-white/5 bg-gradient-to-tr from-bg-black to-brand-purple/10 p-8 text-center backdrop-blur-md">
          <h3 className="text-xl font-bold text-white">Have a similar project space in mind?</h3>
          <p className="mt-2 text-xs text-white/40 leading-relaxed max-w-sm mx-auto">
            Book an engineering consultation directly with founder Mohd Huzaifa to scope potential system builds.
          </p>
          <Link
            href="/contact"
            className="mt-6 neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Start project scoping
          </Link>
        </div>
      </div>
    </article>
  );
}
