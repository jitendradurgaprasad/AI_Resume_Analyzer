"use client";

import React from "react";
import { Sparkles, FileText, Github, Award, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  onLoadSample: (sampleId: string) => void;
  activeSampleId?: string;
}

export const Header: React.FC<HeaderProps> = ({ onLoadSample, activeSampleId }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="h-full w-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">
                Resu<span className="text-emerald-400">Match</span> AI
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Enterprise ATS v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Intelligent Resume Analyzer, ATS Scorer & Career Path Predictor
            </p>
          </div>
        </div>

        {/* Quick Samples & GitHub */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 py-1 font-medium">Test Demos:</span>
            <button
              onClick={() => onLoadSample("software-engineer")}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeSampleId === "software-engineer"
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Full Stack
            </button>
            <button
              onClick={() => onLoadSample("data-scientist")}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeSampleId === "data-scientist"
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              AI / ML
            </button>
            <button
              onClick={() => onLoadSample("weak-resume")}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeSampleId === "weak-resume"
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              Junior (Needs Work)
            </button>
          </div>

          <a
            href="https://github.com/jitendradurgaprasad/AI_Resume_Analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
