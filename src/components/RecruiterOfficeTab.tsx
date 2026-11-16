"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { ATSAuditReport } from "../lib/analyzer/scoringEngine";
import { RoleMatchResult } from "../lib/analyzer/rolePredictor";
import { generateRecruiterInterviewQuestions, InterviewQuestion } from "../lib/analyzer/recruiterQuestions";
import { exportAuditPdf } from "../lib/export/pdfReport";
import { Download, Building, HelpCircle, CheckCircle2, ShieldAlert } from "lucide-react";

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
      {/* Top Banner & Export */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider">
            Office & Hiring Suite
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Building className="h-5 w-5 text-slate-700" />
            Recruiter Dossier & Interview Prep
          </h3>
          <p className="text-xs text-slate-500">
            Tailored candidate questions, risk flags, and official downloadable ATS report.
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          disabled={isExporting}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition flex items-center gap-2 shrink-0 shadow-xs"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Generating PDF..." : "Download Official ATS Report (PDF)"}
        </button>
      </div>

      {/* Decision Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Hiring Verdict
          </div>
          <div className="mt-2">
            {audit.overallScore >= 75 ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 w-fit">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Advance to Technical Screen
              </span>
            ) : audit.overallScore >= 55 ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 w-fit">
                Hold / Request Project Evidence
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200 flex items-center gap-1.5 w-fit">
                <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
                High Risk of ATS Filter Rejection
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Seniority Estimate
          </div>
          <div className="text-base font-bold text-slate-900 mt-2">
            {parsed.wordCount > 600 && parsed.quantifiableMetricsCount >= 4
              ? "Mid-Senior Level Professional"
              : parsed.extractedSkills.length >= 10
              ? "Mid-Level Professional"
              : "Junior / Associate"}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Primary Matched Role
          </div>
          <div className="text-base font-bold text-slate-900 mt-2">
            {primaryRole.role.title} ({primaryRole.matchScore}%)
          </div>
        </div>
      </div>

      {/* Generated Interview Questions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-slate-700" />
          Dynamically Generated Interview Questions
        </h4>
        <p className="text-xs text-slate-500 mb-4">
          Custom technical and behavioral questions formulated based on candidate claims and resume highlights.
        </p>

        <div className="space-y-3.5">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-800 border border-slate-200">
                  {q.category}
                </span>
                <span className="text-[10px] text-slate-500 italic">
                  Context: {q.context}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-900">
                &ldquo;{q.question}&rdquo;
              </p>

              <div className="mt-2 text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                <strong className="text-slate-800">Interviewer evaluation criteria: </strong>
                {q.whatRecruiterLooksFor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
