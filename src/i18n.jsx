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
  letsTalk: { fr: "Discutons", en: "Let's talk" },
  menu: { fr: "Menu", en: "Menu" },
  close: { fr: "Fermer", en: "Close" },

  heroEyebrow: { fr: "Data Scientist · Ingénieur IA · Douala", en: "Data Scientist · AI Engineer · Douala" },
  heroLine1: { fr: "Je conçois des", en: "I design" },
  heroLine2: { fr: "modèles", en: "models" },
  heroLine3: { fr: "explicables", en: "you can explain" },
  heroLine4: { fr: "et je les mets en production.", en: "and ship them to production." },
  heroIntro: {
    fr: "M2 Science des Données & IA à l'ENSPD Douala, chercheur au LIDIA Lab. Je travaille à la jonction de la modélisation et du logiciel : réseaux de Kolmogorov-Arnold, détection de fraude Mobile Money, systèmes RAG et plateformes full-stack.",
    en: "MSc Data Science & AI student at ENSPD Douala and researcher at LIDIA Lab. I work where modelling meets software: Kolmogorov-Arnold networks, Mobile Money fraud detection, RAG systems and full-stack platforms.",
  },
  seeWork: { fr: "Voir les projets", en: "See the work" },
  contactMe: { fr: "Me contacter", en: "Get in touch" },
  scroll: { fr: "Défiler", en: "Scroll" },
  available: { fr: "Ouvert aux opportunités", en: "Open to opportunities" },

  pillarsEyebrow: { fr: "Ce que je fais", en: "What I do" },
  pillarsTitle: { fr: "Trois métiers, une même exigence", en: "Three crafts, one standard" },

  featuredEyebrow: { fr: "Projets phares", en: "Featured work" },
  featuredTitle: { fr: "Recherche, laboratoire et concours industriels", en: "Research, lab work and industry challenges" },
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
