"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { ATSAuditReport } from "../lib/analyzer/scoringEngine";
import { RoleMatchResult } from "../lib/analyzer/rolePredictor";
import { generateRecruiterInterviewQuestions, InterviewQuestion } from "../lib/analyzer/recruiterQuestions";
import { exportAuditPdf } from "../lib/export/pdfReport";
import { Download, Building, HelpCircle, CheckCircle2, Award, FileSpreadsheet, ShieldAlert } from "lucide-react";

interface RecruiterOfficeTabProps {
  parsed: ParsedResume;
  audit: ATSAuditReport;
  primaryRole: RoleMatchResult;
}

export const RecruiterOfficeTab: React.FC<RecruiterOfficeTabProps> = ({
  parsed,
  audit,
  primaryRole,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const questions: InterviewQuestion[] = generateRecruiterInterviewQuestions(parsed, audit);

  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      exportAuditPdf(parsed, audit, primaryRole);
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Recruiter Action Bar & PDF Download */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Office & Hiring Suite
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Building className="h-5 w-5 text-emerald-400" />
            Recruiter Screening & Candidate Dossier
          </h3>
          <p className="text-xs text-slate-400">
            Tailored interview guide, risk flags, and downloadable official ATS audit summary report.
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          disabled={isExporting}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 shrink-0"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Generating PDF..." : "Download Official ATS Report (PDF)"}
        </button>
      </div>

      {/* Candidate Decision Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Hiring Verdict
          </div>
          <div className="flex items-center gap-2 mt-2">
            {audit.overallScore >= 75 ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Advance to Technical Screen
              </span>
            ) : audit.overallScore >= 55 ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                Hold / Request Specific Project Work
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" />
                Unlikely to Pass ATS Filter
              </span>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Recommended Level
          </div>
          <div className="text-base font-bold text-white mt-2">
            {parsed.wordCount > 600 && parsed.quantifiableMetricsCount >= 4
              ? "Mid-Senior Level Engineer"
              : parsed.extractedSkills.length >= 10
              ? "Mid-Level Professional"
              : "Junior / Associate"}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Key Role Alignment
          </div>
          <div className="text-base font-bold text-emerald-400 mt-2">
            {primaryRole.role.title} ({primaryRole.matchScore}%)
          </div>
        </div>
      </div>

      {/* Tailored Interview Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-emerald-400" />
          Automated Technical & Behavioral Interview Script
        </h4>
        <p className="text-xs text-slate-400 mb-5">
          These questions are dynamically generated to probe candidate claims, top skills, and potential resume gaps.
        </p>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                  {q.category}
                </span>
                <span className="text-[10px] text-slate-500 italic">
                  Context: {q.context}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-100">
                &ldquo;{q.question}&rdquo;
              </p>

              <div className="mt-2 text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-slate-300">What interviewer should listen for: </strong>
                {q.whatRecruiterLooksFor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
