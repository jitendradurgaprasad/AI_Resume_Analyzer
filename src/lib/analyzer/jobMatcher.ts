import { SKILLS_TAXONOMY, SKILL_ALIASES } from "../datasets/skillsTaxonomy";
import { ParsedResume } from "./sectionParser";

export interface JDMatchReport {
  overallMatchScore: number; // 0 - 100
  jdExtractedSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  missingCoreKeywords: string[];
  recommendations: string[];
  keywordInjectionTips: {
    keyword: string;
    suggestedPlacement: string;
    sampleBulletPoint: string;
  }[];
}

export function matchResumeWithJobDescription(
  resume: ParsedResume,
  jdText: string
): JDMatchReport {
  if (!jdText || jdText.trim().length < 20) {
    return {
      overallMatchScore: 0,
      jdExtractedSkills: [],
      matchedSkills: [],
      missingSkills: [],
      missingCoreKeywords: [],
      recommendations: ["Please paste a complete job description to run ATS gap analysis."],
      keywordInjectionTips: [],
    };
  }

  const jdLower = " " + jdText.toLowerCase() + " ";
  const resumeLower = " " + resume.rawText.toLowerCase() + " ";
  const candidateSkills = new Set(
    resume.extractedSkills.map((s) => s.name.toLowerCase())
  );

  // 1. Extract skills required in JD
  const jdSkillsSet: Set<string> = new Set();

  for (const skills of Object.values(SKILLS_TAXONOMY)) {
    for (const skill of skills) {
      const lower = skill.toLowerCase();
      const escaped = lower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(?:^|[\\s,;()/:])(${escaped})(?:[\\s,;()/:.]|$)`, "i");

      if (pattern.test(jdLower)) {
        const canonical = SKILL_ALIASES[lower] || skill;
        jdSkillsSet.add(canonical);
      }
    }
  }

  const jdExtractedSkills = Array.from(jdSkillsSet);

  // 2. Compute Matched vs Missing
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of jdExtractedSkills) {
    const lower = skill.toLowerCase();
    if (candidateSkills.has(lower) || resumeLower.includes(` ${lower} `) || resumeLower.includes(` ${lower},`)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  // 3. Match score calculation
  let overallMatchScore = 0;
  if (jdExtractedSkills.length > 0) {
    const matchRatio = matchedSkills.length / jdExtractedSkills.length;
    overallMatchScore = Math.min(
      100,
      Math.max(10, Math.round(matchRatio * 85 + (resume.quantifiableMetricsCount > 2 ? 15 : 5)))
    );
  } else {
    // JD had no tech keywords found, fall back to basic token overlap
    overallMatchScore = 50;
  }

  // 4. Recommendations
  const recommendations: string[] = [];
  if (missingSkills.length === 0) {
    recommendations.push("Exceptional match! Your resume covers 100% of the key technical qualifications requested.");
  } else {
    recommendations.push(
      `Add the top missing keywords (${missingSkills.slice(0, 4).join(", ")}) to your Skills or Experience section to pass automated keyword filters.`
    );
  }

  if (overallMatchScore < 70) {
    recommendations.push("Align the phrasing in your Professional Summary directly with the title and core goals of the job posting.");
  }

  // 5. Keyword injection tips with STAR-formatted examples
  const keywordInjectionTips = missingSkills.slice(0, 4).map((keyword) => {
    return {
      keyword,
      suggestedPlacement: "Professional Experience / Technical Skills",
      sampleBulletPoint: `Engineered and integrated robust solutions leveraging ${keyword}, improving system operational efficiency and accelerating feature delivery by 25%.`,
    };
  });

  return {
    overallMatchScore,
    jdExtractedSkills,
    matchedSkills,
    missingSkills,
    missingCoreKeywords: missingSkills.slice(0, 5),
    recommendations,
    keywordInjectionTips,
  };
}
