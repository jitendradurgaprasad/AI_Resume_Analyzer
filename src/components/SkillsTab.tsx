"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { RoleMatchResult } from "../lib/analyzer/rolePredictor";
import { Search, Tag, Cpu, CheckCircle2, TrendingUp } from "lucide-react";

interface SkillsTabProps {
  parsed: ParsedResume;
  rankedRoles: RoleMatchResult[];
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
  parsed,
  rankedRoles,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Object.keys(parsed.skillsByCategory);

  const filteredSkills = parsed.extractedSkills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Role Fit Benchmarks */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-slate-700" />
            Predicted Job Role Fit
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Vector similarity matching against 25+ benchmark tech roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankedRoles.slice(0, 3).map((match, idx) => (
            <div
              key={match.role.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    Rank #{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {match.matchScore}% Match
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mt-2">
                  {match.role.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {match.role.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <div className="text-[10px] text-slate-500 font-semibold mb-1">
                  Matched Skills:
                </div>
                <div className="flex flex-wrap gap-1">
                  {match.matchedSkills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[10px]"
                    >
                      {skill}
                    </span>
                  ))}
                  {match.matchedSkills.length > 4 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                      +{match.matchedSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Tag className="h-4 w-4 text-slate-700" />
              Extracted Skills ({parsed.extractedSkills.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Categorized technologies, tools, and competencies detected in your resume.
            </p>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs mb-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-lg whitespace-nowrap transition text-xs ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white font-medium"
                : "bg-slate-100 text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({parsed.extractedSkills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg capitalize whitespace-nowrap transition text-xs ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white font-medium"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat.replace(/([A-Z])/g, " $1")} ({parsed.skillsByCategory[cat]?.length || 0})
            </button>
          ))}
        </div>

        {/* Tag List */}
        {filteredSkills.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
            No skills found matching &quot;{searchTerm}&quot;
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] text-slate-400">x{skill.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Verbs vs Quantified Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Strong Action Verbs ({parsed.strongVerbsUsed.length})
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Positive leadership and engineering action verbs detected.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {parsed.strongVerbsUsed.map((v, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 capitalize"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Quantified Achievements ({parsed.quantifiableMetricsCount})
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Data points, percentages, latency boosts, and scale metrics detected.
          </p>
          <ul className="space-y-2">
            {parsed.quantifiableExamples.map((ex, i) => (
              <li
                key={i}
                className="text-xs text-slate-700 p-2.5 bg-slate-50 rounded-lg border border-slate-200"
              >
                &ldquo;{ex}&rdquo;
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
