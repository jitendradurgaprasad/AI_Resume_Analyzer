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
    title: "Senior Full Stack Engineer (FinTech)",
    text: `Job Description:
We are seeking a Senior Full Stack Engineer to lead the architecture and scaling of our global payments platform.
Responsibilities:
- Build resilient, high-throughput microservices using Node.js, TypeScript, and Go.
- Develop interactive, accessible user interfaces using React, Next.js, and Tailwind CSS.
- Design relational schemas and query optimizations in PostgreSQL and Redis.
- Deploy and manage containerized services using Docker, Kubernetes, and AWS (ECS, S3, Lambda).
- Write automated end-to-end tests using Jest and Cypress; participate in CI/CD pipeline deployments via GitHub Actions.
- Collaborate with product managers and mentors junior team members.
Requirements:
- 4+ years of professional full-stack development experience.
- Deep expertise in React, TypeScript, Node.js, PostgreSQL, Docker, AWS, GraphQL, and RESTful APIs.`
  },
  {
    title: "Senior Machine Learning Engineer (Generative AI & LLMs)",
    text: `Job Description:
We are looking for a Machine Learning Engineer to scale our enterprise AI solutions and custom LLM inference pipelines.
Key Responsibilities:
- Build and evaluate state-of-the-art Natural Language Processing (NLP) and Retrieval-Augmented Generation (RAG) systems.
- Fine-tune open-source LLMs using PyTorch, Hugging Face Transformers, and Deep Learning frameworks.
- Deploy scalable model inference services using FastAPI, Docker, and AWS SageMaker.
- Implement vector search databases using Pinecone, Milvus, and LangChain.
- Monitor model performance and drift using MLOps tools like MLflow and Weights & Biases.
Required Qualifications:
- 3+ years experience with Python, Machine Learning, PyTorch, Scikit-Learn, and Docker.
- Strong foundation in linear algebra, statistics, and LLM fine-tuning techniques.`
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
      {/* Input JD Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-400" />
              Target Job Description Matching & Gap Analysis
            </h3>
            <p className="text-xs text-slate-400">
              Paste a target job posting to analyze ATS keyword coverage, missing competencies, and tailored bullet point suggestions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline">Try preset:</span>
            {SAMPLE_JDS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadSampleJD(sample)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded-lg border border-slate-700 transition"
              >
                {sample.title.split("(")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={6}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste Job Description here (Requirements, Responsibilities, Qualifications)..."
          className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleRunMatch}
            disabled={!jdText.trim()}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Calculate Job Description Match Score
          </button>
        </div>
      </div>

      {/* Match Results Display */}
      {matchReport && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
                <span
                  className={`text-3xl font-black ${
                    matchReport.overallMatchScore >= 75
                      ? "text-emerald-400"
                      : matchReport.overallMatchScore >= 50
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {matchReport.overallMatchScore}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                  Match
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  {matchReport.overallMatchScore >= 75
                    ? "Excellent ATS Qualification Fit"
                    : matchReport.overallMatchScore >= 50
                    ? "Moderate Fit — Keywords Needed"
                    : "Low Fit — Significant Gaps"}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {matchReport.recommendations[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center">
              <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <div className="text-xl font-bold text-emerald-400">
                  {matchReport.matchedSkills.length}
                </div>
                <div className="text-[10px] text-slate-400">Matched Skills</div>
              </div>
              <div className="px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="text-xl font-bold text-red-400">
                  {matchReport.missingSkills.length}
                </div>
                <div className="text-[10px] text-slate-400">Missing Skills</div>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Covered ATS Keywords ({matchReport.matchedSkills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {matchReport.matchedSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                Missing Requested Skills ({matchReport.missingSkills.length})
              </h4>
              {matchReport.missingSkills.length === 0 ? (
                <p className="text-xs text-slate-400">100% keyword coverage! No missing core skills.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {matchReport.missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20"
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Recommended STAR Phrasing to Fill Missing Keywords
              </h4>
              <div className="space-y-3">
                {matchReport.keywordInjectionTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-400">
                        Target Keyword: {tip.keyword}
                      </span>
                      <button
                        onClick={() => handleCopy(tip.sampleBulletPoint, idx)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">
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
