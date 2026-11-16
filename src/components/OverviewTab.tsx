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
  Globe,
  MapPin,
  TrendingUp,
  Briefcase,
  Layers,
  Zap,
  Target
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
      {/* Top Banner: Score Gauge + Candidate Identity & Primary Best Fit Role */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Gauge Card */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute top-2 left-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Applicant Tracking System Health
          </div>
          <div className="mt-4">
            <ScoreGauge
              score={audit.overallScore}
              grade={audit.grade}
              tier={audit.tier}
            />
          </div>
        </div>

        {/* Candidate Info & Role Fit Card */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Extracted Profile
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {parsed.contact.name || "Identified Candidate"}
                </h3>
              </div>

              <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-emerald-400" />
                <span>
                  Best Fit: <strong className="text-white">{primaryRole.role.title}</strong>
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  {primaryRole.matchScore}% Fit
                </span>
              </div>
            </div>

            {/* Contact Status Pills */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs">
              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  parsed.contact.email
                    ? "bg-slate-800/80 text-slate-200 border-slate-700"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                {parsed.contact.email || "Missing Email"}
              </span>

              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  parsed.contact.phone
                    ? "bg-slate-800/80 text-slate-200 border-slate-700"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}
              >
                <Phone className="h-3.5 w-3.5 text-cyan-400" />
                {parsed.contact.phone || "No Phone"}
              </span>

              {parsed.contact.linkedin && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-slate-800/80 text-slate-200 border-slate-700">
                  <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                  LinkedIn Verified
                </span>
              )}

              {parsed.contact.github && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-slate-800/80 text-slate-200 border-slate-700">
                  <Github className="h-3.5 w-3.5 text-purple-400" />
                  GitHub Linked
                </span>
              )}

              {parsed.contact.location && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-slate-800/80 text-slate-200 border-slate-700">
                  <MapPin className="h-3.5 w-3.5 text-pink-400" />
                  {parsed.contact.location}
                </span>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800 text-center">
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-xl font-bold text-white">{parsed.wordCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">Word Count</div>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-xl font-bold text-emerald-400">{parsed.extractedSkills.length}</div>
                <div className="text-[10px] text-slate-400 font-medium">Identified Skills</div>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-xl font-bold text-blue-400">{parsed.strongVerbsUsed.length}</div>
                <div className="text-[10px] text-slate-400 font-medium">Action Verbs</div>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-xl font-bold text-amber-400">{parsed.quantifiableMetricsCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">Quantified Data</div>
              </div>
            </div>
          </div>

          {/* Recruiter Takeaway Banner */}
          <div className="mt-5 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Recruiter Evaluation Insight
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {audit.recruiterTakeaway}
            </p>
          </div>
        </div>
      </div>

      {/* 5-Pillar Score Breakdown Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="h-4 w-4 text-emerald-400" />
          ATS Core Evaluation Pillars
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {categories.map(({ key, cat, icon: Icon }) => (
            <div
              key={key}
              className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">
                    {cat.score}/{cat.maxScore}
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-200">{cat.title}</h5>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
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

              <div className="mt-3 text-[11px] text-slate-400 leading-snug">
                {cat.feedback[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Red Flags Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Identified Resume Strengths ({audit.strengths.length})
          </h4>
          <ul className="space-y-2.5">
            {audit.strengths.map((strength, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 flex items-start gap-2.5 bg-emerald-500/5 p-2.5 rounded-xl border border-emerald-500/10"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Flags & Risks */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            ATS Risks & Red Flags ({audit.redFlags.length})
          </h4>
          {audit.redFlags.length === 0 ? (
            <div className="text-xs text-slate-400 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-center">
              No critical red flags detected! Excellent ATS compliance.
            </div>
          ) : (
            <ul className="space-y-2.5">
              {audit.redFlags.map((flag, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-300 flex items-start gap-2.5 bg-red-500/5 p-2.5 rounded-xl border border-red-500/10"
                >
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Critical Recommendations Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" />
          High Priority Optimization Action Plan
        </h4>
        <div className="space-y-2">
          {audit.criticalFixes.map((fix, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300"
            >
              <span className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
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
