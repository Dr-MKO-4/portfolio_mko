import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROJECTS, CATEGORIES } from "../data/projects.js";
import { EASE, Page, Reveal, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";

function Card({ p }) {
  const { t, ui } = useLang();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Link to={`/projets/${p.slug}`} className="card" data-cursor={ui("view")}>
        <div className="card-visual">
          <ProjectVisual project={p} />
          {p.featured && <span className="card-badge">{ui("featuredBadge")}</span>}
        </div>
        <div className="card-body">
          <div className="card-meta mono">
            <span>{t(p.group)}</span>
            <span>{p.year}</span>
          </div>
          <h3>{t(p.name)}</h3>
          <p>{t(p.subtitle)}</p>
          <div className="card-foot">
            {p.stack.slice(0, 4).map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const { t, ui } = useLang();
  const [params, setParams] = useSearchParams();
  const cat = CATEGORIES.some((c) => c.key === params.get("cat")) ? params.get("cat") : "all";
  const [q, setQ] = useState("");

  const setCat = (key) => setParams(key === "all" ? {} : { cat: key }, { replace: true });

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length };
    PROJECTS.forEach((p) => { c[p.cat] = (c[p.cat] || 0) + 1; });
    return c;
  }, []);

  const needle = q.trim().toLowerCase();
  const matches = (p) =>
    !needle || [p.name.fr, p.name.en, p.subtitle.fr, p.subtitle.en, p.stack.join(" ")].join(" ").toLowerCase().includes(needle);
  const visibleCats = CATEGORIES.filter((c) => cat === "all" || c.key === cat);
  const total = PROJECTS.filter((p) => (cat === "all" || p.cat === cat) && matches(p)).length;

  return (
    <Page>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">{ui("allEyebrow")}</span>
          <h1 className="h-display" style={{ marginTop: 20 }}>
            <SplitText text={ui("navProjects")} delay={0.5} />
            <span className="serif accent" style={{ fontSize: "0.5em", marginLeft: 16 }}>({PROJECTS.length})</span>
          </h1>
          <Reveal delay={0.6}><p className="lead muted" style={{ marginTop: 24 }}>{ui("allIntro")}</p></Reveal>
          <Reveal delay={0.7} className="filters">
            {[{ key: "all", label: { fr: ui("filterAll"), en: ui("filterAll") } }, ...CATEGORIES].map((c) => (
              <button key={c.key} className={`filter${cat === c.key ? " active" : ""}`} onClick={() => setCat(c.key)} aria-pressed={cat === c.key} style={{ isolation: "isolate" }}>
                {cat === c.key && <motion.span layoutId="filter-bg" className="filter-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="filter-label">{t(c.label)}<sup>{counts[c.key] || 0}</sup></span>
              </button>
            ))}
            <input className="search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ui("search")} aria-label={ui("search")} />
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 120 }}>
        <div className="wrap">
          {visibleCats.map((c) => {
            const list = PROJECTS.filter((p) => p.cat === c.key && matches(p));
            if (!list.length) return null;
            return (
              <div key={c.key} className="pcat">
                <Reveal className="pcat-head" y={20}>
                  <span className="mono accent">{c.num}</span>
                  <h2 className="h-2">{t(c.label)}</h2>
                  <p className="muted">{t(c.desc)}</p>
                </Reveal>
                <motion.div layout className="grid">
                  <AnimatePresence mode="popLayout">
                    {list.map((p) => <Card key={p.slug} p={p} />)}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
          {total === 0 && <p className="lead muted">{ui("noResult")}</p>}
        </div>
      </section>
      <Footer />
    </Page>
  );
}
