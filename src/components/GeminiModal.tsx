"use client";

import React, { useState } from "react";
import { Sparkles, X, Key, CheckCircle2, Loader2, Bot } from "lucide-react";
import { runGeminiDeepAnalysis, GeminiAnalysisResult } from "../lib/analyzer/geminiIntegration";

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeText: string;
  targetRole?: string;
}

export const GeminiModal: React.FC<GeminiModalProps> = ({
  isOpen,
  onClose,
  resumeText,
  targetRole,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleRunAnalysis = async () => {
    if (!apiKey.trim()) return;
    setLoading(true);
    try {
      const res = await runGeminiDeepAnalysis(resumeText, apiKey.trim(), targetRole);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Gemini 1.5 Pro / Flash Deep AI Critique
            </h3>
            <p className="text-xs text-slate-400">
              Optional deep qualitative executive summary & bespoke cover letter hook.
            </p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-emerald-400" />
                Enter your Google Gemini API Key:
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1.5">
                Your key stays strictly in your browser and is never stored on any server.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRunAnalysis}
                disabled={loading || !apiKey.trim()}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing with Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Run AI Critique
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Executive Summary */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Executive Recruiter Summary
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {result.executiveSummary}
              </p>
            </div>

            {/* Critique Points */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Strategic Recommendations
              </h4>
              <ul className="space-y-2">
                {result.advancedCritique.map((crit, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cover letter hook */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                Tailored Cover Letter Pitch
              </h4>
              <p className="text-xs text-slate-300 italic font-serif leading-relaxed">
                &ldquo;{result.tailoredCoverLetterSnippet}&rdquo;
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
              >
                Analyze Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
