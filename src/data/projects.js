import { FEATURED_PROJECTS } from "./p-featured.js";
import { RESEARCH_PRO } from "./p-research-pro.js";
import { OTHER_PROJECTS } from "./p-projects.js";
import VISUALS from "./visuals.json";

export const CATEGORIES = [
  {
    key: "xai",
    num: "01",
    label: { fr: "IA explicable & finance", en: "Explainable AI & finance" },
    desc: {
      fr: "Des modèles dont chaque décision se justifie : KAN, SHAP, régression symbolique, prédiction conforme. Appliqués à la fraude Mobile Money et aux statistiques monétaires.",
      en: "Models whose every decision can be justified: KAN, SHAP, symbolic regression, conformal prediction. Applied to Mobile Money fraud and monetary statistics.",
    },
    featured: ["mkan-momtsim", "beac-detect-anomalies"],
  },
  {
    key: "edge",
    num: "02",
    label: { fr: "IA embarquée (Edge AI)", en: "Edge AI" },
    desc: {
      fr: "L'IA qui tourne là où il n'y a pas de réseau : modèles quantifiés INT8, TensorFlow Lite, inférence sur mobile et lunettes connectées, synchronisation hors ligne.",
      en: "AI that runs where there is no network: INT8-quantised models, TensorFlow Lite, inference on phones and smart glasses, offline sync.",
    },
    featured: ["agrosense", "ma-ra"],
  },
  {
    key: "genai",
    num: "03",
    label: { fr: "IA générative, RAG & agents", en: "Generative AI, RAG & agents" },
    desc: {
      fr: "Assistants documentaires souverains et systèmes multi-agents : recherche hybride, GraphRAG, LLM auto-hébergés, validation humaine.",
      en: "Sovereign document assistants and multi-agent systems: hybrid retrieval, GraphRAG, self-hosted LLMs, human approval.",
    },
    featured: ["kalati-rag", "nexus-ai"],
  },
  {
    key: "ds",
    num: "04",
    label: { fr: "Data science & prédiction", en: "Data science & forecasting" },
    desc: {
      fr: "Modélisation statistique et apprentissage automatique appliqués : régression quantile, séries temporelles, clustering, apprentissage par renforcement.",
      en: "Applied statistical modelling and machine learning: quantile regression, time series, clustering, reinforcement learning.",
    },
    featured: ["predoc", "crypto-trader-dqn"],
  },
  {
    key: "security",
    num: "05",
    label: { fr: "Cybersécurité & conformité", en: "Security & compliance" },
    desc: {
      fr: "Tests de sécurité encadrés et contrôles d'accès pour des données sensibles : audit infalsifiable, MFA, moindre privilège.",
      en: "Controlled security testing and access controls for sensitive data: tamper-evident audit, MFA, least privilege.",
    },
    featured: ["meerkat", "aura-careos"],
  },
  {
    key: "platforms",
    num: "06",
    label: { fr: "Plateformes full-stack", en: "Full-stack platforms" },
    desc: {
      fr: "Produits complets mis en production : API en Clean Architecture, interfaces React, paiements Mobile Money, déploiement cloud.",
      en: "Complete products shipped to production: Clean Architecture APIs, React interfaces, Mobile Money payments, cloud deployment.",
    },
    featured: ["winplus", "homegamesfive"],
  },
  {
    key: "mobile",
    num: "07",
    label: { fr: "Mobile, fintech & santé", en: "Mobile, fintech & health" },
    desc: {
      fr: "Applications mobiles pour le paiement et l'accès aux soins : NFC, biométrie, ordonnances, livraison sécurisée.",
      en: "Mobile apps for payments and access to care: NFC, biometrics, prescriptions, secure delivery.",
    },
    featured: ["swiftpay", "pharmacon"],
  },
  {
    key: "web",
    num: "08",
    label: { fr: "Web, systèmes & desktop", en: "Web, systems & desktop" },
    desc: {
      fr: "Sites, outils système et logiciels de bureau : référencement, Rust, WPF, installateurs Windows.",
      en: "Websites, systems tools and desktop software: SEO, Rust, WPF, Windows installers.",
    },
    featured: ["sisia-sarl", "syswatch"],
  },
];

