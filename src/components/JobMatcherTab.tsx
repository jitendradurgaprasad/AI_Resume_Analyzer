"use client";

import React, { useState } from "react";
import { ParsedResume } from "../lib/analyzer/sectionParser";
import { matchResumeWithJobDescription, JDMatchReport } from "../lib/analyzer/jobMatcher";
import { Briefcase, CheckCircle2, XCircle, Sparkles, Copy, Check, ArrowRight } from "lucide-react";

interface JobMatcherTabProps {
  parsed: ParsedResume;
}

const SAMPLE_JDS = [
  {
    title: "Senior Full Stack Engineer",
    text: `We are seeking a Senior Full Stack Engineer to lead architecture and scaling.
Key Responsibilities:
- Build high-throughput microservices using Node.js, TypeScript, and PostgreSQL.
- Develop responsive user interfaces using React, Next.js, and Tailwind CSS.
- Deploy and manage containerized services using Docker, Kubernetes, and AWS (ECS, S3, Lambda).
- Write automated end-to-end tests using Jest and Cypress; manage GitHub Actions CI/CD.
Requirements:
- 4+ years of professional full-stack development experience.
- Deep expertise in React, TypeScript, Node.js, PostgreSQL, Docker, AWS, and RESTful APIs.`
  },
  {
    title: "Machine Learning Engineer",
    text: `We are looking for a Machine Learning Engineer to scale our AI solutions.
Key Responsibilities:
- Build Natural Language Processing (NLP) and Retrieval-Augmented Generation (RAG) systems.
- Fine-tune models using PyTorch, Hugging Face Transformers, and Deep Learning frameworks.
- Deploy model inference endpoints using FastAPI, Docker, and AWS.
- Implement vector databases using Pinecone, Milvus, and LangChain.
Requirements:
- 3+ years experience with Python, Machine Learning, PyTorch, Scikit-Learn, and Docker.`
  }
];

export const JobMatcherTab: React.FC<JobMatcherTabProps> = ({ parsed }) => {
  const [jdText, setJdText] = useState("");
  const [matchReport, setMatchReport] = useState<JDMatchReport | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleRunMatch = () => {
    if (!jdText.trim()) return;
    const report = matchResumeWithJobDescription(parsed, jdText);
    setMatchReport(report);
  };

  const handleLoadSampleJD = (sample: typeof SAMPLE_JDS[0]) => {
    setJdText(sample.text);
    const report = matchResumeWithJobDescription(parsed, sample.text);
    setMatchReport(report);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* JD Input Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-slate-700" />
              Job Description Gap Matcher
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste a target job posting to analyze keyword coverage and receive bullet phrasing recommendations.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] text-slate-400">Presets:</span>
            {SAMPLE_JDS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadSampleJD(sample)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={6}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste Job Description here (Requirements, Responsibilities, Qualifications)..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleRunMatch}
            disabled={!jdText.trim()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition flex items-center gap-2 shadow-xs"
          >
            <span>Match Job Description</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Match Results */}
      {matchReport && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                <span
                  className={`text-2xl font-black ${
                    matchReport.overallMatchScore >= 75
                      ? "text-emerald-600"
                      : matchReport.overallMatchScore >= 50
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {matchReport.overallMatchScore}%
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">
                  Match
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {matchReport.overallMatchScore >= 75
                    ? "High Keyword Alignment"
                    : matchReport.overallMatchScore >= 50
                    ? "Moderate Alignment — Gaps Identified"
                    : "Low Keyword Coverage"}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {matchReport.recommendations[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-center">
              <div className="px-3.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-lg font-bold text-emerald-800">
                  {matchReport.matchedSkills.length}
                </div>
                <div className="text-[10px] text-emerald-700">Matched</div>
              </div>
              <div className="px-3.5 py-1.5 bg-red-50 rounded-lg border border-red-200">
                <div className="text-lg font-bold text-red-800">
                  {matchReport.missingSkills.length}
                </div>
                <div className="text-[10px] text-red-700">Missing</div>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h4 className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Covered Keywords ({matchReport.matchedSkills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {matchReport.matchedSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h4 className="text-xs font-semibold text-red-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                Missing Requested Skills ({matchReport.missingSkills.length})
              </h4>
              {matchReport.missingSkills.length === 0 ? (
                <p className="text-xs text-slate-500">100% keyword coverage! No missing core skills.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {matchReport.missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 text-xs font-medium border border-red-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Keyword Injection Tips */}
          {matchReport.keywordInjectionTips.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Suggested Phrasing for Missing Keywords
              </h4>
              <div className="space-y-3">
                {matchReport.keywordInjectionTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">
                        Target Keyword: {tip.keyword}
                      </span>
                      <button
                        onClick={() => handleCopy(tip.sampleBulletPoint, idx)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-700">
                      &ldquo;{tip.sampleBulletPoint}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
