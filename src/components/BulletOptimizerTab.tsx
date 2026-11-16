"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { optimizeBullets, BulletImprovement } from "../lib/analyzer/bulletOptimizer";
import { Zap, Copy, Check, ArrowDown, AlertCircle, Sparkles } from "lucide-react";

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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          STAR Bullet Point Enhancer
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Converts passive or unquantified bullets into structured STAR (Situation, Task, Action, Result) accomplishments with power action verbs.
        </p>
      </div>

      {improvements.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
          Your bullet points are already strong with high action-verb density and metrics.
        </div>
      ) : (
        <div className="space-y-4">
          {improvements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3"
            >
              {/* Weak Original */}
              <div className="p-3 bg-red-50/50 border border-red-200/70 rounded-xl">
                <div className="flex items-center gap-1.5 text-red-800 text-xs font-semibold mb-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Original Phrasing:</span>
                </div>
                <p className="text-xs text-slate-700 italic">
                  &ldquo;{item.original}&rdquo;
                </p>
                <div className="mt-1 text-[11px] text-red-700 font-medium">
                  {item.issue}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-slate-400">
                <ArrowDown className="h-4 w-4" />
              </div>

              {/* Optimized Rewrite */}
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-900 text-xs font-bold">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    <span>STAR Method Rewrite:</span>
                  </div>
                  <button
                    onClick={() => handleCopy(item.optimized, idx)}
                    className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1 transition"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Rewrite</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-900 font-medium leading-relaxed">
                  {item.optimized}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-600">
                  <span>
                    Power Verb: <strong className="text-emerald-700">{item.actionVerbUsed}</strong>
                  </span>
                  <span>
                    Outcome: <strong className="text-emerald-700">{item.metricAdded}</strong>
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
