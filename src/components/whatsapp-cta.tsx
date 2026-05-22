"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCta() {
  // Direct integration parameter (Phone number placeholder of founder Mohd Huzaifa)
  const phoneNumber = "919000000000"; // standard Indian dial
  const message = encodeURIComponent(
    "Hello Mohd Huzaifa! I am visiting the UnifiedStack website and would like to schedule a consultation for an AI/Software Development project."
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-xl shadow-green-500/20 transition-all hover:scale-110 hover:shadow-green-500/40"
      aria-label="Chat on WhatsApp"
    >
      {/* Dynamic Pulsing Rings */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500/40 opacity-75" />
      <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-emerald-400/20" />
      
      <MessageCircle className="h-6 w-6 stroke-[2.5]" />
    </a>
  );
}
