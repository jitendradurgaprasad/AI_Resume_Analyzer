"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { optimizeBullets, BulletImprovement } from "../lib/analyzer/bulletOptimizer";
import { Zap, Copy, Check, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

interface BulletOptimizerTabProps {
  parsed: ParsedResume;
}

export const BulletOptimizerTab: React.FC<BulletOptimizerTabProps> = ({ parsed }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const improvements: BulletImprovement[] = optimizeBullets(
    parsed.allBullets.length > 0
      ? parsed.allBullets
      : parsed.rawText.split("\n").filter((l) => l.trim().length > 30)
  );

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          STAR Method Bullet Point Enhancer
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Detects weak, passive, or metric-less bullet points from your resume and suggests high-impact STAR (Situation, Task, Action, Result) rewrites.
        </p>
      </div>

      {improvements.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
          Your bullet points are already strong with high action-verb density and metrics!
        </div>
      ) : (
        <div className="space-y-4">
          {improvements.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3"
            >
              {/* Weak Original */}
              <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-2 text-red-400 text-xs font-semibold mb-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Original / Weak Phrasing:</span>
                </div>
                <p className="text-xs text-slate-300 italic font-mono">
                  &ldquo;{item.original}&rdquo;
                </p>
                <div className="mt-1 text-[11px] text-red-400 font-medium">
                  {item.issue}
                </div>
              </div>

              {/* Conversion Arrow */}
              <div className="flex justify-center text-slate-500">
                <ArrowRight className="h-4 w-4 transform rotate-90" />
              </div>

              {/* AI Optimized Rewrite */}
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI STAR Enhanced Rewrite:</span>
                  </div>
                  <button
                    onClick={() => handleCopy(item.optimized, idx)}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Rewrite</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-100 font-semibold leading-relaxed">
                  {item.optimized}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400">
                  <span>
                    Power Verb: <strong className="text-emerald-400">{item.actionVerbUsed}</strong>
                  </span>
                  <span>
                    Quantified Outcome: <strong className="text-emerald-400">{item.metricAdded}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
