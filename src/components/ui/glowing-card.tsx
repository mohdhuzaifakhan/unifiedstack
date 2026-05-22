"use client";

import React, { useState, MouseEvent } from "react";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // "purple" | "cyan" | "both"
}

export default function GlowingCard({
  children,
  className = "",
  glowColor = "both",
  ...props
}: GlowingCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const gradientColor = 
    glowColor === "purple"
      ? "rgba(139, 92, 246, 0.15)"
      : glowColor === "cyan"
      ? "rgba(6, 182, 212, 0.15)"
      : "rgba(139, 92, 246, 0.12), rgba(6, 182, 212, 0.12)";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/10 ${className}`}
      {...props}
    >
      {/* Interactive Radial Glow (Hidden on mobile/touch interfaces) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 sm:block hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${gradientColor}, transparent 80%)`,
        }}
      />

      {/* Decorative Glow Border Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 sm:block hidden"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4), transparent 60%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
