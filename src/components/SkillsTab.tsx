"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { RoleMatchResult } from "../lib/analyzer/rolePredictor";
import { Search, Tag, Cpu, CheckCircle2, TrendingUp, Layers } from "lucide-react";

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
      {/* Top Banner: Career Path Match Rankings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-emerald-400" />
              Machine Learning Role Fit & Skill Alignment
            </h3>
            <p className="text-xs text-slate-400">
              Vector matching of extracted competencies against 25+ industry benchmark role profiles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankedRoles.slice(0, 3).map((match, idx) => (
            <div
              key={match.role.id}
              className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Rank #{idx + 1}
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {match.matchScore}% Fit
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">
                  {match.role.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {match.role.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-semibold mb-1">
                  Matched Core Skills:
                </div>
                <div className="flex flex-wrap gap-1">
                  {match.matchedSkills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-[10px]"
                    >
                      {skill}
                    </span>
                  ))}
                  {match.matchedSkills.length > 4 && (
                    <span className="px-1.5 py-0.5 text-slate-500 text-[10px]">
                      +{match.matchedSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Browser Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Tag className="h-5 w-5 text-emerald-400" />
              Extracted Skills & Competency Matrix ({parsed.extractedSkills.length})
            </h3>
            <p className="text-xs text-slate-400">
              Taxonomy classification spanning software, cloud, AI, data, and soft competencies.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter extracted skills..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 text-xs mb-4 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            All Skills ({parsed.extractedSkills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {cat.replace(/([A-Z])/g, " $1")} (
              {parsed.skillsByCategory[cat]?.length || 0})
            </button>
          ))}
        </div>

        {/* Skills Tag Cloud */}
        {filteredSkills.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800">
            No skills found matching &quot;{searchTerm}&quot;
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-xs text-slate-200 transition group"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 transition">
                  x{skill.count}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 capitalize">
                  {skill.category.replace(/([A-Z])/g, " $1")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Verbs vs Passive Verbs breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Strong Action Verbs Detected ({parsed.strongVerbsUsed.length})
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Recruiter-preferred leadership and engineering impact verbs.
          </p>
          {parsed.strongVerbsUsed.length === 0 ? (
            <p className="text-xs text-slate-500">None detected. Consider adding verbs like Spearheaded, Engineered, Architected.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {parsed.strongVerbsUsed.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 capitalize"
                >
                  {v}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            Quantified Achievement Highlights ({parsed.quantifiableMetricsCount})
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Data points, percentages, latency boosts, and dollar metrics detected.
          </p>
          {parsed.quantifiableExamples.length === 0 ? (
            <p className="text-xs text-slate-500">No numerical metrics detected in experience bullets.</p>
          ) : (
            <ul className="space-y-2">
              {parsed.quantifiableExamples.map((ex, i) => (
                <li
                  key={i}
                  className="text-xs text-slate-300 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 line-clamp-2"
                >
                  &ldquo;{ex}&rdquo;
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
