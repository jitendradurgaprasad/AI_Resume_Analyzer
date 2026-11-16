import { WEAK_PASSIVE_VERBS } from "../datasets/skillsTaxonomy";

export interface BulletImprovement {
  original: string;
  issue: string;
  optimized: string;
  actionVerbUsed: string;
  metricAdded: string;
}

export function optimizeBullets(bullets: string[]): BulletImprovement[] {
  const suggestions: BulletImprovement[] = [];

  for (const bullet of bullets) {
    const lower = bullet.toLowerCase();

    // Check if bullet starts with or contains weak passive verb
    let foundWeakVerb: string | null = null;
    for (const weak of WEAK_PASSIVE_VERBS) {
      if (lower.startsWith(weak) || lower.includes(` ${weak} `)) {
        foundWeakVerb = weak;
        break;
      }
    }

    const hasMetric = /(?:\d+%|\$\d+|\d+x|\b\d+\s*(?:users|clients|hours|days|ms|qps))/i.test(bullet);

    if (foundWeakVerb || !hasMetric || bullet.length < 50) {
      const issue = foundWeakVerb
        ? `Starts with passive phrase "${foundWeakVerb}" and lacks measurable business impact.`
        : !hasMetric
        ? "Descriptive only; lacks quantifiable outcomes or numerical data."
        : "Too brief and vague to demonstrate engineering competence to recruiters.";

      const cleanCore = bullet
        .replace(/^(?:helped|assisted with|responsible for|worked on|did|participated in)\s*/i, "")
        .trim();

      const capitalizedCore = cleanCore.charAt(0).toLowerCase() + cleanCore.slice(1);

      // Generate strong STAR-method rewrite
      const optimized = `Spearheaded and engineered ${capitalizedCore}, optimizing pipeline execution and driving a 35% improvement in operational throughput.`;

      suggestions.push({
        original: bullet,
        issue,
        optimized,
        actionVerbUsed: "Spearheaded / Engineered",
        metricAdded: "35% improvement in operational throughput",
      });

      if (suggestions.length >= 5) break;
    }
  }

  // If no bullets met the criteria, provide proactive enhancements
  if (suggestions.length === 0 && bullets.length > 0) {
    const first = bullets[0];
    suggestions.push({
      original: first,
      issue: "Good bullet point, but can be elevated with deeper business context.",
      optimized: `Architected and scaled solutions across ${first.slice(0, 40)}..., delivering 99.9% uptime and reducing incident resolution time by 40%.`,
      actionVerbUsed: "Architected / Scaled",
      metricAdded: "99.9% uptime, 40% reduction",
    });
  }

  return suggestions;
}
