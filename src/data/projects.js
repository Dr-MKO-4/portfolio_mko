import { FEATURED_PROJECTS } from "./p-featured.js";
import { RESEARCH_PRO } from "./p-research-pro.js";
import { OTHER_PROJECTS } from "./p-projects.js";

export const CATEGORIES = [
  { key: "ia", label: { fr: "IA & Data", en: "AI & Data" } },
  { key: "research", label: { fr: "Recherche", en: "Research" } },
  { key: "fullstack", label: { fr: "Full-stack", en: "Full-stack" } },
  { key: "mobile", label: { fr: "Mobile", en: "Mobile" } },
  { key: "web", label: { fr: "Web", en: "Web" } },
  { key: "desktop", label: { fr: "Desktop", en: "Desktop" } },
  { key: "systems", label: { fr: "Systèmes", en: "Systems" } },
  { key: "concept", label: { fr: "Conception", en: "Design" } },
  { key: "academic", label: { fr: "Académique", en: "Academic" } },
];

export const PROJECTS = [...RESEARCH_PRO, ...FEATURED_PROJECTS, ...OTHER_PROJECTS]
  .map((p) => ({ ...p, name: { fr: p.title, en: p.titleEn || p.title } }))
  .sort((a, b) => a.order - b.order);

export const FEATURED = PROJECTS.filter((p) => p.featured);

export const publicRepoCount = new Set(
  PROJECTS.flatMap((p) => (p.links || []).map((l) => l.url).filter((u) => u.startsWith("https://github.com/")))
).size;
