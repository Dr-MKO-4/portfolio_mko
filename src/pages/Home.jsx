import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROFILE, MARQUEE, PILLARS } from "../data/profile.js";
import { PROJECTS, CATEGORIES, byCategory, publicRepoCount } from "../data/projects.js";
import { Counter, EASE, Magnetic, Marquee, Page, Reveal, ScrollStatement, SplineField, SplitText, Surface3D, KANNetwork, IsoStack } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";

function Hero({ ready }) {
  const { ui } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const d = ready ? 0.1 : 0;

  return (
    <section ref={ref} className="hero">
      <SplineField className="hero-field" />
      <div className="wrap">
        <div className="hero-grid">
          <motion.div style={{ y: textY }}>
            <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: d }}>
              {ui("heroEyebrow")}
            </motion.span>
            <h1 className="h-display hero-title">
              <SplitText className="split-line" text={ui("heroLine1")} play={ready} delay={d + 0.05} />
              <span className="split-line">
                <SplitText text={ui("heroLine2")} play={ready} delay={d + 0.15} />{" "}
                <SplitText className="serif" text={ui("heroLine3")} play={ready} delay={d + 0.25} />
              </span>
            </h1>
            <motion.p className="h-3" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.55, duration: 0.9, ease: EASE }}>
              {ui("heroLine4")}
            </motion.p>
            <motion.p className="lead hero-intro" style={{ marginTop: 18 }} initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.65, duration: 0.9, ease: EASE }}>
              {ui("heroIntro")}
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.75, duration: 0.9, ease: EASE }}>
              <Magnetic>
                <Link to="/projets" className="btn btn-primary" data-cursor={ui("view")}>
                  {ui("seeWork")} <span className="arrow">→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn btn-ghost">{ui("contactMe")}</Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <div className="hero-photo">
            <motion.div
              className="hero-photo-frame"
              initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }}
              animate={ready ? { clipPath: "inset(0% 0 0 0 round 28px)" } : {}}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: d + 0.2 }}
            >
              <motion.img
                src="/img/miguel.webp"
                alt="Georges Miguel MOUKOKO"
                style={{ y: photoY }}
                initial={{ scale: 1.25 }}
                animate={ready ? { scale: 1 } : {}}
                transition={{ duration: 1.8, ease: EASE, delay: d + 0.2 }}
                fetchPriority="high"
              />
            </motion.div>
            <motion.div className="hero-photo-tag" initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: d + 1.1, duration: 0.7, ease: EASE }}>
              <span className="pulse" /> {ui("available")}
            </motion.div>
            <div className="hero-photo-caption mono">
              <span>LIDIA Lab</span>
              <span>ENSPD · Douala</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="scroll-cue mono"><i />{ui("scroll")}</div>
          <span className="formula">φ(x) = Σ cᵢ · Bᵢ(x)</span>
        </div>
      </div>
    </section>
  );
}

const ISO_LABELS = {
  fr: [["Données", "PostgreSQL · PostGIS · Kafka"], ["Modèles", "PyTorch · XGBoost · RAG"], ["API", ".NET 8 · FastAPI · Node"], ["Interfaces", "React · Flutter · Dash"]],
  en: [["Data", "PostgreSQL · PostGIS · Kafka"], ["Models", "PyTorch · XGBoost · RAG"], ["APIs", ".NET 8 · FastAPI · Node"], ["Interfaces", "React · Flutter · Dash"]],
};

function PillarCard({ p, i, dark }) {
  const { t, ui } = useLang();
  return (
    <Reveal delay={i * 0.08}>
      <Link to={`/projets/categorie/${p.cat}`} className={`pillar-card${dark ? " on-dark" : ""}`} data-cursor={ui("view")}>
        <div className="pillar-card-top"><span className="pillar-num">{p.num}</span><span className="pillar-go">→</span></div>
        <h3 className="h-3">{t(p.title)}</h3>
        <p>{t(p.text)}</p>
        <ul>{p.tags.map((tag) => <li key={tag} className="chip">{tag}</li>)}</ul>
      </Link>
    </Reveal>
  );
}

