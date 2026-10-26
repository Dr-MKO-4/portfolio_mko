import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROJECTS, CATEGORY_OF } from "../data/projects.js";
import { EASE, Page, Reveal, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import Lightbox from "../components/Lightbox.jsx";
import LivePreview from "../components/LivePreview.jsx";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, ui } = useLang();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const coverRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [zoom, setZoom] = useState(null);

  if (idx === -1) return <NotFound />;
  const p = PROJECTS[idx];
  const sameCat = PROJECTS.filter((x) => x.cat === p.cat);
  const next = sameCat[(sameCat.indexOf(p) + 1) % sameCat.length];
  const cat = CATEGORY_OF[p.cat];
  const built = t(p.built) || [];
  const arch = t(p.architecture) || [];
  const images = [
    ...(p.cover ? [{ src: p.cover, alt: p.subtitle }] : []),
    ...(p.gallery || []),
  ].filter((g, i, arr) => arr.findIndex((x) => x.src === g.src) === i);

  return (
    <Page>
      <section className="pd-hero">
        <div className="wrap">
          <Reveal delay={0.5} y={10}>
            <Link to={`/projets/categorie/${p.cat}`} className="pd-back mono">← {cat.num} · {t(cat.label)}</Link>
          </Reveal>
          <Reveal delay={0.55} y={10}>
            <div className="chips"><span className="chip">{t(p.group)}</span>{p.featured && <span className="chip">{ui("featuredBadge")}</span>}</div>
          </Reveal>
          <h1 className="h-1 pd-title title-row">{p.logo && <motion.img className="p-logo p-logo-lg" src={p.logo} alt={`Logo ${t(p.name)}`} initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.6, duration: 0.7, ease: EASE }} />}<SplitText key={p.slug} text={t(p.name)} delay={0.6} /></h1>
          <Reveal delay={0.75}><p className="pd-sub">{t(p.subtitle)}</p></Reveal>
          {p.live && (
            <Reveal delay={0.8} className="pd-live-cta">
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor={ui("view")}>
                <span className="pulse" /> {ui("liveOpen")} <span className="arrow">↗</span>
              </a>
              <a href="#apercu" className="btn btn-ghost">{ui("liveJump")}</a>
            </Reveal>
          )}
          <Reveal delay={0.85}>
            <dl className="pd-meta">
              <div><dt className="mono">{ui("status")}</dt><dd>{t(p.status)}</dd></div>
              <div><dt className="mono">{ui("year")}</dt><dd>{p.year}</dd></div>
              <div><dt className="mono">{ui("role")}</dt><dd>{t(p.role)}</dd></div>
              <div><dt className="mono">{ui("stack")}</dt><dd>{p.stack.slice(0, 3).join(" · ")}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="wrap">
        <motion.div
          ref={coverRef}
          className={`pd-cover${images.length ? " clickable" : ""}`}
          onClick={() => images.length && setZoom(0)}
          data-cursor={images.length ? ui("view") : undefined}
          role={images.length ? "button" : undefined}
          initial={{ clipPath: "inset(12% 6% 12% 6% round 25px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 25px)" }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
        >
          <motion.div style={{ position: "absolute", inset: 0, y: coverY }}>
            <ProjectVisual project={p} logoClass="stack-logo" eager />
          </motion.div>
        </motion.div>
      </div>

      <div className="wrap">
        <div className="pd-body">
          <aside className="pd-aside">
            <div>
              <h4 className="mono muted">{ui("stack")}</h4>
              <div className="chips">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
            <div>
              <h4 className="mono muted">{ui("links")}</h4>
              <div className="pd-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="pd-link" data-cursor={ui("view")}>
                    <span>{ui("liveOpen")}</span><span>↗</span>
                  </a>
                )}
                {p.links?.length ? (
                  p.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="pd-link" data-cursor="GitHub">
                      <span>{t(l.label)}</span><span>↗</span>
                    </a>
                  ))
                ) : (
                  !p.live && <p className="muted" style={{ fontSize: 12 }}>{ui("privateCode")}</p>
                )}
              </div>
            </div>
          </aside>

          <div className="pd-main">
            <Reveal as="section">
              <h2 className="h-2">{ui("context2")}</h2>
              <p>{t(p.context)}</p>
            </Reveal>

            {built.length > 0 && (
              <section>
                <Reveal><h2 className="h-3">{ui("approach")}</h2></Reveal>
                <ul className="pd-list" style={{ marginTop: 21 }}>
                  {built.map((b, i) => (
                    <Reveal as="li" key={i} delay={i * 0.04} y={20}>{b}</Reveal>
                  ))}
                </ul>
              </section>
            )}

            {arch.length > 0 && (
              <section>
                <Reveal><h2 className="h-3">{ui("architecture")}</h2></Reveal>
                <div className="arch" style={{ marginTop: 21 }}>
                  {arch.map((a, i) => (
                    <Reveal key={i} className="arch-node" delay={i * 0.05} y={16}><span>{a}</span></Reveal>
                  ))}
                </div>
              </section>
            )}

            {p.note && (
              <Reveal as="section"><p className="pd-note">{t(p.note)}</p></Reveal>
            )}
          </div>
        </div>
      </div>

      {p.live && <div id="apercu"><LivePreview url={p.live} cover={p.cover} /></div>}

      {images.length > 0 && (
        <section className="pd-catalogue">
          <div className="wrap">
            <div className="pd-cat-head">
              <Reveal><h2 className="h-3">{ui("gallery")}</h2></Reveal>
              <Reveal><span className="mono muted">{images.length} {ui("imagesCount")} · {ui("clickToZoom")}</span></Reveal>
            </div>
            <div className={`pd-cat-grid n${Math.min(images.length, 3)}`}>
              {images.map((g, i) => (
                <Reveal key={g.src} delay={(i % 3) * 0.06} y={24}>
                  <button className="pd-thumb" onClick={() => setZoom(i)} data-cursor={ui("view")} aria-label={t(g.alt)}>
                    <img src={g.src} alt={t(g.alt)} loading="lazy" />
                    <span className="pd-thumb-cap">{t(g.alt)}</span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="dark">
        <div className="wrap">
          <Link to={`/projets/${next.slug}`} className="next-project" data-cursor={ui("view")}>
            <div className="h-display">{t(next.name)} <span className="serif">→</span></div>
            <p className="lead muted-on-dark" style={{ marginTop: 14 }}>{ui("nextProject")} · {t(next.subtitle)}</p>
          </Link>
        </div>
      </section>

      <Lightbox images={images} index={zoom} onChange={setZoom} />
      <Footer />
    </Page>
  );
}
