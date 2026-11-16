import {
  SKILLS_TAXONOMY,
  SKILL_ALIASES,
  STRONG_ACTION_VERBS,
  WEAK_PASSIVE_VERBS,
  CLICHE_BUZZWORDS
} from "../datasets/skillsTaxonomy";

export interface ParsedContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface ParsedSection {
  title: string;
  content: string;
  lines: string[];
}

export interface ExtractedSkill {
  name: string;
  category: string;
  count: number;
}

export interface ParsedResume {
  rawText: string;
  wordCount: number;
  contact: ParsedContactInfo;
  sections: Record<string, ParsedSection>;
  allBullets: string[];
  extractedSkills: ExtractedSkill[];
  skillsByCategory: Record<string, string[]>;
  strongVerbsUsed: string[];
  weakVerbsUsed: string[];
  clichesFound: string[];
  quantifiableMetricsCount: number;
  quantifiableExamples: string[];
  readabilityScore: number; // 0 - 100
}

export function parseResumeText(rawText: string): ParsedResume {
  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const wordCount = rawText
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  // 1. Contact Information Extraction
  const contact = extractContactInfo(rawText, lines);

  // 2. Section Segmentation
  const sections = segmentSections(rawText);

  // 3. Bullet Points Extraction
  const allBullets = extractBulletPoints(rawText);

  // 4. Skills Extraction & Categorization
  const { extractedSkills, skillsByCategory } = extractSkillsFromText(rawText);

  // 5. Action Verb Analysis
  const { strongVerbsUsed, weakVerbsUsed } = analyzeVerbs(rawText);

  // 6. Cliche Buzzwords
  const clichesFound = findCliches(rawText);

  // 7. Metrics & Quantifiable Achievements
  const { count: quantifiableMetricsCount, examples: quantifiableExamples } =
    extractQuantifiableImpact(allBullets.length > 0 ? allBullets : lines);

  // 8. Readability Score (Flesch Reading Ease approximation scaled 0-100)
  const readabilityScore = calculateReadabilityScore(rawText, wordCount, lines.length);

  return {
    rawText,
    wordCount,
    contact,
    sections,
    allBullets,
    extractedSkills,
    skillsByCategory,
    strongVerbsUsed,
    weakVerbsUsed,
    clichesFound,
    quantifiableMetricsCount,
    quantifiableExamples,
    readabilityScore,
  };
}

function extractContactInfo(text: string, lines: string[]): ParsedContactInfo {
  const contact: ParsedContactInfo = {};

  // Email
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    contact.email = emailMatch[1];
  }

  // Phone
  const phoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    contact.phone = phoneMatch[0].trim();
  }

  // LinkedIn
  const linkedinRegex = /(?:linkedin\.com\/(?:in|profile)\/([a-zA-Z0-9_-]+)|linkedin\.com\/[a-zA-Z0-9_-]+)/i;
  const linkedinMatch = text.match(linkedinRegex);
  if (linkedinMatch) {
    contact.linkedin = linkedinMatch[0];
  }

  // GitHub
  const githubRegex = /(?:github\.com\/([a-zA-Z0-9_-]+))/i;
  const githubMatch = text.match(githubRegex);
  if (githubMatch) {
    contact.github = githubMatch[0];
  }

  // Portfolio / Website
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.(?:com|dev|io|tech|me|org|net|app)(?:\/[^\s]*)?)/i;
  const urlMatches = text.match(new RegExp(urlRegex, "gi"));
  if (urlMatches) {
    const portfolioCandidate = urlMatches.find(
      (u) => !u.includes("linkedin.com") && !u.includes("github.com") && !u.includes("email.com") && !u.includes("gmail.com")
    );
    if (portfolioCandidate) {
      contact.portfolio = portfolioCandidate;
    }
  }

  // Candidate Name (Typically first 1-2 lines, 2-4 capitalized words)
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    const line = lines[i];
    if (
      !line.includes("@") &&
      !line.includes("http") &&
      !line.includes("www") &&
      !line.match(/\d{3}/) &&
      line.length >= 3 &&
      line.length <= 40
    ) {
      contact.name = line.replace(/[^a-zA-Z\s.'-]/g, "").trim();
      break;
    }
  }

  // Location heuristic
  const locationRegex = /([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\s]+))/;
  const locationMatch = text.match(locationRegex);
  if (locationMatch && locationMatch[1].length < 40) {
    contact.location = locationMatch[1].trim();
  }

  return contact;
}

function segmentSections(text: string): Record<string, ParsedSection> {
  const sectionKeywords: Record<string, RegExp> = {
    summary: /^(?:professional\s+summary|summary|profile|about\s+me|objective|executive\s+summary)$/i,
    experience: /^(?:experience|work\s+experience|professional\s+experience|employment\s+history|work\s+history)$/i,
    skills: /^(?:skills|technical\s+skills|core\s+competencies|technologies|tools\s+&\s+skills|expertise)$/i,
    education: /^(?:education|academic\s+background|degrees|academic\s+qualifications)$/i,
    projects: /^(?:projects|personal\s+projects|key\s+projects|technical\s+projects|portfolio)$/i,
    certifications: /^(?:certifications|licenses|certifications\s+&\s+licenses|awards\s+&\s+certifications)$/i,
  };

  const lines = text.split("\n");
  const result: Record<string, ParsedSection> = {};
  let currentKey = "header";
  let currentLines: string[] = [];

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    // Check if trimmed line is a section header
    let matchedKey: string | null = null;
    const cleanHeader = trimmed.replace(/^#+\s*/, "").replace(/[:\-_]$/, "").trim();

    for (const [key, regex] of Object.entries(sectionKeywords)) {
      if (regex.test(cleanHeader)) {
        matchedKey = key;
        break;
      }
    }

    if (matchedKey) {
      // Save previous section
      if (currentLines.length > 0) {
        result[currentKey] = {
          title: currentKey,
          content: currentLines.join("\n"),
          lines: currentLines,
        };
      }
      currentKey = matchedKey;
      currentLines = [];
    } else {
      currentLines.push(trimmed);
    }
  }

  if (currentLines.length > 0) {
    result[currentKey] = {
      title: currentKey,
      content: currentLines.join("\n"),
      lines: currentLines,
    };
  }

  return result;
}

