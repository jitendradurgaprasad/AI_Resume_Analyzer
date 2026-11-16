"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "../../components/Header";
import { CreatorFooter } from "../../components/CreatorFooter";
import { OverviewTab } from "../../components/OverviewTab";
import { SkillsTab } from "../../components/SkillsTab";
import { JobMatcherTab } from "../../components/JobMatcherTab";
import { BulletOptimizerTab } from "../../components/BulletOptimizerTab";
import { RecruiterOfficeTab } from "../../components/RecruiterOfficeTab";

import { loadAnalysis, saveAnalysis, StoredAnalysis } from "../../lib/storage/resumeStore";
import { SAMPLE_RESUMES } from "../../lib/datasets/jobRoles";
import { parseResumeText } from "../../lib/analyzer/sectionParser";
import { computeATSScore } from "../../lib/analyzer/scoringEngine";
import { predictJobRoles } from "../../lib/analyzer/rolePredictor";
import { exportAuditPdf } from "../../lib/export/pdfReport";

import {
  ArrowLeft,
  Download,
  Layers,
  Tag,
  Briefcase,
  Zap,
  Building,
  CheckCircle2,
  FileText
} from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<StoredAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "skills" | "matcher" | "optimizer" | "office"
  >("overview");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const cached = loadAnalysis();
    if (cached) {
      setData(cached);
    } else {
      // Fallback: analyze default sample so direct URL access works smoothly
      const sample = SAMPLE_RESUMES[0];
      const parsed = parseResumeText(sample.text);
      const audit = computeATSScore(parsed);
      const prediction = predictJobRoles(parsed);
      const initial: StoredAnalysis = {
        rawText: sample.text,
        fileName: `${sample.role}.txt`,
        parsed,
        audit,
        prediction,
        timestamp: Date.now(),
      };
      saveAnalysis(initial);
      setData(initial);
    }
  }, []);

  const handleDownloadPdf = () => {
    if (!data) return;
    setIsExporting(true);
    try {
      exportAuditPdf(data.parsed, data.audit, data.prediction.primaryRole);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSampleSwitch = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (!sample) return;
    const parsed = parseResumeText(sample.text);
    const audit = computeATSScore(parsed);
    const prediction = predictJobRoles(parsed);
    const updated: StoredAnalysis = {
      rawText: sample.text,
      fileName: `${sample.role}.txt`,
      parsed,
      audit,
      prediction,
      timestamp: Date.now(),
    };
    saveAnalysis(updated);
    setData(updated);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-sm text-slate-500 font-medium">
          Loading resume audit...
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "overview",
      label: "ATS Score & Audit",
      icon: Layers,
      badge: `${data.audit.overallScore}/100`,
    },
    {
      id: "skills",
      label: "Skills & Role Fit",
      icon: Tag,
      badge: `${data.parsed.extractedSkills.length}`,
    },
    {
      id: "matcher",
      label: "Job Description Matcher",
      icon: Briefcase,
    },
    {
      id: "optimizer",
      label: "STAR Bullet Rewriter",
      icon: Zap,
    },
    {
      id: "office",
      label: "Recruiter Suite & Guide",
      icon: Building,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header onLoadSample={handleSampleSwitch} />

        {/* Sub-header Bar: Back to Upload, Candidate Name, Quick Download Action */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Upload New Resume</span>
              </Link>

              <div className="h-4 w-px bg-slate-200 hidden sm:block" />

              <div>
                <span className="text-xs font-semibold text-slate-900">
                  {data.parsed.contact.name || "Candidate"}
                </span>
                {data.fileName && (
                  <span className="text-[11px] text-slate-500 ml-2">
                    ({data.fileName})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                Score: {data.audit.overallScore}/100 ({data.audit.grade})
              </div>

              <button
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{isExporting ? "Exporting..." : "Download PDF"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Minimal Tab Bar */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-2.5 px-3.5 text-xs font-medium rounded-lg whitespace-nowrap transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {"badge" in tab && tab.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Active Tab View */}
          {activeTab === "overview" && (
            <OverviewTab
              parsed={data.parsed}
              audit={data.audit}
              primaryRole={data.prediction.primaryRole}
            />
          )}

          {activeTab === "skills" && (
            <SkillsTab
              parsed={data.parsed}
              rankedRoles={data.prediction.rankedRoles}
            />
          )}

          {activeTab === "matcher" && (
            <JobMatcherTab parsed={data.parsed} />
          )}

          {activeTab === "optimizer" && (
            <BulletOptimizerTab parsed={data.parsed} />
          )}

          {activeTab === "office" && (
            <RecruiterOfficeTab
              parsed={data.parsed}
              audit={data.audit}
              primaryRole={data.prediction.primaryRole}
            />
          )}
        </main>
      </div>

      {/* Creator Details at the end of the website */}
      <CreatorFooter />
    </div>
  );
}