function StackCard({ project, index, total, progress }) {
  const { t, ui } = useLang();
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.04]);
  const dim = useTransform(progress, [index / total, 1], [0, index < total - 1 ? 0.35 : 0]);
  return (
    <div className="stack-card" style={{ top: `calc(110px + ${index * 18}px)` }}>
      <motion.div className="stack-inner" style={{ scale }}>
        <div className="stack-text">
          <div>
            <div className="stack-top">
              <span className="stack-index">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              <span className="chip">{t(project.group)}</span>
            </div>
            <h3 className="title-row">{project.logo && <img className="p-logo" src={project.logo} alt="" loading="lazy" />}{t(project.name)}</h3>
            <p>{t(project.subtitle)}</p>
          </div>
          <div style={{ display: "grid", gap: 18 }}>
            <div className="stack-chips">{project.stack.slice(0, 5).map((s) => <span key={s} className="chip">{s}</span>)}</div>
            <div>
              <Link to={`/projets/${project.slug}`} className="btn btn-primary" data-cursor={ui("view")}>
                {ui("view")} <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
        <Link to={`/projets/${project.slug}`} className="stack-visual" data-cursor={ui("view")} tabIndex={-1} aria-hidden="true">
          <ProjectVisual project={project} logoClass="stack-logo" />
        </Link>
        <motion.div className="stack-dim" style={{ opacity: dim }} />
      </motion.div>
    </div>
  );
}

