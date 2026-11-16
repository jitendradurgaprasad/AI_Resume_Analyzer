import { ParsedResume } from "../analyzer/sectionParser";
import { ATSAuditReport } from "../analyzer/scoringEngine";
import { PredictionAnalysis } from "../analyzer/rolePredictor";

export interface StoredAnalysis {
  rawText: string;
  fileName?: string;
  parsed: ParsedResume;
  audit: ATSAuditReport;
  prediction: PredictionAnalysis;
  timestamp: number;
}

const STORAGE_KEY = "resumatch_analysis_data";

export function saveAnalysis(data: StoredAnalysis): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to cache analysis to sessionStorage:", e);
  }
}

export function loadAnalysis(): StoredAnalysis | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse cached analysis:", e);
    return null;
  }
}

export function clearAnalysis(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear cached analysis:", e);
  }
}
