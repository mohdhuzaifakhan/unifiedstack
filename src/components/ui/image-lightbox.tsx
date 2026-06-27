"use client";

import { X, ZoomIn, ZoomOut, RotateCw, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageLightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!src) return;

    // Prevent background scrolling when open
    document.body.style.overflow = "hidden";

    // Handle Esc key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [src, onClose]);

  if (!src) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.25, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setRotation(0);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl p-4 transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar Controls */}
      <div 
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-white max-w-7xl z-10 py-3 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center sm:text-left truncate max-w-md">
          <h4 className="text-sm font-bold tracking-wide text-white/95 truncate">
            {alt || "Full Image Preview"}
          </h4>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono px-2 text-white/60 select-none">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 4}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all border border-white/10 ml-1"
            title="Rotate 90°"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-white/80 hover:text-white transition-all font-semibold border border-white/10"
            title="Reset View"
          >
            Reset
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 hover:text-white transition-all ml-1"
            title="Open Original in New Tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/30 text-white hover:text-red-400 transition-all ml-3"
            title="Close Preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden py-4">
        <div className="relative max-h-[75vh] max-w-[95vw] overflow-auto flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="max-h-[75vh] max-w-[95vw] object-contain shadow-2xl rounded border border-white/5 select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Instructions Footer */}
      <div className="w-full text-center text-[10px] text-white/30 tracking-wider uppercase py-2 z-10 select-none">
        Click background or press <kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono">ESC</kbd> to close
      </div>
    </div>
  );
}
