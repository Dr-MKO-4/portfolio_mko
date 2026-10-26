import { useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROJECTS, CATEGORIES, byCategory } from "../data/projects.js";
import { EASE, Page, Reveal, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";

function CategoryTile({ cat, index }) {
  const { t, ui } = useLang();
  const all = byCategory(cat.key);
  const featured = all.filter((p) => cat.featured.includes(p.slug));
  return (
    <Reveal delay={(index % 2) * 0.08} y={30}>
      <Link to={`/projets/categorie/${cat.key}`} className="cat-tile" data-cursor={ui("view")}>
        <div className="cat-tile-visuals">
          {featured.map((p, i) => (
            <motion.div key={p.slug} className={`cat-tile-shot s${i}`} whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: EASE }}>
              <ProjectVisual project={p} showLogo={false} />
            </motion.div>
          ))}
        </div>
        <div className="cat-tile-body">
          <div className="cat-tile-top mono">
            <span className="accent">{cat.num}</span>
            <span>{all.length} {ui("projectsCount")}</span>
          </div>
          <h2 className="h-3">{t(cat.label)}</h2>
          <p>{t(cat.desc)}</p>
          <span className="cat-tile-link mono">{ui("viewCategory")} <span>→</span></span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Projects() {
  const { t, ui } = useLang();
  const [params] = useSearchParams();
  const [q, setQ] = useState("");
  const legacy = params.get("cat");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return PROJECTS.filter((p) =>
      [p.name.fr, p.name.en, p.subtitle.fr, p.subtitle.en, p.stack.join(" ")].join(" ").toLowerCase().includes(needle)
    );
  }, [q]);

  if (legacy && CATEGORIES.some((c) => c.key === legacy)) return <Navigate to={`/projets/categorie/${legacy}`} replace />;

  return (
    <Page>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="h-display">
            <SplitText text={ui("navProjects")} delay={0.5} />
            <span className="serif accent" style={{ fontSize: "0.5em", marginLeft: 14 }}>({PROJECTS.length})</span>
          </h1>
          <Reveal delay={0.6}><p className="lead muted" style={{ marginTop: 21 }}>{ui("projectsIndexIntro")}</p></Reveal>
          <Reveal delay={0.7} className="filters">
            <input className="search" style={{ marginLeft: 0, maxWidth: 458 }} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ui("search")} aria-label={ui("search")} />
          </Reveal>
          {q.trim() && (
            <div className="search-results">
              {results.length === 0 && <p className="muted">{ui("noResult")}</p>}
              {results.map((p) => (
                <Link key={p.slug} to={`/projets/${p.slug}`} className="search-hit" data-cursor={ui("view")}>
                  <span className="title-row">{p.logo && <img className="p-logo" src={p.logo} alt="" />}{t(p.name)}</span>
                  <span className="mono muted">{t(CATEGORIES.find((c) => c.key === p.cat).label)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ paddingBottom: 106 }}>
        <div className="wrap cat-tiles">
          {CATEGORIES.map((c, i) => <CategoryTile key={c.key} cat={c} index={i} />)}
        </div>
      </section>
      <Footer />
    </Page>
  );
}
