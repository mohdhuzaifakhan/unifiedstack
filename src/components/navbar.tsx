"use client";

import { ArrowUpRight, Layers, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
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
    { name: "Profile", path: "/profile" },
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
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 py-3 backdrop-blur-md border-b border-slate-200/80"
            : "bg-white/75 py-4.5 backdrop-blur-xs border-b border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white transition-transform duration-300 group-hover:scale-105">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Unified<span className="text-blue-600">Stack</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-normal transition-all ${
                      isActive
                        ? "bg-blue-50/80 text-blue-600 font-semibold"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Trigger */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="neon-btn inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white"
              >
                Book Consultation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950 lg:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transform bg-white/98 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 py-6 overflow-y-auto">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Unified<span className="text-blue-600">Stack</span>
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              aria-label="Close Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links list */}
          <nav className="flex flex-col gap-2 py-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                </Link>
              );
            })}
          </nav>

          {/* Drawer Footer */}
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="w-full text-center neon-btn inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-slate-400">© 2026 UnifiedStack. All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
}
