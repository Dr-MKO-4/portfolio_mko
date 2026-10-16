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
      fr: "Mon premier axe de recherche. Je conçois des modèles dont chaque décision se justifie (KAN, SHAP, régression symbolique, prédiction conforme) et je les applique à la fraude Mobile Money et aux statistiques monétaires.",
      en: "My first research track. I design models whose every decision can be justified (KAN, SHAP, symbolic regression, conformal prediction) and apply them to Mobile Money fraud and monetary statistics.",
    },
    featured: ["mkan-momtsim", "beac-detect-anomalies"],
  },
  {
    key: "edge",
    num: "02",
    label: { fr: "IA embarquée (Edge AI)", en: "Edge AI" },
    desc: {
      fr: "Mon second axe de recherche. Je fais tourner l'IA là où il n'y a pas de réseau : modèles quantifiés INT8, TensorFlow Lite, inférence sur smartphone et lunettes connectées, synchronisation hors ligne.",
      en: "My second research track. I run AI where there is no network: INT8-quantised models, TensorFlow Lite, inference on phones and smart glasses, offline sync.",
    },
    featured: ["agrosense", "ma-ra"],
  },
  {
    key: "genai",
    num: "03",
    label: { fr: "IA générative, RAG & agents", en: "Generative AI, RAG & agents" },
    desc: {
      fr: "Je construis des assistants documentaires souverains et des systèmes multi-agents, dont les trois produits agentiques du LIDIA Lab : Nexus (marketing), Meerkat (cybersécurité) et Lead's AI (LLM souverain). Recherche hybride, GraphRAG, LLM auto-hébergés, validation humaine.",
      en: "I build sovereign document assistants and multi-agent systems, including LIDIA Lab's three agentic products: Nexus (marketing), Meerkat (security) and Lead's AI (sovereign LLM). Hybrid retrieval, GraphRAG, self-hosted LLMs, human approval.",
    },
    featured: ["kalati-rag", "nexus-ai"],
  },
  {
    key: "ds",
    num: "04",
    label: { fr: "Data science & prédiction", en: "Data science & forecasting" },
    desc: {
      fr: "J'applique la modélisation statistique et l'apprentissage automatique à des problèmes concrets : régression quantile, séries temporelles, clustering, apprentissage par renforcement.",
      en: "I apply statistical modelling and machine learning to concrete problems: quantile regression, time series, clustering, reinforcement learning.",
    },
    featured: ["predoc", "crypto-trader-dqn"],
  },
  {
    key: "security",
    num: "05",
    label: { fr: "Cybersécurité & conformité", en: "Security & compliance" },
    desc: {
      fr: "Je sécurise des systèmes qui manipulent des données sensibles : tests encadrés, audit infalsifiable, MFA, moindre privilège.",
      en: "I secure systems that handle sensitive data: controlled testing, tamper-evident audit, MFA, least privilege.",
    },
    featured: ["meerkat", "aura-careos"],
  },
  {
    key: "platforms",
    num: "06",
    label: { fr: "Plateformes full-stack", en: "Full-stack platforms" },
    desc: {
      fr: "Je livre des produits complets en production : API en Clean Architecture, interfaces React, paiements Mobile Money, déploiement cloud.",
      en: "I ship complete products to production: Clean Architecture APIs, React interfaces, Mobile Money payments, cloud deployment.",
    },
    featured: ["winplus", "homegamesfive"],
  },
  {
    key: "mobile",
    num: "07",
    label: { fr: "Mobile, fintech & santé", en: "Mobile, fintech & health" },
    desc: {
      fr: "Je conçois des applications mobiles pour le paiement et l'accès aux soins : NFC, biométrie, ordonnances, livraison sécurisée.",
      en: "I design mobile apps for payments and access to care: NFC, biometrics, prescriptions, secure delivery.",
    },
    featured: ["swiftpay", "pharmacon"],
  },
  {
    key: "web",
    num: "08",
    label: { fr: "Web, systèmes & desktop", en: "Web, systems & desktop" },
    desc: {
      fr: "Je réalise aussi des sites, des outils système et des logiciels de bureau : référencement, Rust, WPF, installateurs Windows.",
      en: "I also build websites, systems tools and desktop software: SEO, Rust, WPF, Windows installers.",
    },
    featured: ["sisia-sarl", "syswatch"],
  },
];

