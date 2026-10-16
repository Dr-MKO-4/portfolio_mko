import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);
const STORAGE_KEY = "mko-lang";

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "fr";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  }, [lang]);

  const t = useCallback(
    (value) => {
      if (value == null) return "";
      if (typeof value === "string" || Array.isArray(value)) return value;
      return value[lang] ?? value.fr;
    },
    [lang]
  );

  const ui = useCallback((key) => t(UI[key]) || key, [t]);
  const toggle = useCallback(() => setLang((l) => (l === "fr" ? "en" : "fr")), []);
  const value = useMemo(() => ({ lang, setLang, toggle, t, ui }), [lang, toggle, t, ui]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export const UI = {
  navHome: { fr: "Accueil", en: "Home" },
  navProjects: { fr: "Projets", en: "Work" },
  navJourney: { fr: "Parcours", en: "Journey" },
  navContact: { fr: "Contact", en: "Contact" },
  downloadCv: { fr: "Télécharger mon CV", en: "Download my CV" },
  cvShort: { fr: "CV", en: "CV" },
  educationTitle: { fr: "Formation", en: "Education" },
  certsTitle: { fr: "Certifications", en: "Certifications" },
  langsTitle: { fr: "Langues", en: "Languages" },
  letsTalk: { fr: "Discutons", en: "Let's talk" },
  menu: { fr: "Menu", en: "Menu" },
  close: { fr: "Fermer", en: "Close" },

  heroEyebrow: { fr: "Data Scientist · Ingénieur IA · Douala", en: "Data Scientist · AI Engineer · Douala" },
  heroLine1: { fr: "Je conçois des", en: "I design" },
  heroLine2: { fr: "modèles", en: "models" },
  heroLine3: { fr: "explicables", en: "you can explain" },
  heroLine4: { fr: "et je les mets en production.", en: "and ship them to production." },
  heroIntro: {
    fr: "M2 Science des Données & IA à l'ENSPD Douala et fondateur de LIDIA, startup d'IA souveraine. Mes recherches portent sur l'IA explicable (réseaux de Kolmogorov-Arnold, SHAP, Grad-CAM) et l'IA embarquée (modèles quantifiés qui tournent hors ligne). Je les mets en production dans des plateformes full-stack.",
    en: "MSc Data Science & AI student at ENSPD Douala and founder of LIDIA, a sovereign AI startup. My research covers explainable AI (Kolmogorov-Arnold networks, SHAP, Grad-CAM) and edge AI (quantised models that run offline). I ship them inside full-stack platforms.",
  },
  seeWork: { fr: "Voir les projets", en: "See the work" },
  contactMe: { fr: "Me contacter", en: "Get in touch" },
  scroll: { fr: "Défiler", en: "Scroll" },
  available: { fr: "Ouvert aux opportunités", en: "Open to opportunities" },

  pillarsEyebrow: { fr: "Ce que je fais", en: "What I do" },
  researchEyebrow: { fr: "Axes de recherche", en: "Research tracks" },
  researchTitle: { fr: "Ce que je cherche", en: "What I research" },
  researchIntro: {
    fr: "Au LIDIA Lab et dans mon mémoire, je travaille sur deux questions : comment rendre une décision d'IA justifiable, et comment faire tourner l'IA là où le réseau manque.",
    en: "At LIDIA Lab and in my thesis I work on two questions: how to make an AI decision justifiable, and how to run AI where the network is missing.",
  },
  craftEyebrow: { fr: "Savoir-faire", en: "Craft" },
  craftTitle: { fr: "Ce que je construis", en: "What I build" },
  craftIntro: {
    fr: "Pour que la recherche serve, je la mets en production : des données aux modèles, des API aux interfaces.",
    en: "For research to matter, I ship it: from data to models, from APIs to interfaces.",
  },
  pillarsTitle: { fr: "Deux axes de recherche, deux savoir-faire", en: "Two research tracks, two crafts" },

  featuredEyebrow: { fr: "Mes réalisations", en: "What I've built" },
  featuredTitle: { fr: "De la recherche à la production", en: "From research to production" },
  featuredIntro: {
    fr: "Je travaille sur toute la chaîne : je cherche, je modélise, puis je livre. Voici ce que j'ai construit, domaine par domaine, en commençant par les projets qui me représentent le mieux.",
    en: "I work across the whole chain: I research, I model, then I ship. Here is what I've built, field by field, starting with the projects that represent me best.",
  },
  projectsIndexIntro: {
    fr: "Mes projets sont classés en huit domaines. Choisissez-en un, ou cherchez directement un projet ou une technologie.",
    en: "My projects are organised into eight fields. Pick one, or search directly for a project or a technology.",
  },
  allCategories: { fr: "Toutes les catégories", en: "All categories" },
  categoriesMenu: { fr: "Catégories", en: "Categories" },
  viewCategory: { fr: "Voir la catégorie", en: "View category" },
  alsoInCategory: { fr: "J'ai aussi réalisé", en: "I also built" },
  allEyebrow: { fr: "Tous mes projets", en: "All projects" },
  allTitle: { fr: "L'archive complète", en: "The full archive" },
  allIntro: {
    fr: "Chaque projet ci-dessous existe dans mes dossiers de travail. Les statuts sont indiqués tels quels : prototype, en production, concept documenté.",
    en: "Every project below exists in my working folders. Statuses are stated as they are: prototype, in production, documented concept.",
  },
  viewAll: { fr: "Voir tous les projets", en: "View all projects" },
  view: { fr: "Voir", en: "View" },
  filterAll: { fr: "Tous", en: "All" },
  search: { fr: "Rechercher un projet, une techno…", en: "Search a project, a tech…" },
  noResult: { fr: "Aucun projet ne correspond.", en: "No project matches." },
  projectsCount: { fr: "projets", en: "projects" },

  journeyEyebrow: { fr: "Parcours", en: "Journey" },
  journeyTitle: { fr: "Formation et expériences", en: "Education and experience" },
  labEyebrow: { fr: "Laboratoire", en: "Lab" },

  contactEyebrow: { fr: "Contact", en: "Contact" },
  contactTitle1: { fr: "Un projet, un poste,", en: "A project, a role," },
  contactTitle2: { fr: "une idée ?", en: "an idea?" },
  contactIntro: {
    fr: "Le plus simple est de m'écrire directement. Le formulaire ci-dessous prépare le message dans votre messagerie.",
    en: "The simplest way is to write to me directly. The form below drafts the message in your email client.",
  },
  formName: { fr: "Votre nom", en: "Your name" },
  formEmail: { fr: "Votre e-mail", en: "Your email" },
  formSubject: { fr: "Sujet", en: "Subject" },
  formMessage: { fr: "Votre message", en: "Your message" },
  formSend: { fr: "Préparer l'e-mail", en: "Draft the email" },
  formNote: {
    fr: "Ouvre votre messagerie avec le message pré-rempli. Rien n'est stocké sur ce site.",
    en: "Opens your email client with the message pre-filled. Nothing is stored on this site.",
  },
  formMissing: { fr: "Merci d'indiquer votre nom et votre message.", en: "Please add your name and message." },
  copy: { fr: "Copier", en: "Copy" },
  copied: { fr: "Copié", en: "Copied" },

  status: { fr: "Statut", en: "Status" },
  year: { fr: "Année", en: "Year" },
  role: { fr: "Rôle", en: "Role" },
  context: { fr: "Contexte", en: "Context" },
  context2: { fr: "Le problème", en: "The problem" },
  approach: { fr: "Ce que j'ai construit", en: "What I built" },
  architecture: { fr: "Architecture", en: "Architecture" },
  stack: { fr: "Stack technique", en: "Tech stack" },
  gallery: { fr: "Visuels", en: "Visuals" },
  links: { fr: "Liens", en: "Links" },
  code: { fr: "Code source", en: "Source code" },
  privateCode: { fr: "Code privé (client ou confidentiel)", en: "Private code (client or confidential)" },
  nextProject: { fr: "Projet suivant", en: "Next project" },
  backToProjects: { fr: "Tous les projets", en: "All projects" },
  featuredBadge: { fr: "Projet phare", en: "Featured" },
  notFound: { fr: "Cette page n'existe pas.", en: "This page does not exist." },
  backHome: { fr: "Retour à l'accueil", en: "Back home" },

  footerLine: { fr: "Conçu et développé par Georges Miguel MOUKOKO.", en: "Designed and built by Georges Miguel MOUKOKO." },
  backTop: { fr: "Haut de page", en: "Back to top" },
};
