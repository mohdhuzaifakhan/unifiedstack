"use client";

import { ArrowUpRight, Cpu, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "AI Solutions", path: "/ai-solutions" },
    { name: "Projects", path: "/projects" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${isScrolled
            ? "bg-bg-black/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md border-b border-white/5"
            : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-colors group-hover:border-brand-purple/40">
                <Cpu className="h-5 w-5 text-brand-purple transition-transform duration-500 group-hover:rotate-180" />
                <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan opacity-0 blur-md transition-opacity group-hover:opacity-30" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Unified<span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Stack</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium tracking-wide transition-colors hover:text-brand-cyan ${isActive ? "text-brand-purple font-semibold" : "text-white/70"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Trigger */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="neon-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/35 transition-all hover:scale-105"
              >
                Book Consultation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay (Full Screen, Highly Mobile Optimized) */}
      <div
        className={`fixed inset-0 z-30 transform bg-bg-black/95 backdrop-blur-lg transition-transform duration-500 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col justify-between px-6 py-24">
          <nav className="flex flex-col gap-6 text-left items-start">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={handleLinkClick}
                  className={`text-xl font-medium tracking-wide transition-colors ${isActive
                      ? "text-brand-purple font-bold glow-text-purple"
                      : "text-white/80 hover:text-brand-cyan"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col items-center gap-6">
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="w-full text-center neon-btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-white/40">© 2026 UnifiedStack. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
}
