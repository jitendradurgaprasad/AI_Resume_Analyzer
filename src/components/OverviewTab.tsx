"use client";

import React from "react";
import { ATSAuditReport } from "../lib/analyzer/scoringEngine";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { RoleMatchResult } from "../lib/analyzer/rolePredictor";
import { ScoreGauge } from "./ScoreGauge";
import {
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  TrendingUp,
  Briefcase,
  Layers,
  Zap,
  Target,
  ArrowRight
} from "lucide-react";

interface OverviewTabProps {
  parsed: ParsedResume;
  audit: ATSAuditReport;
  primaryRole: RoleMatchResult;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  parsed,
  audit,
  primaryRole,
}) => {
  const categories = [
    { key: "contact", cat: audit.breakdown.contact, icon: Mail },
    { key: "structure", cat: audit.breakdown.structure, icon: Layers },
    { key: "verbs", cat: audit.breakdown.actionVerbs, icon: Zap },
    { key: "impact", cat: audit.breakdown.quantifiableImpact, icon: TrendingUp },
    { key: "skills", cat: audit.breakdown.skillsDensity, icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Top Section: Score Gauge + Candidate Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Score Gauge Card */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xs">
          <ScoreGauge
            score={audit.overallScore}
            grade={audit.grade}
            tier={audit.tier}
          />
        </div>

        {/* Candidate Profile Details */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Evaluated Candidate
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {parsed.contact.name || "Candidate Profile"}
                </h3>
              </div>

              <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                <span>Best Fit: <strong className="text-slate-900">{primaryRole.role.title}</strong></span>
                <span className="bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded text-[10px]">
                  {primaryRole.matchScore}%
                </span>
              </div>
            </div>

            {/* Contact Presence Verification */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs">
              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  parsed.contact.email
                    ? "bg-slate-50 text-slate-700 border-slate-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                {parsed.contact.email || "Missing Email"}
              </span>

              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  parsed.contact.phone
                    ? "bg-slate-50 text-slate-700 border-slate-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                {parsed.contact.phone || "No Phone"}
              </span>

              {parsed.contact.linkedin && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-slate-50 text-slate-700 border-slate-200">
                  <Linkedin className="h-3.5 w-3.5 text-blue-600" />
                  LinkedIn
                </span>
              )}

              {parsed.contact.github && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-slate-50 text-slate-700 border-slate-200">
                  <Github className="h-3.5 w-3.5 text-slate-800" />
                  GitHub
                </span>
              )}

              {parsed.contact.location && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-slate-50 text-slate-700 border-slate-200">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {parsed.contact.location}
                </span>
              )}
            </div>

            {/* Quantitative Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-slate-900">{parsed.wordCount}</div>
                <div className="text-[10px] text-slate-500 font-medium">Words</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-emerald-600">{parsed.extractedSkills.length}</div>
                <div className="text-[10px] text-slate-500 font-medium">Skills Found</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-blue-600">{parsed.strongVerbsUsed.length}</div>
                <div className="text-[10px] text-slate-500 font-medium">Action Verbs</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-amber-600">{parsed.quantifiableMetricsCount}</div>
                <div className="text-[10px] text-slate-500 font-medium">Metrics</div>
              </div>
            </div>
          </div>

          {/* Recruiter Evaluation Takeaway */}
          <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Recruiter Evaluation Summary
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {audit.recruiterTakeaway}
            </p>
          </div>
        </div>
      </div>

      {/* 5 Scoring Pillars */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          ATS Evaluation Pillars
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map(({ key, cat, icon: Icon }) => (
            <div
              key={key}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="h-4 w-4 text-slate-700" />
                  <span className="text-xs font-bold text-slate-900">
                    {cat.score}/{cat.maxScore}
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-800">{cat.title}</h5>

                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      cat.percentage >= 80
                        ? "bg-emerald-500"
                        : cat.percentage >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-2.5 text-[11px] text-slate-600 leading-snug">
                {cat.feedback[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Red Flags Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Key Strengths ({audit.strengths.length})
          </h4>
          <ul className="space-y-2">
            {audit.strengths.map((str, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Flags */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Areas for Improvement ({audit.redFlags.length})
          </h4>
          {audit.redFlags.length === 0 ? (
            <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              No critical ATS blockers identified.
            </div>
          ) : (
            <ul className="space-y-2">
              {audit.redFlags.map((flag, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-700 flex items-start gap-2 bg-red-50/60 p-2.5 rounded-lg border border-red-100"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recommended Action Plan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Recommended Action Plan
        </h4>
        <div className="space-y-2">
          {audit.criticalFixes.map((fix, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700"
            >
              <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span>{fix}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