const CAT_OF = {
  "mkan-momtsim": "xai", "beac-detect-anomalies": "xai", "beac-retention-exportations": "xai", "em-variationnel": "xai", "mko-riccati": "xai",
  agrosense: "edge", "ma-ra": "edge", dermai: "edge", "langue-des-signes": "edge", "drone-livraison": "edge",
  "kalati-rag": "genai", "nexus-ai": "genai", "leads-ai": "genai",
  predoc: "ds", "crypto-trader-dqn": "ds", "cademi-clustering": "ds", "ia-generative": "ds", "gaz-dissous": "ds", "chiffres-manuscrits": "ds", "phone-price-bigdata": "ds",
  meerkat: "security", "aura-careos": "security",
  winplus: "platforms", homegamesfive: "platforms", "messagerie-multitenant": "platforms", ngondo: "platforms", "mboa-shop": "platforms", talentis: "platforms", "ajpeac-platform": "platforms", "testing-platform": "platforms", "gala-promo": "platforms",
  "hotel-manager": "platforms", "lidia-restaurant": "platforms",
  swiftpay: "mobile", pharmacon: "mobile",
  "sisia-sarl": "web", syswatch: "web", "ai4sg-cameroon": "web", fluxemi: "web", "winui-prototypes": "web",
  "qr-image-platform": "web", "reseau-social-enspd": "web", "ecommerce-simple": "web",
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

const LOGOS = {
  "depot-boissons": "/img/logos/depot-boissons.webp",
  "mkan-momtsim": "/img/logos/mkan.webp", "beac-detect-anomalies": "/img/logos/beac-detect.webp", predoc: "/img/logos/predoc.webp",
  "ma-ra": "/img/logos/mara.webp", "lidia-restaurant": "/img/logos/lidia-restaurant.webp", talentis: "/img/logos/talentis.webp",
  "langue-des-signes": "/img/logos/langue-signes.webp", "drone-livraison": "/img/logos/drone.webp", syswatch: "/img/logos/syswatch.webp",
  "qr-image-platform": "/img/logos/qr-image.webp", "messagerie-multitenant": "/img/logos/messagerie.webp", "ajpeac-platform": "/img/logos/ajpeac.svg",
};

const LIVE = {
 "winplus": "https://winplus.cm",
 "ngondo": "https://mko-ngondo.vercel.app",
 "ai4sg-cameroon": "https://mko-ai4sg.vercel.app",
 "mboa-shop": "https://mko-mboa-shop.vercel.app",
 "ajpeac-platform": "https://mko-ajpeac.vercel.app",
 "homegamesfive": "https://mko-homegamesfive.vercel.app",
 "gala-promo": "https://mko-gala.vercel.app",
 "testing-platform": "https://mko-testing-platform.vercel.app",
 "hotel-manager": "https://mko-hotel.vercel.app",
 "crypto-trader-dqn": "https://mko-crypto-trader.vercel.app",
 "reseau-social-enspd": "https://mko-reseau-social.vercel.app",
 "ecommerce-simple": "https://mko-ecommerce-stripe.vercel.app",
 "depot-boissons": "https://mko-depot-boissons.vercel.app",
 "mkan-momtsim": "https://mko-mkan.vercel.app",
 "meerkat": "https://mko-meerkat.vercel.app",
 "messagerie-multitenant": "https://mko-messagerie.vercel.app",
 "qr-image-platform": "https://mko-qr-image.vercel.app",
 "sisia-sarl": "https://www.sisia-sarl.com"
};

const FEATURED_SET = new Set(CATEGORIES.flatMap((c) => c.featured));
const CAT_INDEX = Object.fromEntries(CATEGORIES.map((c, i) => [c.key, i]));

export const PROJECTS = [...RESEARCH_PRO, ...FEATURED_PROJECTS, ...OTHER_PROJECTS]
  .filter((p) => CAT_OF[p.slug])
  .map((p) => {
    const cat = CAT_OF[p.slug];
    const featured = FEATURED_SET.has(p.slug);
    const featuredRank = featured ? CATEGORIES[CAT_INDEX[cat]].featured.indexOf(p.slug) : 99;
    return { ...withVisuals(p), live: LIVE[p.slug] || null, logo: LOGOS[p.slug] || p.logo, cat, featured, featuredRank, name: { fr: p.title, en: p.titleEn || p.title } };
  })
  .sort((a, b) => CAT_INDEX[a.cat] - CAT_INDEX[b.cat] || a.featuredRank - b.featuredRank || a.order - b.order);

export const CATEGORY_OF = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
export const FEATURED = PROJECTS.filter((p) => p.featured);
const EXTRA_CATS = { meerkat: ["genai"] };
export const byCategory = (key) => PROJECTS.filter((p) => p.cat === key || EXTRA_CATS[p.slug]?.includes(key));

export const publicRepoCount = new Set(
  PROJECTS.flatMap((p) => (p.links || []).map((l) => l.url).filter((u) => u.startsWith("https://github.com/")))
).size;
