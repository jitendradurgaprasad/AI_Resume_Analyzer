import { ParsedResume } from "./sectionParser";

export interface ScoreCategory {
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  feedback: string[];
  status: "excellent" | "good" | "needs-improvement" | "poor";
}

export interface ATSAuditReport {
  overallScore: number;
  grade: string;
  tier: "Elite" | "Competitive" | "Borderline" | "High Risk";
  breakdown: {
    contact: ScoreCategory;
    structure: ScoreCategory;
    actionVerbs: ScoreCategory;
    quantifiableImpact: ScoreCategory;
    skillsDensity: ScoreCategory;
  };
  strengths: string[];
  redFlags: string[];
  criticalFixes: string[];
  recruiterTakeaway: string;
}

export function computeATSScore(parsed: ParsedResume): ATSAuditReport {
  // 1. Contact & Identity (15 pts)
  const contactFeedback: string[] = [];
  let contactScore = 0;

  if (parsed.contact.email) {
    contactScore += 4;
    contactFeedback.push("Professional email address found.");
  } else {
    contactFeedback.push("Missing contact email — critical ATS blocker.");
  }

  if (parsed.contact.phone) {
    contactScore += 3;
    contactFeedback.push("Phone number detected.");
  } else {
    contactFeedback.push("Missing phone number.");
  }

  if (parsed.contact.linkedin) {
    contactScore += 4;
    contactFeedback.push("LinkedIn profile URL present.");
  } else {
    contactFeedback.push("Missing LinkedIn profile link.");
  }

  if (parsed.contact.github || parsed.contact.portfolio) {
    contactScore += 4;
    contactFeedback.push("GitHub or Portfolio link included.");
  } else {
    contactFeedback.push("Consider including a GitHub or portfolio website link.");
  }

  const contactCategory: ScoreCategory = {
    title: "Contact & Identity",
    score: contactScore,
    maxScore: 15,
    percentage: Math.round((contactScore / 15) * 100),
    feedback: contactFeedback,
    status: contactScore >= 13 ? "excellent" : contactScore >= 10 ? "good" : "needs-improvement",
  };

  // 2. Structural Integrity & Standard Sections (20 pts)
  const structureFeedback: string[] = [];
  let structureScore = 0;
  const sectionsPresent = Object.keys(parsed.sections);

  if (parsed.sections.experience) {
    structureScore += 6;
    structureFeedback.push("Experience section is clearly demarcated.");
  } else {
    structureFeedback.push("No explicit Experience section header detected.");
  }

  if (parsed.sections.education) {
    structureScore += 4;
    structureFeedback.push("Education section properly identified.");
  } else {
    structureFeedback.push("Missing clear Education section.");
  }

  if (parsed.sections.skills) {
    structureScore += 5;
    structureFeedback.push("Dedicated Skills / Technical Competencies section detected.");
  } else {
    structureFeedback.push("Skills are not grouped into a dedicated section.");
  }

  if (parsed.sections.summary) {
    structureScore += 3;
    structureFeedback.push("Executive Summary / Professional Objective found.");
  } else {
    structureFeedback.push("Adding a crisp 2-3 line Summary section helps recruiter scanning.");
  }

  if (parsed.sections.projects || parsed.sections.certifications) {
    structureScore += 2;
    structureFeedback.push("Projects or Certifications section included.");
  }

  // Word count health check
  if (parsed.wordCount >= 350 && parsed.wordCount <= 850) {
    structureFeedback.push(`Optimal resume length (${parsed.wordCount} words).`);
  } else if (parsed.wordCount < 300) {
    structureScore = Math.max(0, structureScore - 3);
    structureFeedback.push(`Resume is brief (${parsed.wordCount} words). Expand on accomplishments.`);
  } else if (parsed.wordCount > 1000) {
    structureScore = Math.max(0, structureScore - 2);
    structureFeedback.push(`Resume is lengthy (${parsed.wordCount} words). Streamline to 1-2 pages.`);
  }

  const structureCategory: ScoreCategory = {
    title: "Structure & Section Standards",
    score: structureScore,
    maxScore: 20,
    percentage: Math.round((structureScore / 20) * 100),
    feedback: structureFeedback,
    status: structureScore >= 17 ? "excellent" : structureScore >= 13 ? "good" : "needs-improvement",
  };

  // 3. Action Verbs & Power Phrasing (25 pts)
  const verbFeedback: string[] = [];
  let verbScore = 0;

  const strongCount = parsed.strongVerbsUsed.length;
  const weakCount = parsed.weakVerbsUsed.length;

  if (strongCount >= 8) {
    verbScore += 20;
    verbFeedback.push(`Strong vocabulary: ${strongCount} distinct power action verbs detected.`);
  } else if (strongCount >= 4) {
    verbScore += 14;
    verbFeedback.push(`Good action verbs (${strongCount} found). Add more verbs like Spearheaded, Engineered, Optimized.`);
  } else {
    verbScore += 6;
    verbFeedback.push(`Low density of action verbs (${strongCount} found). Replace passive phrasing.`);
  }

  // Penalty for weak verbs
  if (weakCount > 3) {
    verbScore = Math.max(0, verbScore - 5);
    verbFeedback.push(`Detected ${weakCount} passive verbs (${parsed.weakVerbsUsed.slice(0, 3).join(", ")}). Upgrade to active verbs.`);
  } else if (weakCount === 0) {
    verbScore += 5;
    verbFeedback.push("Zero passive or weak verbs detected! Great phrasing tone.");
  } else {
    verbScore += 2;
  }

  // Cliche check
  if (parsed.clichesFound.length > 0) {
    verbScore = Math.max(0, verbScore - 3);
    verbFeedback.push(`Avoid overused buzzwords: "${parsed.clichesFound.join('", "')}".`);
  }

  const verbCategory: ScoreCategory = {
    title: "Action Verbs & Vocabulary Impact",
    score: Math.min(25, verbScore),
    maxScore: 25,
    percentage: Math.round((Math.min(25, verbScore) / 25) * 100),
    feedback: verbFeedback,
    status: verbScore >= 20 ? "excellent" : verbScore >= 14 ? "good" : "needs-improvement",
  };

  // 4. Quantifiable Impact & Metrics (20 pts)
  const metricFeedback: string[] = [];
  let metricScore = 0;
  const metricCount = parsed.quantifiableMetricsCount;

  if (metricCount >= 6) {
    metricScore = 20;
    metricFeedback.push(`Outstanding quantifiable proof! ${metricCount} metrics or numbers detected.`);
  } else if (metricCount >= 3) {
    metricScore = 14;
    metricFeedback.push(`Solid metrics found (${metricCount}). Quantify additional bullets with %, $, or time saved.`);
  } else if (metricCount >= 1) {
    metricScore = 8;
    metricFeedback.push(`Only ${metricCount} metric detected. ATS and recruiters prioritize numbers and data.`);
  } else {
    metricScore = 2;
    metricFeedback.push("No quantifiable metrics found. State exact results (e.g., reduced latency by 35%, grew sales by $50K).");
  }

  const metricCategory: ScoreCategory = {
    title: "Quantifiable Impact & Metrics",
    score: metricScore,
    maxScore: 20,
    percentage: Math.round((metricScore / 20) * 100),
    feedback: metricFeedback,
    status: metricScore >= 16 ? "excellent" : metricScore >= 10 ? "good" : "poor",
  };

  // 5. Technical Skills & Depth (20 pts)
  const skillsFeedback: string[] = [];
  let skillsScore = 0;
  const totalSkillsCount = parsed.extractedSkills.length;
  const categoryCount = Object.keys(parsed.skillsByCategory).length;

  if (totalSkillsCount >= 16) {
    skillsScore += 12;
    skillsFeedback.push(`High skill density: ${totalSkillsCount} recognized enterprise technologies & competencies.`);
  } else if (totalSkillsCount >= 8) {
    skillsScore += 9;
    skillsFeedback.push(`Moderate skill depth: ${totalSkillsCount} recognized skills identified.`);
  } else {
    skillsScore += 4;
    skillsFeedback.push(`Low recognized skill density (${totalSkillsCount} skills). Expand specific tools, libraries & frameworks.`);
  }

  if (categoryCount >= 4) {
    skillsScore += 8;
    skillsFeedback.push(`Well-rounded stack spanning ${categoryCount} distinct domains.`);
  } else if (categoryCount >= 2) {
    skillsScore += 5;
    skillsFeedback.push(`Skills span ${categoryCount} domains.`);
  } else {
    skillsScore += 2;
    skillsFeedback.push("Skills are concentrated in only 1 domain. Diversify with tools, databases, or cloud.");
  }

  const skillsCategory: ScoreCategory = {
    title: "Skills Breadth & Tech Stack",
    score: Math.min(20, skillsScore),
    maxScore: 20,
    percentage: Math.round((Math.min(20, skillsScore) / 20) * 100),
    feedback: skillsFeedback,
    status: skillsScore >= 16 ? "excellent" : skillsScore >= 11 ? "good" : "needs-improvement",
  };

  // Total Score calculation (out of 100)
  const overallScore = Math.min(
    100,
    contactCategory.score +
      structureCategory.score +
      verbCategory.score +
      metricCategory.score +
      skillsCategory.score
  );

  // Grade & Tier
  let grade = "C";
  let tier: ATSAuditReport["tier"] = "Borderline";

  if (overallScore >= 90) {
    grade = "A+";
    tier = "Elite";
  } else if (overallScore >= 80) {
    grade = "A";
    tier = "Competitive";
  } else if (overallScore >= 70) {
    grade = "B+";
    tier = "Competitive";
  } else if (overallScore >= 60) {
    grade = "B";
    tier = "Borderline";
  } else if (overallScore >= 50) {
    grade = "C";
    tier = "High Risk";
  } else {
    grade = "D";
    tier = "High Risk";
  }

  // Strengths
  const strengths: string[] = [];
  if (metricCount >= 4) strengths.push(`Quantified achievements with ${metricCount} numerical metrics.`);
  if (strongCount >= 6) strengths.push(`High density of strong leadership & engineering action verbs.`);
  if (totalSkillsCount >= 12) strengths.push(`Comprehensive tech stack with ${totalSkillsCount} industry skills.`);
  if (parsed.contact.linkedin && parsed.contact.email) strengths.push(`Professional contact presence verified.`);
  if (parsed.sections.experience && parsed.sections.skills) strengths.push(`Clean, standard ATS section segmentation.`);

  // Red Flags
  const redFlags: string[] = [];
  if (!parsed.contact.email) redFlags.push("CRITICAL: Missing email address prevents ATS contact parsing.");
  if (metricCount === 0) redFlags.push("No quantifiable numbers or data-driven results detected in bullets.");
  if (weakCount >= 3) redFlags.push(`Passive tone: ${weakCount} weak verbs (e.g. helped, worked on) found.`);
  if (parsed.clichesFound.length > 0) redFlags.push(`Generic buzzwords found: ${parsed.clichesFound.join(", ")}.`);
  if (totalSkillsCount < 5) redFlags.push("Extremely low recognized technical skills count.");

  // Critical fixes
  const criticalFixes: string[] = [];
  if (metricCount < 3) {
    criticalFixes.push("Rewrite experience bullets using the STAR format: Add measurable outcomes (%, $, latency, scale).");
  }
  if (weakCount > 0) {
    criticalFixes.push("Replace all passive phrases ('helped with', 'responsible for') with powerful verbs ('Spearheaded', 'Engineered').");
  }
  if (!parsed.contact.linkedin) {
    criticalFixes.push("Add a live LinkedIn profile hyperlink to boost recruiter trust and verification.");
  }
  if (totalSkillsCount < 10) {
    criticalFixes.push("Incorporate specific libraries, databases, and DevOps tools into a categorized Skills section.");
  }

  // Recruiter summary takeaway
  let recruiterTakeaway = "";
  if (tier === "Elite") {
    recruiterTakeaway = "Candidate profile is highly compelling, well-structured, and ATS-optimized. Metrics demonstrate clear business ROI and strong technical execution.";
  } else if (tier === "Competitive") {
    recruiterTakeaway = "Strong resume that will pass initial ATS screening filters. Minor additions of quantifiable metrics and skill tags will elevate this into the top 5% candidate tier.";
  } else if (tier === "Borderline") {
    recruiterTakeaway = "Candidate has relevant skills, but the resume lacks sufficient quantifiable proof and power verbs. ATS parsers may rank this in the middle tier.";
  } else {
    recruiterTakeaway = "High risk of ATS rejection due to missing sections, passive wording, or absent metrics. Needs comprehensive structural and content overhaul.";
  }

  return {
    overallScore,
    grade,
    tier,
    breakdown: {
      contact: contactCategory,
      structure: structureCategory,
      actionVerbs: verbCategory,
      quantifiableImpact: metricCategory,
      skillsDensity: skillsCategory,
    },
    strengths,
    redFlags,
    criticalFixes,
    recruiterTakeaway,
  };
}