function RowsList({ projects }) {
  const { t, ui } = useLang();
  const [hover, setHover] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });
  const move = (e) => { x.set(e.clientX + 24); y.set(e.clientY - 120); };
  return (
    <div className="rows-container" onPointerMove={move} onPointerLeave={() => setHover(null)}>
      <div className="rows">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.03} y={20}>
            <Link to={`/projets/${p.slug}`} className="row" onPointerEnter={() => setHover(p)} data-cursor={ui("view")}>
              <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="row-title title-row">{p.logo && <img className="p-logo" src={p.logo} alt="" loading="lazy" />}{t(p.name)}</span>
              <span className="muted hide-sm">{t(p.subtitle)}</span>
              <span className="mono muted hide-sm">{p.year}</span>
              <span className="row-arrow">→</span>
            </Link>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div className="row-preview" style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3, ease: EASE }}>
            <AnimatePresence mode="popLayout">
              <motion.div key={hover.slug} style={{ position: "absolute", inset: 0 }} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.45, ease: EASE }}>
                <ProjectVisual project={hover} showLogo={false} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryBlock({ cat }) {
  const { t, ui } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const all = byCategory(cat.key);
  const featured = all.filter((p) => p.featured);
  const others = all.filter((p) => !p.featured);
  return (
    <div className="cat-block">
      <div className="cat-head">
        <Reveal y={20}>
          <span className="cat-num mono">{cat.num}</span>
          <Link to={`/projets/categorie/${cat.key}`} data-cursor={ui("view")}><h3 className="h-2 cat-title">{t(cat.label)}</h3></Link>
          <p className="muted-on-dark cat-desc">{t(cat.desc)}</p>
          <Link to={`/projets/categorie/${cat.key}`} className="cat-link mono">
            {ui("viewCategory")} ({all.length}) <span>→</span>
          </Link>
        </Reveal>
      </div>
      <div className="cat-body">
        <div ref={ref} className="stack-wrap">
          {featured.map((p, i) => <StackCard key={p.slug} project={p} index={i} total={featured.length} progress={scrollYProgress} />)}
        </div>
        {others.length > 0 && (
          <div className="cat-others">
            <span className="mono muted-on-dark">{ui("alsoInCategory")}</span>
            <RowsList projects={others} />
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryShowcase() {
  const { ui } = useLang();
  return (
    <section className="section dark">
      <div className="wrap">
        <div className="section-head work-head">
          <div>
            <span className="eyebrow">{ui("featuredEyebrow")}</span>
            <SplitText as="h2" className="h-1" text={ui("featuredTitle")} />
            <Reveal><p className="lead muted-on-dark" style={{ marginTop: 24 }}>{ui("featuredIntro")}</p></Reveal>
          </div>
          <Reveal className="surface-wrap">
            <Surface3D className="surface3d" />
            <span className="mono surface-cap">φ(u, v) · B-spline surface</span>
          </Reveal>
        </div>
        {CATEGORIES.map((c) => <CategoryBlock key={c.key} cat={c} />)}
        <Reveal style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
          <Magnetic>
            <Link to="/projets" className="btn btn-primary">
              {ui("viewAll")} ({PROJECTS.length}) <span className="arrow">→</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home({ ready }) {
  const { lang, t, ui } = useLang();
  const statement =
    lang === "fr"
      ? "Je veux une IA *explicable, capable de tourner *hors ligne, et utile là où elle compte : dans les banques, les champs, les hôpitaux et les réseaux de paiement d'Afrique centrale."
      : "I want AI that is *explainable, able to run *offline, and useful where it matters: in banks, farms, hospitals and payment networks across Central Africa.";

  return (
    <Page>
      <Hero ready={ready} />
      <Marquee key={lang} items={MARQUEE[lang]} />

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">{ui("pillarsEyebrow")}</span>
          <div style={{ margin: "28px 0 clamp(60px, 9vw, 120px)" }}>
            <ScrollStatement key={lang} className="statement" text={statement} />
          </div>
        </div>
      </section>

      <section className="pillar-sub">
        <div className="wrap pillar-split">
          <div>
            <span className="eyebrow">{ui("researchEyebrow")}</span>
            <SplitText as="h2" className="h-1" text={ui("researchTitle")} />
            <Reveal><p className="lead muted" style={{ margin: "20px 0 32px" }}>{ui("researchIntro")}</p></Reveal>
            <div className="pillar-cards">
              {PILLARS.slice(0, 2).map((p, i) => <PillarCard key={p.num} p={p} i={i} />)}
            </div>
          </div>
          <Reveal className="pillar-art"><KANNetwork className="art-svg" /></Reveal>
        </div>
      </section>

      <section className="pillar-sub dark">
        <div className="wrap pillar-split reverse">
          <Reveal className="pillar-art"><IsoStack className="art-svg" labels={ISO_LABELS[lang]} /></Reveal>
          <div>
            <span className="eyebrow">{ui("craftEyebrow")}</span>
            <SplitText as="h2" className="h-1" text={ui("craftTitle")} />
            <Reveal><p className="lead muted-on-dark" style={{ margin: "20px 0 32px" }}>{ui("craftIntro")}</p></Reveal>
            <div className="pillar-cards">
              {PILLARS.slice(2).map((p, i) => <PillarCard key={p.num} p={p} i={i} dark />)}
            </div>
          </div>
        </div>
      </section>

      <section className="dark" style={{ paddingTop: "clamp(60px, 8vw, 100px)" }}>
        <div className="wrap">
          <div className="counters">
            {[
              { v: PROJECTS.length, l: { fr: "projets documentés sur ce site", en: "projects documented on this site" } },
              { v: CATEGORIES.length, l: { fr: "catégories, dont deux axes de recherche", en: "categories, including two research tracks" } },
              { v: publicRepoCount, l: { fr: "dépôts de code publics liés", en: "linked public code repositories" } },
              { v: PROJECTS.filter((p) => p.featured).length, l: { fr: "projets mis en avant", en: "featured projects" } },
            ].map((c, i) => (
              <Reveal key={i} className="counter" delay={i * 0.06}>
                <Link to="/projets" data-cursor={ui("view")} style={{ display: "block" }}>
                  <Counter value={c.v} />
                  <p>{t(c.l)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CategoryShowcase />

      <section className="section dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
          <Link to="/parcours" className="lab-card" data-cursor={ui("view")}>
            <img src="/img/logos/lidia.webp" alt="LIDIA" />
            <div>
              <span className="eyebrow">{ui("labEyebrow")}</span>
              <h2 className="h-2" style={{ margin: "14px 0" }}>LIDIA Lab</h2>
              <p className="lead muted">
                {lang === "fr"
                  ? "Le laboratoire où je mène mes recherches sur l'IA explicable et l'IA embarquée, appliquées à l'agriculture, la santé, la sécurité et la finance. L'identité visuelle de ce site reprend ses couleurs."
                  : "The lab where I research explainable AI and edge AI, applied to agriculture, health, security and finance. This site's visual identity borrows its colours."}
              </p>
            </div>
          </Link>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow">{ui("contactEyebrow")}</span>
          <h2 className="h-display" style={{ marginTop: 24 }}>
            <Link to="/contact" data-cursor={ui("letsTalk")}>
              <SplitText text={ui("letsTalk")} /> <span className="serif accent">↗</span>
            </Link>
          </h2>
          <p className="mono muted" style={{ marginTop: 24 }}>{PROFILE.email}</p>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
