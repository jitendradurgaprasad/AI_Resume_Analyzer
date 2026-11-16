"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  FileText,
  Briefcase,
  Zap,
  Building,
  Github,
  Mail,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface HeaderProps {
  onLoadSample?: (sampleId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoadSample }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSampleClick = (id: string) => {
    if (onLoadSample) {
      onLoadSample(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight transition group-hover:bg-slate-800">
              RM
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-base tracking-tight">
                ResuMatch
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                ATS Engine
              </span>
            </div>
          </Link>

          {/* Center Links (Minimal) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className={`transition hover:text-slate-900 ${
                pathname === "/" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Analyze Resume
            </Link>
            <Link
              href="/results"
              className={`transition hover:text-slate-900 ${
                pathname === "/results" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Results & Audit
            </Link>
            <a
              href="#about-creator"
              className="transition hover:text-slate-900 text-slate-500 text-xs"
            >
              About Developer
            </a>
          </nav>

          {/* Right Action & Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/jitendradurgaprasad/AI_Resume_Analyzer"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition border border-slate-200"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>

            {/* Menu Button (Hides and organizes secondary features) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over / Modal Menu Drawer (Hides secondary tools cleanly) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    RM
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">
                    Workspace Menu
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Section */}
              <div className="mt-6 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                  Main Navigation
                </div>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <span>Upload & Analyze</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/results"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 text-slate-500" />
                    <span>Current Audit & Score</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>

              {/* Quick Sample Resumes */}
              {onLoadSample && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                    Quick Sample Profiles
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleSampleClick("software-engineer")}
                      className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition flex items-center justify-between"
                    >
                      <span>Full Stack Engineer (High ATS)</span>
                      <span className="text-[10px] text-emerald-600 font-medium">92/100</span>
                    </button>
                    <button
                      onClick={() => handleSampleClick("data-scientist")}
                      className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition flex items-center justify-between"
                    >
                      <span>Data Scientist & AI Practitioner</span>
                      <span className="text-[10px] text-emerald-600 font-medium">88/100</span>
                    </button>
                    <button
                      onClick={() => handleSampleClick("weak-resume")}
                      className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition flex items-center justify-between"
                    >
                      <span>Junior Developer (Optimization Needed)</span>
                      <span className="text-[10px] text-amber-600 font-medium">42/100</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Creator Info Snippet in Drawer */}
            <div className="pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="text-xs font-semibold text-slate-900">
                  Medisetti Jitendra Durga Prasad
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  mjdp4317@gmail.com
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="https://github.com/jitendradurgaprasad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1"
                  >
                    <Github className="h-3 w-3" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
