"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { ResumeUploader } from "../components/ResumeUploader";
import { CreatorFooter } from "../components/CreatorFooter";
import { ShieldCheck, CheckCircle2, Cpu, FileSearch } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleAnalysisComplete = () => {
    // Navigate directly to the dedicated results page
    router.push("/results");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header />

        {/* Minimal Hero Section */}
        <section className="pt-12 pb-8 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-medium mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Enterprise ATS Screening Simulator
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI Resume Analyzer & ATS Intelligence
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Upload your resume to calculate your ATS score, discover missing keywords, and get tailored recommendations for top tech roles.
          </p>
        </section>

        {/* Main Resume Uploader Field */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <ResumeUploader onAnalysisComplete={handleAnalysisComplete} />

          {/* Minimal 3-Point Overview (Clean, non-repetitive) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200/70 text-left">
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-2.5">
                <FileSearch className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900">
                5-Pillar ATS Audit
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Verifies contact info, section structure, action verbs, and quantifiable metrics.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-2.5">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900">
                Role & Gap Matching
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Compares skill profiles against 1,500+ technologies across 25+ benchmark roles.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-2.5">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900">
                Actionable STAR Rewrites
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Transforms passive bullet points into high-impact, outcome-oriented achievements.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Creator Details Footer */}
      <CreatorFooter />
    </div>
  );
}
