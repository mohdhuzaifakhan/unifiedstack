"use client";

import React, { useState, MouseEvent } from "react";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // "purple" | "cyan" | "both" | "blue"
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
      ? "rgba(79, 70, 229, 0.06)"
      : glowColor === "cyan"
      ? "rgba(2, 132, 199, 0.06)"
      : "rgba(37, 99, 235, 0.05), rgba(79, 70, 229, 0.05)";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {/* Interactive Subtle Radial Soft Light (Desktop only) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 sm:block hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${gradientColor}, transparent 80%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
