import { useState, useEffect, useRef } from "react";

const PROFILE = {
  fullName: "MOUKOKO EKAMBI Georges Miguel",
  shortName: "Miguel",
  email: "georgesmoukoko4@gmail.com",
};

const INTERESTS = ["IA Embarquée", "Backend SaaS", "Computer Vision", "MLOps", "Mobile Dev", "Full-Stack"];

const PROJECTS_ALL = [
  { tag: "Santé · IA Embarquée", title: "DermAI", subtitle: "Diagnostic Dermatologique Offline-First", desc: "Pipeline IA hybride (TFLite + FastAPI) avec EfficientNet fine-tuné sur les phototypes africains. Explicabilité via Grad-CAM, clustering épidémiologique DBSCAN.", impact: "Accès au diagnostic médical sans connexion internet en zones rurales africaines.", badges: ["Flutter", "TFLite", "FastAPI", "EfficientNet"], img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=260&fit=crop&auto=format" },
  { tag: "Fintech · NFC", title: "SwiftPay", subtitle: "Paiement NFC Biométrique", desc: "Paiement sans contact NFC avec authentification biométrique multifactorielle. Architecture sécurisée conforme aux standards bancaires africains.", impact: "Infrastructure fintech sécurisée pour les marchés émergents.", badges: ["NFC", "Biométrie", "Flutter", "C#"], img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=260&fit=crop&auto=format" },
  { tag: "Agriculture · Géospatial", title: "AgroSense", subtitle: "Agriculture de Précision", desc: "Ensemble Learning (EfficientNet, MobileNet, ResNet) avec pipeline MLOps pour réentraînement automatique et analyse spatiale via PostGIS.", impact: "Réduction des pertes agricoles. Agriculture de précision au Cameroun.", badges: ["PyTorch", "MLOps", "PostGIS"], img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=260&fit=crop&auto=format" },
  { tag: "HR Tech · SaaS", title: "Application RH", subtitle: "15 Modules Intégrés", desc: "Système modulaire 15 modules. Matching candidats par IA. Analytics prédictifs turnover & performance. Multi-pays, multi-devises.", impact: "Digitalisation RH complète pour entreprises africaines en croissance.", badges: ["ASP.NET Core", "React", "ML"], img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=260&fit=crop&auto=format" },
  { tag: "Logistique · Robotique", title: "Drone Autonome", subtitle: "Livraison par IA", desc: "Navigation A*/RRT*, optimisation multi-objectifs énergie/temps, vision embarquée pour détection d'obstacles et Reinforcement Learning décisionnel.", impact: "Infrastructure Smart City. Désenclavement des zones urbaines africaines.", badges: ["RL", "Computer Vision", "A*", "Python"], img: "https://images.unsplash.com/photo-1527977966861-9b14bd96c648?w=800&h=260&fit=crop&auto=format" },
  { tag: "Accessibilité · Vision", title: "SignLanguage AI", subtitle: "Traduction Langue des Signes", desc: "Détection de gestes via Computer Vision. Modélisation temporelle LSTM/Transformer. Pipeline vidéo→texte en temps réel.", impact: "Inclusion numérique des personnes malentendantes.", badges: ["LSTM", "Transformer", "OpenCV", "TensorFlow"], img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=260&fit=crop&auto=format" },
  { tag: "Edtech · Recommandation", title: "WinPlus / Réussir", subtitle: "Préparation aux Concours", desc: "Plateforme de préparation aux concours. Parcours personnalisés par IA. Dashboard analytique étudiant avec prédiction de performance.", impact: "Accompagnement haut-débit pour étudiants africains ambitieux.", badges: ["React", "FastAPI", "Filtering"], img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=260&fit=crop&auto=format" },
  { tag: "Multi-tenant · SaaS", title: "AJPEAC Platform", subtitle: "Gestion Intelligente", desc: "Architecture multi-tenant avec dashboards analytiques, chatbot intelligent et système de recommandation intégré.", impact: "Plateforme de gestion opérationnelle pour organisations panafricaines.", badges: ["ASP.NET Core", "React", "Redis"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=260&fit=crop&auto=format" },
  { tag: "Finance · Deep RL", title: "TradingAgent", subtitle: "Trading Autonome", desc: "Deep Q-Learning sur environnement financier modélisé en MDP. Backtesting complet sur données OHLCV. Algorithmes génétiques pour optimisation heuristique.", impact: "Stratégies de trading adaptatives et évolutives sur marchés émergents.", badges: ["Deep-QL", "MDP", "Python"], img: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=260&fit=crop&auto=format" },
];

const STATS = [
  { target: 12, suffix: "+", label: "Projets Complets", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=40&h=40&fit=crop" },
  { target: 5, suffix: "", label: "Domaines Impact", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=40&h=40&fit=crop" },
  { target: 3, suffix: " ans", label: "d'Expérience", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop" },
  { target: 2, suffix: "", label: "Pays Actifs", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=40&h=40&fit=crop" },
];

const EXPERIENCES = [
  { num: "01", company: "ESOAF", role: "Stage Ingénierie Logicielle · Fullstack + IA", level: "Niveau 4", duration: "7 MOIS", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=60&h=60&fit=crop" },
  { num: "02", company: "CAMRAIL", role: "Stage Opérationnel · Ingénierie Industrielle", level: "Niv. 1 & 2", duration: "1 AN", img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=60&h=60&fit=crop" },
  { num: "03", company: "CAMRAIL", role: "Stage Avancé · Systèmes Embarqués & Data", level: "Niveau 3", duration: "2 ANS", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=60&h=60&fit=crop" },
  { num: "04", company: "ENSPD", role: "Master 2 Science des Données & IA", level: "M2 SDAI", duration: "EN COURS", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=60&h=60&fit=crop" },
];

const OFFER_CARDS = [
  { num: "01 — IA / ML", title: "IA Appliquée", desc: "Deep Learning, Computer Vision, NLP, Reinforcement Learning. Modèles PyTorch fine-tunés.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop&auto=format" },
  { num: "02 — Fullstack", title: "Systèmes & APIs", desc: "APIs robustes ASP.NET Core, architectures SaaS multi-tenant, React.js & Flutter.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=60&h=60&fit=crop&auto=format" },
  { num: "03 — MLOps", title: "Cloud & Stratégie", desc: "MLOps, CI/CD AWS, PostGIS, analytics prédictifs, vision produit end-to-end.", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=60&h=60&fit=crop&auto=format" },
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [counted, setCounted] = useState(false);
  const [statVals, setStatVals] = useState(STATS.map(() => 0));
  const [submitted, setSubmitted] = useState(false);
  const [cfName, setCfName] = useState("");
  const [cfEmail, setCfEmail] = useState("");
  const [activeInterests, setActiveInterests] = useState([]);
  const statsRef = useRef(null);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [submitted]);

  // Animated stat counters
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted) {
          setCounted(true);
          STATS.forEach((s, idx) => {
            let current = 0;
            const dur = 1800;
            const step = 16;
            const inc = Math.ceil(s.target / (dur / step));
            const timer = setInterval(() => {
              current += inc;
              if (current >= s.target) {
                current = s.target;
                clearInterval(timer);
              }
              setStatVals((prev) => {
                const next = [...prev];
                next[idx] = current;
                return next;
              });
            }, step);
          });
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [counted]);

  const formatStat = (val) => (val >= 1000 ? (val / 1000).toFixed(1) + "k" : val);
  const toggleInterest = (item) =>
    setActiveInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const submitForm = () => {
    if (!cfName || !cfEmail) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@300;400;500;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --black: #0d0d0d; --white: #fafaf8; --gray: #f2f1ed; --mid: #888;
          --border: #e5e3dd; --accent-green: #a8c957; --accent-yellow: #f5c842;
          --accent-pink: #f0a8b8; --accent-blue: #7ec8e3;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'Cabinet Grotesk', sans-serif; background: var(--white); color: var(--black); overflow-x: hidden; width: 100%; }
        ::selection { background: var(--black); color: var(--white); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--black); }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes blobFloat {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        .reveal { opacity: 0; transform: translateY(35px); transition: opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-35px); transition: opacity .7s .1s cubic-bezier(.4,0,.2,1), transform .7s .1s cubic-bezier(.4,0,.2,1); }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(35px); transition: opacity .7s .15s cubic-bezier(.4,0,.2,1), transform .7s .15s cubic-bezier(.4,0,.2,1); }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }

        .mko-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 999; padding: 20px 48px; display: flex; justify-content: space-between; align-items: center; transition: all .3s; background: transparent; width: 100%; box-sizing: border-box; }
        .mko-nav.scrolled { background: rgba(250,250,248,.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a { font-size: 13px; font-weight: 500; color: var(--mid); text-decoration: none; letter-spacing: .04em; transition: color .2s; text-transform: uppercase; cursor: pointer; }
        .nav-links a:hover { color: var(--black); }
        .nav-btn { font-family: 'Cabinet Grotesk', sans-serif; font-size: 12px; font-weight: 700; padding: 9px 20px; border: 1.5px solid var(--black); background: transparent; cursor: pointer; letter-spacing: .06em; text-transform: uppercase; transition: all .2s; }
        .nav-btn:hover { background: var(--black); color: var(--white); }
        .nav-btn.filled { background: var(--black); color: var(--white); }
        .nav-btn.filled:hover { background: #333; }

        .hero { min-height: 100vh; padding: 100px 48px 60px; position: relative; overflow: hidden; background: var(--white); width: 100%; box-sizing: border-box; display: flex; flex-direction: column; }
        .hero-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; max-width: 1400px; margin-left: auto; margin-right: auto; width: 100%; }
        .hero-badge { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--mid); }
        .hero-nav-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .hero-pill { font-size: 11px; padding: 6px 14px; border: 1px solid var(--border); border-radius: 100px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--mid); cursor: pointer; transition: all .2s; }
        .hero-pill:hover, .hero-pill.active { background: var(--black); color: var(--white); border-color: var(--black); }
        .hero-contact-pill { font-size: 11px; padding: 6px 14px; border: 1px solid var(--border); border-radius: 100px; font-weight: 600; color: var(--mid); }
        .hero-main { display: grid; grid-template-columns: 1fr 420px; gap: 40px; align-items: end; margin-top: 40px; max-width: 1400px; margin-left: auto; margin-right: auto; width: 100%; box-sizing: border-box; }
        .hero-h1 { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(64px,8vw,108px); font-weight: 900; line-height: .92; letter-spacing: -0.03em; margin-bottom: 24px; }
        .hero-h1 em { font-style: normal; color: var(--mid); }
        .hero-title-text { font-size: 17px; font-weight: 600; color: var(--mid); margin-bottom: 20px; display: block; }
        .hero-checks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
        .hero-check { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #555; font-weight: 400; }
        .hero-check-dot { width: 18px; height: 18px; background: var(--black); border-radius: 50%; flex-shrink: 0; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-main { font-family: 'Cabinet Grotesk', sans-serif; padding: 14px 28px; background: var(--black); color: var(--white); border: none; font-size: 13px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 8px; border-radius: 4px; }
        .btn-main:hover { background: #222; transform: translateY(-1px); }
        .btn-sec { font-family: 'Cabinet Grotesk', sans-serif; padding: 14px 28px; background: transparent; color: var(--black); border: 1.5px solid var(--black); font-size: 13px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 8px; border-radius: 4px; }
        .btn-sec:hover { background: var(--black); color: var(--white); }

        .hero-photo-wrap { position: relative; animation: fadeIn .9s .4s both; }
        .hero-photo-blob { width: 380px; height: 460px; background: #e8e4dc; border-radius: 60% 40% 50% 60% / 50% 60% 40% 50%; overflow: hidden; position: relative; animation: blobFloat 8s ease-in-out infinite; }
        .hero-photo-blob img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.15); }
        .hero-hello-badge { position: absolute; bottom: 40px; right: -20px; background: var(--black); color: var(--white); width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; letter-spacing: .05em; animation: float 3s ease-in-out infinite; }
        .hero-color-blob { position: absolute; top: 10px; right: -10px; width: 120px; height: 120px; background: conic-gradient(var(--accent-pink), var(--accent-yellow), var(--accent-green), var(--accent-blue), var(--accent-pink)); border-radius: 50%; filter: blur(2px); opacity: .85; animation: spin 12s linear infinite; }

        .marquee-wrap { border-top: 1.5px solid var(--black); border-bottom: 1.5px solid var(--black); padding: 14px 0; overflow: hidden; background: var(--white); width: 100%; }
        .marquee-inner { display: flex; width: max-content; animation: marquee 18s linear infinite; }
        .marquee-item { font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 0 32px; display: flex; align-items: center; gap: 16px; white-space: nowrap; color: var(--black); }
        .marquee-dot { width: 6px; height: 6px; background: var(--black); border-radius: 50%; flex-shrink: 0; }

        section { padding: 100px 48px; width: 100%; box-sizing: border-box; }
        .section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mid); display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .section-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--mid); }
        .section-h2 { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(36px,4.5vw,56px); font-weight: 900; line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 16px; }
        .section-sub { font-size: 15px; color: #666; line-height: 1.7; max-width: 520px; font-weight: 400; }

        .offer-grid { display: grid; grid-template-columns: 240px 1fr; gap: 80px; align-items: start; max-width: 1400px; margin: 0 auto; width: 100%; }
        .offer-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; border: 1.5px solid var(--black); }
        .offer-card { padding: 32px 24px; border-right: 1.5px solid var(--black); transition: background .25s; cursor: pointer; overflow: hidden; background: var(--white); }
        .offer-card:last-child { border-right: none; }
        .offer-card:hover { background: var(--black); }
        .offer-card:hover .oc-title, .offer-card:hover .oc-desc, .offer-card:hover .oc-num { color: var(--white) !important; }
        .offer-card:hover .oc-icon-img { filter: invert(1) brightness(2); }
        .oc-icon-img { width: 32px; height: 32px; margin-bottom: 20px; display: block; transition: filter .25s; object-fit: cover; border-radius: 6px; }
        .oc-num { font-size: 11px; font-weight: 700; letter-spacing: .1em; color: var(--mid); margin-bottom: 12px; text-transform: uppercase; transition: color .25s; }
        .oc-title { font-size: 17px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.01em; transition: color .25s; color: var(--black); }
        .oc-desc { font-size: 13px; color: #666; line-height: 1.6; transition: color .25s; }
        .offer-cta-btn { font-family: 'Cabinet Grotesk', sans-serif; padding: 14px 24px; border: 1.5px solid var(--black); background: var(--white); font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: all .25s; display: inline-flex; align-items: center; gap: 8px; }
        .offer-cta-btn:hover { background: var(--black); color: var(--white); }

        .exp-section { background: var(--white); width: 100%; }
        .exp-header { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; margin-bottom: 48px; max-width: 1400px; margin-left: auto; margin-right: auto; }
        .exp-desc { font-size: 14px; color: #666; line-height: 1.75; max-width: 400px; }
        .exp-rows { display: flex; flex-direction: column; border: 1.5px solid var(--black); max-width: 1400px; margin-left: auto; margin-right: auto; width: 100%; box-sizing: border-box; }
        .exp-row { display: grid; grid-template-columns: 48px 52px 1fr auto auto; gap: 20px; align-items: center; padding: 20px 28px; border-bottom: 1.5px solid var(--black); transition: background .25s; cursor: pointer; background: var(--white); }
        .exp-row:last-child { border-bottom: none; }
        .exp-row:hover { background: var(--black); }
        .exp-row:hover .er-num, .exp-row:hover .er-company, .exp-row:hover .er-role, .exp-row:hover .er-duration, .exp-row:hover .er-level { color: var(--white) !important; border-color: var(--white) !important; }
        .exp-row:hover .er-img { filter: grayscale(1) brightness(0.4); }
        .er-num { font-size: 12px; font-weight: 700; color: #bbb; letter-spacing: .06em; transition: color .25s; }
        .er-img { width: 44px; height: 44px; border-radius: 6px; object-fit: cover; filter: grayscale(0.3); transition: filter .25s; }
        .er-company { font-size: 16px; font-weight: 800; letter-spacing: -.01em; transition: color .25s; color: var(--black); }
        .er-role { font-size: 12px; color: var(--mid); font-weight: 500; transition: color .25s; }
        .er-duration { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--mid); transition: color .25s; }
        .er-level { font-size: 11px; font-weight: 700; letter-spacing: .08em; border: 1px solid var(--border); padding: 5px 12px; color: #555; text-transform: uppercase; transition: all .25s; }

        .proj-section { background: var(--gray); width: 100%; }
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1.5px solid var(--black); margin-top: 48px; max-width: 1400px; margin-left: auto; margin-right: auto; width: 100%; box-sizing: border-box; }
        .proj-card { border-right: 1.5px solid var(--black); border-bottom: 1.5px solid var(--black); background: var(--white); transition: all .3s; cursor: pointer; overflow: hidden; }
        .proj-card:nth-child(2n) { border-right: none; }
        .proj-card:nth-last-child(-n+2) { border-bottom: none; }
        .proj-card-inner { padding: 36px; }
        .proj-card:hover { background: var(--black); }
        .proj-card:hover .pc-tag, .proj-card:hover .pc-title, .proj-card:hover .pc-desc, .proj-card:hover .pc-impact, .proj-card:hover .pc-impact-label { color: var(--white) !important; border-color: #555 !important; }
        .proj-card:hover .pc-badge { background: #333 !important; color: #aaa !important; border-color: #555 !important; }
        .proj-card:hover .pc-arrow { color: var(--white); }
        .proj-card:hover .pc-img { filter: brightness(0.25) grayscale(1); }
        .pc-img { width: 100%; height: 130px; object-fit: cover; display: block; filter: brightness(0.55) grayscale(0.2); transition: filter .3s; }
        .pc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .pc-tag { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mid); padding: 5px 12px; border: 1px solid var(--border); transition: all .3s; display: inline-block; }
        .pc-arrow { font-size: 18px; color: #bbb; transition: all .3s; font-weight: 300; }
        .pc-title { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(22px,2.5vw,28px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 6px; transition: color .3s; color: var(--black); }
        .pc-subtitle { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--mid); margin-bottom: 16px; }
        .pc-desc { font-size: 13px; line-height: 1.7; color: #555; margin-bottom: 20px; transition: color .3s; }
        .pc-impact { font-size: 12px; color: #555; line-height: 1.5; padding: 12px 16px; border-left: 2px solid var(--black); margin-bottom: 20px; transition: all .3s; font-weight: 500; }
        .pc-impact-label { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--black); display: block; margin-bottom: 4px; transition: color .3s; }
        .pc-badges { display: flex; flex-wrap: wrap; gap: 6px; }
        .pc-badge { font-size: 11px; padding: 4px 10px; border: 1px solid var(--border); color: #777; font-weight: 600; transition: all .3s; letter-spacing: .02em; }

        .testi-section { padding: 100px 48px; background: var(--white); overflow: hidden; width: 100%; box-sizing: border-box; }
        .testi-label { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mid); display: flex; align-items: center; gap: 8px; justify-content: center; margin-bottom: 40px; }
        .testi-label::before, .testi-label::after { content: ''; flex: 0 0 40px; height: 1px; background: var(--border); }
        .testi-quote { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(28px,4vw,52px); font-weight: 900; line-height: 1.1; letter-spacing: -0.025em; max-width: 900px; margin: 0 auto 48px; text-align: left; color: var(--black); }
        .testi-quote span { color: var(--mid); }
        .testi-author { display: flex; justify-content: space-between; align-items: center; max-width: 900px; margin: 0 auto; flex-wrap: wrap; gap: 20px; }
        .testi-info h4 { font-size: 16px; font-weight: 800; margin-bottom: 2px; }
        .testi-info p { font-size: 13px; color: var(--mid); }
        .testi-photo { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; filter: grayscale(0.2); }

        .stats-section { background: var(--white); border-top: 1.5px solid var(--black); border-bottom: 1.5px solid var(--black); padding: 0; width: 100%; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); width: 100%; }
        .stat-block { padding: 48px 32px; border-right: 1.5px solid var(--black); text-align: center; transition: background .25s; cursor: default; background: var(--white); }
        .stat-block:last-child { border-right: none; }
        .stat-block:hover { background: var(--black); }
        .stat-block:hover .sb-val, .stat-block:hover .sb-label { color: var(--white); }
        .stat-block:hover .sb-img { filter: invert(1) brightness(2) grayscale(1); }
        .sb-img { width: 28px; height: 28px; border-radius: 6px; object-fit: cover; margin: 0 auto 12px; display: block; filter: grayscale(0.4); transition: filter .25s; }
        .sb-val { font-family: 'Cabinet Grotesk', sans-serif; font-size: 52px; font-weight: 900; line-height: 1; letter-spacing: -0.03em; margin-bottom: 8px; transition: color .25s; color: var(--black); }
        .sb-label { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--mid); transition: color .25s; }

        .contact-section { background: var(--gray); width: 100%; box-sizing: border-box; }
        .contact-h2 { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(48px,7vw,96px); font-weight: 900; line-height: .92; letter-spacing: -0.04em; text-align: center; margin-bottom: 24px; color: var(--black); }
        .contact-h2 em { font-style: normal; color: var(--mid); }
        .contact-sub { text-align: center; font-size: 15px; color: var(--mid); margin-bottom: 56px; font-weight: 400; }
        .contact-form { max-width: 680px; margin: 0 auto; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-input { font-family: 'Cabinet Grotesk', sans-serif; width: 100%; padding: 16px 18px; background: var(--white); border: 1.5px solid var(--border); color: var(--black); font-size: 14px; outline: none; transition: border-color .2s; border-radius: 4px; box-sizing: border-box; }
        .form-input:focus { border-color: var(--black); }
        .form-input::placeholder { color: #bbb; font-weight: 400; }
        .interests-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .int-btn { font-family: 'Cabinet Grotesk', sans-serif; padding: 8px 16px; background: var(--white); border: 1.5px solid var(--border); color: #666; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: all .2s; border-radius: 4px; }
        .int-btn:hover, .int-btn.active { background: var(--black); color: var(--white); border-color: var(--black); }
        .form-submit { font-family: 'Cabinet Grotesk', sans-serif; width: 100%; padding: 18px; background: var(--black); color: var(--white); border: none; font-size: 14px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: 4px; margin-top: 8px; }
        .form-submit:hover { background: #222; transform: translateY(-1px); }
        .form-note { text-align: center; font-size: 12px; color: #bbb; margin-top: 12px; font-weight: 500; }

        .mko-footer { padding: 28px 48px; border-top: 1.5px solid var(--black); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; background: var(--white); width: 100%; box-sizing: border-box; }
        .footer-logo { font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--mid); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: var(--black); }
        .footer-year { font-size: 11px; color: #ccc; font-weight: 600; }
        .hdivider { height: 1.5px; background: var(--black); margin: 0; width: 100%; }

        @media (max-width: 900px) {
          .hero-main, .offer-grid, .exp-header { grid-template-columns: 1fr !important; }
          .hero-photo-wrap { display: none !important; }
          .offer-cards { grid-template-columns: 1fr !important; }
          .offer-card { border-right: none !important; border-bottom: 1.5px solid var(--black); }
          .proj-grid { grid-template-columns: 1fr !important; }
          .proj-card { border-right: none !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stat-block { border-bottom: 1.5px solid var(--black); border-right: none !important; }
          .mko-nav { padding: 16px 24px !important; }
          section { padding: 80px 24px !important; }
          .hero { padding: 80px 24px 60px !important; }
          .exp-row { grid-template-columns: 40px 1fr auto !important; }
          .er-img, .er-level { display: none !important; }
          .testi-section { padding: 80px 24px !important; }
          .mko-footer { padding: 24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`mko-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">MKO</div>
        <ul className="nav-links">
          <li><a onClick={() => scrollTo("offer")}>Services</a></li>
          <li><a onClick={() => scrollTo("exp")}>Parcours</a></li>
          <li><a onClick={() => scrollTo("projects")}>Projets</a></li>
          <li><a onClick={() => scrollTo("contact")}>Contact</a></li>
        </ul>
        <button className="nav-btn filled" onClick={() => scrollTo("contact")}>Parlons ↗</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-top reveal">
          <span className="hero-badge">it's me</span>
          <div className="hero-nav-pills">
            <span className="hero-pill active">Mon Portfolio</span>
            <span className="hero-pill">À propos</span>
            <span className="hero-pill">Contact</span>
            <span className="hero-contact-pill">{PROFILE.email}</span>
          </div>
        </div>

        <div className="hero-main">
          <div>
            <div className="reveal" style={{ transitionDelay: ".05s" }}>
              <h1 className="hero-h1">
                Hello! Je suis <em>Miguel</em><br />
                Moukoko{" "}
                <span style={{ display: "inline-block", fontSize: "clamp(32px,4vw,52px)", fontWeight: 500, color: "var(--mid)" }}>
                  IA Engineer ✦
                </span>
              </h1>
            </div>
            <div className="reveal" style={{ transitionDelay: ".12s" }}>
              <span className="hero-title-text">
                Ingénieur IA & Architecte Systèmes Fullstack — M2 SDAI · ENSPD Douala
              </span>
              <div className="hero-checks">
                {[
                  "Solutions IA end-to-end, de la recherche au produit fini",
                  "Computer Vision & Deep Learning sur phototypes africains",
                  "Architectures scalables, Offline-First & MLOps",
                ].map((c) => (
                  <div className="hero-check" key={c}>
                    <span className="hero-check-dot" />{c}
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-btns reveal" style={{ transitionDelay: ".2s" }}>
              <button className="btn-main" onClick={() => scrollTo("projects")}>Voir les projets ↓</button>
              <button className="btn-sec" onClick={() => scrollTo("contact")}>Me contacter</button>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="hero-color-blob" />
              <div className="hero-photo-blob">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&auto=format&q=80"
                  alt="Miguel Moukoko"
                />
              </div>
              <div className="hero-hello-badge">Hello!</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[
            "AI Engineer", "Computer Vision", "Deep Learning", "Full-Stack Dev",
            "MLOps", "Douala · Cameroun", "ENSPD M2 SDAI",
            "AI Engineer", "Computer Vision", "Deep Learning", "Full-Stack Dev",
            "MLOps", "Douala · Cameroun", "ENSPD M2 SDAI",
          ].map((item, i) => (
            <div className="marquee-item" key={i}>{item}<span className="marquee-dot" /></div>
          ))}
        </div>
      </div>

      {/* OFFER */}
      <section id="offer" style={{ background: "var(--white)" }}>
        <div className="offer-grid">
          <div className="reveal-left">
            <div className="section-eyebrow">Ce que je fais</div>
            <h2 className="section-h2">What I'm<br />Offering</h2>
            <p className="section-sub" style={{ marginBottom: 32, fontSize: 13 }}>
              Des solutions intelligentes conçues pour des contextes africains réels — de la recherche au déploiement production.
            </p>
            <button className="offer-cta-btn" onClick={() => scrollTo("projects")}>All Services ↗</button>
          </div>
          <div className="offer-cards reveal-right">
            {OFFER_CARDS.map((card) => (
              <div className="offer-card" key={card.num}>
                <img src={card.img} alt={card.title} className="oc-icon-img" />
                <div className="oc-num">{card.num}</div>
                <div className="oc-title">{card.title}</div>
                <div className="oc-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hdivider" />

      {/* EXPERIENCE */}
      <section id="exp" className="exp-section">
        <div className="exp-header">
          <div className="reveal-left">
            <div className="section-eyebrow">Expérience</div>
            <h2 className="section-h2">Experience</h2>
          </div>
          <div className="reveal-right" style={{ paddingTop: 8 }}>
            <p className="exp-desc">
              Parcours marqué par des stages opérationnels et une formation d'excellence en Data Science & IA à l'ENSPD Douala.
              Chaque expérience a forgé une vision technique et produit transversale.
            </p>
          </div>
        </div>
        <div className="exp-rows reveal">
          {EXPERIENCES.map((e) => (
            <div className="exp-row" key={e.num}>
              <span className="er-num">{e.num}</span>
              <img src={e.img} alt={e.company} className="er-img" />
              <div>
                <div className="er-company">{e.company}</div>
                <div className="er-role">{e.role}</div>
              </div>
              <span className="er-level">{e.level}</span>
              <span className="er-duration">JOB DURATION · {e.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="hdivider" />

      {/* PROJECTS */}
      <section id="projects" className="proj-section">
        <div className="section-eyebrow reveal">Case Study</div>
        <h2 className="section-h2 reveal" style={{ marginBottom: 8 }}>Projets IA & SaaS</h2>
        <p className="section-sub reveal" style={{ marginBottom: 0, fontSize: 13 }}>
          Neuf projets à fort impact social, de la santé à la finance, conçus pour des contextes africains réels.
        </p>
        <div className="proj-grid">
          {PROJECTS_ALL.map((p, i) => (
            <div className="proj-card reveal" key={p.title} style={{ transitionDelay: `${i * 0.05}s` }}>
              <img src={p.img} alt={p.title} className="pc-img" />
              <div className="proj-card-inner">
                <div className="pc-top">
                  <span className="pc-tag">{p.tag}</span>
                  <span className="pc-arrow">↗</span>
                </div>
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-subtitle">{p.subtitle}</p>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-impact">
                  <span className="pc-impact-label">Impact</span>{p.impact}
                </div>
                <div className="pc-badges">
                  {p.badges.map((b) => <span className="pc-badge" key={b}>{b}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hdivider" />

      {/* TESTIMONIAL */}
      <section className="testi-section">
        <div className="testi-label">Client Feedback</div>
        <div className="reveal">
          <blockquote className="testi-quote">
            "Je voulais juste partager une note et vous faire savoir que{" "}
            <span>vous faites vraiment du très bon travail.</span>"
          </blockquote>
          <div className="testi-author">
            <div className="testi-info">
              <h4>Rohan Singh</h4>
              <p>Project Manager, Airline Tech Inc.</p>
              <svg viewBox="0 0 80 20" fill="none" style={{ width: 80, height: 20, marginTop: 12, color: "var(--black)" }}>
                <path d="M2 10 Q10 2 20 10 Q30 18 40 10 Q50 2 60 10 Q70 18 78 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format"
              alt="Rohan Singh"
              className="testi-photo"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat-block reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <img src={s.img} alt={s.label} className="sb-img" />
              <div className="sb-val">{formatStat(statVals[i])}{s.suffix}</div>
              <div className="sb-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hdivider" />

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-eyebrow reveal" style={{ justifyContent: "center" }}>Contact</div>
        <h2 className="contact-h2 reveal">
          Say Hi! <em>and tell me about</em><br /><em>your idea</em>
        </h2>
        <p className="contact-sub reveal">Have a nice project? reach out and let's chat.</p>
        <div className="contact-form reveal">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
              <h3 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
                Message envoyé!
              </h3>
              <p style={{ color: "#888", fontSize: 14 }}>Je vous réponds sous 24h.</p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <input className="form-input" type="text" placeholder="Name *" value={cfName} onChange={(e) => setCfName(e.target.value)} />
                <input className="form-input" type="email" placeholder="Email *" value={cfEmail} onChange={(e) => setCfEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Company name" />
              </div>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Your website?" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: 10 }}>
                  What's in your mind? *
                </div>
                <div className="interests-wrap">
                  {INTERESTS.map((item) => (
                    <button
                      key={item}
                      className={`int-btn${activeInterests.includes(item) ? " active" : ""}`}
                      onClick={() => toggleInterest(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button className="form-submit" onClick={submitForm}>Send Me ✦</button>
              <p className="form-note">I'll get back to you within 24 hours</p>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mko-footer">
        <div className="footer-logo">MKO · {PROFILE.fullName}</div>
        <div className="footer-links">
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
          <a href="https://linkedin.com/in/moukoko-ekambi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://github.com/MiguelMKO" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <span className="footer-year">Personal portfolio©2025</span>
      </footer>
    </div>
  );
}