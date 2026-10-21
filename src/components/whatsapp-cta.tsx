"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppCta() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "918433043426";
  const message = encodeURIComponent(
    "Hello Mohd Huzaifa! I am visiting the UnifiedStack website and would like to schedule a consultation for an AI/Software Development project."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 no-print whatsapp-cta">
      {/* Subtle hover label */}
      <div
        className={`hidden sm:flex items-center rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all duration-200 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat on WhatsApp
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-600"
        aria-label="Chat with Mohd Huzaifa on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 stroke-[2.2]" />
      </a>
    </div>
  );
}
