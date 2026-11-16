import { BENCHMARK_JOB_ROLES, JobRoleBenchmark } from "../datasets/jobRoles";
import { ParsedResume } from "./sectionParser";

export interface RoleMatchResult {
  role: JobRoleBenchmark;
  matchScore: number; // 0 - 100
  matchedSkills: string[];
  missingSkills: string[];
  matchingImpactKeywords: string[];
  suitability: "High" | "Moderate" | "Emerging";
}

export interface PredictionAnalysis {
  primaryRole: RoleMatchResult;
  rankedRoles: RoleMatchResult[];
  alternativeCareerPaths: RoleMatchResult[];
}

export function predictJobRoles(parsed: ParsedResume): PredictionAnalysis {
  const candidateSkillsSet = new Set(
    parsed.extractedSkills.map((s) => s.name.toLowerCase())
  );
  const resumeTextLower = parsed.rawText.toLowerCase();

  const results: RoleMatchResult[] = BENCHMARK_JOB_ROLES.map((role) => {
    // 1. Core skills match (weighted 65%)
    let coreMatches = 0;
    const matchedCore: string[] = [];
    const missingCore: string[] = [];

    for (const skill of role.coreSkills) {
      const lower = skill.toLowerCase();
      if (candidateSkillsSet.has(lower) || resumeTextLower.includes(lower)) {
        coreMatches++;
        matchedCore.push(skill);
      } else {
        missingCore.push(skill);
      }
    }
    const coreRatio = role.coreSkills.length > 0 ? coreMatches / role.coreSkills.length : 0;

    // 2. Secondary skills match (weighted 25%)
    let secMatches = 0;
    const matchedSec: string[] = [];
    for (const skill of role.secondarySkills) {
      const lower = skill.toLowerCase();
      if (candidateSkillsSet.has(lower) || resumeTextLower.includes(lower)) {
        secMatches++;
        matchedSec.push(skill);
      }
    }
    const secRatio = role.secondarySkills.length > 0 ? secMatches / role.secondarySkills.length : 0;

    // 3. Impact keywords match (weighted 10%)
    let impactMatches = 0;
    const matchingImpacts: string[] = [];
    for (const kw of role.expectedImpactKeywords) {
      if (resumeTextLower.includes(kw.toLowerCase())) {
        impactMatches++;
        matchingImpacts.push(kw);
      }
    }
    const impactRatio = role.expectedImpactKeywords.length > 0 ? impactMatches / role.expectedImpactKeywords.length : 0;

    // Composite Match Score
    const compositeScore = Math.min(
      98,
      Math.max(
        15,
        Math.round(coreRatio * 65 + secRatio * 25 + impactRatio * 10)
      )
    );

    let suitability: RoleMatchResult["suitability"] = "Emerging";
    if (compositeScore >= 75) suitability = "High";
    else if (compositeScore >= 50) suitability = "Moderate";

    return {
      role,
      matchScore: compositeScore,
      matchedSkills: [...matchedCore, ...matchedSec],
      missingSkills: missingCore,
      matchingImpactKeywords: matchingImpacts,
      suitability,
    };
  });

  // Sort descending by matchScore
  results.sort((a, b) => b.matchScore - a.matchScore);

  const primaryRole = results[0];
  const rankedRoles = results.slice(0, 5);
  const alternativeCareerPaths = results.slice(1, 4);

  return {
    primaryRole,
    rankedRoles,
    alternativeCareerPaths,
  };
}