function extractBulletPoints(text: string): string[] {
  const lines = text.split("\n");
  const bullets: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Common bullet symbols: -, *, •, ⁃, ◦, ▪, etc.
    const bulletMatch = trimmed.match(/^[-*•⁃◦▪►✓]\s*(.+)$/);
    if (bulletMatch && bulletMatch[1].length > 15) {
      bullets.push(bulletMatch[1].trim());
    } else if (trimmed.length > 30 && /^[A-Z][a-z]+ed\b/.test(trimmed)) {
      // Line starting with past tense verb (e.g. "Architected a system...")
      bullets.push(trimmed);
    }
  }

  return bullets;
}

function extractSkillsFromText(text: string): {
  extractedSkills: ExtractedSkill[];
  skillsByCategory: Record<string, string[]>;
} {
  const lowerText = " " + text.toLowerCase().replace(/[^a-z0-9#+.]/g, " ") + " ";
  const foundSkills: Map<string, { category: string; count: number }> = new Map();

  for (const [category, skills] of Object.entries(SKILLS_TAXONOMY)) {
    for (const skill of skills) {
      const cleanSkill = skill.toLowerCase();
      // Match whole word or exact bounded sequence
      const escaped = cleanSkill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(?:^|[\\s,;()/:])(${escaped})(?:[\\s,;()/:.]|$)`, "gi");
      const matches = text.match(pattern);

      if (matches && matches.length > 0) {
        const canonical = SKILL_ALIASES[cleanSkill] || skill;
        const existing = foundSkills.get(canonical);
        if (existing) {
          existing.count += matches.length;
        } else {
          foundSkills.set(canonical, {
            category,
            count: matches.length,
          });
        }
      }
    }
  }

  const extractedSkills: ExtractedSkill[] = Array.from(foundSkills.entries()).map(
    ([name, meta]) => ({
      name,
      category: meta.category,
      count: meta.count,
    })
  );

  // Group by category
  const skillsByCategory: Record<string, string[]> = {};
  for (const skill of extractedSkills) {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill.name);
  }

  return { extractedSkills, skillsByCategory };
}

function analyzeVerbs(text: string): {
  strongVerbsUsed: string[];
  weakVerbsUsed: string[];
} {
  const lower = text.toLowerCase();
  const strong: Set<string> = new Set();
  const weak: Set<string> = new Set();

  for (const verb of STRONG_ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, "i");
    if (regex.test(lower)) {
      strong.add(verb);
    }
  }

  for (const verb of WEAK_PASSIVE_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, "i");
    if (regex.test(lower)) {
      weak.add(verb);
    }
  }

  return {
    strongVerbsUsed: Array.from(strong),
    weakVerbsUsed: Array.from(weak),
  };
}

function findCliches(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];

  for (const cliche of CLICHE_BUZZWORDS) {
    if (lower.includes(cliche.toLowerCase())) {
      found.push(cliche);
    }
  }

  return found;
}

function extractQuantifiableImpact(linesOrBullets: string[]): {
  count: number;
  examples: string[];
} {
  // Regex looks for percentages (e.g. 45%), dollar signs ($1.2M), multipliers (3x), or numbers associated with metrics
  const metricRegex = /(?:\d+(?:\.\d+)?%|\$\s*\d+(?:\.\d+)?(?:\s*[kmb]illion|\s*[kmb])?|\d+(?:\.\d+)?x\b|\b\d{2,}\+?\s*(?:users|clients|transactions|requests|ms|qps|tb|gb|hours|days|engineers|leads|dollars))/i;

  const examples: string[] = [];
  let count = 0;

  for (const item of linesOrBullets) {
    if (metricRegex.test(item)) {
      count++;
      if (examples.length < 5) {
        examples.push(item.trim());
      }
    }
  }

  return { count, examples };
}

function calculateReadabilityScore(text: string, wordCount: number, lineCount: number): number {
  if (wordCount < 50) return 40;
  const sentenceCount = Math.max(1, text.split(/[.!?]+/).length - 1);
  const wordsPerSentence = wordCount / sentenceCount;

  // Optimal resume sentence length is around 12-18 words
  let score = 100;
  if (wordsPerSentence > 25) {
    score -= (wordsPerSentence - 25) * 2;
  } else if (wordsPerSentence < 8) {
    score -= (8 - wordsPerSentence) * 3;
  }

  // Paragraph density check
  const wordsPerLine = wordCount / Math.max(1, lineCount);
  if (wordsPerLine > 30) {
    score -= 15; // Wall of text penalty
  }

  return Math.min(100, Math.max(30, Math.round(score)));
}
