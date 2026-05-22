"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile or touch devices and completely abort cursor rendering
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    if (isTouchDevice) {
      return;
    }

    setHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initial addition
    addHoverListeners();

    // Create a MutationObserver to attach hover events to dynamically loaded elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={ringRef}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) ${
            hovered ? "scale(1.5)" : "scale(1)"
          }`,
          borderColor: hovered ? "#06B6D4" : "rgba(139, 92, 246, 0.4)",
          backgroundColor: hovered ? "rgba(6, 182, 212, 0.05)" : "transparent",
        }}
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-brand-purple/40 transition-transform duration-200 cubic-bezier(0.1, 0.8, 0.25, 1)"
      />

      {/* Inner Core Dot */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: hovered ? "#06B6D4" : "#8B5CF6",
        }}
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(139,92,246,0.8)] transition-all duration-75"
      />
    </>
  );
}
