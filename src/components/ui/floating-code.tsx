"use client";

import React from "react";

interface FloatingCodeProps {
  language: "python" | "typescript" | "rust";
  className?: string;
  delay?: number;
}

export default function FloatingCode({
  language,
  className = "",
  delay = 0,
}: FloatingCodeProps) {
  const snippets = {
    python: {
      title: "agent_graph.py",
      code: `def run_swarm(state: State):
    # Route context semantic queries
    query = state["user_query"]
    docs = vector_db.search(query)
    
    # Executing LangGraph loop
    state["agent_memory"] = docs
    if check_compliance(state):
        return "publish_node"
    return "refactor_node"`,
    },
    typescript: {
      title: "route.ts (App Router)",
      code: `export async function POST(req: Request) {
  const { lead } = await req.json();
  const leadId = await firestore
    .collection("inquiries")
    .add({
      ...lead,
      createdAt: new Date().toISOString()
    });
    
  return NextResponse.json({ success: true, leadId });
}`,
    },
    rust: {
      title: "observability.rs",
      code: `pub fn track_telemetry(run: &RunState) -> Result<()> {
    let latency = run.duration.as_millis();
    let tokens = run.total_tokens;
    
    // Push pipeline metrics to DB
    metrics_client.emit("latency_ms", latency);
    metrics_client.emit("tokens_used", tokens);
    Ok(())
}`,
    },
  };

  const current = snippets[language];

  return (
    <div
      style={{
        animationDelay: `${delay}s`,
      }}
      className={`animate-float select-none pointer-events-none absolute hidden rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs text-white/70 shadow-2xl backdrop-blur-lg sm:block md:text-sm ${className}`}
    >
      <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[10px] text-white/40">{current.title}</span>
      </div>
      <pre className="overflow-x-auto leading-relaxed text-brand-cyan/80">
        <code className="block whitespace-pre">
          {current.code.split("\n").map((line, i) => {
            // Very simple syntax highlighting for rendering
            let coloredLine = line;
            if (line.includes("def ") || line.includes("export ") || line.includes("async ") || line.includes("pub fn ")) {
              coloredLine = line.replace(/(def|export|async|function|pub|fn)/g, '<span class="text-brand-purple">$1</span>');
            } else if (line.includes("# ") || line.includes("// ")) {
              coloredLine = `<span class="text-white/30">${line}</span>`;
            }
            return (
              <span
                key={i}
                className="block"
                dangerouslySetInnerHTML={{ __html: coloredLine }}
              />
            );
          })}
        </code>
      </pre>
    </div>
  );
}