const CAT_OF = {
  "mkan-momtsim": "xai", "beac-detect-anomalies": "xai", "beac-retention-exportations": "xai", "em-variationnel": "xai", "mko-riccati": "xai",
  agrosense: "edge", "ma-ra": "edge", dermai: "edge", "langue-des-signes": "edge", "drone-livraison": "edge",
  "kalati-rag": "genai", "nexus-ai": "genai",
  predoc: "ds", "crypto-trader-dqn": "ds", "cademi-clustering": "ds", "ia-generative": "ds", "gaz-dissous": "ds", "chiffres-manuscrits": "ds", "phone-price-bigdata": "ds",
  meerkat: "security", "aura-careos": "security",
  winplus: "platforms", homegamesfive: "platforms", "messagerie-multitenant": "platforms", ngondo: "platforms", "mboa-shop": "platforms",
  "ma-co": "platforms", talentis: "platforms", "ajpeac-platform": "platforms", "testing-platform": "platforms", "gala-promo": "platforms",
  "hotel-manager": "platforms", "lidia-restaurant": "platforms",
  swiftpay: "mobile", pharmacon: "mobile",
  "sisia-sarl": "web", syswatch: "web", "ai4sg-cameroon": "web", fluxemi: "web", "winui-prototypes": "web", smartcameroun: "web",
  "qr-image-platform": "web", "reseau-social-enspd": "web", "gestion-absences": "web", "ecommerce-simple": "web", "gestion-scolarite": "web",
  "depot-boissons": "web",
};

const FULL_BLEED = new Set(["screenshot", "mockup", "concept-mockup", "terminal"]);

function withVisuals(p) {
  const v = VISUALS[p.slug];
  if (!v?.length) return p;
  const [first, ...rest] = v;
  const gallery = [...rest.map((it) => ({ src: it.file, alt: it.alt })), ...(p.cover ? [{ src: p.cover, alt: p.subtitle }] : []), ...(p.gallery || [])];
  const seen = new Set();
  return {
    ...p,
    cover: first.file,
    coverFit: FULL_BLEED.has(first.kind) ? "cover" : "contain",
    gallery: gallery.filter((g) => g.src !== first.file && !seen.has(g.src) && seen.add(g.src)),
  };
}

const FEATURED_SET = new Set(CATEGORIES.flatMap((c) => c.featured));
const CAT_INDEX = Object.fromEntries(CATEGORIES.map((c, i) => [c.key, i]));

export const PROJECTS = [...RESEARCH_PRO, ...FEATURED_PROJECTS, ...OTHER_PROJECTS]
  .filter((p) => CAT_OF[p.slug])
  .map((p) => {
    const cat = CAT_OF[p.slug];
    const featured = FEATURED_SET.has(p.slug);
    const featuredRank = featured ? CATEGORIES[CAT_INDEX[cat]].featured.indexOf(p.slug) : 99;
    return { ...withVisuals(p), cat, featured, featuredRank, name: { fr: p.title, en: p.titleEn || p.title } };
  })
  .sort((a, b) => CAT_INDEX[a.cat] - CAT_INDEX[b.cat] || a.featuredRank - b.featuredRank || a.order - b.order);

export const CATEGORY_OF = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
export const FEATURED = PROJECTS.filter((p) => p.featured);
export const byCategory = (key) => PROJECTS.filter((p) => p.cat === key);

export const publicRepoCount = new Set(
  PROJECTS.flatMap((p) => (p.links || []).map((l) => l.url).filter((u) => u.startsWith("https://github.com/")))
).size;
